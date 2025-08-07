'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../Styles/carousel.module.css';
import carouselImages from '@/components/constants/carousel.content'

const useResponsiveIconSize = (defaultSize = 60, mobileSize = 35, breakpoint = 600) => {
  const [size, setSize] = useState(defaultSize);

  useEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth <= breakpoint ? mobileSize : defaultSize);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [defaultSize, mobileSize, breakpoint]);

  return size;
};

const CustomArrow = ({ onClick, direction }) => {
  const size = useResponsiveIconSize();
  const Icon = direction === 'next' ? SlArrowRight : SlArrowLeft;
  const className =
    direction === 'next' ? styles.customNextArrow : styles.customPrevArrow;

  return (
    <div className={className} onClick={onClick} role="button" aria-label={`Arrow ${direction}`}>
      <button className={className}>
        <Icon size={size} />
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
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {carouselImages.map(({ id, src, title, description }) => (
          <div key={id} className={styles.imageContainer}>
            <div className={styles.imageOverlay}>
              <Image
                src={src}
                alt={`Imagen de ${title}`}
                className={styles.images}
                width={1600}
                height={650}
                priority={id === 1}
              />
              <div className={styles.descriptionOverlay}>{description}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
