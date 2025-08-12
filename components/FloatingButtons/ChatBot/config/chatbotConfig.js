// ———————————————————————————————————————————————————————
// FAQs PRINCIPALES
// ———————————————————————————————————————————————————————
export const faqs = [
  // ——— General / Navegación ———
  {
    topic: 'servicios',
    keywords: [
      'servicios','que servicios tienen','lista de servicios','opciones de servicio',
      'que me podes ofrecer','qué me podes ofrecer','que ofrecen','qué ofrecen',
      'que brindan','qué brindan','que hacen','qué hacen','que servis','servis',
      'soluciones','portfolio','portafolio','carta de servicios'
    ],
    answer:
      'Trabajamos en parques eólicos y parques solares, ofreciendo soluciones integrales. ' +
      'Podés consultarnos por: Mantenimiento, Grandes correctivos, Torqueo y tensionado, ' +
      'Revisión y reparación de palas, Inspecciones, Control de calidad, Obra y Montaje. ' +
      'Si querés dejarnos tu número para coordinar una llamada, abrí Contacto (botón superior).'
  },
  {
    topic: 'horario',
    keywords: [
      'horario','horarios','horas de atencion','a que hora atienden','hasta que hora',
      'cuando atienden','abren','abren hoy','cierran','cerrado','disponible','jornada','turnos'
    ],
    answer:
      'Atendemos lunes a viernes de 08:00–12:00 y 14:00–18:00 (ART). ' +
      'Si necesitás coordinar fuera de ese horario, dejá tu consulta via email y te respondemos a la brevedad.'
  },
  {
    topic: 'presupuesto',
    keywords: [
      'presupuesto','presu','cotizacion','cotización','cotizar','propuesta',
      'precio','precios','costos','tarifas','tarifa','valor','estimacion','estimación',
      'cuanto sale','cuánto sale','cuanto cuesta','cuánto cuesta','budget'
    ],
    answer:
      'Realizamos presupuestos a medida. Contanos el tipo de servicio y la escala del proyecto ' +
      'para estimar con precisión. Si preferís, dejá tu número en Contacto (botón superior) y ' +
      'te llamamos para relevar lo necesario.'
  },
  {
    // 🔸 Unificamos intención de “hablar con alguien / coordinar llamada / WhatsApp”
    topic: 'contacto',
    keywords: [
      // contacto directo
      'contacto','contactarme','comunicarme','comunicarse','escribirles','correo','email',
      'whatsapp','wsp','wasap','watsap','chat',
      // coordinar llamada / hablar con humano
      'coordinar un llamado','coordinemos un llamado','prefiero coordinar un llamado',
      'quiero coordinar un llamado','coordinamos llamada','coordinemos llamada',
      'quiero hablar','quiero hablar con un asesor','hablar con alguien','hablar con humano',
      'llamada','llamado','llamar','llamame','me llaman','pueden llamarme','telefono real'
    ],
    answer:
      'Podés presionar el logo de WhatsApp para comunicarte con un humano o enviarnos un email desde el botón de Contacto. ' +
      'El chat no tiene comunicación externa, por lo que no dejes datos personales aquí.'
  },
  {
    topic: 'ubicacion',
    keywords: [
      'ubicacion','ubicación','ubicados','donde estan','donde están','en donde','donde',
      'donde se encuentran','donde quedan','donde queda','donde estan ubicados','ubicados donde',
      'direccion','dirección','domicilio','address','mapa','map'
    ],
    answer:
      'Estamos en RN60 y Av. 24 de Mayo, Aimogasta, La Rioja, Argentina (CP 5310). ' +
      'En la web podés ver el mapa desde la sección Contacto.'
  },

  // ——— EÓLICOS ———
  {
    topic: 'eolico_mantenimiento',
    keywords: [
      'mantenimiento','mantenimiento general','operacion','operación','soporte',
      'revisiones','revision','check','service aerogeneradores','o&m','o&m eolico'
    ],
    answer:
      'Realizamos operación y mantenimiento (O&M) en parques eólicos: inspecciones periódicas, ' +
      'ajustes preventivos y correctivos ágiles para sostener el rendimiento y la disponibilidad de los equipos.'
  },
  {
    topic: 'eolico_correctivos',
    keywords: [
      'grandes correctivos','correctivos','correctivo mayor','averias','averías',
      'fallos','reparacion mayor','reparación mayor','restauracion','cambio de componentes','multiplicadora'
    ],
    answer:
      'Ejecutamos grandes correctivos sobre componentes críticos (multiplicadora, generador, palas, etc.), ' +
      'incluyendo diagnóstico, reparación o reemplazo y pruebas finales para asegurar seguridad y performance.'
  },
  {
    topic: 'eolico_torqueo',
    keywords: [
      'torqueo','tensionado','apriete','pernos','ajuste',
      'pares de apriete','tensiones','calibrado'
    ],
    answer:
      'Realizamos torqueo y tensionado con herramientas calibradas para garantizar el par y la tensión adecuados, ' +
      'evitando aflojamientos y preservando la integridad estructural.'
  },
  {
    topic: 'eolico_palas',
    keywords: [
      'palas','reparacion de palas','reparación de palas','revision de palas','hélices','aspas',
      'cuchillas','grietas','daños en palas','borde de ataque','cinta 3m','parches'
    ],
    answer:
      'Inspeccionamos y reparamos palas utilizando drones y cámaras de alta resolución para detectar daños, ' +
      'y aplicamos técnicas de reparación que recuperan su aerodinámica y resistencia.'
  },
  {
    topic: 'eolico_inspecciones',
    keywords: [
      'inspeccion','inspección','grandes componentes','componentes principales',
      'torre','generador','tren de potencia','nacelle'
    ],
    answer:
      'Realizamos inspecciones de grandes componentes (torre, góndola, tren de potencia, etc.) con métodos no destructivos, ' +
      'identificando desgaste y fisuras para intervenir a tiempo.'
  },
  {
    topic: 'eolico_calidad',
    keywords: [
      'control de calidad','calidad','auditoria','auditoría','normas','estandares','estándares',
      'certificacion','certificación','verificacion','verificación','qa','qc','montaje calidad'
    ],
    answer:
      'Implementamos control de calidad en cada etapa: instalación, pruebas y verificación de parámetros ' +
      'bajo normas y procedimientos, con informes de trazabilidad.'
  },
  {
    topic: 'eolico_obra',
    keywords: [
      'obra','inspeccion en obra','inspección en obra','servicio en obra','supervision',
      'supervisión','monitoreo','vigilancia','seguimiento','inspector de obra'
    ],
    answer:
      'Acompañamos en obra con inspección y supervisión técnica: montaje, pruebas y puesta en marcha, ' +
      'para asegurar una ejecución segura y conforme a especificaciones.'
  },
  {
    topic: 'eolico_montaje',
    keywords: [
      'montaje','montaje de turbinas','levantar torre','instalacion','instalación',
      'rotor','generador','palas','ensamble'
    ],
    answer:
      'Ejecutamos montaje de turbinas eólicas: elevación de torres, ensamblado de generador y palas, ' +
      'con equipos y procedimientos específicos para garantizar precisión y seguridad.'
  },

  // ——— SOLARES ———
  {
    topic: 'solar_servicios',
    keywords: [
      'parques solares','solar','paneles solares','fotovoltaico','energia solar','energía solar',
      'modulos','módulos','limpieza de paneles','termografico','termográfico',
      'puntos calientes','hotspots','redes','subestaciones','transformadores'
    ],
    answer:
      'Ofrecemos servicios en parques solares: mantenimientos preventivos, limpieza con robots, revisión de cableado, ' +
      'control de estructuras y fundaciones, termografía de conexiones, mantenimiento de redes (MT/BT y subestaciones), ' +
      'inspecciones visuales, detección de hotspots, reemplazo de estructuras y análisis de aceite en transformadores.'
  },

  // ——— EMPRESA ———
  {
    topic: 'empresa_objetivo',
    keywords: [
      'objetivo','mision','misión','proposito','propósito',
      'meta','finalidad','vision','visión','compromiso'
    ],
    answer:
      'Nos enfocamos en brindar un servicio de alta calidad, eficiente y confiable, ' +
      'para superar las expectativas de cada cliente en el sector energético.'
  }
]

// ———————————————————————————————————————————————————————
// FAQs EXTRA
// ———————————————————————————————————————————————————————
export const faqsExtra = [
  {
    topic: 'ambito_geografico',
    keywords: [
      'donde trabajan','en que lugares','en que zonas','ambito','ambito geografico','ámbito geográfico',
      'provincias','pomona','achiras','bahia blanca','bahía blanca','rio negro','río negro','chubut','puerto madryn'
    ],
    answer:
      'Operamos en todo el territorio argentino. Experiencia en parques de La Rioja, Bahía Blanca, Río Negro (Pomona), Córdoba (Achiras), Chubut y Puerto Madryn.'
  },
  {
    topic: 'exterior',
    keywords: [
      'exterior','internacional','fuera del pais','fuera del país',
      'trabajan en el exterior','proyectos en otros paises','uruguay','brasil','venezuela','mexico','méxico'
    ],
    answer:
      'Sí, trabajamos también en el exterior. Hemos participado en proyectos en Venezuela (La Guajira), Brasil (Acarau e Itarema) y Uruguay (Sierra de los Caracoles).'
  },
  {
    topic: 'disponibilidad',
    keywords: [
      'disponibilidad','cuando pueden','agenda','turnos largos',
      'disponibilidad nacional','disponibilidad internacional','disponibles'
    ],
    answer:
      'Ofrecemos disponibilidad nacional e internacional, adaptándonos a la necesidad de cada proyecto (ventanas, turnos y cronogramas).'
  },
  {
    topic: 'rrhh_postulaciones',
    keywords: [
      'ofrecen trabajo','busqueda de personal','buscando personal','estan tomando','están tomando',
      'empleo','trabajo','rrhh','recursos humanos','enviar cv','curriculum','currículum','postular'
    ],
    answer:
      'Estamos en expansión y recibimos postulaciones. Si tu perfil se ajusta a la empresa, enviá tu CV a northwinds1223@gmail.com.'
  },
  {
    topic: 'equipo_certificaciones',
    keywords: [
      'formacion','formación','capacitacion','capacitación','certificaciones',
      'equipo','experiencia','wtc','wind training center','cursos','certificados'
    ],
    answer:
      'Nuestro equipo está conformado por técnicos y profesionales con experiencia en energías renovables desde 2010. Contamos con certificaciones del Wind Training Center (WTC), asegurando altos estándares de calidad y seguridad.'
  },
  {
    topic: 'flushing',
    keywords: [
      'flushing','flushin','cambio de aceite','enfriamiento','limpieza interna de aceite'
    ],
    answer:
      'Realizamos cambio de aceite y procesos de Flushing en trenes de potencia y sistemas asociados, garantizando limpieza y parámetros adecuados del lubricante.'
  },
  {
    topic: 'repintado_torres',
    keywords: [
      'repintado','pintura','limpieza y repintado de torres'
    ],
    answer:
      'Ofrecemos limpieza y repintado de torres para preservar la integridad y extender la vida útil de la estructura.'
  },
  {
    topic: 'borde_ataque_palas',
    keywords: [
      'borde de ataque','parches','cinta 3m','cinta 3 m','reparacion palas borde de ataque','reparación palas borde de ataque'
    ],
    answer:
      'En palas realizamos colocación de parches, reparación de borde de ataque y aplicación/reemplazo de cinta 3M para recuperar aerodinámica y resistencia.'
  },
  {
    topic: 'redes_mt_bt',
    keywords: [
      'lineas mt','lineas bt','media tension','baja tension',
      'mantenimiento transformadores','tableros de media','subestaciones'
    ],
    answer:
      'Mantenimiento en redes MT/BT y subestaciones: revisión de cableado, tableros de media, transformadores y análisis de aceite cuando corresponde.'
  }
]

// ———————————————————————————————————————————————————————
// FAQs CONVERSACIONALES (sin cambios de answers, pero ojo con colisión)
// ———————————————————————————————————————————————————————
export const faqsConversacional = [
  { topic: 'saludo',
    keywords: ['hola','hola como estas','hola que tal','buen dia','buenos dias','buenas','buenas tardes','buenas noches','hello','hi','hey'],
    answer: '¡Hola! 😊 Soy el asistente de North Winds. Puedo ayudarte con info de servicios en parques eólicos y solares, horarios, ubicación y presupuestos. ¿Querés que te cuente rápido qué hacemos o preferís dejar tu número en Contacto para hablar con una persona?'
  },
  { topic: 'smalltalk',
    keywords: ['como estas','todo bien','que tal','como andas','como va'],
    answer: '¡Todo bien, gracias por preguntar! 🙌 Contame, ¿buscás información de servicios, un presupuesto o preferís coordinar un llamado? Si querés, dejá tu número desde Contacto y te llamamos.'
  },
  { topic: 'ayuda_menu',
    keywords: ['ayuda','menu','no entiendo','opciones','que podes hacer','que haces','me ayudas','necesito ayuda'],
    answer: 'Estoy para ayudarte. Podés preguntarme por: Servicios, Presupuesto, Horario, Ubicación, Contacto o Disponibilidad. Si preferís atención humana, dejá tu teléfono en Contacto y coordinamos una llamada.'
  },
  // 🔸 mantenemos redes_web pero el servidor lo colapsa a contacto
  { topic: 'redes_web',
    keywords: ['instagram','redes','pagina web','sitio','web','linkedin'],
    answer: 'Podés escribirnos por este chat o por correo (northwinds1223@gmail.com). Desde la sección Contacto (botón superior) también encontrás nuestras redes y el mapa para ubicarnos.'
  },
  { topic: 'gracias',
    keywords: ['gracias','muchas gracias','mil gracias','te agradezco'],
    answer: '¡Gracias a vos por escribirnos! 🙏 ¿Querés que te comparta el listado de servicios o preferís coordinar un llamado desde Contacto?'
  },
  { topic: 'despedida',
    keywords: ['chau','adios','hasta luego','nos vemos','saludos'],
    answer: '¡Gracias por tu tiempo! 👋 Si más tarde necesitás algo, volvé a escribirme o dejá tu teléfono en Contacto y te llamamos.'
  },
  { topic: 'quien_soy',
    keywords: ['quien sos','quienes son','que es este chat','sos un bot','sos robot','asistente','atencion automatica'],
    answer: 'Soy el asistente de North Winds. Te ayudo a obtener información rápida sobre servicios, horarios, ubicación y presupuestos. Si preferís hablar con una persona, dejá tu número en Contacto o escribinos a northwinds1223@gmail.com y te llamamos.'
  },
  { topic: 'tiempos_respuesta',
    keywords: ['tiempo de respuesta','cuando responden','tardan','respuesta','me contestan','urgente','emergencia'],
    answer: 'Respondemos de lunes a viernes de 08:00–12:00 y 14:00–18:00 (ART). Si es urgente, dejá tu número en Contacto o escribinos a northwinds1223@gmail.com y lo priorizamos.'
  },
  { topic: 'no_relacionado',
    keywords: ['hola estas ahi','estas ahi','probando','prueba','que opinas','como funciona','necesito informacion','consulta general','tengo una duda'],
    answer: '¡Acá estoy! 🙌 Contame en qué puedo ayudarte. Si tu consulta es sobre nuestros servicios, presupuestos, horarios o ubicación, te respondo al instante. Y si preferís, dejá tu número en Contacto y te llama un asesor.'
  },
  { topic: 'error_entendimiento',
    keywords: ['no se','no entiendo','no me ayudaste','no me sirve','estas mal','no es eso'],
    answer: 'Gracias por decirme 🙏. Probemos así: ¿Querés info de Servicios, Presupuesto, Horario, Ubicación o Contacto humano? También podés dejarnos tu número en Contacto y te llama un asesor.'
  }
]

export const faqsAll = [...faqs, ...faqsConversacional, ...faqsExtra]
