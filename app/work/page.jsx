'use client';

import React from "react";
import styles from "../../Styles/work.module.css";
import Image from "next/image";
import { workInfo, workImages } from "./work.content";

export default function WorkPage() {
  return (
    <>
      <section>
        <h2 className={styles.title}>{workInfo.title}</h2>
      </section>

      <p className={styles.text}>{workInfo.description}</p>

      <div className={styles.column}>
        {workImages.slice(0, 3).map((src, index) => (
          <Image
            key={`image-top-${index}`}
            src={src}
            alt={`Trabajo realizado ${index + 1}`}
            className={styles.image}
            width={350}
            height={550}
          />
        ))}
      </div>

      <div className={styles.column}>
        {workImages.slice(3).map((src, index) => (
          <Image
            key={`image-bottom-${index}`}
            src={src}
            alt={`Trabajo realizado ${index + 4}`}
            className={styles.image}
            width={350}
            height={550}
          />
        ))}
      </div>
    </>
  );
}
