import React from 'react';
import styles from '../Styles/card.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ image, title, slug }) => {
 

  return (
      <div className={styles.card}>
        <Link href={`/${slug}`} passHref>
          <Image src={image} alt={title} width={800} height={800} />
          <div className={styles.overlay}>
            <h3>{title}</h3>
          </div> 
        </Link>     
      </div>
          
  );
};
  
export default Card;
  