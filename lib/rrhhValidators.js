/* === Validaciones RRHH (JS puro) ===
   - Email, Teléfono (E.164-ish), Birthdate (18–70), Periodos en pasado,
     Certificados (issued/expires), Fechas futuras, Archivo (CV).
   - Diseñado para ser drop-in: nombres que ya usás en ManualFormWizard.
*/

export const AGE_MIN = 18;
export const AGE_MAX = 70;
export const DEFAULT_MAX_FILE_MB = 5;
export const isoToday = () => new Date().toISOString().slice(0, 10);


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function trimAll(obj = {}) {
  const out = {};
  for (const k in obj) {
    const v = obj[k];
    out[k] = typeof v === 'string' ? v.trim() : v;
  }
  return out;
}

/* ---------- Email ---------- */
export function validateEmail(email = '') {
  return EMAIL_REGEX.test(String(email).trim());
}

/* ---------- Teléfono ---------- */
// Normaliza a "+<solo_dígitos>", sin inferir país si no viene.
export function normalizePhone(raw = '') {
  const s = String(raw).trim();
  if (!s) return { ok: false };
  if (/^\+\d{8,15}$/.test(s)) return { ok: true, e164: s };
  const digits = s.replace(/\D+/g, '');
  if (digits.length < 10 || digits.length > 15) return { ok: false };
  return { ok: true, e164: `+${digits}` };
}

// Boolean “simple” para compatibilidad con tu código actual
export function validatePhone(raw = '') {
  return normalizePhone(raw).ok;
}

/* ---------- Fechas util ---------- */
function parseISO(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const d = new Date(iso + 'T00:00:00');
  return Number.isNaN(d.getTime()) ? null : d;
}
function isBefore(a, b) { return a.getTime() < b.getTime(); }
function isAfterOrEqual(a, b) { return a.getTime() >= b.getTime(); }


/* ---------- Fecha de nacimiento ---------- */
export function validateBirthdate(iso, min = AGE_MIN, max = AGE_MAX) {
  const d = parseISO(iso);
  if (!d) return { ok: false, message: 'Fecha inválida (YYYY-MM-DD).' };
  const today = new Date();
  if (isAfterOrEqual(d, today)) return { ok: false, message: 'La fecha no puede ser futura.' };
  // edad
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  if (age < min) return { ok: false, message: `Debés ser mayor de ${min} años.` };
  if (age > max) return { ok: false, message: `Ingresá una edad menor a ${max} años.` };
  return { ok: true };
}

/* ---------- “Pasado” genérico (exps/edu) ---------- */
// Usado en tu wizard (nombres drop-in):
export function validatePastDate(iso) {
  const d = parseISO(iso);
  if (!d) return false;
  const today = new Date();
  return isBefore(d, today); // estrictamente pasado
}

// start/end en pasado; permite end vacío si allowOpenEnd
export function validatePeriodPast(startIso, endIso, opts = {}) {
  const { allowOpenEnd = false } = opts;
  const out = {}; // { start?:true, end?:true, order?:true }
  const s = parseISO(startIso);
  const e = endIso ? parseISO(endIso) : null;
  const today = new Date();

  if (!s || !isBefore(s, today)) out.start = true;
  if (e) {
    if (!isBefore(e, today)) out.end = true;
    if (s && !isBefore(s, e)) out.order = true;
  } else if (!allowOpenEnd) {
    out.end = true;
  }

  return Object.keys(out).length ? out : null;
}

/* ---------- Certificados ---------- */
export function validateIssued(issuedIso) {
  if (!issuedIso) return true; // opcional
  const d = parseISO(issuedIso);
  if (!d) return false;
  const today = new Date();
  return !isAfterOrEqual(d, today); // issued debe ser pasado estricto
}

// expires debe ser >= issued y puede ser futura
export function validateExpires(issuedIso, expiresIso) {
  const out = {}; // { expires?:true, order?:true }
  if (!expiresIso) return null;
  const ex = parseISO(expiresIso);
  if (!ex) { out.expires = true; return out; }
  if (issuedIso) {
    const is = parseISO(issuedIso);
    if (!is) out.order = true;
    else if (!isBefore(is, ex) && +is !== +ex) out.order = true;
  }
  return Object.keys(out).length ? out : null;
}

/* ---------- Fechas futuras (o hoy) ---------- */
// Usás para availability en Step 5
export function validateFutureOrToday(iso) {
  if (!iso) return false;
  const d = parseISO(iso);
  if (!d) return false;
  const today = new Date();
  // permitir hoy (>=)
  return d.getFullYear() > today.getFullYear() ||
         (d.getFullYear() === today.getFullYear() && (
           d.getMonth() > today.getMonth() ||
           (d.getMonth() === today.getMonth() && d.getDate() >= today.getDate())
         ));
}

/* ---------- Archivo (CV) ---------- */
export function validateFile(file, { allowedMime = [], maxMB = DEFAULT_MAX_FILE_MB } = {}) {
  if (!file) return 'Adjuntá tu CV.';
  if (allowedMime.length && !allowedMime.includes(file.type)) return 'Formato no permitido (PDF/DOC/DOCX).';
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxMB) return `Máximo ${maxMB}MB.`;
  return null;
}
