import React from "react";
import styles from "../Styles/servicesList.module.css";
import Image from 'next/image';
import Link from 'next/link';

const ServicesList = () => {
  return (
    <div>
      <section className={styles.title}>
        <h2>
          Nuestros servicios
        </h2>
      </section>

      <div className={styles.twoColumnsContainer}>
       <div className={styles.column}>
         <Image src="/img/maquina11.jpeg" alt="Imagen" className={styles.image}  width={700} height={600}/>
       </div>
       
        <div className={styles.textColumn}>
         <h2 className={styles.title2}>Operación y mantenimiento en general</h2>
         <br></br>
         <p className={styles.text}>
             Contamos con equipos y herramientas de última tecnología que nos permiten realizar un trabajo eficiente y 
             garantizar un funcionamiento óptimo de los aerogeneradores. Nuestra estrategia se centra en garantizar el 
             correcto funcionamiento de los equipos, contribuyendo así a su durabilidad y rendimiento óptimo.
         </p>         
       </div>       
     </div>


     <div className={styles.twoColumnsContainer}>
        <div className={styles.textColumn}>
         <h2 className={styles.title2}>Grandes correctivos</h2>
         <br></br>
         <p className={styles.text}>
              Nos especializamos en llevar a cabo cambios de componentes críticos como la multiplicadora, generadores, palas,
              entre otros. Implementamos soluciones eficientes para mantener la integridad y funcionalidad de los 
              aerogeneradores a largo plazo.
         </p>         
        </div>  
       <div className={styles.column}>
         <Image src="/img/background2.jpg" alt="Imagen" className={styles.image}  width={800} height={600}/>
       </div>         
     </div>

     <div className={styles.twoColumnsContainer}>
       <div className={styles.column}>
         <Image src="/img/maquina1.jpeg" alt="Imagen" className={styles.image}  width={450} height={650}/>
       </div>
       
        <div className={styles.textColumn}>
         <h2 className={styles.title2}>Torqueo y tensionado</h2>
         <br></br>
         <p className={styles.text}>
         Cambio de Aceite Flushin: realizamos el cambio de aceite Flushin para garantizar el óptimo funcionamiento de los componentes mecánicos.
         </p>      
         <p className={styles.text}>
         Limpieza Exterior de Torre: llevamos a cabo limpiezas exteriores para mantener las torres en condiciones óptimas.
         </p>
         <p className={styles.text}>
          Repintado Exterior de Torre: ofrecemos servicios de repintado exterior para proteger y preservar la estética de las torres.
         </p>         
       </div>    
     </div>

     <div className={styles.twoColumnsContainer}>
        <div className={styles.textColumn}>
         <h2 className={styles.title2}>Revisión y reparación de palas</h2>
         <br></br>
         <p className={styles.text}>
            Inspección con Drone en Palas o en Torre: implementamos tecnología de vanguardia para llevar a cabo inspecciones
            precisas y detalladas mediante drones, garantizando una evaluación exhaustiva de las palas y torres.
         </p>
         <p className={styles.text}>
            Inspección con Cámaras Fotográficas de Alta Resolución en Palas o Torres: utilizamos cámaras de alta resolución 
            para capturar imágenes detalladas, facilitando la identificación de posibles problemas y la planificación de intervenciones.
          </p>    
          <p className={styles.text}>
            Reparación Interna de Palas: contamos con técnicos altamente capacitados para abordar reparaciones internas con 
            precisión y eficacia.
          </p>
        </div>  
       <div className={styles.column}>
         <Image src="/img/maquina2.jpeg" alt="Imagen" className={styles.image}  width={450} height={650}/>
       </div>         
     </div>
     
    </div>
    



  );
};

export default ServicesList;
