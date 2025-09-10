'use client';
import React from 'react';
import styles from '../../app/rrhh/rrhh.module.css';

export default function TabSwitcher({ active, onChange }) {
  return (
    <div className={styles.tabs}>
      <button
        type="button"
        className={`${styles.tabBtn} ${active === 'upload' ? styles.tabActive : ''}`}
        onClick={() => onChange('upload')}
      >
        Subir CV (PDF/DOCX)
      </button>
      <button
        type="button"
        className={`${styles.tabBtn} ${active === 'manual' ? styles.tabActive : ''}`}
        onClick={() => onChange('manual')}
      >
        Completar manual
      </button>
    </div>
  );
}
