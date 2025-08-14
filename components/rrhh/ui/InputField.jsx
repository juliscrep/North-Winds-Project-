'use client';
import React from 'react';

export default function InputField({
  styles, id, label, type='text', value, onChange,
  placeholder, disabled, error, autoComplete, className, ...rest
}) {
  return (
    <div className={styles.field}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        className={className || styles.input}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        {...rest}
      />
      {error && <div id={`${id}-err`} className={styles.error}>{error}</div>}
    </div>
  );
}
