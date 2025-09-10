'use client';
import React, { useMemo, useState } from 'react';
import styles from '../../../app/rrhh/rrhh.module.css';
import Stepper from '../Stepper';
import { jobAreas } from '../../../app/rrhh/rrhh.content';
// Ajustá si tu ruta es distinta:
import { TX } from '@/app/api/rrhh/rrhh.texts';
import { submitApplication, validateEmail, validatePhone } from '../../../lib/rrhhClient';
import {
  validatePastDate,
  validatePeriodPast,
  validateIssued,
  validateExpires,
  validateFutureOrToday,
  validateBirthdate, 
  normalizePhone, 
} from '../../../lib/rrhhValidators';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useToast } from '../ui/ToastProvider';
import PersonalContactSection from './sections/PersonalContactSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsLanguagesSection from './sections/SkillsLanguagesSection';
import PreferencesConsentSection from './sections/PreferencesConsentSection';
import { useRouter } from 'next/navigation';
import SuccessDialog from '../ui/SuccessDialog'


const makeInitial = () => ({
  fullName: '', email: '', phone: '',
  documentId: '', birthdate: '',
  area: jobAreas[0],
  location: '',
  linkedin: '', website: '',
  address: { country:'', province:'', city:'', addressLine:'', postalCode:'' },
  experience: [], education: [], certifications: [], languages: [],
  skills: '', message: '',
  preferences: { contract:'', availability:'', salary:'', schedule:'', relocation:'', travel:'' },
  consent: false
});
const initial = makeInitial();

export default function ManualFormWizard(){
  const [step, setStep] = useState(1); // 1..5
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const { pushToast } = useToast();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  // Confirm dialogs
  const [confirmAllOpen, setConfirmAllOpen] = useState(false);
  const [confirmSecOpen, setConfirmSecOpen] = useState(false);

  const stepNames = useMemo(()=> TX?.stepper || ['Datos','Experiencia','Educación','Habilidades','Preferencias y Envío'], []);

  // setField seguro
  const setField = (path, value) => {
    setFields(prev => {
      const copy = { ...prev };
      const segs = path.split('.');
      let node = copy;
      for (let i=0;i<segs.length-1;i++){
        const k = segs[i];
        const cur = node[k];
        node[k] = Array.isArray(cur) ? [...cur] : { ...(cur || {}) };
        node = node[k];
      }
      node[segs[segs.length - 1]] = value;
      return copy;
    });
  };

  const pushItem = (arrKey, item) => setFields(prev => ({ ...prev, [arrKey]: [...(prev[arrKey]||[]), item] }));
  const updateItem = (arrKey, idx, patch) => setFields(prev => {
    const copy = [...(prev[arrKey]||[])];
    copy[idx] = { ...(copy[idx]||{}), ...patch };
    return { ...prev, [arrKey]: copy };
  });
  const removeItem = (arrKey, idx) => setFields(prev => {
    const copy = [...(prev[arrKey]||[])];
    copy.splice(idx,1);
    return { ...prev, [arrKey]: copy };
  });

  // --- Helpers UI ---
  const scrollToId = (id) => {
    if (!id) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };
  const routeToStepByKey = (key) => {
    if (!key) return;
    if (key.startsWith('exp-')) { setStep(2); return; }
    if (key.startsWith('edu-') || key.startsWith('cert-')) { setStep(3); return; }
    if (key === 'consent' || key === 'availability') { setStep(5); return; }
    setStep(1);
  };
  const formatToastForError = (key, msg) => {
    const simpleMap = {
      fullName: { section: stepNames[0], label: TX.labels.fullName, id: 'fullName' },
      email: { section: stepNames[0], label: TX.labels.email, id: 'email' },
      phone: { section: stepNames[0], label: TX.labels.phone, id: 'phone' },
      birthdate: { section: stepNames[0], label: TX.labels.birthdate, id: 'birthdate' },
      consent: { section: stepNames[4], label: TX.labels.consent, id: 'consent' },
      availability: { section: stepNames[4], label: TX.labels.availability, id: 'availability' },
    };
    if (simpleMap[key]) {
      const { section, label, id } = simpleMap[key];
      return { message: `${section} • ${label}: ${msg}`, id };
    }
    const m = key.match(/^(exp|edu|cert)-(\d+)-(start|end|order|issued|expires)$/);
    if (m) {
      const [, kind, idxStr, sub] = m;
      const idx = Number(idxStr) + 1;
      const kindLabel = kind === 'exp' ? TX.labels.experience : (kind === 'edu' ? TX.labels.education : TX.labels.certifications);
      const subLabelMap = { start: TX.labels.start, end: TX.labels.end, issued: TX.labels.issued, expires: TX.labels.expires };
      const fieldLabel = subLabelMap[sub] || '';
      const idMap = {
        exp: { start: `start-${idx-1}`, end: `end-${idx-1}` },
        edu: { start: `estart-${idx-1}`, end: `eend-${idx-1}` },
        cert: { issued: `issued-${idx-1}`, expires: `expires-${idx-1}` },
      };
      const id = idMap[kind]?.[sub];
      const prefix = `${kindLabel} #${idx}`;
      return { message: fieldLabel ? `${prefix} • ${fieldLabel}: ${msg}` : `${prefix}: ${msg}`, id };
    }
    return { message: msg, id: undefined };
  };
  const notifyFirstError = (eObj) => {
    if (!eObj || !Object.keys(eObj).length) return;
    const priority = ['fullName','email','phone','birthdate','consent','availability'];
    const composedFirst = Object.keys(eObj).find(k => k.startsWith('exp-') || k.startsWith('edu-') || k.startsWith('cert-'));
    const key = priority.find(k => eObj[k]) || composedFirst || Object.keys(eObj)[0];
    const msg = String(eObj[key]);
    routeToStepByKey(key);
    const { message, id } = formatToastForError(key, msg);
    if (id) scrollToId(id);
    pushToast({ type:'error', message });
  };

  // --- Validaciones por paso ---
  const validateStep = (s=step) => {
    const e = {};
    if (s === 1){
      if (!fields.fullName.trim()) e.fullName = TX.errors.fullName;
      if (!validateEmail(fields.email)) e.email = TX.errors.email;
      if (!validatePhone(fields.phone)) e.phone = TX.errors.phone;
      if (!fields.birthdate) {
       e.birthdate = TX.errors.birthdateRequired || 'Completá tu fecha de nacimiento.';
     } else {
       const b = validateBirthdate(fields.birthdate, 18, 70);
       if (!b.ok) e.birthdate = b.message || TX.errors.birthdateInvalid;
     }
    }
    if (s === 2){
      fields.experience.forEach((x, i) => {
        const per = validatePeriodPast(x.start, x.end, { allowOpenEnd: x.current });
        if (per?.start) e[`exp-${i}-start`] = TX.errors.dateMin;
        if (per?.end) e[`exp-${i}-end`] = TX.errors.dateMin;
        if (per?.order) e[`exp-${i}-order`] = TX.errors.periodOrder;
      });
    }
    if (s === 3){
      fields.education.forEach((x,i) => {
        const per = validatePeriodPast(x.start, x.end, { allowOpenEnd: false });
        if (per?.start) e[`edu-${i}-start`] = TX.errors.dateMin;
        if (per?.end) e[`edu-${i}-end`] = TX.errors.dateMin;
        if (per?.order) e[`edu-${i}-order`] = TX.errors.periodOrder;
      });
      fields.certifications.forEach((c,i) => {
        if (c.issued && !validateIssued(c.issued)) e[`cert-${i}-issued`] = TX.errors.issuedFuture;
        const ex = validateExpires(c.issued, c.expires);
        if (ex?.expires) e[`cert-${i}-expires`] = TX.errors.dateMin;
        if (ex?.order) e[`cert-${i}-order`] = TX.errors.expiresBeforeIssued;
      });
    }
    if (s === 5){
      if (!fields.consent) e.consent = TX.errors.consent;
      if (fields.preferences.availability && !validateFutureOrToday(fields.preferences.availability)){
        e.availability = TX.errors.availabilityPast;
      }
    }
    setErrors(e);
    const ok = Object.keys(e).length === 0;
    if (!ok) notifyFirstError(e);
    return ok;
  };

  const next = () => { if (!sending && validateStep(step)) setStep(s => Math.min(5, s+1)); };
  const prev = () => { if (!sending) setStep(s => Math.max(1, s-1)); };

  // --- Limpiar sección / todo ---
  const doClearSectionNow = () => {
    setErrors({});
    setSuccess('');
    setFields(prev => {
      const f = { ...prev };
      if (step === 1){
        return {
          ...f,
          fullName:'', email:'', phone:'', documentId:'', birthdate:'',
          area: jobAreas[0], location:'', linkedin:'', website:'',
          address: { country:'', province:'', city:'', addressLine:'', postalCode:'' },
        };
      }
      if (step === 2){
        return { ...f, experience: [] };
      }
      if (step === 3){
        return { ...f, education: [], certifications: [] };
      }
      if (step === 4){
        return { ...f, skills:'', languages: [], message:'' };
      }
      if (step === 5){
        return { ...f, preferences: { contract:'', availability:'', salary:'', schedule:'', relocation:'', travel:'' }, consent: false };
      }
      return f;
    });
    pushToast({ type:'info', message:`Se limpió la sección “${stepNames[step-1]}”.` });
  };

  const doClearAllNow = () => {
    setErrors({});
    setSuccess('');
    setFields(makeInitial());
    setStep(1);
    pushToast({ type:'info', message:'Se restableció todo el formulario.' });
  };

  const askClearSection = () => setConfirmSecOpen(true);
  const askClearAll = () => setConfirmAllOpen(true);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateStep(5)) return;
    setSending(true); setSuccess('');
    try {
    const norm = normalizePhone(fields.phone);
    const payload = norm.ok ? { ...fields, phone: norm.e164 } : fields;
    const { ok, data } = await submitApplication('manual', payload, null);
      if (ok){
        const msg = data?.message || TX.success.sent;
        setSuccess(msg);
        pushToast({ type:'success', message: msg });
        setShowSuccess(true);
        setFields(makeInitial());
        setStep(1);
      }else{
        const m = data?.error || TX.errors.api;
        setErrors({ api: m });
        pushToast({ type:'error', message: m });
      }
    } catch {
      setErrors({ api: TX.errors.net });
      pushToast({ type:'error', message: TX.errors.net });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.stepperRow}>
          <Stepper step={step} sticky={false} />
        </div>

        {step === 1 && (
          <PersonalContactSection
            styles={styles}
            fields={fields}
            errors={errors}
            setField={setField}
            disabled={sending}  // ← deshabilita todos los botones de edición internos
          />
        )}

        {step === 2 && (
          <ExperienceSection
            styles={styles}
            items={fields.experience}
            pushItem={(item)=>pushItem('experience', item)}
            updateItem={(i,patch)=>updateItem('experience', i, patch)}
            removeItem={(i)=>removeItem('experience', i)}
            disabled={sending}  // ← idem
            errors={errors}
          />
        )}

        {step === 3 && (
          <EducationSection
            styles={styles}
            education={fields.education}
            certifications={fields.certifications}
            pushEdu={(item)=>pushItem('education', item)}
            updateEdu={(i,patch)=>updateItem('education', i, patch)}
            removeEdu={(i)=>removeItem('education', i)}
            pushCert={(item)=>pushItem('certifications', item)}
            updateCert={(i,patch)=>updateItem('certifications', i, patch)}
            removeCert={(i)=>removeItem('certifications', i)}
            disabled={sending}  // ← idem
            errors={errors}
          />
        )}

        {step === 4 && (
          <SkillsLanguagesSection
            styles={styles}
            fields={fields}
            setField={setField}
            languages={fields.languages}
            pushLang={(item)=>pushItem('languages', item)}
            updateLang={(i,patch)=>updateItem('languages', i, patch)}
            removeLang={(i)=>removeItem('languages', i)}
            disabled={sending}  // ← idem
          />
        )}

        {step === 5 && (
          <PreferencesConsentSection
            styles={styles}
            step={step}
            prev={prev}
            next={next}
            sending={sending}
            errors={errors}
            success={success}
            fields={fields}
            setField={setField}
          />
        )}

        {/* Botonera global: pasos 1–4 => Back / Limpiar sección / Limpiar todo / Next */}
        {step < 5 && (
          <div className={styles.row} style={{ marginTop: 12, gap: 10, justifyContent: 'space-between', flexWrap:'wrap' }}>
            <div style={{ display:'flex', gap:10 }}>
              {step > 1 && (
                <button type="button" className={styles.btnGhost} onClick={prev} disabled={sending}>
                  {TX.buttons.back}
                </button>
              )}
              <button type="button" className={styles.btnGhost} onClick={askClearSection} disabled={sending}>
                {TX.buttons.clearSection}
              </button>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button type="button" className={styles.btnGhost} onClick={askClearAll} disabled={sending}>
                {TX.buttons.clearAll}
              </button>
              <button type="button" className={styles.btnPrimary} onClick={next} disabled={sending}>
                {TX.buttons.next}
              </button>
            </div>
          </div>
        )}

        {/* Paso 5: mantenemos Back/Enviar dentro de PreferencesConsentSection.
            Agregamos SOLO los botones de limpieza global debajo para no duplicar “Next”. */}
        {step === 5 && (
          <div className={styles.row} style={{ marginTop: 12, gap: 10, justifyContent: 'flex-end', flexWrap:'wrap' }}>
            <button type="button" className={styles.btnGhost} onClick={askClearSection} disabled={sending}>
              {TX.buttons.clearSection}
            </button>
            <button type="button" className={styles.btnGhost} onClick={askClearAll} disabled={sending}>
              {TX.buttons.clearAll}
            </button>
          </div>
        )}
      </form>

      {/* Confirmaciones */}
      <ConfirmDialog
        open={confirmSecOpen}
        title={TX.confirm.clearSectionTitle}
        message={TX.confirm.clearSectionMsg}
        confirmText={TX.buttons.confirmYes}
        cancelText={TX.buttons.confirmNo}
        onConfirm={() => { setConfirmSecOpen(false); doClearSectionNow(); }}
        onCancel={() => setConfirmSecOpen(false)}
        disabled={sending}
      />
      <ConfirmDialog
        open={confirmAllOpen}
        title={TX.confirm.clearAllTitle}
        message={TX.confirm.clearAllMsg}
        confirmText={TX.buttons.confirmYes}
        cancelText={TX.buttons.confirmNo}
        onConfirm={() => { setConfirmAllOpen(false); doClearAllNow(); }}
        onCancel={() => setConfirmAllOpen(false)}
        disabled={sending}
      />
      <SuccessDialog
          open={showSuccess}
          iconSrc="/img/logo.jpeg"
          title="¡Felicitaciones y muchas gracias!"
          message="Ya registramos tu postulación en nuestra base de selección. Apenas se abra un puesto acorde, nos comunicaremos."
          primaryText="Aceptar"
          onAccept={() => { setShowSuccess(false); router.push('/'); }}
        />
    </>
  );
}
