'use client';
import React from 'react';

export default function SelectField({
  styles, id, label, value, onChange, options, disabled, error
}) {
  return (
    <div className={styles.field}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className={styles.select}
        value={value ?? ''}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      >
        {options.map((o) =>
          typeof o === 'string'
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>
        )}
      </select>
      {error && <div id={`${id}-err`} className={styles.error}>{error}</div>}
    </div>
  );
}
