'use client';
import React, { useState } from 'react';
import styles from '../../../app/rrhh/rrhh.module.css';
import Stepper from '../Stepper';
import { jobAreas } from '../../../app/rrhh/rrhh.content';
import { submitApplication, validateEmail, validatePhone } from '../../../lib/rrhhClient';

import PersonalContactSection from './sections/PersonalContactSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection from './sections/EducationSection';
import SkillsLanguagesSection from './sections/SkillsLanguagesSection';
import PreferencesConsentSection from './sections/PreferencesConsentSection';

const initial = {
  // Identificación y contacto
  fullName: '', email: '', phone: '',
  documentId: '', birthdate: '', // NUEVO: fecha con calendario
  // Puesto y base
  area: jobAreas[0],                  // SE USA COMO "Puesto al que postulás"
  location: '',                       // Base/Residencia (texto)
  linkedin: '', website: '',
  // Dirección
  address: { country:'', province:'', city:'', addressLine:'', postalCode:'' },
  // Experiencia / Educación / Certificaciones / Idiomas
  experience: [],
  education: [],
  certifications: [],
  languages: [],
  // Skills + carta
  skills: '', message: '',
  // Preferencias (sin seniority; todo texto salvo fecha)
  preferences: {
    contract:'', availability:'', salary:'', schedule:'', // schedule = turnos/horarios
    relocation:'', travel:'' // texto "Sí/No" (no checkbox)
  },
  consent: false
};

export default function ManualFormWizard(){
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');

  const setField = (path, value) => {
    const keys = path.split('.');
    setFields(prev => {
      const copy = structuredClone(prev);
      let obj = copy;
      while (keys.length > 1){
        const k = keys.shift();
        obj[k] = obj[k] ?? {};
        obj = obj[k];
      }
      obj[keys[0]] = value;
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

  const validateStep = (s=step) => {
    const e = {};
    if (s === 1){
      if (!fields.fullName.trim()) e.fullName = 'Ingresá tu nombre completo.';
      if (!validateEmail(fields.email)) e.email = 'Email inválido.';
      if (!validatePhone(fields.phone)) e.phone = 'Teléfono inválido.';
    }
    if (s === 4){
      if (!fields.consent) e.consent = 'Debés aceptar la política de privacidad.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => Math.min(4, s+1)); };
  const prev = () => setStep(s => Math.max(1, s-1));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validateStep(1) || !validateStep(4)) return;
    setSending(true); setSuccess('');
    try {
      const { ok, data } = await submitApplication('manual', fields, null);
      if (ok){
        setSuccess(data?.message || 'Postulación enviada con éxito.');
        setFields(initial);
        setStep(1);
      }else{
        setErrors({ api: data?.error || 'No se pudo enviar. Intentá nuevamente.' });
      }
    } catch {
      setErrors({ api: 'Error de red. Intentá nuevamente.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      <Stepper step={step} />

      {step === 1 && (
        <PersonalContactSection
          styles={styles}
          fields={fields}
          errors={errors}
          setField={setField}
        />
      )}

      {step === 2 && (
        <ExperienceSection
          styles={styles}
          items={fields.experience}
          pushItem={(item)=>pushItem('experience', item)}
          updateItem={(i,patch)=>updateItem('experience', i, patch)}
          removeItem={(i)=>removeItem('experience', i)}
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
        />
      )}

      <PreferencesConsentSection
        styles={styles}
        step={step}
        setStep={setStep}
        prev={prev}
        next={next}
        sending={sending}
        errors={errors}
        success={success}
        fields={fields}
        setField={setField}
      />
    </form>
  );
}
