import React from 'react';
import styles from '../Styles/objectives.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { objectivesContent as content } from '/components/constants/objectives.content';

const Objectives = () => {
  return (
    <div className={styles.twoColumnsContainer}>
      <div className={styles.column}>
        <Image
          src={content.image.src}
          alt={content.image.alt}
          className={styles.image}
          width={400}
          height={550}
          priority
        />
      </div>

      <div className={styles.textColumn}>
        <h2 className={styles.title}>{content.title1}</h2>
        <h2 className={styles.title2}>{content.title2}</h2>

        <p className={styles.text}>{content.description}</p>

        <div className={styles.btn}>
          <Link className={styles.bn39} href={content.cta.href}>
            <span className={styles.bn39span}>{content.cta.label}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Objectives;
