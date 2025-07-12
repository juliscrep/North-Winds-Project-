import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import styles from "../Styles/card.module.css";

const Card = ({ image, title, slug }) => {
  return (
    <div className={styles.card}>
      <Link href={`/services#${slug}`}>
        <div className={styles.imageWrapper}>
          <Image src={image} alt={`Servicio: ${title}`} width={800} height={800} />
          <div className={styles.overlay}>
            <h3 className={styles.cardText}>{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Card;
