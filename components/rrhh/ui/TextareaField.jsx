'use client';
import React from 'react';

export default function TextareaField({
  styles, id, label, value, onChange, placeholder, disabled, error, rows
}) {
  return (
    <div className={styles.field}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && <div id={`${id}-err`} className={styles.error}>{error}</div>}
    </div>
  );
}
