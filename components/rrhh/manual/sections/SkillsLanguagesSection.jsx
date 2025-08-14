// /components/rrhh/manual/sections/SkillsLanguagesSection.jsx
'use client';
import React, { useState } from 'react';
import {TX} from '@/app/api/rrhh/rrhh.texts';
import InputField from '../../ui/InputField';
import TextareaField from '../../ui/TextareaField';
import LanguageLevelSelect from '../../ui/LanguageLevelSelect';

const blankLang = () => ({ name:'', level:'' });

export default function SkillsLanguagesSection({
  styles, fields, setField, languages, pushLang, updateLang, removeLang, disabled
}) {
  // Edit para "skills"
  const [editSkills, setEditSkills] = useState(false);
  const [skillsDraft, setSkillsDraft] = useState(fields.skills || '');

  // Idiomas
  const [editIdx, setEditIdx] = useState(-1);
  const [langDraft, setLangDraft] = useState(blankLang());

  const startEditLang = (i) => { setEditIdx(i); setLangDraft(languages[i] || blankLang()); };
  const cancelEditLang = () => { setEditIdx(-1); setLangDraft(blankLang()); };
  const saveEditLang = (i) => { updateLang(i, langDraft); cancelEditLang(); };

  return (
    <div className={styles.grid}>
      {/* Skills lectura/edición */}
      {!editSkills ? (
        <div className={styles.card} style={{padding:14}}>
          <div style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'baseline'}}>
            <div style={{fontWeight:700}}>{TX.labels.skills}</div>
            <button type="button" className={styles.btnGhost} onClick={()=>{ setSkillsDraft(fields.skills || ''); setEditSkills(true); }} disabled={disabled}>
              {TX.buttons.edit}
            </button>
          </div>
          <p style={{marginTop:6}}>{fields.skills || '—'}</p>
        </div>
      ) : (
        <div className={styles.card} style={{padding:14}}>
          <TextareaField
            styles={styles} id="skills" label={TX.labels.skills}
            placeholder={TX.placeholders.skills}
            value={skillsDraft} onChange={(e)=>setSkillsDraft(e.target.value)}
            disabled={disabled}
          />
          <div className={styles.row} style={{marginTop:10, gap:10, justifyContent:'flex-end'}}>
            <button type="button" className={styles.btnGhost} onClick={()=>setEditSkills(false)} disabled={disabled}>
              {TX.buttons.cancel}
            </button>
            <button type="button" className={styles.btnPrimary} onClick={()=>{ setField('skills', skillsDraft); setEditSkills(false); }} disabled={disabled}>
              {TX.buttons.save}
            </button>
          </div>
        </div>
      )}

      {/* Idiomas encabezado */}
      <div className={styles.field}>
        <label>{TX.labels.languages}</label>
        <div className={styles.hint}>{TX.hints.languagesIntro}</div>
      </div>

      {/* Idiomas existentes */}
      {languages?.map((l, idx)=> {
        const isEditing = editIdx === idx;

        if (!isEditing){
          return (
            <div key={idx} className={styles.card} style={{padding:14}}>
              <div style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'baseline'}}>
                <div style={{fontWeight:700}}>
                  {l.name || '—'} <span style={{opacity:.85, fontWeight:600}}>— {l.level || '—'}</span>
                </div>
                <div className={styles.row} style={{gap:10}}>
                  <button type="button" className={styles.btnGhost} onClick={()=>startEditLang(idx)} disabled={disabled}>
                    {TX.buttons.edit}
                  </button>
                  <button type="button" className={styles.btnGhost} onClick={()=>removeLang(idx)} disabled={disabled}>
                    {TX.buttons.remove}
                  </button>
                </div>
              </div>
            </div>
          );
        }

        // Edición idioma
        return (
          <div key={idx} className={styles.card} style={{padding:14}}>
            <div className={styles.grid2}>
              <InputField styles={styles} id={`lang-${idx}`} label={TX.labels.language}
                value={langDraft.name ?? ''} onChange={(e)=>setLangDraft({...langDraft, name:e.target.value})} disabled={disabled}/>
              <LanguageLevelSelect styles={styles} id={`lvl-${idx}`}
                value={langDraft.level ?? ''} onChange={(e)=>setLangDraft({...langDraft, level:e.target.value})}
                disabled={disabled}
              />
            </div>
            <div className={styles.row} style={{marginTop:10, gap:10, justifyContent:'flex-end'}}>
              <button type="button" className={styles.btnGhost} onClick={cancelEditLang} disabled={disabled}>
                {TX.buttons.cancel}
              </button>
              <button type="button" className={styles.btnPrimary} onClick={()=>saveEditLang(idx)} disabled={disabled}>
                {TX.buttons.save}
              </button>
            </div>
          </div>
        );
      })}

      {/* Agregar idioma */}
      <div className={styles.card} style={{padding:14}}>
        <div className={styles.grid2}>
          <InputField styles={styles} id="lang-new" label={TX.labels.language}
            value={langDraft.name} onChange={(e)=>setLangDraft({...langDraft, name:e.target.value})} disabled={disabled}/>
          <LanguageLevelSelect styles={styles} id="lvl-new"
            value={langDraft.level} onChange={(e)=>setLangDraft({...langDraft, level:e.target.value})} disabled={disabled}
          />
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary}
            onClick={()=>{ if (!langDraft.name || !langDraft.level) return; pushLang(langDraft); setLangDraft(blankLang()); }}
            disabled={disabled}
          >
            {TX.buttons.addLanguage}
          </button>
        </div>
      </div>

      {/* Mensaje (carta) lectura/edición igual que antes */}
      {/* … (tu bloque MessageBlock si lo tenías, sin cambios) */}
    </div>
  );
}
