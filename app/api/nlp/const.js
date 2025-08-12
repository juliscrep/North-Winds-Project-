// Sinónimos / alias frecuentes (expandibles)
export const SYNONYMS = {
  // general
  'servicio': [
    'servicios','ofrecen','que ofrecen','qué ofrecen','que brindan',
    'lista','opciones','que tienen','ofrecer','oferta','que servis'
  ],
  'contacto': ['contactarme','comunicarme','correo','email','whatsapp','wsp','wasap','watsap','chat'],
  'horario': ['horarios','atencion','cuando atienden','a que hora','abren','cierran','disponible','jornada','turnos'],
  'ubicacion': ['ubicación','direccion','dirección','donde estan','donde','mapa','localizacion','gps','aimogasta','la rioja'],
  // eólicos
  'mantenimiento': ['o&m','operacion','operación','service','revisiones','check'],
  'correctivos': ['grandes correctivos','correctivo mayor','averias','fallos','reparacion mayor','restauracion','multiplicadora'],
  'torqueo': ['tensionado','apriete','pernos','ajuste','pares de apriete','tensiones','calibrado'],
  'palas': ['helices','aspas','cuchillas','grietas','revision de palas','reparacion de palas'],
  'inspeccion': ['inspección','componentes principales','grandes componentes','torre','nacelle','tren de potencia'],
  'calidad': ['control de calidad','auditoria','normas','estandares','certificacion','qa','qc'],
  'obra': ['inspección en obra','supervision','monitoreo','vigilancia','seguimiento','inspector de obra'],
  'montaje': ['montaje de turbinas','levantar torre','instalacion','rotor','ensamble'],
  // solares
  'solar': ['parques solares','paneles','fotovoltaico','modulos','limpieza de paneles','termografico','hotspots','redes'],
  // extra
  'flushing': ['flushin','cambio de aceite','flush','aceite'],
  'repintado': ['repintar','pintura','limpieza y repintado'],
  '3m': ['cinta 3m','borde de ataque','parches'],
  'mt': ['media tension','mt','bt','baja tension','transformadores','tableros']
}

// Ponderaciones (afinadas)
export const WEIGHTS = {
  exactPhrase: 3.2,
  tokenExact: 1.2,
  tokenSynonym: 1.0,
  tokenFuzzy: 0.6,   // menos peso al fuzzy
  keywordHit: 2.2
}

export const SERVICE_HINT_STEMS = new Set([
  'servici','presupuest','horari','ubic','ubicacion','contact','contacto','whatsapp','email','correo','telefono','llam',
  'eolic','solar','manten','correctiv','pal','torque','inspeccion','calidad','obra','montaj',
  'flushing','repint','transform','subestacion','red','mt','bt','borde','3m','hotspot',
  'rrhh','cv','empleo','trabajar','postular','busc','vacante'
])

// ——— Intenciones / Tópicos ———
export const CONVERSATIONAL_TOPICS = new Set([
  'saludo','smalltalk','gracias','despedida','quien_soy','ayuda_menu',
  'no_relacionado','error_entendimiento','tiempos_respuesta','redes_web','humano'
])