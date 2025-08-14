'use client';
import React from 'react';
import styles from '../../app/rrhh/rrhh.module.css';

export default function Stepper({ step = 1 }) {
  const items = ['Datos', 'Revisión', 'Envío'];
  return (
    <div className={styles.stepper}>
      {items.map((label, i) => {
        const idx = i + 1;
        const active = idx <= step;
        return (
          <div key={label} className={styles.step}>
            <div className={`${styles.dot} ${active ? styles.dotActive : ''}`}>{idx}</div>
            <span style={{ opacity: active ? 1 : 0.7 }}>{label}</span>
            {i < items.length - 1 && (
              <div className={`${styles.bar} ${step > idx ? styles.barActive : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
