import { DATE_LIMITS } from '@/app/api/rrhh/rrhh.constants';
export const isoToday = () => new Date().toISOString().slice(0, 10);

export const isISODate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export const betweenISO = (s, min, max) => {
  if (!isISODate(s)) return false;
  if (min && s < min) return false;
  if (max && s > max) return false;
  return true;
};

export const validatePastDate = (s, { min=DATE_LIMITS.MIN, max=isoToday() } = {}) =>
  isISODate(s) && betweenISO(s, min, max);

export const validateFutureOrToday = (s) => isISODate(s) && s >= isoToday();

export const validatePeriodPast = (start, end, { allowOpenEnd=false } = {}) => {
  const max = isoToday();
  if (!validatePastDate(start, { max })) return { start: true };
  if (allowOpenEnd && !end) return null;
  if (!validatePastDate(end, { max })) return { end: true };
  if (end < start) return { order: true };
  return null;
};

// helpers para certs
export const validateIssued = (issued) => validatePastDate(issued);
export const validateExpires = (issued, expires) => {
  if (!expires) return null; // puede estar vacía o futura
  if (!isISODate(expires)) return { expires: true };
  if (isISODate(issued) && expires < issued) return { order: true };
  return null;
};
