'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../Styles/servicesList.module.css';

import { svgIcons } from './constants/serverList.icon';
import { sections } from './constants/serverList.sections';
import { serverListContent } from './constants/serviceList.content';

export default function ServicesList() {
  const { wind, solar } = serverListContent;

  return (
    <div className={styles.theme}>
      {/* Encabezado Eólico */}
      <section className={styles.wrap}>
        <h2 className={styles.title}>{wind.mainTitle}</h2>
      </section>

      {/* Bloques Eólicos (dos columnas, alternando lado con `reverse`) */}
      {sections.map(({ key, data, img, reverse }) => {
        const icon = svgIcons[key];

        const Media = (
          <div className={styles.column}>
            <div className={styles.media}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={styles.img}
                sizes="(min-width:1200px) 560px, (min-width:900px) 50vw, 100vw"
                quality={90}
              />
            </div>
          </div>
        );

        const Text = (
          <div className={styles.textColumn}>
            <div className={styles.svgContainer}>
              <svg
                className={styles.icon}
                viewBox={icon.viewBox}
                width={icon.width}
                height={icon.height}
                xmlns="http://www.w3.org/2000/svg"
              >
                {icon.extraDefs}
                <defs>
                  {key === 'calidad' ? null : (
                    <style>{`.${key}_svg__cls-1{ fill: currentColor; }`}</style>
                  )}
                </defs>
                {icon.paths.map((d, i) => (
                  <path key={i} className={`${key}_svg__cls-1`} d={d} />
                ))}
              </svg>
            </div>

            <h3 className={styles.title2}>{data.title2}</h3>

            {Array.isArray(data.paragraphs) ? (
              data.paragraphs.map((p, i) => (
                <p key={i} className={styles.text}>
                  {p}
                </p>
              ))
            ) : (
              <p className={styles.text}>{data.paragraphs}</p>
            )}

            {data.listItems && (
              <ul className={`${styles.lista} ${styles.listaTight}`}>
                {data.listItems.map((item, i) => (
                  <li
                    key={i}
                    className={styles.text4}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            )}
          </div>
        );

        return (
          <section id={key} className={styles.expanded} key={key}>
            <div className={styles.twoColumnsContainer}>
              {/* Alterna orden con `reverse` sin trucos de CSS */}
              {reverse ? (
                <>
                  {Text}
                  {Media}
                </>
              ) : (
                <>
                  {Media}
                  {Text}
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* Sección Solar */}
      <div className={styles.section}>
        <section className={styles.wrap}>
          <h2 className={styles.title3}>{solar.mainTitle}</h2>
        </section>

        <p className={styles.text2}>{solar.description}</p>

        <ul className={styles.lista}>
          {solar.listItems.map(({ label, body }, i) => (
            <li key={i} className={styles.text4}>
              <strong>{label}</strong> {body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
