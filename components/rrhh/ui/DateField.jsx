'use client';
import React from 'react';

export default function DateField({
  styles, id, label, value = '', onChange,
  min, max, disabled, error
}) {
  return (
    <div className={styles.field}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={styles.input}
        type="date"
        value={value || ''}
        min={min}
        max={max}
        onChange={(e) => onChange?.({ target: { value: e.target.value } })}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && <div id={`${id}-err`} className={styles.error}>{error}</div>}
    </div>
  );
}
