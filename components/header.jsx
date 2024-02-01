'use client'

import { useState, useEffect } from 'react';
import styles from '../Styles/header.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
 
  const [isMenuActive, setMenuActive] = useState(false);

 
  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };

  useEffect(() => {
    setMenuActive(false);
  }, []);

  return (
    <div className={`contenedor ${styles.barra}`}>
      <nav className={styles.navegacion}>
        <div className={styles.logo}>
          <Link href="/">
            <Image alt="logo" src="/img/logo.jpeg" width={160} height={105} />
          </Link>
        </div>

        <button onClick={toggleMenu} className={styles.menuButton}>
          ☰
        </button>

        
        <div className={`${styles.rightItems} ${isMenuActive ? styles.active : ''}`}>
          <Link href="/" className={styles.itemsColor}>
            Inicio
          </Link>
          <Link href="/about" className={styles.itemsColor}>
            Acerca de
          </Link>
          <Link href="/services" className={styles.itemsColor}>
            Servicios
          </Link>
          <Link href="/contact" className={styles.itemsColor}>
            Contacto
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
