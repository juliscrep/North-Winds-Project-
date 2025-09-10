'use client';
import React, { useState } from 'react';
import InputField from '../../ui/InputField';
import TextareaField from '../../ui/TextareaField';
import CheckboxInline from '../../ui/CheckboxInline';
import DateField from '../../ui/DateField';
import {TX} from '@/app/api/rrhh/rrhh.texts';
import { isoToday } from '../../../../lib/rrhhValidators';

const blank = () => ({
  company:'', role:'', start:'', end:'', current:false,
  location:'', area:'', equipment:'', description:'', achievements:''
});

function fmtDate(d){
  if (!d) return '';
  const dd = new Date(d);
  if (isNaN(dd)) return d;
  return dd.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
}
function rangeText(s, e, cur){
  if (s || e || cur){
    return `${fmtDate(s)} — ${cur ? TX.misc.currentNow : fmtDate(e)}`.replace(/^ — /,'').replace(/ — $/,'');
  }
  return '';
}

export default function ExperienceSection({ styles, items, pushItem, updateItem, removeItem, disabled, errors }) {
  const [draft, setDraft] = useState(blank());
  const [editIndex, setEditIndex] = useState(-1);
  const [editDraft, setEditDraft] = useState(blank());

  const add = () => {
    if (!draft.company || !draft.role) return;
    // la validación de fechas adicional se hace en el wizard (step 2),
    // acá simplemente prevenimos agregar si falta empresa/puesto
    pushItem(draft);
    setDraft(blank());
  };

  const startEdit = (idx) => { setEditIndex(idx); setEditDraft(items[idx] || blank()); };
  const cancelEdit = () => { setEditIndex(-1); setEditDraft(blank()); };
  const saveEdit = (idx) => { updateItem(idx, editDraft); cancelEdit(); };

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <label>{TX.labels.experience}</label>
        <div className={styles.hint}>{TX.hints.expIntro}</div>
      </div>

      {items?.map((x, idx) => {
        const isEditing = editIndex === idx;
        const r = rangeText(x.start, x.end, x.current);

        if (!isEditing) {
          return (
            <div key={idx} className={styles.card} style={{ padding: 14 }}>
              <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'baseline'}}>
                <div style={{fontWeight:700}}>
                  {x.role || '—'} <span style={{opacity:.85, fontWeight:600}}>— {x.company || '—'}</span>
                </div>
                {r && <div style={{fontSize:12, color:'var(--text-300)'}}>{r}</div>}
              </div>
              <div style={{marginTop:6, display:'flex', flexWrap:'wrap', gap:'10px 14px', fontSize:12, color:'var(--text-300)'}}>
                {x.location && <span>📍 {x.location}</span>}
                {x.area && <span>• {x.area}</span>}
                {x.equipment && <span>• {x.equipment}</span>}
              </div>
              {x.description && <p style={{marginTop:8}}>{x.description}</p>}
              {x.achievements && <p style={{marginTop:6}}><em>{TX.labels.achievements}:</em> {x.achievements}</p>}

              {/* errores del wizard (fechas) */}
              {(errors[`exp-${idx}-start`] || errors[`exp-${idx}-end`] || errors[`exp-${idx}-order`]) && (
                <div className={styles.error} style={{marginTop:8}}>
                  {errors[`exp-${idx}-order`] || errors[`exp-${idx}-start`] || errors[`exp-${idx}-end`]}
                </div>
              )}

              <div className={styles.row} style={{ marginTop:10, gap:10, justifyContent:'flex-end' }}>
                <button type="button" className={styles.btnGhost} onClick={()=>startEdit(idx)} disabled={disabled}>
                  {TX.buttons.edit}
                </button>
                <button type="button" className={styles.btnGhost} onClick={()=>removeItem(idx)} disabled={disabled}>
                  {TX.buttons.remove}
                </button>
              </div>
            </div>
          );
        }

        return (
          <div key={idx} className={styles.card} style={{ padding: 14 }}>
            <div className={styles.grid2}>
              <InputField styles={styles} id={`company-${idx}`} label={TX.labels.company}
                value={editDraft.company} onChange={(e)=>setEditDraft({...editDraft, company:e.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`role-${idx}`} label={TX.labels.role}
                value={editDraft.role} onChange={(e)=>setEditDraft({...editDraft, role:e.target.value})} disabled={disabled}/>
              <DateField styles={styles} id={`start-${idx}`} label={TX.labels.start}
                value={editDraft.start} onChange={(e)=>setEditDraft({...editDraft, start:e.target.value})} disabled={disabled}
                error={errors[`exp-${idx}-start`]}
              />
              <DateField styles={styles} id={`end-${idx}`} label={TX.labels.end} min={isoToday()} max="2099-12-31"
                value={editDraft.end} onChange={(e)=>setEditDraft({...editDraft, end:e.target.value})}
                disabled={editDraft.current || disabled}
                error={errors[`exp-${idx}-end`] || errors[`exp-${idx}-order`]}
              />
              <CheckboxInline styles={styles} id={`curr-${idx}`} label={TX.labels.current}
                checked={editDraft.current}
                onChange={(e)=>setEditDraft({...editDraft, current:e.target.checked, end: e.target.checked ? '' : editDraft.end})}
                disabled={disabled}
              />
              <InputField styles={styles} id={`loc-${idx}`} label={TX.labels.workLocation}
                value={editDraft.location} onChange={(e)=>setEditDraft({...editDraft, location:e.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`area-${idx}`} label={TX.labels.area}
                value={editDraft.area} onChange={(e)=>setEditDraft({...editDraft, area:e.target.value})} disabled={disabled}/>
              <InputField styles={styles} id={`equip-${idx}`} label={TX.labels.equipment}
                placeholder={TX.placeholders.equipment} value={editDraft.equipment}
                onChange={(e)=>setEditDraft({...editDraft, equipment:e.target.value})} disabled={disabled}/>
              <TextareaField styles={styles} id={`desc-${idx}`} label={TX.labels.responsibilities}
                value={editDraft.description} onChange={(e)=>setEditDraft({...editDraft, description:e.target.value})} disabled={disabled}/>
              <TextareaField styles={styles} id={`ach-${idx}`} label={TX.labels.achievements}
                value={editDraft.achievements} onChange={(e)=>setEditDraft({...editDraft, achievements:e.target.value})} disabled={disabled}/>
            </div>

            <div className={styles.row} style={{ marginTop:10, gap:10, justifyContent:'flex-end' }}>
              <button type="button" className={styles.btnGhost} onClick={cancelEdit} disabled={disabled}>
                {TX.buttons.cancel}
              </button>
              <button type="button" className={styles.btnPrimary} onClick={()=>saveEdit(idx)} disabled={disabled}>
                {TX.buttons.save}
              </button>
            </div>
          </div>
        );
      })}

      {/* Agregar nueva */}
      <div className={styles.card} style={{ padding: 14 }}>
        <div className={styles.grid2}>
          <InputField styles={styles} id="company-new" label={TX.labels.company}
            value={draft.company} onChange={(e)=>setDraft({...draft, company:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="role-new" label={TX.labels.role}
            value={draft.role} onChange={(e)=>setDraft({...draft, role:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="start-new" label={TX.labels.start}
            value={draft.start} onChange={(e)=>setDraft({...draft, start:e.target.value})} disabled={disabled}/>
          <DateField styles={styles} id="end-new" label={TX.labels.end} min={isoToday()} max="2099-12-31"
            value={draft.end} onChange={(e)=>setDraft({...draft, end:e.target.value})} disabled={draft.current || disabled}/>
          <CheckboxInline styles={styles} id="curr-new" label={TX.labels.current}
            checked={draft.current}
            onChange={(e)=>setDraft({...draft, current:e.target.checked, end: e.target.checked ? '' : draft.end})}
            disabled={disabled}
          />
          <InputField styles={styles} id="loc-new" label={TX.labels.workLocation}
            value={draft.location} onChange={(e)=>setDraft({...draft, location:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="area-new" label={TX.labels.area}
            value={draft.area} onChange={(e)=>setDraft({...draft, area:e.target.value})} disabled={disabled}/>
          <InputField styles={styles} id="equip-new" label={TX.labels.equipment}
            placeholder={TX.placeholders.equipment} value={draft.equipment}
            onChange={(e)=>setDraft({...draft, equipment:e.target.value})} disabled={disabled}/>
          <TextareaField styles={styles} id="desc-new" label={TX.labels.responsibilities}
            value={draft.description} onChange={(e)=>setDraft({...draft, description:e.target.value})} disabled={disabled}/>
          <TextareaField styles={styles} id="ach-new" label={TX.labels.achievements}
            value={draft.achievements} onChange={(e)=>setDraft({...draft, achievements:e.target.value})} disabled={disabled}/>
        </div>
        <div className={styles.row} style={{ marginTop:10 }}>
          <button type="button" className={styles.btnPrimary} onClick={add} disabled={disabled}>
            {TX.buttons.addExperience}
          </button>
        </div>
      </div>
    </div>
  );
}
