'use client'

import { useState } from 'react';
import styles from '../Styles/header.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  const [isMenuActive, setMenuActive] = useState(false);

  const closeMenu = () => {
    setMenuActive(false);
  };

  const toggleMenu = () => {
    setMenuActive(!isMenuActive);
  };

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
          <Link href="/" className={styles.itemsColor} onClick={closeMenu}>
            Inicio
          </Link>
          <Link href="/about" className={styles.itemsColor} onClick={closeMenu}>
            Acerca de
          </Link>
          <Link href="/work" className={styles.itemsColor} onClick={closeMenu}>Trabajos</Link>
          <Link href="/services" className={styles.itemsColor} onClick={closeMenu}>
            Servicios
          </Link>
          <Link href="/contact" className={styles.itemsColor} onClick={closeMenu}>
            Contacto
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
