'use client';
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import styles from '../../../Styles/toast.module.css';

const ToastCtx = createContext({
  pushToast: () => {},
  clearToasts: () => {},
});

let idSeq = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  }, []);

  const pushToast = useCallback(({ type = 'info', message = '', duration = 3800 }) => {
    const id = ++idSeq;
    setToasts((prev) => [...prev, { id, type, message }]);
    if (duration !== Infinity) {
      setTimeout(() => remove(id), duration);
    }
  }, [remove]);

  const clearToasts = useCallback(() => setToasts([]), []);

  const value = useMemo(() => ({ pushToast, clearToasts }), [pushToast, clearToasts]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className={styles.container} aria-live="polite" aria-atomic="true">
        {toasts.map(t => (
          <div key={t.id} className={`${styles.toast} ${styles[t.type]}`} role="status">
            <div className={styles.msg}>{t.message}</div>
            <button
              type="button"
              className={styles.close}
              onClick={() => remove(t.id)}
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
