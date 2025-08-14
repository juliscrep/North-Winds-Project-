// /components/rrhh/manual/sections/EducationSection.jsx
'use client';
import React, { useState } from 'react';
import {TX} from '@/app/api/rrhh/rrhh.texts';
import InputField from '../../ui/InputField';
import DateField from '../../ui/DateField';

const blankEdu = () => ({ institution:'', degree:'', field:'', start:'', end:'', status:'' });
const blankCert = () => ({ name:'', issuer:'', issued:'', expires:'', credentialId:'', url:'' });

function fmtDate(d){
  if (!d) return '';
  const dd = new Date(d);
  if (isNaN(dd)) return d;
  return dd.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
}
function rangeText(s, e){
  if (s || e){
    return `${fmtDate(s)} — ${fmtDate(e)}`.replace(/^ — /,'').replace(/ — $/,'');
  }
  return '';
}

export default function EducationSection({
  styles, education, certifications,
  pushEdu, updateEdu, removeEdu,
  pushCert, updateCert, removeCert,
  disabled, errors
}) {
  const [dEdu, setDEdu] = useState(blankEdu());
  const [dCert, setDCert] = useState(blankCert());

  const [editIdx, setEditIdx] = useState(-1);
  const [editDraft, setEditDraft] = useState(blankEdu());

  const [editCertIdx, setEditCertIdx] = useState(-1);
  const [editCertDraft, setEditCertDraft] = useState(blankCert());

  const startEditEdu = (i) => { setEditIdx(i); setEditDraft(education[i] || blankEdu()); };
  const cancelEditEdu = () => { setEditIdx(-1); setEditDraft(blankEdu()); };
  const saveEditEdu = (i) => { updateEdu(i, editDraft); cancelEditEdu(); };

  const startEditCert = (i) => { setEditCertIdx(i); setEditCertDraft(certifications[i] || blankCert()); };
  const cancelEditCert = () => { setEditCertIdx(-1); setEditCertDraft(blankCert()); };
  const saveEditCert = (i) => { updateCert(i, editCertDraft); cancelEditCert(); };

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <label>{TX.labels.education}</label>
        <div className={styles.hint}>{TX.hints.eduIntro}</div>
      </div>

      {/* Educación existente */}
      {education?.map((e, idx)=> {
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
                value={editDraft.institution ?? ''} onChange={(ev)=>setEditDraft({...editDraft, institution:ev.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`degree-${idx}`} label={TX.labels.degree}
                value={editDraft.degree ?? ''} onChange={(ev)=>setEditDraft({...editDraft, degree:ev.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`field-${idx}`} label={TX.labels.field}
                value={editDraft.field ?? ''} onChange={(ev)=>setEditDraft({...editDraft, field:ev.target.value})} disabled={disabled}/>
              <DateField styles={styles} id={`estart-${idx}`} label={TX.labels.eduStart}
                value={editDraft.start ?? ''} onChange={(ev)=>setEditDraft({...editDraft, start:ev.target.value})} disabled={disabled}
                error={errors[`edu-${idx}-start`]}
              />
              <DateField styles={styles} id={`eend-${idx}`} label={TX.labels.eduEnd}
                value={editDraft.end ?? ''} onChange={(ev)=>setEditDraft({...editDraft, end:ev.target.value})} disabled={disabled}
                error={errors[`edu-${idx}-end`] || errors[`edu-${idx}-order`]}
              />
              <InputField styles={styles} id={`status-${idx}`} label={TX.labels.status}
                placeholder={TX.placeholders.status} value={editDraft.status ?? ''}
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
          <DateField styles={styles} id="estart-new" label={TX.labels.eduStart}
            value={dEdu.start} onChange={(e)=>setDEdu({...dEdu, start:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="eend-new" label={TX.labels.eduEnd}
            value={dEdu.end} onChange={(e)=>setDEdu({...dEdu, end:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="status-new" label={TX.labels.status}
            placeholder={TX.placeholders.status} value={dEdu.status}
            onChange={(e)=>setDEdu({...dEdu, status:e.target.value})} disabled={disabled}/>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={()=>{ pushEdu(dEdu); setDEdu(blankEdu()); }} disabled={disabled}>
            {TX.buttons.addEducation}
          </button>
        </div>
      </div>

      {/* Certificaciones */}
      <div className={styles.field} style={{marginTop:8}}>
        <label>{TX.labels.certifications}</label>
        <div className={styles.hint}>{TX.hints.certIntro}</div>
      </div>

      {certifications?.map((c, idx)=> {
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
                <button type="button" className={styles.btnGhost} onClick={()=>setEditCertIdx(idx)} disabled={disabled}>
                  {TX.buttons.edit}
                </button>
                <button type="button" className={styles.btnGhost} onClick={()=>removeCert(idx)} disabled={disabled}>
                  {TX.buttons.remove}
                </button>
              </div>
            </div>
          );
        }

        // Edit cert
        return (
          <div key={idx} className={styles.card} style={{ padding: 14 }}>
            <div className={styles.grid2}>
              <InputField
                styles={styles}
                id={`cname-${idx}`}
                label={TX.labels.certName}
                value={editCertDraft.name ?? ''}
                onChange={(e) => setEditCertDraft({ ...editCertDraft, name: e.target.value })}
                disabled={disabled}
              />
              <InputField
                styles={styles}
                id={`issuer-${idx}`}
                label={TX.labels.issuer}
                value={editCertDraft.issuer ?? ''}
                onChange={(e) => setEditCertDraft({ ...editCertDraft, issuer: e.target.value })}
                disabled={disabled}
              />
              <DateField
                styles={styles}
                id={`issued-${idx}`}
                label={TX.labels.issued}
                value={editCertDraft.issued ?? ''}
                onChange={(e) => setEditCertDraft({ ...editCertDraft, issued: e.target.value })}
                disabled={disabled}
                error={errors[`cert-${idx}-issued`]}
              />
              <DateField
                styles={styles}
                id={`expires-${idx}`}
                label={TX.labels.expires}
                value={editCertDraft.expires ?? ''}
                onChange={(e) => setEditCertDraft({ ...editCertDraft, expires: e.target.value })}
                disabled={disabled}
                error={errors[`cert-${idx}-expires`] || errors[`cert-${idx}-order`]}
                // Si querés permitir expiración futura, añadí: max={undefined}
              />
              <InputField
                styles={styles}
                id={`cred-${idx}`}
                label={TX.labels.credentialId}
                placeholder={TX.placeholders.credentialId}
                value={editCertDraft.credentialId ?? ''}
                onChange={(e) => setEditCertDraft({ ...editCertDraft, credentialId: e.target.value })}
                disabled={disabled}
              />
              <InputField
                styles={styles}
                id={`curl-${idx}`}
                label={TX.labels.url}
                placeholder={TX.placeholders.url}
                value={editCertDraft.url ?? ''}
                onChange={(e) => setEditCertDraft({ ...editCertDraft, url: e.target.value })}
                disabled={disabled}
              />
            </div>

            <div className={styles.row} style={{ marginTop: 10, gap: 10, justifyContent: 'flex-end' }}>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={cancelEditCert}  // ← con k
                disabled={disabled}
              >
                {TX.buttons.cancel}
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={() => saveEditCert(idx)}  // ← con k
                disabled={disabled}
              >
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
          <DateField styles={styles} id="issued-new" label={TX.labels.issued}
            value={dCert.issued} onChange={(e)=>setDCert({...dCert, issued:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="expires-new" label={TX.labels.expires}
            value={dCert.expires} onChange={(e)=>setDCert({...dCert, expires:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="cred-new" label={TX.labels.credentialId}
            placeholder={TX.placeholders.credentialId} value={dCert.credentialId} onChange={(e)=>setDCert({...dCert, credentialId:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="curl-new" label={TX.labels.url}
            placeholder={TX.placeholders.url} value={dCert.url} onChange={(e)=>setDCert({...dCert, url:e.target.value})} disabled={disabled}/>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={()=>{ pushCert(dCert); setDCert(blankCert()); }} disabled={disabled}>
            {TX.buttons.addCert}
          </button>
        </div>
      </div>
    </div>
  );
}
