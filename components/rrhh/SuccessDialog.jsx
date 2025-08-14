'use client';
import React from 'react';
import styles from '../../app/rrhh/rrhh.module.css';

export default function SuccessDialog({ open, onClose, message }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)',
      display: 'grid', placeItems: 'center', zIndex: 50
    }}>
      <div className={styles.card} style={{ width: 520, maxWidth: '92vw' }}>
        <h3 style={{ margin: '0 0 8px' }}>¡Gracias por postularte!</h3>
        <p className={styles.hint} style={{ marginBottom: 12 }}>
          {message || 'Recibimos tu postulación. Si tu perfil coincide, te contactaremos.'}
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className={styles.btnPrimary} onClick={onClose}>Aceptar</button>
        </div>
      </div>
    </div>
  );
}
