'use client';
import React from 'react';

export default function CheckboxInline({ styles, id, label, checked, onChange, disabled }) {
  return (
    <div className={`${styles.row} ${styles.field}`}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
      <label htmlFor={id} className={styles.hint}>{label}</label>
    </div>
  );
}
