import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../Styles/card.module.css";

const Card = ({ image, title, slug }) => {
  return (
    <article className={styles.card}>
      <Link href={`/services#${slug}`} className={styles.link} aria-label={title}>
        <div className={styles.media}>
          <Image
            src={image}
            alt={`Servicio: ${title}`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className={styles.image}
            priority={false}
          />
          <div className={styles.overlay}></div>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
    </article>
  );
};

export default Card;
