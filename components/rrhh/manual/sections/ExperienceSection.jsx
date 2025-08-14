// /components/rrhh/manual/sections/ExperienceSection.jsx
'use client';
import React, { useState } from 'react';

const blank = () => ({
  company:'', role:'', start:'', end:'', current:false,
  location:'', area:'', // área/sector (texto)
  equipment:'', // equipos/tecnologías: multiplicadora, generador, MT/BT, palas…
  description:'', achievements:''
});

export default function ExperienceSection({ styles, items, pushItem, updateItem, removeItem }) {
  const [draft, setDraft] = useState(blank());

  const add = () => {
    if (!draft.company || !draft.role) return;
    pushItem(draft);
    setDraft(blank());
  };

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <label>Experiencia laboral</label>
        <div className={styles.hint}>
          Detallá trabajos en parques eólicos/solares, O&amp;M, correctivos mayores, palas, QA/QC, HSE, MT/BT, montaje, etc.
        </div>
      </div>

      {items?.map((x, idx) => (
        <div key={idx} className={styles.card} style={{ padding: 14 }}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Empresa</label>
              <input className={styles.input} value={x.company}
                     onChange={(e)=>updateItem(idx, {company:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Puesto</label>
              <input className={styles.input} value={x.role}
                     onChange={(e)=>updateItem(idx, {role:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Inicio</label>
              <input type="date" className={styles.input} value={x.start}
                     onChange={(e)=>updateItem(idx, {start:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Fin</label>
              <input type="date" className={styles.input} value={x.end}
                     onChange={(e)=>updateItem(idx, {end:e.target.value})} disabled={x.current}/>
            </div>
            <div className={`${styles.row} ${styles.field}`}>
              <input type="checkbox" id={`curr-${idx}`} checked={x.current}
                     onChange={(e)=>updateItem(idx, {current:e.target.checked, end: e.target.checked ? '' : x.end})}/>
              <label htmlFor={`curr-${idx}`} className={styles.hint}>Trabajo actual</label>
            </div>
            <div className={styles.field}>
              <label>Ubicación del trabajo</label>
              <input className={styles.input} value={x.location}
                     onChange={(e)=>updateItem(idx, {location:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Área/Sector</label>
              <input className={styles.input} value={x.area}
                     onChange={(e)=>updateItem(idx, {area:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Equipos/tecnologías</label>
              <input className={styles.input} placeholder="Multiplicadora, generador, MT/BT, palas, torqueado, etc."
                     value={x.equipment}
                     onChange={(e)=>updateItem(idx, {equipment:e.target.value})}/>
            </div>
            <div className={styles.field} style={{gridColumn:'1 / -1'}}>
              <label>Responsabilidades</label>
              <textarea className={styles.textarea} value={x.description}
                        onChange={(e)=>updateItem(idx, {description:e.target.value})}/>
            </div>
            <div className={styles.field} style={{gridColumn:'1 / -1'}}>
              <label>Logros</label>
              <textarea className={styles.textarea} value={x.achievements}
                        onChange={(e)=>updateItem(idx, {achievements:e.target.value})}/>
            </div>
          </div>

          <div className={styles.row} style={{ marginTop:10 }}>
            <button type="button" className={styles.btnGhost} onClick={()=>removeItem(idx)}>Eliminar</button>
          </div>
        </div>
      ))}

      {/* Agregar nueva */}
      <div className={styles.card} style={{ padding: 14 }}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Empresa</label>
            <input className={styles.input} value={draft.company}
                   onChange={(e)=>setDraft({...draft, company:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Puesto</label>
            <input className={styles.input} value={draft.role}
                   onChange={(e)=>setDraft({...draft, role:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Inicio</label>
            <input type="date" className={styles.input} value={draft.start}
                   onChange={(e)=>setDraft({...draft, start:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Fin</label>
            <input type="date" className={styles.input} value={draft.end} disabled={draft.current}
                   onChange={(e)=>setDraft({...draft, end:e.target.value})}/>
          </div>
          <div className={`${styles.row} ${styles.field}`}>
            <input type="checkbox" id="curr-draft" checked={draft.current}
                   onChange={(e)=>setDraft({...draft, current:e.target.checked, end: e.target.checked ? '' : draft.end})}/>
            <label htmlFor="curr-draft" className={styles.hint}>Trabajo actual</label>
          </div>
          <div className={styles.field}>
            <label>Ubicación del trabajo</label>
            <input className={styles.input} value={draft.location}
                   onChange={(e)=>setDraft({...draft, location:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Área/Sector</label>
            <input className={styles.input} value={draft.area}
                   onChange={(e)=>setDraft({...draft, area:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Equipos/tecnologías</label>
            <input className={styles.input} placeholder="Multiplicadora, generador, MT/BT, palas, torqueado, etc."
                   value={draft.equipment}
                   onChange={(e)=>setDraft({...draft, equipment:e.target.value})}/>
          </div>
          <div className={styles.field} style={{gridColumn:'1 / -1'}}>
            <label>Responsabilidades</label>
            <textarea className={styles.textarea} value={draft.description}
                      onChange={(e)=>setDraft({...draft, description:e.target.value})}/>
          </div>
          <div className={styles.field} style={{gridColumn:'1 / -1'}}>
            <label>Logros</label>
            <textarea className={styles.textarea} value={draft.achievements}
                      onChange={(e)=>setDraft({...draft, achievements:e.target.value})}/>
          </div>
        </div>

        <div className={styles.row} style={{ marginTop:10 }}>
          <button type="button" className={styles.btnPrimary} onClick={add}>Agregar experiencia</button>
        </div>
      </div>
    </div>
  );
}
