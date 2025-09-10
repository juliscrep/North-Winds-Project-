'use client';
import React, { useRef, useState } from 'react';
import styles from '../../app/rrhh/rrhh.module.css';
import { allowedFileTypes, maxFileSizeMB, jobAreas, formPlaceholders } from '../../app/rrhh/rrhh.content';
import { submitApplication } from '../../lib/rrhhClient';
import { validateEmail, validatePhone, normalizePhone, validateFile } from '../../lib/rrhhValidators';
import { useRouter } from 'next/navigation';
import SuccessDialog from './ui/SuccessDialog';
import Link from '@mui/material/Link'
import PrivacyPolicyDialog from './ui/PrivacyPolicyDialog'



export default function CVUpload() {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [openPP, setOpenPP] = useState(false); // 🔹 modal políticas

  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    phone: '',
    area: jobAreas[0],
    message: '',
    consent: false,
    website: '' // honeypot
  });

  const validate = () => {
    const e = {};
    if (!fields.fullName.trim()) e.fullName = 'Ingresá tu nombre completo.';
    if (!validateEmail(fields.email)) e.email = 'Email inválido.';
    if (!validatePhone(fields.phone)) e.phone = 'Teléfono inválido.';
    if (!fields.consent) e.consent = 'Debés aceptar las Políticas de Privacidad.';
    const fileErr = validateFile(file, { allowedMime: allowedFileTypes, maxMB: maxFileSizeMB });
    if (fileErr) e.file = fileErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onDrop = (f) => {
    const chosen = f?.[0];
    if (chosen) setFile(chosen);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSuccess('');
    try {
      const norm = normalizePhone(fields.phone);
      const payload = norm.ok ? { ...fields, phone: norm.e164 } : fields;
      const { ok, data } = await submitApplication('upload', payload, file);
      if (ok) {
        setSuccess(data?.message || 'Postulación enviada con éxito.');
        setShowSuccess(true);
        setFile(null);
        setFields({ ...fields, message: '' });
      } else {
        setErrors({ api: data?.error || 'No se pudo enviar. Intentá nuevamente.' });
      }
    } catch (err) {
      setErrors({ api: 'Error de red. Intentá nuevamente.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label htmlFor="fullName">Nombre y apellido</label>
              <input
                id="fullName"
                className={styles.input}
                placeholder={formPlaceholders.fullName}
                value={fields.fullName}
                onChange={(e) => setFields({ ...fields, fullName: e.target.value })}
              />
              {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className={styles.input}
                placeholder={formPlaceholders.email}
                value={fields.email}
                onChange={(e) => setFields({ ...fields, email: e.target.value })}
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                className={styles.input}
                placeholder={formPlaceholders.phone}
                value={fields.phone}
                onChange={(e) => setFields({ ...fields, phone: e.target.value })}
              />
              {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </div>

            <div className={styles.field}>
              <label htmlFor="area">Área de interés</label>
              <select
                id="area"
                className={styles.select}
                value={fields.area}
                onChange={(e) => setFields({ ...fields, area: e.target.value })}
              >
                {jobAreas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Mensaje (opcional)</label>
            <textarea
              id="message"
              className={styles.textarea}
              placeholder={formPlaceholders.message}
              value={fields.message}
              onChange={(e) => setFields({ ...fields, message: e.target.value })}
            />
          </div>

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            value={fields.website}
            onChange={(e) => setFields({ ...fields, website: e.target.value })}
            style={{ display: 'none' }}
            tabIndex={-1}
          />

          <div
            className={`${styles.drop} ${drag ? styles.dragOver : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              onDrop(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          >
            <strong>Arrastrá tu CV aquí</strong>
            <div className={styles.hint}>
              o hacé click para buscar un archivo (PDF o DOCX, máx {maxFileSizeMB}MB)
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              style={{ display: 'none' }}
              onChange={(e) => onDrop(e.target.files)}
            />
            {file && (
              <div className={styles.fileInfo}>
                <span>{file.name}</span>
                <button type="button" className={styles.btnGhost} onClick={() => setFile(null)}>
                  Quitar
                </button>
              </div>
            )}
            {errors.file && <div className={styles.error}>{errors.file}</div>}
          </div>

          <div className={`${styles.row} ${styles.field}`} style={{ marginTop: 8, alignItems:'center', gap:8 }}>
          <input
            id="consent"
            type="checkbox"
            checked={fields.consent}
            onChange={(e) => setFields({ ...fields, consent: e.target.checked })}
          />
          <label htmlFor="consent" className={styles.hint} style={{ margin: 0 }}>
            Acepto las{' '}
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

          <div className={styles.row} style={{ marginTop: 8, gap: 12 }}>
            <button className={styles.btnPrimary} disabled={sending}>
              {sending ? 'Enviando…' : 'Enviar postulación'}
            </button>
            <button
              type="reset"
              className={styles.btnGhost}
              onClick={() => { setFile(null); setErrors({}); }}
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          Formatos permitidos: PDF, DOC, DOCX. Máximo {maxFileSizeMB}MB.
        </div>

        <SuccessDialog
          open={showSuccess}
          iconSrc="/img/logo.jpeg"
          title="¡Felicitaciones y muchas gracias!"
          message="Ya registramos tu postulación en nuestra base de selección. Apenas se abra un puesto acorde, nos comunicaremos."
          primaryText="Aceptar"
          onAccept={() => { setShowSuccess(false); router.push('/'); }}
        />
      </form>
      <PrivacyPolicyDialog open={openPP} onClose={() => setOpenPP(false)} />
    </>
  );
}
