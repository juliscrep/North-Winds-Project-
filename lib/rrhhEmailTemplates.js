const esc = (s='') => String(s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

const row = (k, v) => `<tr><td class="k">${esc(k)}</td><td class="v">${v ? esc(v) : '—'}</td></tr>`;
const section = (t, inner) => `<h3>${esc(t)}</h3><table class="tbl">${inner}</table>`;

export function renderApplicationHTML(fields={}, type='manual'){
  const {
    fullName, email, phone, documentId, birthdate, area, location,
    linkedin, website, address={}, experience=[], education=[], certifications=[],
    languages=[], skills, message, preferences={}, consent
  } = fields;

  const addr = [address.addressLine, address.city, address.province, address.country, address.postalCode]
    .filter(Boolean).join(' · ');

  const expHTML = experience.length ? experience.map(x => `
    <tr><td colspan="2" class="sub"><strong>${esc(x.role||'—')}</strong> — ${esc(x.company||'—')}</td></tr>
    ${row('Inicio', x.start||'—')}${row('Fin', x.current?'Actual':(x.end||'—'))}
    ${row('Ubicación', x.location||'—')}${row('Descripción', x.description||'—')}
  `).join('') : row('Experiencia', '—');

  const eduHTML = education.length ? education.map(x => `
    <tr><td colspan="2" class="sub"><strong>${esc(x.degree||'—')}</strong> — ${esc(x.institution||'—')}</td></tr>
    ${row('Desde', x.start||'—')}${row('Hasta', x.end||'—')}${row('Detalle', x.description||'—')}
  `).join('') : row('Educación', '—');

  const certHTML = certifications.length ? certifications.map(c => `
    <tr><td colspan="2" class="sub"><strong>${esc(c.name||'—')}</strong> — ${esc(c.issuer||'—')}</td></tr>
    ${row('Emitida', c.issued||'—')}${row('Vence', c.expires||'—')}
    ${row('Credencial', c.credentialId||'—')}${row('URL', c.url||'—')}
  `).join('') : row('Certificaciones', '—');

  const langHTML = languages.length ? languages.map(l => row(l.name||'Idioma', l.level||'—')).join('') : row('Idiomas','—');

  const prefHTML = [
    row('Contrato', preferences.contract||'—'),
    row('Disponibilidad', preferences.availability||'—'),
    row('Salario', preferences.salary||'—'),
    row('Horario', preferences.schedule||'—'),
    row('Reubicación', preferences.relocation||'—'),
    row('Viajes', preferences.travel||'—'),
  ].join('');

  return `<!doctype html><html><head><meta charset="utf-8"/>
<style>
body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial;background:#f5f7fb;color:#0c1320;margin:0;padding:24px}
.card{max-width:780px;margin:0 auto;background:#fff;border:1px solid #e5e9f2;border-radius:12px;box-shadow:0 10px 26px rgba(16,24,40,.06);overflow:hidden}
.hd{padding:18px 20px;background:#0f172a;color:#eaf3ff}
.hd h2{margin:0;font-size:18px}
.bd{padding:18px 20px}
h3{margin:18px 0 8px;font-size:15px;color:#111827}
.tbl{width:100%;border-collapse:separate;border-spacing:0 6px}
.k{width:210px;color:#475467;font-weight:600;vertical-align:top}
.v{color:#111827}
.sub{color:#0b1320;background:#f2f4f7;border-radius:8px;padding:6px 8px}
.muted{color:#667085;font-size:12px;margin-top:6px}
</style></head><body>
<div class="card">
  <div class="hd">
    <h2>Nueva postulación — ${esc(fullName||'Sin nombre')}</h2>
    <div class="muted">${type==='upload'?'Cargada con CV adjunto':'Formulario manual'}</div>
  </div>
  <div class="bd">
    ${section('Datos personales', [
      row('Nombre y Apellido', fullName), row('Email', email), row('Teléfono', phone),
      row('Documento / ID', documentId), row('Fecha de nacimiento', birthdate),
      row('Puesto', area), row('Base/Residencia', location), row('Dirección', addr),
      row('LinkedIn', linkedin)
    ].join(''))}
    ${section('Experiencia', expHTML)}
    ${section('Educación', eduHTML)}
    ${section('Certificaciones', certHTML)}
    ${section('Habilidades / Idiomas', row('Habilidades/Stack', skills||'—') + langHTML)}
    ${section('Preferencias', prefHTML)}
    ${section('Mensaje', row('Mensaje', message||'—'))}
    <p class="muted">Consentimiento: ${consent?'Sí':'No'} · Honeypot: ${website?'Sí':'No'}</p>
  </div>
</div>
</body></html>`;
}
