'use client';
import React, { useCallback } from 'react';

/**
 * Máscara + autocorrección ISO (YYYY-MM-DD)
 * - Solo permite dígitos y guiones
 * - Inserta guiones automáticamente
 * - Año por defecto limitado a 1900..2099 (o al rango min/max provisto)
 * - Mes 01..12, Día válido según mes/año
 *
 * Props: id, label, value, onChange(e), min, max, disabled, error, styles
 */
export default function DateField({
  styles,
  id,
  label,
  value = '',
  onChange,
  min,
  max,
  disabled,
  error,
  placeholder = 'YYYY-MM-DD',
}) {

  // Utils
  const clamp = (num, a, b) => Math.min(Math.max(num, a), b);
  const pad2  = (n) => String(n).padStart(2, '0');

  const parseMinYear = (min) => {
    if (!min || !/^\d{4}-\d{2}-\d{2}$/.test(min)) return 1900;
    return Math.max(1900, parseInt(min.slice(0,4), 10));
  };
  const parseMaxYear = (max) => {
    if (!max || !/^\d{4}-\d{2}-\d{2}$/.test(max)) return 2099;
    return Math.min(2099, parseInt(max.slice(0,4), 10));
  };

  const lastDayOfMonth = (y, m) => new Date(y, m, 0).getDate(); // m: 1..12

  const formatMasked = useCallback((raw) => {
    // Mantener solo dígitos
    const d = (raw || '').replace(/\D/g, '').slice(0, 8); // YYYYMMDD (máx 8 dígitos)
    let yyyy = d.slice(0, 4);
    let mm   = d.slice(4, 6);
    let dd   = d.slice(6, 8);

    // Si aún no hay año completo, devolvemos lo que haya con guiones cuando corresponde
    if (yyyy.length < 4) return yyyy;

    // Límites de año (por min/max o default)
    const yMin = parseMinYear(min);
    const yMax = parseMaxYear(max);
    let y = parseInt(yyyy, 10);
    if (Number.isFinite(y)) y = clamp(y, yMin, yMax);
    else y = yMin;
    yyyy = String(y);

    // Mes
    if (mm) {
      let m = clamp(parseInt(mm, 10) || 0, 1, 12);
      mm = pad2(m);
    }

    // Día (según último del mes)
    if (dd) {
      const mForDay = mm ? parseInt(mm, 10) : 1;
      const last = lastDayOfMonth(y, mForDay);
      let dnum = clamp(parseInt(dd, 10) || 0, 1, last);
      dd = pad2(dnum);
    }

    if (!mm) return `${yyyy}`;
    if (!dd) return `${yyyy}-${mm}`;
    return `${yyyy}-${mm}-${dd}`;
  }, [min, max]);

  const handleChange = (e) => {
    const masked = formatMasked(e.target.value);
    // Enviamos un objeto evento con target.value para mantener API de inputs controlados
    onChange?.({ target: { value: masked } });
  };

  const handleBlur = (e) => {
    // En blur, si quedó "YYYY" o "YYYY-MM", lo completamos/clamp a primer/último día válido
    let v = String(value || '');
    if (/^\d{4}$/.test(v)) {
      // Completar a primer día del año (o respetar min)
      const year = parseInt(v, 10);
      v = `${year}-01-01`;
    } else if (/^\d{4}-\d{2}$/.test(v)) {
      const [yStr, mStr] = v.split('-');
      const y = parseInt(yStr,10), m = parseInt(mStr,10);
      const dmax = lastDayOfMonth(y, m);
      v = `${yStr}-${mStr}-${pad2(1)}`; // podés cambiar a último día si preferís: pad2(dmax)
    }
    // Normalizar final otra vez
    const masked = formatMasked(v);
    if (masked !== value) onChange?.({ target: { value: masked } });
  };

  return (
    <div className={styles.field}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={styles.input}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        // Ayuda a navegadores/teclado numérico
        pattern="^\d{4}-\d{2}-\d{2}$"
        autoComplete="off"
      />
      {error && <div id={`${id}-err`} className={styles.error}>{error}</div>}
    </div>
  );
}
