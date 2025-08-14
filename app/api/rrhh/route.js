export const runtime = 'nodejs';
import nodemailer from 'nodemailer';

function env(k, d=''){ return process.env[k] || d; }
function ok(b){ return new Response(JSON.stringify(b||{}), {status:200, headers:{'Content-Type':'application/json'}}); }
function bad(b,c=400){ return new Response(JSON.stringify(b||{}), {status:c, headers:{'Content-Type':'application/json'}}); }
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||''));
const isPhone = v => /^[\d+\-\s()]{6,20}$/.test(String(v||''));

export async function POST(req){
  try{
    const form = await req.formData();
    const website = form.get('website');
    if (website) return bad({error:'Bot detectado.'}, 403);

    const mode = String(form.get('mode') || 'manual');
    let payload = null;

    // Soporte de payload JSON
    const payloadRaw = form.get('payload');
    if (payloadRaw && typeof payloadRaw === 'string'){
      try { payload = JSON.parse(payloadRaw); } catch {/* ignore */}
    }

    // Fallback compat (modo viejo plano)
    if (!payload){
      payload = {
        fullName: String(form.get('fullName') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        area: String(form.get('area') || ''),
        location: String(form.get('location') || ''),
        linkedin: String(form.get('linkedin') || ''),
        yearsExp: String(form.get('yearsExp') || ''),
        skills: String(form.get('skills') || ''),
        message: String(form.get('message') || ''),
        consent: String(form.get('consent') || '') === 'true' || form.get('consent') === 'on'
      };
    }

    // Validaciones mínimas
    if (!payload.fullName || !payload.fullName.trim()) return bad({error:'Nombre requerido.'});
    if (!isEmail(payload.email)) return bad({error:'Email inválido.'});
    if (!isPhone(payload.phone)) return bad({error:'Teléfono inválido.'});
    if (!payload.consent) return bad({error:'Debés aceptar la política de privacidad.'});

    // Si mode === 'upload' procesamos archivo (por compatibilidad)
    let cvInfo = null;
    if (mode === 'upload'){
      const file = form.get('cvFile');
      if (!file || typeof file === 'string') return bad({error:'Falta el archivo de CV.'});
      const name = file.name || 'cv';
      const type = file.type || 'application/octet-stream';
      const size = file.size || 0;
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowed.includes(type)) return bad({error:'Formato no permitido.'});
      if (size > 5*1024*1024) return bad({error:'Archivo demasiado grande (máx 5MB).'});
      const buf = Buffer.from(await file.arrayBuffer());
      cvInfo = { name, type, size, buf };
    }

    // Email (opcional)
    const HR_EMAIL_TO = env('HR_EMAIL_TO');
    const SMTP_HOST = env('SMTP_HOST');
    const SMTP_PORT = Number(env('SMTP_PORT') || 587);
    const SMTP_USER = env('SMTP_USER');
    const SMTP_PASS = env('SMTP_PASS');

    // Render simple de listas si vienen
    const renderList = (arr, mapper) => Array.isArray(arr) && arr.length
      ? `<ul>${arr.map(mapper).join('')}</ul>` : '';

    const html = `
      <h2>Nueva postulación (${mode})</h2>
      <p><b>Nombre:</b> ${payload.fullName}</p>
      <p><b>Email:</b> ${payload.email}</p>
      <p><b>Teléfono:</b> ${payload.phone}</p>
      ${payload.area ? `<p><b>Área:</b> ${payload.area}</p>` : ''}
      ${payload.location ? `<p><b>Ubicación:</b> ${payload.location}</p>` : ''}
      ${payload.linkedin ? `<p><b>LinkedIn:</b> ${payload.linkedin}</p>` : ''}

      ${payload.address ? `
        <h3>Dirección</h3>
        <p>${payload.address.addressLine || ''} ${payload.address.city || ''} ${payload.address.province || ''} ${payload.address.country || ''} ${payload.address.postalCode || ''}</p>
      ` : ''}

      ${renderList(payload.experience, (x)=>`
        <li>
          <b>${x.role || ''}</b> en ${x.company || ''} (${x.start || ''} - ${x.current ? 'Actual' : (x.end || '')})
          ${x.location ? ` – ${x.location}` : ''}
          ${x.industry ? ` – ${x.industry}` : ''}
          ${x.description ? `<div>${x.description}</div>` : ''}
          ${x.achievements ? `<div><i>Logros:</i> ${x.achievements}</div>` : ''}
          ${x.tech ? `<div><i>Tecnologías:</i> ${x.tech}</div>` : ''}
        </li>
      `)}

      ${renderList(payload.education, (e)=>`
        <li>
          ${e.degree || ''} – ${e.institution || ''} (${e.start || ''} - ${e.end || ''}) ${e.status ? `– ${e.status}` : ''}
        </li>
      `)}

      ${renderList(payload.certifications, (c)=>`
        <li>${c.name || ''} – ${c.issuer || ''} (${c.issued || ''}${c.expires ? ` / expira ${c.expires}` : ''}) ${c.credentialId ? `– ID: ${c.credentialId}` : ''}</li>
      `)}

      ${payload.skills ? `<p><b>Skills:</b> ${payload.skills}</p>` : ''}

      ${renderList(payload.languages, (l)=>`
        <li>${l.name || ''} – ${l.level || ''}</li>
      `)}

      ${renderList(payload.references, (r)=>`
        <li>${r.name || ''} (${r.position || ''} – ${r.company || ''}) ${r.email || ''} ${r.phone || ''}</li>
      `)}

      ${payload.preferences ? `
        <h3>Preferencias</h3>
        <p>
          Disponibilidad: ${payload.preferences.availability || '-'} |
          Contrato: ${payload.preferences.contract || '-'} |
          Seniority: ${payload.preferences.seniority || '-'} |
          Remoto: ${payload.preferences.remote || '-'} |
          Reubicación: ${payload.preferences.relocation ? 'Sí' : 'No'} |
          Viajes: ${payload.preferences.travel ? 'Sí' : 'No'} |
          Pretensión: ${payload.preferences.salary || '-'}
        </p>
      `: ''}

      ${payload.message ? `<p><b>Mensaje:</b> ${payload.message}</p>` : ''}

      <hr/><small>Enviado desde RRHH</small>
    `;

    if (HR_EMAIL_TO && SMTP_HOST && SMTP_USER && SMTP_PASS){
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST, port: SMTP_PORT, secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });
      const attachments = [];
      if (cvInfo) attachments.push({ filename: cvInfo.name, content: cvInfo.buf, contentType: cvInfo.type });

      await transporter.sendMail({
        from: `"RRHH Bot" <${SMTP_USER}>`,
        to: HR_EMAIL_TO,
        subject: `Postulación - ${payload.fullName} (${mode})`,
        html, attachments
      });
    } else {
      console.log('[RRHH] payload:', payload);
      if (cvInfo) console.log('[RRHH] CV:', {name: cvInfo.name, type: cvInfo.type, size: cvInfo.size});
    }

    return ok({ message: 'Postulación recibida. ¡Gracias!' });
  }catch(err){
    console.error('[RRHH] Error:', err);
    return bad({error:'Error interno.'}, 500);
  }
}
