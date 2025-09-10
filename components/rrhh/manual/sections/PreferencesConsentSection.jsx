'use client';
import React, { useState } from 'react';
import {TX} from '@/app/api/rrhh/rrhh.texts';
import InputField from '../../ui/InputField';
import Link from '@mui/material/Link';
import DateField from '../../ui/DateField';
import { isoToday } from '../../../../lib/rrhhValidators';
import PrivacyPolicyDialog from '../../ui/PrivacyPolicyDialog';

function fmtDate(d){
  if (!d) return '';
  const dd = new Date(d);
  if (isNaN(dd)) return d;
  return dd.toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' });
}

export default function PreferencesConsentSection({
  styles, step, prev, next, sending, errors, success, fields, setField
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(fields.preferences || {});
  const [openPP, setOpenPP] = useState(false); // 🔹 estado del modal

  const enterEdit = () => { setDraft(fields.preferences || {}); setEditing(true); };
  const cancelEdit = () => { setEditing(false); };
  const saveEdit = () => {
    ['contract','availability','salary','schedule','relocation','travel'].forEach(k =>
      setField(`preferences.${k}`, draft[k] || '')
    );
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <div className={styles.card} style={{ marginTop: 14, padding:14 }}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionTitle}>Preferencias</div>
            <button type="button" className={styles.btnGhost} onClick={enterEdit} disabled={sending}>
              {TX.buttons.edit}
            </button>
          </div>

          <div className={styles.readList}>
            <div><strong>{TX.labels.contract}:</strong> {fields.preferences.contract || '—'}</div>
            <div><strong>{TX.labels.availability}:</strong> {fmtDate(fields.preferences.availability) || '—'}</div>
            <div><strong>{TX.labels.salary}:</strong> {fields.preferences.salary || '—'}</div>
            <div><strong>{TX.labels.schedule}:</strong> {fields.preferences.schedule || '—'}</div>
            <div><strong>{TX.labels.relocation}:</strong> {fields.preferences.relocation || '—'}</div>
            <div><strong>{TX.labels.travel}:</strong> {fields.preferences.travel || '—'}</div>
          </div>

          {errors.availability && <div className={styles.error} style={{marginTop:8}}>{errors.availability}</div>}
        </div>
      ) : (
        <div className={styles.card} style={{ marginTop: 14, padding:14 }}>
          <div className={styles.grid2}>
            <InputField styles={styles} id="contract" label={TX.labels.contract}
              placeholder={TX.placeholders.contract}
              value={draft.contract ?? ''} onChange={(e)=>setDraft({...draft, contract:e.target.value})}
              disabled={sending}
            />
            <DateField styles={styles} id="availability" label={TX.labels.availability}
              min={isoToday()} max="2099-12-31"
              value={draft.availability ?? ''} onChange={(e)=>setDraft({...draft, availability:e.target.value})}
              disabled={sending} error={errors.availability}
            />
            <InputField styles={styles} id="salary" label={TX.labels.salary}
              placeholder={TX.placeholders.salary}
              value={draft.salary ?? ''} onChange={(e)=>setDraft({...draft, salary:e.target.value})}
              disabled={sending}
            />
            <InputField styles={styles} id="schedule" label={TX.labels.schedule}
              placeholder={TX.placeholders.schedule}
              value={draft.schedule ?? ''} onChange={(e)=>setDraft({...draft, schedule:e.target.value})}
              disabled={sending}
            />
            <InputField styles={styles} id="relocation" label={TX.labels.relocation}
              placeholder={TX.placeholders.relocation}
              value={draft.relocation ?? ''} onChange={(e)=>setDraft({...draft, relocation:e.target.value})}
              disabled={sending}
            />
            <InputField styles={styles} id="travel" label={TX.labels.travel}
              placeholder={TX.placeholders.travel}
              value={draft.travel ?? ''} onChange={(e)=>setDraft({...draft, travel:e.target.value})}
              disabled={sending}
            />
          </div>

          <div className={styles.row} style={{ marginTop:10, gap:10, justifyContent:'flex-end', flexWrap:'wrap' }}>
            <button type="button" className={styles.btnGhost} onClick={cancelEdit} disabled={sending}>
              {TX.buttons.cancel}
            </button>
            <button type="button" className={styles.btnPrimary} onClick={saveEdit} disabled={sending}>
              {TX.buttons.save}
            </button>
          </div>
        </div>
      )}
      <div className={`${styles.row} ${styles.field}`} style={{ alignItems:'center', gap:8 }}>
        <input
          id="consent"
          type="checkbox"
          checked={fields.consent}
          onChange={(e)=>setField('consent', e.target.checked)}
          disabled={sending}
        />
        <label htmlFor="consent" className={styles.hint} style={{ margin: 0 }}>
          {TX.labels.consent || 'Acepto las'}{' '}
          <Link
            component="button"
            type="button"
            underline="always"
            sx={{ fontWeight: 600 }}
            onClick={() => setOpenPP(true)}
            aria-haspopup="dialog"
          >
            Políticas de Privacidad
          </Link>
          .
        </label>
      </div>

      {errors.consent && <div className={styles.error}>{errors.consent}</div>}
      {errors.api && <div className={styles.error}>{errors.api}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <PrivacyPolicyDialog open={openPP} onClose={() => setOpenPP(false)} />
    </>
  );
}
