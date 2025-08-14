// /components/rrhh/manual/sections/PreferencesConsentSection.jsx
'use client';
import React from 'react';

export default function PreferencesConsentSection({
  styles, step, setStep, prev, next, sending, errors, success, fields, setField
}) {
  return (
    <>
      <div className={styles.card} style={{ marginTop: 14 }}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Tipo de contrato</label>
            <input className={styles.input} placeholder="Full-time / Part-time / Por proyecto"
                   value={fields.preferences.contract}
                   onChange={(e)=>setField('preferences.contract', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Fecha de disponibilidad</label>
            <input type="date" className={styles.input}
                   value={fields.preferences.availability}
                   onChange={(e)=>setField('preferences.availability', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Pretensión salarial (opcional)</label>
            <input className={styles.input} placeholder="Ej: 2.000.000 netos ARS"
                   value={fields.preferences.salary}
                   onChange={(e)=>setField('preferences.salary', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Horarios/Turnos</label>
            <input className={styles.input} placeholder="Ej: Rotativos, 14x14, fines de semana"
                   value={fields.preferences.schedule}
                   onChange={(e)=>setField('preferences.schedule', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Reubicación (Sí/No)</label>
            <input className={styles.input}
                   value={fields.preferences.relocation}
                   onChange={(e)=>setField('preferences.relocation', e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Viajes (Sí/No)</label>
            <input className={styles.input}
                   value={fields.preferences.travel}
                   onChange={(e)=>setField('preferences.travel', e.target.value)} />
          </div>
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: 12 }}>
        <div className={`${styles.row} ${styles.field}`}>
          <input
            id="consent"
            type="checkbox"
            checked={fields.consent}
            onChange={(e)=>setField('consent', e.target.checked)}
          />
        </div>
        <label htmlFor="consent" className={styles.hint} style={{marginTop:-6}}>
          Acepto la política de privacidad
        </label>

        {errors.consent && <div className={styles.error}>{errors.consent}</div>}
        {errors.api && <div className={styles.error}>{errors.api}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.row} style={{ gap: 10 }}>
          {step > 1 && <button type="button" className={styles.btnGhost} onClick={prev}>Atrás</button>}
          {step < 4 && <button type="button" className={styles.btnPrimary} onClick={next}>Siguiente</button>}
          {step === 4 && (
            <button className={styles.btnPrimary} disabled={sending}>
              {sending ? 'Enviando…' : 'Enviar postulación'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
