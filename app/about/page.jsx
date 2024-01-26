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
    <div className={styles.aboutText}>

        <h1 className={styles.title2}>Certificaciones</h1>
        <p> En North Winds, creemos que el progreso empresarial y la responsabilidad social van de la mano. Es por eso que hemos
          abrazado con entusiasmo las normas de calidad, sostenibilidad y ética más rigurosas del mundo, certificándonos bajo la prestigiosas
          WTC (wind training center)
        </p>

        <p>
          Al obtener y mantener estas certificaciones, no solo demostramos nuestro compromiso con la calidad, la sostenibilidad,
          la seguridad y la ética, sino que también contribuimos a mejorar el mundo.
        </p>

        <p>
          En North winds, vemos estas certificaciones como nuestro deber y nuestra forma de marcar la diferencia en el mundo.
          Creemos que cada paso que damos hacia la excelencia y la responsabilidad contribuye a un futuro más brillante y sostenible para todos.
        </p>
      </div>   
    
    </>

  );
};

export default AboutPage;
