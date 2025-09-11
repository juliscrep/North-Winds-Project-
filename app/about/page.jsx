import Image from "next/image";
import styles from "/Styles/about.module.css";

import {
  aboutText,
  certificationText,
  certificationPDFs,
  certificationDocs,
  inspectionDocs,
  inspection2025Docs,
} from "./about.content";

const AboutPage = () => {
  return (
    <>
    
      <section className={styles.aboutHero} aria-labelledby="about-heading">
        <div className={styles.mediaCol}>
          <Image
            className={styles.image}
            alt="Video institucional"
            src="/img/video.gif"
            width={600}
            height={500}
            priority
          />
        </div>

        <div className={styles.textCol}>
          <h1 id="about-heading" className={styles.colorTitle}>
            {aboutText.title}
          </h1>
          <div className={styles.divider} />
          <p className={styles.aboutText}>{aboutText.paragraph1}</p>
          <p className={styles.aboutText}>{aboutText.paragraph2}</p>
        </div>
      </section>

      <section className={styles.valuesSection} aria-labelledby="values-heading">
        <div className={styles.container}>
          <h2 id="values-heading" className={styles.title2}>Nuestros valores</h2>

          <div className={styles.valuesGrid}>
            <article className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <span className={styles.valueIconInner}>
                  <svg className={styles.valueSvg} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </span>
              </div>
              <h3 className={styles.valueTitle}>Seguridad</h3>
              <p className={styles.valueText}>
                Cuidamos a las personas y los activos en cada maniobra. Protocolos y formación continuos.
              </p>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <span className={styles.valueIconInner}>
                  <svg className={styles.valueSvg} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </span>
              </div>
              <h3 className={styles.valueTitle}>Excelencia</h3>
              <p className={styles.valueText}>
                Ejecución metódica, calidad verificable y mejora continua para un rendimiento consistente.
              </p>
            </article>

            
            <article className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <span className={styles.valueIconInner}>                 
                  <svg className={styles.valueSvg} viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h7l-1 8 11-12h-7l0-8z"/>
                  </svg>
                </span>
              </div>
              <h3 className={styles.valueTitle}>Respuesta rápida</h3>
              <p className={styles.valueText}>
                Planificación ágil y soporte cercano para minimizar paradas y maximizar disponibilidad.
              </p>
            </article>
          </div>
        </div>
      </section>

     
      <section className={styles.certSection} aria-labelledby="cert-heading">
        <div className={styles.container}>
          <h2 id="cert-heading" className={styles.title2}>
            {certificationText.title}
          </h2>

          <p className={styles.aboutText}>{certificationText.paragraph1}</p>
          <p className={styles.aboutText}>{certificationText.paragraph2}</p>

          <div className={styles.pdfGrid}>
            {certificationPDFs.map((pdf, i) => (
              <a key={i} href={pdf} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                <Image
                  src={certificationDocs[i]}
                  alt={`Certificado ${i + 1}`}
                  className={styles.thumb}
                  width={480}
                  height={360}
                />
                <span className={styles.thumbLabel}>Ver certificado</span>
              </a>
            ))}
          </div>

          <p className={styles.aboutText}>{certificationText.paragraph3}</p>

          <div className={styles.pdfGridTall}>
            {inspectionDocs.map(({ pdf, image }, i) => (
              <a key={i} href={pdf} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                <Image
                  src={image}
                  alt={`Inspección ${i + 1}`}
                  className={styles.thumbTall}
                  width={560}
                  height={740}
                />
                <span className={styles.thumbLabel}>Ver documento</span>
              </a>
            ))}
          </div>

          <div className={styles.pdfGridTall}>
            {inspection2025Docs.map(({ pdf, image }, i) => (
              <a key={i} href={pdf} target="_blank" rel="noopener noreferrer" className={styles.docLink}>
                <Image
                  src={image}
                  alt={`Inspección 2025 - ${i + 1}`}
                  className={styles.thumbTall}
                  width={560}
                  height={740}
                />
                <span className={styles.thumbLabel}>Ver documento</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
