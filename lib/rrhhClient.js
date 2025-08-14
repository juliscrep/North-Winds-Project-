// /lib/rrhhClient.js
export async function submitApplication(mode, fields, file) {
  const fd = new FormData();
  fd.append('mode', mode);

  // Honeypot anti-bot
  const honeypot = (fields && fields.website) || '';
  fd.append('website', honeypot);

  if (mode === 'manual') {
    // Enviamos TODO el objeto como JSON (soporta arrays/objetos)
    fd.append('payload', JSON.stringify(fields || {}));
  } else {
    // Modo upload (plano + archivo)
    Object.entries(fields || {}).forEach(([k, v]) => {
      if (k === 'website') return; // ya lo agregamos
      if (v !== undefined && v !== null) fd.append(k, String(v));
    });
    if (file) fd.append('cvFile', file, file.name);
  }

  const res = await fetch('/api/rrhh', { method: 'POST', body: fd });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}
export function validatePhone(phone) {
  return /^[\d+\-\s()]{6,20}$/.test(String(phone || ''));
}
