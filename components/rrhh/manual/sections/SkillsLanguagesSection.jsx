'use client';
import React, { useState } from 'react';
import { TX } from '@/app/api/rrhh/rrhh.texts';
import InputField from '../../ui/InputField';
import TextareaField from '../../ui/TextareaField';
import LanguageLevelSelect from '../../ui/LanguageLevelSelect';

const DEFAULT_LEVEL = 'A1';
const normalizeName = (s = '') =>
  s.trim().replace(/\s+/g, ' ').replace(/^./, c => c.toUpperCase());

export default function SkillsLanguagesSection({
  styles, fields, setField, languages,
  pushLang, updateLang, removeLang, disabled
}) {
  // ——— Skills (texto libre) ———
  const [editSkills, setEditSkills] = useState(false);
  const [skillsDraft, setSkillsDraft] = useState(fields.skills || '');

  // ——— Idiomas: estados separados para NUEVO y EDICIÓN ———
  const [newLang, setNewLang] = useState({ name: '', level: DEFAULT_LEVEL });
  const [editIdx, setEditIdx] = useState(-1);
  const [editLang, setEditLang] = useState({ name: '', level: DEFAULT_LEVEL });

  // Inicia edición de un idioma existente
  const startEditLang = (i) => {
    const l = languages[i] || { name: '', level: DEFAULT_LEVEL };
    setEditIdx(i);
    setEditLang({
      name: l.name || '',
      level: l.level || DEFAULT_LEVEL, // fallback real
    });
  };
  const cancelEditLang = () => {
    setEditIdx(-1);
    setEditLang({ name: '', level: DEFAULT_LEVEL });
  };
  const saveEditLang = (i) => {
    const name = normalizeName(editLang.name);
    const level = editLang.level || DEFAULT_LEVEL;
    if (!name) return; // opcional: mostrar toast
    updateLang(i, { name, level });
    cancelEditLang();
  };

  // Agregar o actualizar idioma (si ya existe por nombre)
  const addNewLang = () => {
    const name = normalizeName(newLang.name);
    const level = newLang.level || DEFAULT_LEVEL;

    if (!name) return; // opcional: toast o error inline

    const dupIdx = (languages || []).findIndex(
      (l) => (l?.name || '').toLowerCase() === name.toLowerCase()
    );

    if (dupIdx >= 0) {
      // Si ya existe, actualizamos nivel (evita duplicados)
      updateLang(dupIdx, { name, level });
    } else {
      pushLang({ name, level });
    }

    // Reset del formulario de nuevo idioma
    setNewLang({ name: '', level: DEFAULT_LEVEL });
  };

  return (
    <div className={styles.grid}>
      {/* ===== Skills lectura / edición ===== */}
      {!editSkills ? (
        <div className={styles.card} style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
            <div style={{ fontWeight: 700 }}>{TX.labels.skills}</div>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => { setSkillsDraft(fields.skills || ''); setEditSkills(true); }}
              disabled={disabled}
            >
              {TX.buttons.edit}
            </button>
          </div>
          <p style={{ marginTop: 6 }}>{fields.skills || '—'}</p>
        </div>
      ) : (
        <div className={styles.card} style={{ padding: 14 }}>
          <TextareaField
            styles={styles}
            id="skills"
            label={TX.labels.skills}
            placeholder={TX.placeholders.skills}
            value={skillsDraft}
            onChange={(e) => setSkillsDraft(e.target.value)}
            disabled={disabled}
          />
          <div className={styles.row} style={{ marginTop: 10, gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => setEditSkills(false)}
              disabled={disabled}
            >
              {TX.buttons.cancel}
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => { setField('skills', skillsDraft); setEditSkills(false); }}
              disabled={disabled}
            >
              {TX.buttons.save}
            </button>
          </div>
        </div>
      )}

      {/* ===== Idiomas: encabezado ===== */}
      <div className={styles.field}>
        <label>{TX.labels.languages}</label>
        <div className={styles.hint}>{TX.hints.languagesIntro}</div>
      </div>

      {/* ===== Idiomas existentes ===== */}
      {(languages || []).map((l, idx) => {
        const isEditing = editIdx === idx;

        if (!isEditing) {
          return (
            <div key={idx} className={styles.card} style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
                <div style={{ fontWeight: 700 }}>
                  {l.name || '—'} <span style={{ opacity: .85, fontWeight: 600 }}>— {l.level || '—'}</span>
                </div>
                <div className={styles.row} style={{ gap: 10 }}>
                  <button type="button" className={styles.btnGhost} onClick={() => startEditLang(idx)} disabled={disabled}>
                    {TX.buttons.edit}
                  </button>
                  <button type="button" className={styles.btnGhost} onClick={() => removeLang(idx)} disabled={disabled}>
                    {TX.buttons.remove}
                  </button>
                </div>
              </div>
            </div>
          );
        }

        // ——— Edición de un idioma existente ———
        return (
          <div key={idx} className={styles.card} style={{ padding: 14 }}>
            <div className={styles.grid2}>
              <InputField
                styles={styles}
                id={`lang-${idx}`}
                label={TX.labels.language}
                value={editLang.name}
                onChange={(e) => setEditLang({ ...editLang, name: e.target.value })}
                disabled={disabled}
              />
              <LanguageLevelSelect
                styles={styles}
                id={`lvl-${idx}`}
                value={editLang.level}
                onChange={(e) => setEditLang({ ...editLang, level: e.target.value })}
                disabled={disabled}
              />
            </div>
            <div className={styles.row} style={{ marginTop: 10, gap: 10, justifyContent: 'flex-end' }}>
              <button type="button" className={styles.btnGhost} onClick={cancelEditLang} disabled={disabled}>
                {TX.buttons.cancel}
              </button>
              <button type="button" className={styles.btnPrimary} onClick={() => saveEditLang(idx)} disabled={disabled}>
                {TX.buttons.save}
              </button>
            </div>
          </div>
        );
      })}

      {/* ===== Agregar idioma (nuevo) ===== */}
      <div className={styles.card} style={{ padding: 14 }}>
        <div className={styles.grid2}>
          <InputField
            styles={styles}
            id="lang-new"
            label={TX.labels.language}
            value={newLang.name}
            onChange={(e) => setNewLang({ ...newLang, name: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addNewLang(); } }}
            disabled={disabled}
          />
          <LanguageLevelSelect
            styles={styles}
            id="lvl-new"
            value={newLang.level}                 // ← default real A1
            onChange={(e) => setNewLang({ ...newLang, level: e.target.value })}
            disabled={disabled}
          />
        </div>
        <div className={styles.row} style={{ marginTop: 10 }}>
          <button type="button" className={styles.btnPrimary} onClick={addNewLang} disabled={disabled}>
            {TX.buttons.addLanguage}
          </button>
        </div>
      </div>

      {/* (Si tenías bloque de “mensaje/carta”, va aquí sin cambios) */}
    </div>
  );
}
