import { serverListContent } from './serviceList.content';

const { wind } = serverListContent;

export const sections = [
  {
    key: 'mantenimiento',
    data: wind.mantenimiento,
    img: wind.mantenimiento.image,
    reverse: false
  },
  {
    key: 'correctivos',
    data: wind.correctivos,
    img: { src: '/img/trabajo9.jpeg', alt: 'Fondo de correctivos', width: 600, height: 300 },
    reverse: true
  },
  {
    key: 'torqueo',
    data: wind.torqueo,
    img: { src: '/img/trabajosRealizados/maquina12.jpeg', alt: 'Máquina torqueo', width: 200, height: 320 },
    reverse: false
  },
  {
    key: 'palas',
    data: wind.palas,
    img: { src: '/img/maquina2.jpeg', alt: 'Máquina palas', width: 200, height: 300 },
    reverse: true
  },
  {
    key: 'inspeccion',
    data: wind.inspeccion,
    img: { src: '/img/inspec.jpg', alt: 'Operación de inspección', width: 600, height: 550 },
    reverse: false
  },
  {
    key: 'calidad',
    data: wind.calidad,
    img: { src: '/img/control.jpeg', alt: 'Control de calidad', width: 650, height: 770 },
    reverse: true
  },
  {
    key: 'obra',
    data: wind.obra,
    img: { src: '/img/turbina.jpg', alt: 'Obra de turbina', width: 650, height: 550 },
    reverse: false
  },
  {
    key: 'turbina',
    data: wind.turbina,
    img: { src: '/img/montajeTurbina.jpeg', alt: 'Montaje de turbina', width: 200, height: 300 },
    reverse: true
  }
];
