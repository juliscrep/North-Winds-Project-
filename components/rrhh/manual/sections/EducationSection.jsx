'use client';
import React, { useState } from 'react';
import { TX } from '@/app/api/rrhh/rrhh.texts';
import InputField from '../../ui/InputField';
import DateField from '../../ui/DateField';
import { isoToday } from '../../../../lib/rrhhValidators';

// Helpers fecha
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const isoYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return iso(d);
};

const MIN_YEAR = '1960-01-01';
const blankEdu = () => ({ institution:'', degree:'', field:'', start:'', end:'', status:'' });
const blankCert = () => ({ name:'', issuer:'', issued:'', expires:'', credentialId:'', url:'' });

const norm = (s='') => s.trim().replace(/\s+/g, ' ');
const cap1 = (s='') => s ? s[0].toUpperCase() + s.slice(1) : '';

function fmtDate(d){
  if (!d) return '';
  const dd = new Date(d);
  if (isNaN(dd)) return d;
  return dd.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
}
function rangeText(s, e){
  if (s || e){
    return `${fmtDate(s)} — ${fmtDate(e)}`.replace(/^ — /,'').replace(/ — $/, '');
  }
  return '';
}

export default function EducationSection({
  styles, education, certifications,
  pushEdu, updateEdu, removeEdu,
  pushCert, updateCert, removeCert,
  disabled, errors = {}
}) {
  // Drafts (nuevo)
  const [dEdu, setDEdu] = useState(blankEdu());
  const [dCert, setDCert] = useState(blankCert());

  // Editar educación
  const [editIdx, setEditIdx] = useState(-1);
  const [editDraft, setEditDraft] = useState(blankEdu());

  // Editar certificación
  const [editCertIdx, setEditCertIdx] = useState(-1);
  const [editCertDraft, setEditCertDraft] = useState(blankCert());

  // ——— Educación: edición ———
  const startEditEdu = (i) => {
    const e = education[i] || blankEdu();
    setEditIdx(i);
    setEditDraft({
      institution: e.institution || '',
      degree:      e.degree || '',
      field:       e.field || '',
      start:       e.start || '',
      end:         e.end || '',
      status:      e.status || ''
    });
  };
  const cancelEditEdu = () => { setEditIdx(-1); setEditDraft(blankEdu()); };
  const saveEditEdu = (i) => {
    // normalizar y defaults
    const patch = {
      institution: cap1(norm(editDraft.institution)),
      degree:      cap1(norm(editDraft.degree)),
      field:       cap1(norm(editDraft.field)),
      start:       editDraft.start || '',
      end:         editDraft.end || '',
      status:      editDraft.end ? (editDraft.status || 'Finalizado') : (editDraft.status || 'En curso')
    };
    updateEdu(i, patch);
    cancelEditEdu();
  };

  // Cuando cambia el start en edición, ajusto min dinámico y limpio end si quedó "antes de start"
  const onEditStartChange = (idxVal) => (ev) => {
    const value = ev.target.value;
    setEditDraft((s) => {
      const next = { ...s, start: value };
      if (next.end && value && next.end < value) next.end = '';
      return next;
    });
  };

  // ——— Educación: agregar ———
  const addEdu = () => {
    const item = {
      institution: cap1(norm(dEdu.institution)),
      degree:      cap1(norm(dEdu.degree)),
      field:       cap1(norm(dEdu.field)),
      start:       dEdu.start || '',
      end:         dEdu.end || '',
      status:      dEdu.end ? (dEdu.status || 'Finalizado') : (dEdu.status || 'En curso')
    };
    // Reglas mínimas para no crear “vacíos”
    if (!item.institution && !item.degree) return; // pide al menos algo relevante
    // Si hay start y no hay end, dejamos “en curso”; si hay end < start, no pusheamos
    if (item.start && item.end && item.end < item.start) return;

    pushEdu(item);
    setDEdu(blankEdu());
  };

  // Cuando cambia el start en “nuevo”, limpiamos end si quedó “antes”
  const onNewStartChange = (ev) => {
    const value = ev.target.value;
    setDEdu((s) => {
      const next = { ...s, start: value };
      if (next.end && value && next.end < value) next.end = '';
      return next;
    });
  };

  // Min/Max dinámicos para END (edición / nuevo)
  const editEndMin = editDraft.start ? editDraft.start : MIN_YEAR;
  const newEndMin  = dEdu.start ? dEdu.start : MIN_YEAR;
  const PAST_MAX   = isoYesterday(); // “pasado” real (ayer)

  // ——— Certs: edición ———
  const startEditCert = (i) => {
    const c = certifications[i] || blankCert();
    setEditCertIdx(i);
    setEditCertDraft({
      name: c.name || '', issuer: c.issuer || '',
      issued: c.issued || '', expires: c.expires || '',
      credentialId: c.credentialId || '', url: c.url || ''
    });
  };
  const cancelEditCert = () => { setEditCertIdx(-1); setEditCertDraft(blankCert()); };
  const saveEditCert = (i) => {
    const patch = {
      name: cap1(norm(editCertDraft.name)),
      issuer: cap1(norm(editCertDraft.issuer)),
      issued: editCertDraft.issued || '',
      expires: editCertDraft.expires || '',
      credentialId: norm(editCertDraft.credentialId),
      url: norm(editCertDraft.url)
    };
    updateCert(i, patch);
    cancelEditCert();
  };

  // ——— Certs: agregar ———
  const addCert = () => {
    const c = {
      name: cap1(norm(dCert.name)),
      issuer: cap1(norm(dCert.issuer)),
      issued: dCert.issued || '',
      expires: dCert.expires || '',
      credentialId: norm(dCert.credentialId),
      url: norm(dCert.url)
    };
    if (!c.name && !c.issuer) return;
    // Si hay issued y expires, que no sean invertidas (de lo contrario, no agregamos)
    if (c.issued && c.expires && c.expires < c.issued) return;

    pushCert(c);
    setDCert(blankCert());
  };

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <label>{TX.labels.education}</label>
        <div className={styles.hint}>{TX.hints.eduIntro}</div>
      </div>

      {/* Educación existente */}
      {(education || []).map((e, idx)=> {
        const isEditing = editIdx === idx;
        if (!isEditing){
          const r = rangeText(e.start, e.end);
          return (
            <div key={idx} className={styles.card} style={{padding:14}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'baseline'}}>
                <div style={{fontWeight:700}}>
                  {e.degree || '—'} <span style={{opacity:.85, fontWeight:600}}>— {e.institution || '—'}</span>
                </div>
                <div style={{fontSize:12, color:'var(--text-300)'}}>{r}</div>
              </div>
              <div style={{marginTop:6, display:'flex', flexWrap:'wrap', gap:'10px 14px', fontSize:12, color:'var(--text-300)'}}>
                {e.field && <span>• {e.field}</span>}
                {e.status && <span>• {e.status}</span>}
              </div>

              {(errors[`edu-${idx}-start`] || errors[`edu-${idx}-end`] || errors[`edu-${idx}-order`]) && (
                <div className={styles.error} style={{marginTop:8}}>
                  {errors[`edu-${idx}-order`] || errors[`edu-${idx}-start`] || errors[`edu-${idx}-end`]}
                </div>
              )}

              <div className={styles.row} style={{marginTop:10, gap:10, justifyContent:'flex-end'}}>
                <button type="button" className={styles.btnGhost} onClick={()=>startEditEdu(idx)} disabled={disabled}>
                  {TX.buttons.edit}
                </button>
                <button type="button" className={styles.btnGhost} onClick={()=>removeEdu(idx)} disabled={disabled}>
                  {TX.buttons.remove}
                </button>
              </div>
            </div>
          );
        }

        // Edición educación
        return (
          <div key={idx} className={styles.card} style={{padding:14}}>
            <div className={styles.grid2}>
              <InputField styles={styles} id={`inst-${idx}`} label={TX.labels.institution}
                value={editDraft.institution} onChange={(ev)=>setEditDraft({...editDraft, institution:ev.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`degree-${idx}`} label={TX.labels.degree}
                value={editDraft.degree} onChange={(ev)=>setEditDraft({...editDraft, degree:ev.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`field-${idx}`} label={TX.labels.field}
                value={editDraft.field} onChange={(ev)=>setEditDraft({...editDraft, field:ev.target.value})} disabled={disabled}/>
              <DateField styles={styles} id={`estart-${idx}`} min={MIN_YEAR} max={isoToday()} label={TX.labels.eduStart}
                value={editDraft.start} onChange={onEditStartChange(idx)} disabled={disabled}
                error={errors[`edu-${idx}-start`]}
              />
              <DateField styles={styles} id={`eend-${idx}`} label={TX.labels.eduEnd}
                min={editEndMin} max={PAST_MAX}
                value={editDraft.end} onChange={(ev)=>setEditDraft({...editDraft, end:ev.target.value})} disabled={disabled}
                error={errors[`edu-${idx}-end`] || errors[`edu-${idx}-order`]}
              />
              <InputField styles={styles} id={`status-${idx}`} label={TX.labels.status}
                placeholder={TX.placeholders.status} value={editDraft.status}
                onChange={(ev)=>setEditDraft({...editDraft, status:ev.target.value})} disabled={disabled}/>
            </div>
            <div className={styles.row} style={{marginTop:10, gap:10, justifyContent:'flex-end'}}>
              <button type="button" className={styles.btnGhost} onClick={cancelEditEdu} disabled={disabled}>
                {TX.buttons.cancel}
              </button>
              <button type="button" className={styles.btnPrimary} onClick={()=>saveEditEdu(idx)} disabled={disabled}>
                {TX.buttons.save}
              </button>
            </div>
          </div>
        );
      })}

      {/* Agregar educación */}
      <div className={styles.card} style={{padding:14}}>
        <div className={styles.grid2}>
          <InputField styles={styles} id="inst-new" label={TX.labels.institution}
            value={dEdu.institution} onChange={(e)=>setDEdu({...dEdu, institution:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="degree-new" label={TX.labels.degree}
            value={dEdu.degree} onChange={(e)=>setDEdu({...dEdu, degree:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="field-new" label={TX.labels.field}
            value={dEdu.field} onChange={(e)=>setDEdu({...dEdu, field:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="estart-new" label={TX.labels.eduStart} min={MIN_YEAR} max={isoToday()}
            value={dEdu.start} onChange={onNewStartChange} disabled={disabled}/>
          <DateField styles={styles} id="eend-new" label={TX.labels.eduEnd}
            min={newEndMin} max={isoYesterday()}
            value={dEdu.end} onChange={(e)=>setDEdu({...dEdu, end:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="status-new" label={TX.labels.status}
            placeholder={TX.placeholders.status} value={dEdu.status}
            onChange={(e)=>setDEdu({...dEdu, status:e.target.value})} disabled={disabled}/>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={addEdu} disabled={disabled}>
            {TX.buttons.addEducation}
          </button>
        </div>
      </div>

      {/* Certificaciones */}
      <div className={styles.field} style={{marginTop:8}}>
        <label>{TX.labels.certifications}</label>
        <div className={styles.hint}>{TX.hints.certIntro}</div>
      </div>

      {(certifications || []).map((c, idx)=> {
        const isEditing = editCertIdx === idx;
        if (!isEditing){
          return (
            <div key={idx} className={styles.card} style={{padding:14}}>
              <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'baseline'}}>
                <div style={{fontWeight:700}}>
                  {c.name || '—'} <span style={{opacity:.85, fontWeight:600}}>— {c.issuer || '—'}</span>
                </div>
                <div style={{fontSize:12, color:'var(--text-300)'}}>
                  {fmtDate(c.issued) || '—'}{c.expires ? ` · expira ${fmtDate(c.expires)}` : ''}
                </div>
              </div>
              <div style={{marginTop:6, display:'flex', flexWrap:'wrap', gap:'10px 14px', fontSize:12, color:'var(--text-300)'}}>
                {c.credentialId && <span>• ID {c.credentialId}</span>}
                {c.url && <span>• {c.url}</span>}
              </div>

              {(errors[`cert-${idx}-issued`] || errors[`cert-${idx}-expires`] || errors[`cert-${idx}-order`]) && (
                <div className={styles.error} style={{marginTop:8}}>
                  {errors[`cert-${idx}-order`] || errors[`cert-${idx}-issued`] || errors[`cert-${idx}-expires`]}
                </div>
              )}

              <div className={styles.row} style={{marginTop:10, gap:10, justifyContent:'flex-end'}}>
                <button type="button" className={styles.btnGhost} onClick={()=>startEditCert(idx)} disabled={disabled}>
                  {TX.buttons.edit}
                </button>
                <button type="button" className={styles.btnGhost} onClick={()=>removeCert(idx)} disabled={disabled}>
                  {TX.buttons.remove}
                </button>
              </div>
            </div>
          );
        }

        // Edición cert
        return (
          <div key={idx} className={styles.card} style={{ padding: 14 }}>
            <div className={styles.grid2}>
              <InputField styles={styles} id={`cname-${idx}`} label={TX.labels.certName}
                value={editCertDraft.name} onChange={(e)=>setEditCertDraft({...editCertDraft, name:e.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`issuer-${idx}`} label={TX.labels.issuer}
                value={editCertDraft.issuer} onChange={(e)=>setEditCertDraft({...editCertDraft, issuer:e.target.value})} disabled={disabled}/>
              <DateField styles={styles} id={`issued-${idx}`} label={TX.labels.issued}
                value={editCertDraft.issued} onChange={(e)=>setEditCertDraft({...editCertDraft, issued:e.target.value})}
                disabled={disabled} max={isoToday()} min={MIN_YEAR}
                error={errors[`cert-${idx}-issued`]}
              />
              <DateField styles={styles} id={`expires-${idx}`} label={TX.labels.expires}
                value={editCertDraft.expires} onChange={(e)=>setEditCertDraft({...editCertDraft, expires:e.target.value})}
                disabled={disabled} /* expiración puede ser futura, sin max */
                error={errors[`cert-${idx}-expires`] || errors[`cert-${idx}-order`]}
              />
              <InputField styles={styles} id={`cred-${idx}`} label={TX.labels.credentialId}
                placeholder={TX.placeholders.credentialId} value={editCertDraft.credentialId}
                onChange={(e)=>setEditCertDraft({...editCertDraft, credentialId:e.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`curl-${idx}`} label={TX.labels.url}
                placeholder={TX.placeholders.url} value={editCertDraft.url}
                onChange={(e)=>setEditCertDraft({...editCertDraft, url:e.target.value})} disabled={disabled}/>
            </div>

            <div className={styles.row} style={{ marginTop: 10, gap: 10, justifyContent: 'flex-end' }}>
              <button type="button" className={styles.btnGhost} onClick={cancelEditCert} disabled={disabled}>
                {TX.buttons.cancel}
              </button>
              <button type="button" className={styles.btnPrimary} onClick={()=>saveEditCert(idx)} disabled={disabled}>
                {TX.buttons.save}
              </button>
            </div>
          </div>
        );
      })}

      {/* Agregar cert */}
      <div className={styles.card} style={{padding:14}}>
        <div className={styles.grid2}>
          <InputField styles={styles} id="cname-new" label={TX.labels.certName}
            value={dCert.name} onChange={(e)=>setDCert({...dCert, name:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="issuer-new" label={TX.labels.issuer}
            value={dCert.issuer} onChange={(e)=>setDCert({...dCert, issuer:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="issued-new" label={TX.labels.issued} min={MIN_YEAR} max={isoToday()}
            value={dCert.issued} onChange={(e)=>setDCert({...dCert, issued:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="expires-new" label={TX.labels.expires}
            value={dCert.expires} onChange={(e)=>setDCert({...dCert, expires:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="cred-new" label={TX.labels.credentialId}
            placeholder={TX.placeholders.credentialId} value={dCert.credentialId}
            onChange={(e)=>setDCert({...dCert, credentialId:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="curl-new" label={TX.labels.url}
            placeholder={TX.placeholders.url} value={dCert.url}
            onChange={(e)=>setDCert({...dCert, url:e.target.value})} disabled={disabled}/>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={addCert} disabled={disabled}>
            {TX.buttons.addCert}
          </button>
        </div>
      </div>
    </div>
  );
}
