import Image from "next/image";
import styles from "/Styles/about.module.css";


import {
  aboutText,
  certificationText,
  certificationDocs,
  certificationPDFs,
  inspectionDocs,
  inspection2025Docs,
} from "./about.content";

const AboutPage = () => {
  return (
    <>
      <section className={styles.aboutTitle}>
        <div>
          <Image
            className={styles.image}
            alt="Video institucional"
            src="/img/video.gif"
            width={600}
            height={500}
            priority
          />
        </div>

        <div>
          <h1 className={styles.colorTitle}>{aboutText.title}</h1>
          <p className={styles.aboutText}>{aboutText.paragraph1}</p>
          <p className={styles.aboutText}>{aboutText.paragraph2}</p>
        </div>
      </section>

      <section>
        <h2 className={styles.title2}>{certificationText.title}</h2>

        <p className={styles.aboutText}>{certificationText.paragraph1}</p>
        <p className={styles.aboutText}>{certificationText.paragraph2}</p>

        <div className={styles.pdfContainer}>
          {certificationPDFs.map((pdf, index) => (
            <a key={index} href={pdf} target="_blank" rel="noopener noreferrer">
              <Image
                src={certificationDocs[index]}
                alt={`Certificado ${index + 1}`}
                className={styles.pdf}
                width={240}
                height={190}
              />
            </a>
          ))}
        </div>

        <p className={styles.aboutText}>{certificationText.paragraph3}</p>

        <div className={styles.pdfContainer2}>
          {inspectionDocs.map(({ pdf, image }, index) => (
            <a key={index} href={pdf} target="_blank" rel="noopener noreferrer">
              <Image
                src={image}
                alt={`Inspección ${index + 1}`}
                className={styles.pdf2}
                width={350}
                height={450}
              />
            </a>
          ))}
        </div>

        <div className={styles.pdfContainer2}>
          {inspection2025Docs.map(({ pdf, image }, index) => (
            <a key={index} href={pdf} target="_blank" rel="noopener noreferrer">
              <Image
                src={image}
                alt={`Inspección 2025 - ${index + 1}`}
                className={styles.pdf2}
                width={350}
                height={450}
              />
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutPage
