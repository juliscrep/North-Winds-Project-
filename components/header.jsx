import Link from 'next/link';
import styles from "../styles/header.module.css";
import Image from 'next/image'

function Header() {
  return (
    <div className={`contenedor ${styles.barra}`}>
      <nav className={styles.navegacion}>
        <div className={styles.logo} >
          <Link href={"/"}>
            <Image
            alt="logo"
            src={"/img/logo.jpeg"}
            width= {170} 
            height= {120}
            />
          </Link>

        </div>

        <div className={styles.rightItems}>
          <Link href="/" className={styles.itemsColor} >
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
