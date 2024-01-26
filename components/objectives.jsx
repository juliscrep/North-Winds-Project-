import React from 'react';
import styles from '../Styles/objectives.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Objectives = () => {

  return (

     <div className={styles.twoColumnsContainer}>
       <div className={styles.column}>
         <Image src="/img/maquina12.jpeg" alt="Imagen" className={styles.image}  width={500} height={600}/>
       </div>
       
        <div className={styles.textColumn}>
         <h2 className={styles.title}>Nos dedicamos a lograr nuestro</h2><h2 className={styles.title2}>principal objetivo</h2>
         <br></br>
         <p className={styles.text}>
            Ofrecer a cada cliente un servicio de calidad que no solo satisfaga sus necesidades, sino que también supere sus expectativas.
            Nos destacamos gracias a nuestro compromiso con la calidad y la eficiencia, proporcionando 
            soluciones fiables de manera efectiva en el sector de la energía eólica para garantizar la 
            satisfacción de nuestros clientes.
         </p>

         <div className={styles.btn}>
            <Link className={styles.bn39} href={"/about"}><span  className={styles.bn39span} >Sobre nosotros</span></Link>
         </div>
         
       </div>
       
     </div>
    
    
  );
};


export default Objectives;