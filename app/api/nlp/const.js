// Sinónimos / alias frecuentes (claves en STEM según lightStem)
export const SYNONYMS = {
  // ——— General / navegación
  servicio: [
    'servicios','ofrecen','que ofrecen','qué ofrecen','que brindan',
    'lista','opciones','que tienen','ofrecer','oferta','que servis','qué servis',
    'qué hacen','que hacen','hacen','prestaciones','portfolio de servicios','catálogo de servicios','catalogo de servicios'
  ],
  contacto: [
    'contactarme','comunicarme','correo','email','mail','whatsapp','wsp','wasap','watsap','watsapp','whatsap','whats','wa','wpp',
    'cel','celular','movil','móvil','telefono','teléfono','llamar','llamada','llámenme','escribir','escribirme',
    'instagram','ig','mensaje directo','dm'
  ],
  horario: [
    'horarios','atencion','atención','cuando atienden','a que hora','a qué hora','abren','cierran','disponible',
    'jornada','turnos','horario de atencion','hora','mañana','tarde','feriados','finde','fin de semana'
  ],
  ubicacion: [
    'ubicación','direccion','dirección','donde estan','donde','dónde','mapa','localizacion','localización','gps',
    'ubicados','sede','oficina','como llegar','cómo llegar','map','google maps',
    'aimogasta','la rioja','rn60','av 24 de mayo'
  ],

  // ——— Eólicos
  mantenimiento: [
    'o&m','operacion','operación','service','revisiones','revision','check','mantenimiento general','preventivo','correctivo'
  ],
  correctivo: [
    'grandes correctivos','correctivo mayor','averias','averías','fallos','fallas','reparacion mayor','reparación mayor',
    'restauracion','restauración','multiplicadora','gearbox','generador','palas','hub','pitch','yaw'
  ],
  torqueo: [
    'tensionado','tensionar','torquear','apriete','apretar','pernos','tornillos','ajuste','pares de apriete',
    'tensiones','calibrado','llave dinamometrica','llave dinamométrica'
  ],
  pala: [
    'palas','helices','hélices','aspas','cuchillas','grietas','fisuras','fisura','erosion','erosión',
    'borde de ataque','leading edge','lep','proteccion de borde','protección de borde','parches','cinta 3m','film 3m'
  ],
  inspeccion: [
    'inspección','componentes principales','grandes componentes','torre','nacelle','nacele','góndola','gondola',
    'tren de potencia','end','ndt','ultrasonido','liquidos penetrantes','líquidos penetrantes','boroscopia',
    'termografia','termografía','dron','drone'
  ],
  calidad: [
    'control de calidad','auditoria','auditoría','normas','estandares','estándares','certificacion','certificación',
    'qa','qc','comisionado','commissioning','trazabilidad','procedimientos'
  ],
  obra: [
    'inspección en obra','supervision','supervisión','monitoreo','vigilancia','seguimiento','inspector de obra','hse','seguridad','site'
  ],
  montaje: [
    'montaje de turbinas','levantar torre','ereccion','erección','instalacion','instalación','rotor','ensamble',
    'izaje','grua','grúa','comisionamiento','puesta en marcha'
  ],

  // ——— Solares
  solar: [
    'parques solares','paneles','paneles solares','fotovoltaico','fotovoltaica','pv','modulos','módulos',
    'limpieza de paneles','robot de limpieza','termografico','termográfico','termografia','termografía',
    'hotspots','hotspot','redes','cableado','string','inversor','inverter','tracker','estructuras','fundaciones',
    'subestaciones','mt','bt','analisis de aceite','análisis de aceite','transformadores'
  ],

  // ——— Extra (mecánicos / eléctricos)
  flushing: ['flushin','cambio de aceite','flush','aceite','aceite de multiplicadora'],
  repintad: ['repintar','pintura','pintado','limpieza y repintado','coating','antiuv','anti uv'],
  '3m': ['cinta 3m','borde de ataque','parches','film','protector 3m'],
  mt: [
    'media tension','media tensión','bt','baja tension','baja tensión','transformadores','tableros','celdas','seccionadores',
    'gabinetes','ensayo de aceite','termografia en tableros'
  ],

  // ——— Empresa / RRHH / Ámbito (agregados)
  rrhh: [
    'recursos humanos','talento','postulaciones','postulacion','postular','trabajo','trabajar','empleo','vacantes','vacante',
    'curriculum','currículo','curriculo','cv','enviar cv','sumarme al equipo'
  ],
  equipo: ['personal','tecnicos','técnicos','profesionales','plantel','cuadrilla'],
  certificacion: ['certificaciones','certificado','wtc','wind training center','gwo'],
  ambito: [
    'ámbito geografico','ambito geografico','zonas','provincias','donde trabajan','alcance nacional','argentina',
    'bahia blanca','rio negro','pomona','cordoba','achiras','chubut','puerto madryn','la rioja'
  ],
  exterior: [
    'internacional','otros paises','exterior','uruguay','brasil','venezuela','sierra de los caracoles','acarau','itarema','la guajira'
  ],
  disponibilidad: ['agenda','plazos','cuando pueden','urgente','disponible','fechas']
}

// Ponderaciones (afinadas suavemente; mantenemos exactPhrase/keywordHit)
export const WEIGHTS = {
  exactPhrase: 3.2,
  tokenExact: 1.3,
  tokenSynonym: 1.1,
  tokenFuzzy: 0.4,      // ↓ menos peso fuzzy
  keywordHit: 2.2
}

// Pistas de intención de servicio (stems reales según lightStem)
export const SERVICE_HINT_STEMS = new Set([
  // generales
  'servicio','presupuesto','horario','ubicacion','ubicad','contacto','whatsapp','email','correo','telefono','llamar','instagram','ig',

  // eólicos / solares
  'eolico','solar','mantenimiento','correctivo','pala','torqueo','inspeccion','calidad','obra','montaje',
  'flushing','repintad','transformador','subestacion','red','mt','bt','borde','3m','hotspot',

  // rrhh / empresa / alcance
  'rrhh','cv','empleo','trabajar','postular','busqueda','vacante',
  'equipo','certificacion','wtc','ambito','exterior','internacional','disponibilidad','agenda'
])

// ——— Intenciones / Tópicos “conversacionales” (no negocio)
export const CONVERSATIONAL_TOPICS = new Set([
  'saludo','smalltalk','gracias','despedida','quien_soy','ayuda_menu',
  'no_relacionado','error_entendimiento','tiempos_respuesta','redes_web','humano','policy_numeros'
])
