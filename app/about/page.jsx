// pages/about.js
import React from "react";
import Layout from "../layout";
import Mapa from "../../components/map";
import styles from "../../Styles/about.module.css";



const AboutPage = () => {
  return (
    
      <div className={styles.aboutText}>
        <h1>Acerca de la empresa</h1>
        <h3 className={styles.aboutText}>
        La empresa fue fundada en 2023 por un equipo de profesionales con una amplia trayectoria en el sector de energías renovables,
        acumulando experiencia desde el año 2010. Durante este periodo, participaron en diversos proyectos a nivel nacional e internacional, 
        abarcando regiones como Venezuela, La Guajira, Brasil (Acarahu y Tarema), Uruguay (Cierra los Caracoles), Argentina 
        (Arauco, La Rioja, Bahía Blanca, Río Negro Pomona, Córdoba, Achiras, Chubut, Puerto Madrid), entre otros.
        </h3>
        <br></br>
        

        <div className={styles.center}>

          <h1>Somos North Winds. Una empresa sostenible.</h1>
          <h3> En North Winds, creemos que el progreso empresarial y la responsabilidad social van de la mano. Es por eso que hemos 
            abrazado con entusiasmo las normas de calidad, sostenibilidad y ética más rigurosas del mundo, certificándonos bajo la prestigiosas
            WTC (wind training center)
          </h3>

          <h3>
            Al obtener y mantener estas certificaciones, no solo demostramos nuestro compromiso con la calidad, la sostenibilidad, 
            la seguridad y la ética, sino que también contribuimos a mejorar el mundo.
          </h3>

          <h3>
            En North winds, vemos estas certificaciones como nuestro deber y nuestra forma de marcar la diferencia en el mundo. 
            Creemos que cada paso que damos hacia la excelencia y la responsabilidad contribuye a un futuro más brillante y sostenible para todos.
          </h3>
          <br></br>
          <br></br>
        </div>


        <div>
             <Mapa /> 
        </div>
         
        
      </div>

  );
};

export default AboutPage;
