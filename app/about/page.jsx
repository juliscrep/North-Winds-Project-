import React from "react";
import Layout from "../layout";
import styles from "../../Styles/about.module.css";
import Image from 'next/image'

const AboutPage = () => {
  return (
    
      <><div className={styles.aboutTitle}>

          <div>
            <Image
              className={styles.image}
              alt="video"
              src={"/img/video.gif"}
              width= {600} 
              height= {500}
            />
          </div>

          <div>
            <h1 className={styles.colorTitle}>Acerca de la empresa</h1>
              <p className={styles.aboutText}>
              La fundación de nuestra empresa tuvo lugar en el año 2023, impulsada por un equipo de profesionales 
              comprometidos con el sector de la energía renovable desde 2010. A lo largo de los años, hemos participado 
              activamente en diversos proyectos a nivel nacional e internacional, abarcando áreas como Venezuela, 
              La Guajira, Brasil (Acarau e Itarema), Uruguay (Cierra los Caracoles) y Argentina (Arauco, La Rioja, 
              Bahía Blanca, Río Negro Pomona, Córdoba, Achiras, Chubut, Puerto Madrid). Durante este tiempo, hemos 
              desempeñado roles clave en la ejecución de tareas relacionadas con aerogeneradores.
              </p>

              <p className={styles.aboutText}>En la actualidad, desde North Winds, continuamos ofreciendo servicios y 
              soluciones a nuestros clientes con el más alto nivel de responsabilidad y compromiso. Estamos comprometidos
               a mantener la excelencia en la prestación de nuestros servicios en el sector de energía renovable.</p>
        </div>    

    </div>
    <div>

        <h1 className={styles.title2}>Certificación</h1>
        <p className={styles.aboutText}> Hemos obtenido la certificación del Wind Training Center (WTC). 
          Esta distinción representa nuestro compromiso inquebrantable con los estándares 
          más rigurosos de calidad, sostenibilidad y ética en la industria de la energía eólica.
          Al obtener la certificación del WTC, reafirmamos nuestro compromiso con la excelencia en la formación y 
          capacitación en el sector de energía renovable. Esta certificación no solo valida nuestra dedicación a la 
          seguridad y la calidad, sino que también demuestra nuestro esfuerzo continuo por mejorar y destacarnos en un 
          mercado cada vez más exigente.
        </p>

        <p className={styles.aboutText}>
          En North Winds, consideramos que esta certificación es un testimonio de nuestra misión de proporcionar 
          servicios de alta calidad y sostenibles en el campo de la energía eólica. Estamos emocionados de seguir
          contribuyendo al avance de la industria y de brindar a nuestros clientes la garantía de trabajar con un
          equipo certificado y comprometido con la excelencia.
        </p>

        <div className={styles.pdfContainer}>
            <a href="/img/certificado1.pdf" target="_blank">
              <Image src="/img/fotoCertificado1.png" alt="Icono de PDF" className={styles.pdf} width={240} height={190} />
            </a>
            <a href="/img/certificado2.pdf" target="_blank">
              <Image src="/img/fotoCertificado2.png" alt="Icono de PDF" className={styles.pdf} width={240} height={190} />
            </a>
            <a href="/img/certificado3.pdf" target="_blank">
              <Image src="/img/fotoCertificado3.png" alt="Icono de PDF" className={styles.pdf} width={240} height={190} />
            </a>
            <a href="/img/certificado4.pdf" target="_blank">
              <Image src="/img/fotoCertificado4.png" alt="Icono de PDF" className={styles.pdf} width={240} height={190} />
            </a>
            <a href="/img/certificado5.pdf" target="_blank">
              <Image src="/img/fotoCertificado5.png" alt="Icono de PDF" className={styles.pdf} width={240} height={190} />
            </a>
        </div>

      </div>   
    
    </>

  );
};

export default AboutPage;
