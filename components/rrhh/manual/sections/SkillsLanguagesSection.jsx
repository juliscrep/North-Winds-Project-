// /components/rrhh/manual/sections/SkillsLanguagesSection.jsx
'use client';
import React, { useState } from 'react';

const blankLang = () => ({ name:'', level:'' });

export default function SkillsLanguagesSection({
  styles, fields, setField, languages, pushLang, updateLang, removeLang
}) {
  const [dLang, setDLang] = useState(blankLang());

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <label htmlFor="skills">Habilidades/Stack</label>
        <textarea
          id="skills"
          className={styles.textarea}
          placeholder="Ej: Mantenimiento preventivo y correctivo, torqueado/tensionado, grandes correctivos, inspección de palas con drones, QA/QC, HSE, MT/BT, subestaciones, termografía, análisis de aceite, montaje."
          value={fields.skills}
          onChange={(e)=>setField('skills', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Idiomas</label>
        <div className={styles.hint}>Ej: Español (Nativo), Inglés (B2), Portugués (A2)</div>
      </div>

      {languages?.map((l, idx)=>(
        <div key={idx} className={styles.card} style={{padding:14}}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Idioma</label>
              <input className={styles.input} value={l.name} onChange={(e)=>updateLang(idx,{name:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Nivel</label>
              <input className={styles.input} placeholder="A1–C2 / Básico–Nativo" value={l.level} onChange={(e)=>updateLang(idx,{level:e.target.value})}/>
            </div>
          </div>
          <div className={styles.row} style={{marginTop:10}}>
            <button type="button" className={styles.btnGhost} onClick={()=>removeLang(idx)}>Eliminar</button>
          </div>
        </div>
      ))}

      <div className={styles.card} style={{padding:14}}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Idioma</label>
            <input className={styles.input} value={dLang.name} onChange={(e)=>setDLang({...dLang, name:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Nivel</label>
            <input className={styles.input} placeholder="A1–C2 / Básico–Nativo" value={dLang.level} onChange={(e)=>setDLang({...dLang, level:e.target.value})}/>
          </div>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={()=>{ pushLang(dLang); setDLang(blankLang()); }}>
            Agregar idioma
          </button>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Carta/Mensaje (opcional)</label>
        <textarea
          id="message"
          className={styles.textarea}
          placeholder="Contanos por qué te interesa el puesto y disponibilidad para proyectos."
          value={fields.message}
          onChange={(e)=>setField('message', e.target.value)}
        />
      </div>
    </div>
  );
}
