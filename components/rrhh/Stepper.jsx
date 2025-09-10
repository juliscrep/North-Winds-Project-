'use client';
import React from 'react';
import styles from '../../Styles/stepper.module.css';
import {TX} from '@/app/api/rrhh/rrhh.texts';
export default function Stepper({ step = 1, sticky = true }) {
  const items = TX.stepper || ['Datos', 'Experiencia', 'Educación', 'Habilidades', 'Preferencias y Envío'];
  const total = items.length;
  const safeStep = Math.min(Math.max(step, 1), total);
  const pct = total > 1 ? ((safeStep - 1) / (total - 1)) * 100 : 0;

  return (
    <nav
      className={`${styles.wrap} ${sticky ? styles.sticky : ''}`}
      aria-label="Progreso del formulario"
    >
      {/* Desktop / tablet */}
      <div className={styles.desktop}>
        <div className={styles.track} aria-hidden>
          <div className={styles.progress} style={{ width: `${pct}%` }} />
        </div>

        <ul className={styles.list} role="list">
          {items.map((label, i) => {
            const n = i + 1;
            const state = n < safeStep ? 'done' : n === safeStep ? 'active' : 'todo';
            return (
              <li
                key={label}
                className={`${styles.item} ${styles[state]}`}
                aria-current={n === safeStep ? 'step' : undefined}
              >
                <span className={styles.dot}>{n}</span>
                <span className={styles.label}>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile compacto */}
      <div className={styles.mobile} role="status" aria-live="polite">
        <div className={styles.mobileTop}>
          <span className={styles.mobileStep}>
            {safeStep}<span className={styles.total}>/{total}</span>
          </span>
          <span className={styles.mobileLabel}>{items[safeStep - 1]}</span>
        </div>
        <div className={styles.mobileBar} aria-hidden>
          <div className={styles.mobileProgress} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </nav>
  );
}
