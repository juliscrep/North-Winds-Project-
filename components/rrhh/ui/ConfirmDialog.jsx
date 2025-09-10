'use client';
import React from 'react';
import styles from '../../../Styles/confirm.module.css';

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  disabled
}) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-labelledby="cd-title">
      <div className={styles.card}>
        <h3 id="cd-title" className={styles.title}>{title}</h3>
        <p className={styles.msg}>{message}</p>
        <div className={styles.row}>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={onCancel}
            disabled={disabled}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={onConfirm}
            disabled={disabled}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
