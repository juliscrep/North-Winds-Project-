import React from "react";
import Layout from "../layout";
import Mapa from "../../components/map";
import styles from "../../Styles/about.module.css";



const AboutPage = () => {
  return (
    
      <><div className={styles.aboutTitle}>
      <h1>Acerca de la empresa</h1>
      <p className={styles.aboutText}>
        La empresa fue fundada en 2023 por un equipo de profesionales con una amplia trayectoria en el sector de energías renovables,
        acumulando experiencia desde el año 2010. Durante este periodo, participaron en diversos proyectos a nivel nacional e internacional,
        abarcando regiones como Venezuela, La Guajira, Brasil (Acarahu y Tarema), Uruguay (Cierra los Caracoles), Argentina
        (Arauco, La Rioja, Bahía Blanca, Río Negro Pomona, Córdoba, Achiras, Chubut, Puerto Madrid), entre otros.
      </p>
     
      <div className={styles.aboutText}>

        <h1 className={styles.title2}>Somos North Winds. Una empresa sostenible.</h1>
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

    </div><Mapa></Mapa></>

  );
};

export default AboutPage;
