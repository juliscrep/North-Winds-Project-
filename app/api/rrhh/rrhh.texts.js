// /app/rrhh/rrhh.texts.js
export const TX = {
  // 5 pasos: ahora "Preferencias y Envío" es el final
  stepper: ['Datos', 'Experiencia', 'Educación', 'Habilidades', 'Preferencias y Envío'],

 buttons: {
    next: 'Siguiente',
    back: 'Atrás',
    send: 'Enviar postulación',
    sending: 'Enviando…',
    remove: 'Eliminar',
    clear: 'Limpiar',
    clearSection: 'Limpiar sección',
    clearAll: 'Limpiar todo',
    addExperience: 'Agregar experiencia',
    addEducation: 'Agregar formación',
    addCert: 'Agregar certificación',
    addLanguage: 'Agregar idioma',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirmYes: 'Sí, limpiar',
    confirmNo: 'Cancelar',
  },
  confirm: {
    clearAllTitle: 'Restablecer formulario',
    clearAllMsg: 'Vas a borrar todos los datos de todas las secciones. ¿Querés continuar?',
    clearSectionTitle: 'Limpiar sección',
    clearSectionMsg: 'Vas a borrar los datos de la sección actual. ¿Querés continuar?',
  },

  labels: {
    experience: 'Experiencia laboral',
    fullName: 'Nombre y apellido',
    email: 'Email',
    phone: 'Teléfono',
    documentId: 'Documento / ID',
    birthdate: 'Fecha de nacimiento',
    roleApplying: 'Puesto al que postulás',
    base: 'Base/Residencia',
    linkedin: 'LinkedIn (opcional)',

    country: 'País',
    province: 'Provincia/Estado',
    city: 'Ciudad',
    addressLine: 'Dirección',
    postalCode: 'Código postal',

    company: 'Empresa',
    role: 'Puesto',
    start: 'Inicio',
    end: 'Fin',
    current: 'Trabajo actual',
    workLocation: 'Ubicación del trabajo',
    area: 'Área/Sector',
    equipment: 'Equipos/tecnologías',
    responsibilities: 'Responsabilidades',
    achievements: 'Logros',

    education: 'Formación académica',
    institution: 'Institución',
    degree: 'Título / Carrera',
    field: 'Orientación / Área',
    eduStart: 'Inicio',
    eduEnd: 'Fin',
    status: 'Estado',

    certifications: 'Certificaciones',
    certName: 'Nombre',
    issuer: 'Entidad emisora',
    issued: 'Emitida',
    expires: 'Expira',
    credentialId: 'ID Credencial',
    url: 'URL (opcional)',

    skills: 'Habilidades/Stack',
    languages: 'Idiomas',
    language: 'Idioma',
    level: 'Nivel',
    message: 'Carta/Mensaje (opcional)',

    contract: 'Tipo de contrato',
    availability: 'Fecha de disponibilidad',
    salary: 'Pretensión salarial (opcional)',
    schedule: 'Horarios/Turnos',
    relocation: 'Reubicación (Sí/No)',
    travel: 'Viajes (Sí/No)',

    consent: 'Acepto la política de privacidad',
  },

  placeholders: {
    fullName: 'Tu nombre completo',
    email: 'tunombre@correo.com',
    phone: '+54 9 11 ...',
    documentId: 'DNI / Pasaporte',
    base: 'Ciudad / Provincia / País',
    linkedin: 'https://www.linkedin.com/in/usuario',
    country: '',
    province: '',
    city: '',
    addressLine: '',
    postalCode: '',
    equipment: 'Multiplicadora, generador, MT/BT, palas, torqueado, etc.',
    responsibilities: '',
    achievements: '',
    degree: '',
    field: '',
    status: 'En curso / Completo',
    credentialId: '',
    url: '',
    skills:
      'Ej: Mantenimiento preventivo y correctivo, torqueado/tensionado, grandes correctivos, inspección de palas con drones, QA/QC, HSE, MT/BT, subestaciones, termografía, análisis de aceite, montaje.',
    languageLevel: 'A1–C2 / Nativo',
    message: 'Contanos por qué te interesa el puesto y disponibilidad para proyectos.',
    contract: 'Full-time / Part-time / Por proyecto',
    salary: 'Ej: 2.000.000 netos ARS',
    schedule: 'Ej: Rotativos, 14x14, fines de semana',
    relocation: 'Sí / No',
    travel: 'Sí / No',
  },

  hints: {
    expIntro:
      'Detallá trabajos en parques eólicos/solares, O&M, correctivos mayores, palas, QA/QC, HSE, MT/BT, montaje, etc.',
    eduIntro:
      'Ej: Técnico Mecánico/Electricista, Ing. Electromecánico, cursos HSE, QA/QC, MT/BT, palas.',
    certIntro:
      'Ej: Trabajos en altura, rescate, habilitación MT/BT, GWO, NDT, etc.',
    languagesIntro: 'Niveles: A1–C2 o Nativo.',
  },

  errors: {
    fullName: 'Ingresá tu nombre completo.',
    email: 'Email inválido.',
    phone: 'Teléfono inválido.',
    consent: 'Debés aceptar la política de privacidad.',
    api: 'No se pudo enviar. Intentá nuevamente.',
    net: 'Error de red. Intentá nuevamente.',

    // nuevas (fechas)
    dateMin: 'La fecha debe ser posterior a 1960.',
    dateFuture: 'La fecha no puede ser futura.',
    periodOrder: 'La fecha de fin no puede ser anterior al inicio.',
    availabilityPast: 'La disponibilidad no puede ser en el pasado.',
    issuedFuture: 'La fecha de emisión no puede ser futura.',
    expiresBeforeIssued: 'La fecha de expiración no puede ser anterior a la emisión.',
    birthdateInvalid: 'Fecha de nacimiento inválida.',
  },

  success: { sent: 'Postulación enviada con éxito.' },

  misc: { currentNow: 'Actual' },
};
