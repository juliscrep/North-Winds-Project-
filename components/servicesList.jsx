'use client';
import React from 'react';
import styles from '../Styles/servicesList.module.css';
import Image from 'next/image';
import {  svgIcons } from './constants/serverList.icon';
import {sections} from './constants/serverList.sections';
import { serverListContent } from './constants/serviceList.content';

const ServicesList = () => {
  const { wind, solar } = serverListContent;
  return (
    <>
      <section>
        <h2 className={styles.title}>{wind.mainTitle}</h2>
      </section>

      {sections.map(({ key, data, img, reverse }) => {
        const icon = svgIcons[key];
        const { src, alt, width, height } = img;
        return (
          <section id={key} className={styles.expanded} key={key}>
            <div className={reverse ? styles.twoColumnsContainer2 : styles.twoColumnsContainer}>
              {!reverse && (
                <div className={styles.column}>
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={styles.image}
                  />
                </div>
              )}

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
                      {key === 'calidad' ? null : <style>{`.${key}_svg__cls-1`}</style>}
                    </defs>
                    {icon.paths.map((d, i) => (
                      <path key={i} className={`${key}_svg__cls-1`} d={d} />
                    ))}
                  </svg>
                </div>

                <h2 className={styles.title2}>{data.title2}</h2>
                <br />

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
                  <ul className={styles.lista}>
                    {data.listItems.map((item, i) => (
                      <li key={i} className={styles.text4} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                )}
              </div>

              {reverse && (
                <div className={styles.column}>
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={styles.image}
                  />
                </div>
              )}
            </div>
          </section>
        );
      })}

      <div className={styles.section}>
        <section>
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
    </>
  );
};

export default ServicesList;