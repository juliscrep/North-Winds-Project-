'use client';

import { useState } from 'react';
import styles from '../Styles/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks, navLabels } from '/components/constants/header.content';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentLang = 'es';

  const handleToggleMenu = () => setMenuOpen(!menuOpen);
  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <header className={`contenedor ${styles.barra}`}>
      <nav className={styles.navegacion}>
        <div className={styles.logo}>
          <Link href="/">
            <Image alt="Logo North Winds" src="/img/logo1.png" width={150} height={115} />
          </Link>
        </div>

        <button
          onClick={handleToggleMenu}
          className={styles.menuButton}
          aria-label={navLabels[currentLang].openMenu}
        >
          ☰
        </button>

        <div className={`${styles.rightItems} ${menuOpen ? styles.active : ''}`}>
          {navLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className={styles.itemsColor}
              onClick={handleCloseMenu}
            >
              {navLabels[currentLang][key]}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
