// /components/rrhh/manual/sections/EducationSection.jsx
'use client';
import React, { useState } from 'react';

const blankEdu = () => ({ institution:'', degree:'', field:'', start:'', end:'', status:'' });
const blankCert = () => ({ name:'', issuer:'', issued:'', expires:'', credentialId:'', url:'' });

export default function EducationSection({
  styles, education, certifications,
  pushEdu, updateEdu, removeEdu,
  pushCert, updateCert, removeCert
}) {
  const [dEdu, setDEdu] = useState(blankEdu());
  const [dCert, setDCert] = useState(blankCert());

  return (
    <div className={styles.grid}>
      <div className={styles.field}>
        <label>Formación académica</label>
        <div className={styles.hint}>Ej: Técnico Mecánico/Electricista, Ing. Electromecánico, cursos HSE, QA/QC, MT/BT, palas.</div>
      </div>

      {education?.map((e, idx)=>(
        <div key={idx} className={styles.card} style={{padding:14}}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Institución</label>
              <input className={styles.input} value={e.institution} onChange={(ev)=>updateEdu(idx, {institution:ev.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Título / Carrera</label>
              <input className={styles.input} value={e.degree} onChange={(ev)=>updateEdu(idx, {degree:ev.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Orientación / Área</label>
              <input className={styles.input} value={e.field} onChange={(ev)=>updateEdu(idx, {field:ev.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Inicio</label>
              <input type="date" className={styles.input} value={e.start} onChange={(ev)=>updateEdu(idx, {start:ev.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Fin</label>
              <input type="date" className={styles.input} value={e.end} onChange={(ev)=>updateEdu(idx, {end:ev.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Estado</label>
              <input className={styles.input} placeholder="En curso / Completo" value={e.status} onChange={(ev)=>updateEdu(idx, {status:ev.target.value})}/>
            </div>
          </div>
          <div className={styles.row} style={{marginTop:10}}>
            <button type="button" className={styles.btnGhost} onClick={()=>removeEdu(idx)}>Eliminar</button>
          </div>
        </div>
      ))}

      <div className={styles.card} style={{padding:14}}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Institución</label>
            <input className={styles.input} value={dEdu.institution} onChange={(e)=>setDEdu({...dEdu, institution:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Título / Carrera</label>
            <input className={styles.input} value={dEdu.degree} onChange={(e)=>setDEdu({...dEdu, degree:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Orientación / Área</label>
            <input className={styles.input} value={dEdu.field} onChange={(e)=>setDEdu({...dEdu, field:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Inicio</label>
            <input type="date" className={styles.input} value={dEdu.start} onChange={(e)=>setDEdu({...dEdu, start:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Fin</label>
            <input type="date" className={styles.input} value={dEdu.end} onChange={(e)=>setDEdu({...dEdu, end:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Estado</label>
            <input className={styles.input} placeholder="En curso / Completo" value={dEdu.status} onChange={(e)=>setDEdu({...dEdu, status:e.target.value})}/>
          </div>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={()=>{ pushEdu(dEdu); setDEdu(blankEdu()); }}>Agregar formación</button>
        </div>
      </div>

      {/* Certificaciones */}
      <div className={styles.field} style={{marginTop:8}}>
        <label>Certificaciones</label>
        <div className={styles.hint}>Ej: Trabajos en altura, rescate, habilitación MT/BT, GWO, NDT, etc.</div>
      </div>

      {certifications?.map((c, idx)=>(
        <div key={idx} className={styles.card} style={{padding:14}}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label>Nombre</label>
              <input className={styles.input} value={c.name} onChange={(e)=>updateCert(idx,{name:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Entidad emisora</label>
              <input className={styles.input} value={c.issuer} onChange={(e)=>updateCert(idx,{issuer:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Emitida</label>
              <input type="date" className={styles.input} value={c.issued} onChange={(e)=>updateCert(idx,{issued:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>Expira</label>
              <input type="date" className={styles.input} value={c.expires} onChange={(e)=>updateCert(idx,{expires:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>ID Credencial</label>
              <input className={styles.input} value={c.credentialId} onChange={(e)=>updateCert(idx,{credentialId:e.target.value})}/>
            </div>
            <div className={styles.field}>
              <label>URL (opcional)</label>
              <input className={styles.input} value={c.url} onChange={(e)=>updateCert(idx,{url:e.target.value})}/>
            </div>
          </div>
          <div className={styles.row} style={{marginTop:10}}>
            <button type="button" className={styles.btnGhost} onClick={()=>removeCert(idx)}>Eliminar</button>
          </div>
        </div>
      ))}

      <div className={styles.card} style={{padding:14}}>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Nombre</label>
            <input className={styles.input} value={dCert.name} onChange={(e)=>setDCert({...dCert, name:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Entidad emisora</label>
            <input className={styles.input} value={dCert.issuer} onChange={(e)=>setDCert({...dCert, issuer:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Emitida</label>
            <input type="date" className={styles.input} value={dCert.issued} onChange={(e)=>setDCert({...dCert, issued:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>Expira</label>
            <input type="date" className={styles.input} value={dCert.expires} onChange={(e)=>setDCert({...dCert, expires:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>ID Credencial</label>
            <input className={styles.input} value={dCert.credentialId} onChange={(e)=>setDCert({...dCert, credentialId:e.target.value})}/>
          </div>
          <div className={styles.field}>
            <label>URL (opcional)</label>
            <input className={styles.input} value={dCert.url} onChange={(e)=>setDCert({...dCert, url:e.target.value})}/>
          </div>
        </div>
        <div className={styles.row} style={{marginTop:10}}>
          <button type="button" className={styles.btnPrimary} onClick={()=>{ pushCert(dCert); setDCert(blankCert()); }}>Agregar certificación</button>
        </div>
      </div>
    </div>
  );
}
