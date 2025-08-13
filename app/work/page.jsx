'use client';

import React from "react";
import styles from "../../Styles/work.module.css";
import Image from "next/image";
import { workInfo, workImages } from "./work.content";

export default function WorkPage() {
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const imageRows = chunkArray(workImages, 3);

  return (
    <section className={styles.section}>
     
      <h2 className={styles.title}>{workInfo.title}</h2>

   
      <p className={styles.text}>
        Hemos participado activamente en una amplia variedad de proyectos de
        gran envergadura tanto a nivel nacional como internacional. Nuestra
        experiencia abarca regiones como{" "}
        <strong>Venezuela (La Guajira), Brasil (Acarau e Itarema), Uruguay (Sierra de los Caracoles)</strong>,
        y múltiples ubicaciones en Argentina como{" "}
        <strong>
          La Rioja, Bahía Blanca, Río Negro (Pomona), Córdoba (Achiras),
          Chubut y Puerto Madryn
        </strong>
        . Gracias a esta trayectoria, operamos con éxito en todo el territorio
        argentino, consolidándonos como referentes en el sector de energías
        renovables.
      </p>

      
      {imageRows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row}>
          {row.map((src, index) => (
            <div key={`image-${rowIndex * 3 + index}`} className={styles.imageWrapper}>
              <Image
                src={src}
                alt={`Trabajo realizado ${rowIndex * 3 + index + 1}`}
                className={styles.image}
                width={400}
                height={600}
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
