'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../Styles/carousel.module.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const images = [
  {
    id: 1,
    src: '/img/parque4.webp',
    title: 'maquina 1',
    description: 'NORTH WINDS S.A',
  },
  {
    id: 2,
    src: '/img/parque3.jpg',
    title: 'maquina 11',
    description: 'Energía para el FUTURO',
  },
  {
    id: 3,
    src: '/img/parque6.webp',
    title: 'maquina 12',
    description: 'Soluciones innovadoras',
  },
];

const CustomNextArrow = (props) => {
  const [iconSize, setIconSize] = useState(60);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 300 && windowWidth <= 600) {
        setIconSize(35);
      } else {
        setIconSize(60);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { onClick } = props;
  return (
    <div className={styles.customNextArrow} onClick={onClick}>
      <button className={styles.customNextArrow}>
        <SlArrowRight size={iconSize} />
      </button>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const [iconSize, setIconSize] = useState(60);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 300 && windowWidth <= 600) {
        setIconSize(35);
      } else {
        setIconSize(60);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { onClick } = props;
  return (
    <div className={styles.customPrevArrow} onClick={onClick}>
      <button className={styles.customPrevArrow}>
        <SlArrowLeft className={styles.prevArrow} size={iconSize} />
      </button>
    </div>
  );
};

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <div className={styles.imageOverlay}>
              <Image src={image.src} alt={image.title} className={styles.images} width={1600} height={650} />
              <div className={styles.descriptionOverlay}>{image.description}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
