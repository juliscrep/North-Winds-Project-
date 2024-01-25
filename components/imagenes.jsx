'use client'

import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../Styles/imagenesStilo.module.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const images = [
  {
    id: 1,
    src: '/img/parque4.webp',
    title: 'maquina 1',
    description:'NORTH WINDS S.A',
  },
  {
    id: 2,
    src: '/img/parque3.jpg',
    title: 'maquina 11',
    description:'Energía para el FUTURO',
  },
  {
    id: 3,
    src: '/img/parque6.webp',
    title: 'maquina 12',
    description:'Soluciones innovadoras',
  },
];

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customNextArrow} onClick={onClick}>  

          <button className={styles.customNextArrow}>
            <SlArrowRight size={60}/>
          </button>
        

    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customPrevArrow} onClick={onClick}>

          <button className={styles.customPrevArrow}>
            <SlArrowLeft size={60}/>
          </button>
        
        
    </div>
  );
};

const CarouselComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000, // Velocidad de transición en milisegundos
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Activar la reproducción automática
    autoplaySpeed: 3000, // Velocidad de cambio de imagen en milisegundos
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <div className={styles.imageOverlay}>
              <Image src={image.src} alt={image.title} width={1700} height={700} />
              <div className={styles.descriptionOverlay}>{image.description}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default CarouselComponent;
