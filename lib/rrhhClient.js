export async function submitApplication(type, fields, file) {
  // antispam: honeypot
  if (fields?.website) return { ok: true, data: { message: 'OK' } };

  const fd = new FormData();
  fd.append('type', type);                         // 'upload' | 'manual'
  fd.append('fields', JSON.stringify(fields));     // todo el objeto
  if (file) fd.append('file', file, file.name);    // adjunto opcional

  const res = await fetch('/api/rrhh/submit', { method: 'POST', body: fd });
  let data = {};
  try { data = await res.json(); } catch {}
  return { ok: res.ok, data };
}

export async function submitContact(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(()=> ({}));
  return { ok: res.ok, data };
}

// Validadores simples (ya los usas)
export const validateEmail = (s='') => /\S+@\S+\.\S+/.test(s);
export const validatePhone = (s='') => s.replace(/\D/g,'').length >= 8;
