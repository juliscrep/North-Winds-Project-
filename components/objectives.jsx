import React from 'react';
import styles from '../Styles/objectives.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { objectivesContent as content } from '/components/constants/objectives.content';

const Objectives = () => {
  return (
    <section className={`${styles.scope} ${styles.wrap} ${styles.themeBordo /* ← usa verde quitando esto */}`}>
      <div className={styles.twoColumnsContainer} aria-labelledby="objectives-heading">
        <div className={styles.column}>
          <Image
            src={content.image.src}
            alt={content.image.alt}
            className={styles.image}
            width={260}
            height={220}
            priority
          />
        </div>

        <div className={styles.textColumn}>
          <span className={styles.kicker}>North Winds S.A.</span>

          <h2 id="objectives-heading" className={styles.title}>
            {content.title1} <strong>{content.title2}</strong>
          </h2>

          <p className={styles.subtitle}>{content.subtitle}</p>
          <div className={styles.divider} />
          <p className={styles.text}>{content.description}</p>

          <div className={styles.btn}>
            <Link className={styles.bn39} href={content.cta.href} aria-label={content.cta.label}>
              <span className={styles.bn39span}>{content.cta.label}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objectives;
