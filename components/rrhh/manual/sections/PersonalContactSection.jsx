// /components/rrhh/manual/sections/PersonalContactSection.jsx
'use client';
import React, { useState, useRef } from 'react';
import { jobAreas } from '../../../../app/rrhh/rrhh.content';
import InputField from '../../ui/InputField';
import SelectField from '../../ui/SelectField';
import DateField from '../../ui/DateField';
import { TX } from '@/app/api/rrhh/rrhh.texts';

function fmtDate(d){
  if (!d) return '';
  const dd = new Date(d);
  if (isNaN(dd)) return d;
  return dd.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function PersonalContactSection({
  styles, fields, errors, setField, disabled,
  // ↓ props opcionales para adjunto (si no vienen, usamos fallback local)
  file, setFile, fileError, allowedFileTypes, maxFileSizeMB, onValidateFile
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(fields);

  // ==== Adjuntar CV (opcional) – botón + texto ====
  const inputRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [localErr, setLocalErr] = useState('');

  // si no pasaron setFile/file desde el wizard, usamos el local
  const fileValue = (typeof file !== 'undefined') ? file : localFile;
  const setFileSafe = (fn) => {
    if (typeof setFile === 'function') return setFile(fn);
    return setLocalFile(fn);
  };

  const accept = [
    '.pdf','.doc','.docx',
    ...(Array.isArray(allowedFileTypes) ? allowedFileTypes : [])
  ].join(',');

  const handleChoose = (fs) => {
    const f = fs?.[0];
    if (!f) return;
    const err = typeof onValidateFile === 'function' ? onValidateFile(f) : null;
    if (err) {
      setLocalErr(err);
      setFileSafe(null);
    } else {
      setLocalErr('');
      setFileSafe(f);             // <<<<<<<<<<<<<< FIJA el error “setFile no definido”
    }
  };

  const AttachBar = (
    <div className={styles.row} style={{ gap: 8, justifyContent:'flex-end', alignItems:'center', flexWrap:'wrap', marginBottom: 6 }}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display:'none' }}
        onChange={(e)=>handleChoose(e.target.files)}
        disabled={disabled}
      />
      <button
        type="button"
        className={styles.btnGhost}
        onClick={()=>inputRef.current?.click()}
        disabled={disabled}
      >
        {fileValue ? (TX.buttons.changeFile || 'Cambiar archivo') : (TX.buttons.attachCV || 'Adjuntar CV')}
      </button>

      {/* nombre del archivo, estilo “texto” compacto */}
      <span
        title={fileValue?.name || ''}
        style={{
          fontSize: 12,
          color: 'var(--text-300)',
          maxWidth: 240,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {fileValue?.name ? fileValue.name : `PDF/DOC/DOCX · máx ${maxFileSizeMB}MB`}
      </span>

      {fileValue && (
        <button
          type="button"
          className={styles.btnGhost}
          onClick={()=>setFileSafe(null)}
          disabled={disabled}
          aria-label={TX.buttons.remove || 'Quitar'}
        >
          {TX.buttons.remove || 'Quitar'}
        </button>
      )}

      {(localErr || fileError) && (
        <div className={styles.error} style={{ width:'100%' }}>
          {localErr || fileError}
        </div>
      )}
    </div>
  );
  // ================================================

  const enterEdit = () => { setDraft(fields); setEditing(true); };
  const cancelEdit = () => { setEditing(false); };
  const saveEdit = () => {
    const map = {
      fullName: draft.fullName, email: draft.email, phone: draft.phone,
      documentId: draft.documentId, birthdate: draft.birthdate,
      area: draft.area, location: draft.location, linkedin: draft.linkedin,
      'address.country': draft.address?.country || '',
      'address.province': draft.address?.province || '',
      'address.city': draft.address?.city || '',
      'address.addressLine': draft.address?.addressLine || '',
      'address.postalCode': draft.address?.postalCode || ''
    };
    Object.entries(map).forEach(([k,v])=> setField(k, v));
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className={styles.card} style={{padding:14}}>
        {/* Botón de adjuntar chiquito (arriba) */}
        {AttachBar}

        <div style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'baseline'}}>
          <div style={{fontWeight:700, fontSize:16}}>{fields.fullName || '—'}</div>
          <button type="button" className={styles.btnGhost} onClick={enterEdit} disabled={disabled}>
            {TX.buttons.edit}
          </button>
        </div>

        <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr', gap:6}}>
          <div style={{fontSize:14}}><strong>{TX.labels.email}:</strong> {fields.email || '—'}</div>
          <div style={{fontSize:14}}><strong>{TX.labels.phone}:</strong> {fields.phone || '—'}</div>
          <div style={{fontSize:14}}><strong>{TX.labels.documentId}:</strong> {fields.documentId || '—'}</div>
          <div style={{fontSize:14}}><strong>{TX.labels.birthdate}:</strong> {fmtDate(fields.birthdate) || '—'}</div>
          <div style={{fontSize:14}}><strong>{TX.labels.roleApplying}:</strong> {fields.area || '—'}</div>
          <div style={{fontSize:14}}><strong>{TX.labels.base}:</strong> {fields.location || '—'}</div>
          {fields.linkedin && (
            <div style={{fontSize:14}}><strong>{TX.labels.linkedin}:</strong> {fields.linkedin}</div>
          )}
        </div>

        <div style={{marginTop:10}}>
          <div style={{fontWeight:600, marginBottom:4}}>Dirección</div>
          <div style={{fontSize:14, color:'var(--text-300)'}}>
            {[fields.address?.addressLine, fields.address?.city, fields.address?.province, fields.address?.country].filter(Boolean).join(', ') || '—'}
            {fields.address?.postalCode ? ` (CP ${fields.address.postalCode})` : ''}
          </div>
        </div>
      </div>
    );
  }

  // Edición
  return (
    <div className={styles.grid}>
      {/* Botón de adjuntar también en edición */}
      {AttachBar}

      <div className={styles.grid2}>
        <InputField styles={styles} id="fullName" label={TX.labels.fullName}
          placeholder={TX.placeholders.fullName} value={draft.fullName ?? ''}
          onChange={(e)=>setDraft({...draft, fullName:e.target.value})}
          autoComplete="name" error={errors.fullName} disabled={disabled}
        />
        <InputField styles={styles} id="email" label={TX.labels.email}
          placeholder={TX.placeholders.email} value={draft.email ?? ''}
          onChange={(e)=>setDraft({...draft, email:e.target.value})}
          autoComplete="email" error={errors.email} disabled={disabled}
        />
        <InputField styles={styles} id="phone" label={TX.labels.phone}
          placeholder={TX.placeholders.phone} value={draft.phone ?? ''}
          onChange={(e)=>setDraft({...draft, phone:e.target.value})}
          autoComplete="tel" error={errors.phone} disabled={disabled}
        />
        <InputField styles={styles} id="documentId" label={TX.labels.documentId}
          placeholder={TX.placeholders.documentId} value={draft.documentId ?? ''}
          onChange={(e)=>setDraft({...draft, documentId:e.target.value})} disabled={disabled}
        />
        <DateField styles={styles} id="birthdate" label={TX.labels.birthdate}
          value={draft.birthdate ?? ''} onChange={(e)=>setDraft({...draft, birthdate:e.target.value})}
          disabled={disabled} error={errors.birthdate}
        />
        <SelectField styles={styles} id="area" label={TX.labels.roleApplying}
          value={draft.area ?? ''} onChange={(e)=>setDraft({...draft, area:e.target.value})}
          options={jobAreas} disabled={disabled}
        />
        <InputField styles={styles} id="base" label={TX.labels.base}
          placeholder={TX.placeholders.base} value={draft.location ?? ''}
          onChange={(e)=>setDraft({...draft, location:e.target.value})} disabled={disabled}
        />
        <InputField styles={styles} id="linkedin" label={TX.labels.linkedin}
          placeholder={TX.placeholders.linkedin} value={draft.linkedin ?? ''}
          onChange={(e)=>setDraft({...draft, linkedin:e.target.value})} autoComplete="url" disabled={disabled}
        />
      </div>

      <div className={styles.grid2}>
        <InputField styles={styles} id="country" label={TX.labels.country}
          value={draft.address?.country ?? ''} onChange={(e)=>setDraft({...draft, address:{...(draft.address||{}), country:e.target.value}})}
          placeholder={TX.placeholders.country} disabled={disabled}
        />
        <InputField styles={styles} id="province" label={TX.labels.province}
          value={draft.address?.province ?? ''} onChange={(e)=>setDraft({...draft, address:{...(draft.address||{}), province:e.target.value}})}
          placeholder={TX.placeholders.province} disabled={disabled}
        />
        <InputField styles={styles} id="city" label={TX.labels.city}
          value={draft.address?.city ?? ''} onChange={(e)=>setDraft({...draft, address:{...(draft.address||{}), city:e.target.value}})}
          placeholder={TX.placeholders.city} disabled={disabled}
        />
        <InputField styles={styles} id="addressLine" label={TX.labels.addressLine}
          value={draft.address?.addressLine ?? ''} onChange={(e)=>setDraft({...draft, address:{...(draft.address||{}), addressLine:e.target.value}})}
          placeholder={TX.placeholders.addressLine} disabled={disabled}
        />
        <InputField styles={styles} id="postalCode" label={TX.labels.postalCode}
          value={draft.address?.postalCode ?? ''} onChange={(e)=>setDraft({...draft, address:{...(draft.address||{}), postalCode:e.target.value}})}
          placeholder={TX.placeholders.postalCode} disabled={disabled}
        />
      </div>

      <div className={styles.row} style={{ marginTop:10, gap:10, justifyContent:'flex-end' }}>
        <button type="button" className={styles.btnGhost} onClick={cancelEdit} disabled={disabled}>
          {TX.buttons.cancel}
        </button>
        <button type="button" className={styles.btnPrimary} onClick={saveEdit} disabled={disabled}>
          {TX.buttons.save}
        </button>
      </div>
    </div>
  );
}
