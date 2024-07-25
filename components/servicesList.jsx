import React from "react";
import styles from "../Styles/servicesList.module.css";
import Image from 'next/image';
import Link from 'next/link';

const ServicesList = () => {
  return (
    <><div>
      <section>
        <h2 className={styles.title}>
          Servicios en parques eólicos 
        </h2>
      </section>

      <div className={styles.twoColumnsContainer}>
       <div className={styles.column}>
         <Image src="/img/maquina11.jpeg" alt="Imagen" className={styles.image}  width={750} height={550}/>
       </div>
       
        <div className={styles.textColumn}>
        <div className={styles.svgContainer}>
         <svg className={styles.icon} id="mantto_svg__Capa_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.73 167.51" width="49" height="49">
          <defs><style>.mantto_svg__cls-1</style></defs><g id="mantto_svg__Capa_1-2"><path class="mantto_svg__cls-1" 
          d="M167.73 85.35v14.04c0 2.6-.6 3.31-3.12 3.69-4.23.64-8.47 1.24-12.69 1.94-.51.09-1.15.62-1.37 1.11-1.74 3.78-3.43 
          7.58-5.03 11.42-.25.59-.2 1.55.13 2.08 2.13 3.38 4.39 6.69 6.59 10.03 1.21 1.84 1.13 2.81-.43 4.3-6.96 6.67-13.93 
          13.33-20.91 19.98-1.4 1.33-2.47 1.38-4.06.24-3.24-2.34-6.5-4.67-9.69-7.09-.9-.68-1.56-.63-2.56-.2-3.58 1.5-7.19 
          2.93-10.85 4.2-1.26.44-1.74 1.08-1.96 2.3-.72 3.88-1.57 7.73-2.31 11.6-.33 1.73-1.33 2.52-3.05 2.52-9.7 0-19.4.01-29.1 
          0-2.06 0-2.82-.73-3.11-2.78-.58-4.01-1.18-8.03-1.7-12.05-.17-1.3-.69-1.93-1.98-2.45-3.6-1.42-7.12-3.09-10.62-4.74-.86-.4-1.44-.48-2.27.09-3.24 2.25-6.54 4.41-9.83 6.59-2.15 1.43-2.94 1.36-4.68-.46-6.47-6.76-12.94-13.53-19.41-20.3-1.78-1.87-1.82-2.74-.27-4.84 2.27-3.09 4.51-6.2 6.83-9.25.67-.88.71-1.53.28-2.57-1.5-3.57-2.91-7.19-4.19-10.85-.4-1.15-.84-1.73-2.11-1.95-3.88-.67-7.74-1.5-11.6-2.28C.74 99.28.05 98.51.04 96.56c-.02-9.64-.02-19.29 0-28.93 0-2.09.8-2.88 2.92-3.19 4.23-.63 8.46-1.32 12.7-1.9.93-.13 1.27-.55 1.62-1.37 1.57-3.73 3.19-7.45 4.89-11.12.43-.92.5-1.56-.1-2.43-2.2-3.2-4.32-6.47-6.46-9.71-1.33-2.01-1.23-2.96.45-4.57 6.85-6.54 13.7-13.08 20.56-19.62 1.76-1.68 2.58-1.74 4.56-.3 3.19 2.32 6.39 4.63 9.53 7.01.79.59 1.37.57 2.26.2 3.69-1.52 7.4-2.99 11.16-4.31 1.14-.4 1.58-.97 1.79-2.08.73-3.87 1.53-7.73 2.33-11.59C68.67.62 69.33.02 71.32.02c9.7-.02 19.4-.02 29.1 0 2.04 0 2.77.74 3.07 2.82.59 4.13 1.19 8.25 1.77 12.38.12.87.36 1.46 1.35 1.86 3.8 1.54 7.55 3.21 11.28 4.92.82.38 1.36.41 2.12-.11 3.34-2.3 6.73-4.54 10.11-6.78 1.82-1.21 2.77-1.11 4.3.49 6.59 6.88 13.18 13.77 19.75 20.67 1.51 1.59 1.58 2.56.29 4.31-2.26 3.09-4.51 6.2-6.86 9.23-.83 1.06-.9 1.87-.35 3.14 1.55 3.55 2.93 7.19 4.21 10.84.36 1.01.82 1.44 1.8 1.63 3.93.75 7.85 1.54 11.76 2.35 2.12.44 2.71 1.2 2.72 3.38.01 4.74 0 9.47 0 14.21ZM98.68 5.15c-8.39 0-16.61-.02-24.84.05-.4 0-1.05.72-1.16 1.2-.84 3.74-1.62 7.49-2.32 11.25-.29 1.59-1.1 2.36-2.63 2.89-4.46 1.55-8.96 3.06-13.22 5.06-2.46 1.15-4.17 1.1-6.25-.59-2.91-2.38-6.04-4.47-9.12-6.72L20.49 36.14c2.37 3.59 4.58 7.05 6.92 10.44.99 1.43.97 2.63.23 4.2-2.18 4.62-4.2 9.32-6.17 14.03-.58 1.38-1.31 2.24-2.86 2.46-4.46.62-8.9 1.34-13.32 2.01-.08.25-.17.4-.17.56-.01 8.06-.04 16.13.02 24.19 0 .41.7 1.09 1.17 1.19 3.79.84 7.6 1.62 11.42 2.3 1.7.3 2.37 1.25 2.91 2.81 1.61 4.61 3.28 9.22 5.23 13.69.84 1.92.84 3.28-.44 4.92-2.49 3.18-4.82 6.49-7.26 9.8 5.96 6.25 11.84 12.4 17.76 18.6 3.54-2.36 7.04-4.61 10.44-7.01 1.56-1.09 2.82-.97 4.5-.14 4.23 2.08 8.52 4.09 12.93 5.74 2.23.83 3.25 1.93 3.5 4.27.42 4.07 1.12 8.11 1.73 12.27 8.39 0 16.61.02 24.84-.06.39 0 1.01-.76 1.12-1.25.83-3.74 1.63-7.48 2.3-11.25.31-1.75 1.27-2.48 2.89-3.06 4.71-1.68 9.38-3.47 13.97-5.44 1.68-.72 2.91-.69 4.34.4 3.27 2.48 6.62 4.85 10.03 7.34l18.68-17.84c-2.39-3.6-4.69-7.14-7.06-10.62-.9-1.32-.86-2.45-.17-3.91 2.18-4.62 4.22-9.31 6.2-14.02.6-1.44 1.3-2.34 2.95-2.56 4.46-.59 8.9-1.31 13.31-1.97.08-.28.16-.43.16-.59.01-8.06.03-16.13-.03-24.19 0-.42-.68-1.1-1.15-1.2-3.68-.81-7.38-1.58-11.1-2.2-1.9-.32-2.66-1.34-3.27-3.09-1.58-4.56-3.3-9.09-5.23-13.51-.8-1.83-.92-3.16.35-4.77 2.53-3.22 4.9-6.57 7.37-9.91-5.98-6.26-11.85-12.41-17.77-18.61-3.59 2.41-7.11 4.73-10.6 7.11-1.24.85-2.36.94-3.77.29a468 468 0 0 0-14.5-6.37c-1.27-.54-2.05-1.21-2.24-2.63-.61-4.41-1.3-8.8-1.98-13.41Z"></path><path class="mantto_svg__cls-1" d="M83.76 131c-26.18-.11-47.28-21.26-47.18-47.27.1-26.17 21.42-47.4 47.43-47.25 26.07.15 47.21 21.43 47.1 47.41-.11 26.14-21.3 47.22-47.35 47.12Zm-12.71-7.3c0-4.32.03-8.49-.04-12.65 0-.45-.54-1.06-.98-1.32-11.44-6.77-16.85-16.77-15.21-29.98 1.35-10.91 7.57-18.57 17.58-23.09 2.01-.91 3.65.2 3.71 2.4.06 2.2.02 4.4.02 6.6v9.5h15.44v-1.94c0-4.51-.01-9.02 0-13.53 0-3.06 1.59-4.08 4.38-2.73 10.62 5.12 16.63 13.62 17.19 25.35.58 11.95-4.75 21.07-15.08 27.15-1.08.63-1.47 1.25-1.44 2.48.09 3.38.03 6.77.04 10.15 0 .53.06 1.05.1 1.61 15.62-4.34 31.38-21.31 29.02-44.65-2.12-20.99-20.83-37.69-42.11-37.47-22.18.23-39.71 17.01-41.74 37.83-2.34 23.97 14.3 40.29 29.12 44.3Zm-.02-60.59c-.65.4-1 .59-1.31.81-15.12 10.76-13.06 33.94 3.76 41.81 1.98.93 2.74 2.12 2.68 4.28-.13 4.56 0 9.13-.07 13.7-.02 1.16.36 1.66 1.51 1.66 4.1 0 8.2 0 12.3.02 1.27 0 1.72-.5 1.69-1.84-.09-4.51.06-9.02-.07-13.53-.06-2.16.67-3.37 2.67-4.29 14.43-6.7 18.57-25.36 8.33-37.54-1.59-1.89-3.59-3.43-5.4-5.13l-.46.35v13.48c0 2.63-.83 3.46-3.42 3.46H74.81c-3.05 0-3.77-.72-3.77-3.79V63.09Z"></path></g></svg>
         </div>
         <h2 className={styles.title2}>Operación y mantenimiento en general</h2>
         <br></br>
         <p className={styles.text}>
             Contamos con equipos y herramientas de última tecnología que nos permiten realizar un trabajo eficiente y 
             garantizar un funcionamiento óptimo de los aerogeneradores. Nuestra estrategia se centra en garantizar el 
             correcto funcionamiento de los equipos, contribuyendo así a su durabilidad y rendimiento óptimo.
         </p>         
       </div>       
     </div>


     <div className={styles.twoColumnsContainer2}>
        <div className={styles.textColumn}>
          <div className={styles.svgContainer}>
            <svg className={styles.icon} id="aerogenerador_svg__Capa_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.44 172.48" width="49" height="49"><defs><style>.aerogenerador_svg__cls-1</style></defs><g id="aerogenerador_svg__Capa_1-2">
          <path class="aerogenerador_svg__cls-1" d="M147.19 123.89c-17.6-13.65-36.44-25.48-55.21-37.55-1.49 5.95-1.85 5.67-5.23 9.06 4.07 2.1 8.09 4.19 12.12 6.26 3.1 1.59 6.22 3.16 9.32 4.75 1.16.6 2 1.61 1.51 2.85-.33.84-1.31 1.61-2.18 1.97-.56.23-1.51-.25-2.19-.59-5.32-2.69-10.62-5.42-15.92-8.14-.59-.3-1.18-.59-2.04-1.03.2 3.47.37 6.65.57 9.83.98 15.31 1.98 30.63 2.97 45.94.27 4.09.56 8.19.8 12.28.1 1.69-.88 2.85-2.34 2.95-1.38.1-2.43-.86-2.69-2.46-.05-.28-.08-.56-.1-.84-.49-7.63-.96-15.26-1.46-22.89-.85-13.18-1.71-26.36-2.57-39.54-.15-2.36-.25-4.72-.5-7.06-.05-.5-.66-.94-1.01-1.41-.34.48-.94.95-.97 1.46-1.07 15.82-2.08 31.63-3.1 47.45-.47 7.24-.93 14.47-1.4 21.71-.02.34-.05.67-.1 1.01-.25 1.71-1.32 2.7-2.75 2.57-1.46-.13-2.38-1.29-2.29-3 .18-3.37.41-6.73.63-10.1.74-11.39 1.49-22.77 2.22-34.16.47-7.29.93-14.59 1.39-21.88.03-.5 0-1 0-1.79-.75.38-1.36.69-1.99.99-16.07 7.83-32.09 15.75-48.24 23.41-4.29 2.03-8.96 3.25-13.47 4.8-.62.21-1.34.22-2 .18-2.7-.19-4.18-2.64-2.76-4.93 1.02-1.64 2.33-3.25 3.86-4.4 8.31-6.25 16.57-12.6 25.16-18.45 11.15-7.6 22.58-14.8 33.93-22.11 1.09-.7 1.44-1.44 1.51-2.69.95-16.95 1.8-33.91 3.05-50.83.55-7.43 1.92-14.8 2.97-22.19.14-.98.56-1.94.96-2.87C78.3 1 79.16.01 81.06 0c1.9-.01 2.95.91 3.37 2.43.92 3.34 1.87 6.72 2.34 10.14 2.44 17.95 3.27 36.04 4.15 54.12.19 3.93.44 7.86.54 11.79.03 1.22.48 1.87 1.48 2.53 14.5 9.49 29.02 18.93 43.4 28.6 5.36 3.6 10.37 7.72 15.47 11.71 1.36 1.06 2.5 2.43 3.6 3.77.99 1.23 1.51 2.68.58 4.22-.95 1.59-2.56 1.99-4.13 1.54-3.88-1.11-7.82-2.16-11.51-3.76-8.25-3.58-16.36-7.46-24.52-11.25-1.79-.83-2.36-2.23-1.64-3.64.72-1.4 2.08-1.7 3.91-.87 8.49 3.88 16.97 7.77 25.46 11.64 1.11.5 2.27.9 3.41 1.34l.23-.42Zm-76.8-37.5c-8.95 4.52-51.02 33.23-55.26 37.86 20.75-8.24 40.45-18.66 60.51-28.94-3.28-2.25-4.96-5.1-5.25-8.92ZM81.07 10.2c-3.33 22-4.17 44.16-5.24 66.59 3.6-1.75 6.95-1.62 10.5-.06-1.1-22.44-1.92-44.57-5.26-66.53ZM75.5 86.07a5.55 5.55 0 0 0 5.53 5.6c3.08.02 5.59-2.45 5.61-5.53.02-3.08-2.45-5.57-5.54-5.6a5.565 5.565 0 0 0-5.61 5.53ZM53.56 10.13c1.32.06 2.18.74 2.44 1.96.29 1.31-.27 2.31-1.51 2.87-2.66 1.2-5.41 2.23-7.98 3.6-22.58 12.03-36.08 30.68-40.5 55.83-1.48 8.38-1.26 16.78.24 25.15.31 1.75-.49 3.05-1.99 3.36-1.45.29-2.68-.67-2.98-2.46-4.01-23.98 1.51-45.61 16.43-64.75 8.98-11.52 20.51-19.73 34.11-25.08.37-.14.74-.28 1.11-.39.21-.06.44-.06.64-.08ZM162.44 86.04c-.43 4.36-.82 8.66-1.29 12.96-.18 1.69-1.36 2.71-2.76 2.6-1.51-.12-2.43-1.36-2.28-3.15.31-3.75.89-7.49.95-11.24.49-31.92-19.17-60.75-49.04-72.07-.47-.18-.95-.35-1.41-.55-1.51-.66-2.15-1.88-1.69-3.2.5-1.43 1.87-2.16 3.41-1.51 3.93 1.66 7.97 3.15 11.67 5.24 22.72 12.87 36.4 32.24 41.07 57.87.78 4.29.93 8.7 1.36 13.05Z"></path><path class="aerogenerador_svg__cls-1" d="M15.98 86.37c.15-26.71 16.61-50.85 41.51-60.57.16-.06.32-.11.48-.17 1.75-.62 3.07-.14 3.64 1.32.53 1.34-.13 2.59-1.7 3.36-3.43 1.67-7.03 3.08-10.23 5.11-16.79 10.67-26.12 26-28.15 45.77-.52 5.07-.19 10.09.66 15.1.35 2.05-.43 3.39-2.02 3.63-1.59.24-2.72-.77-2.99-2.86-.45-3.56-.81-7.13-1.21-10.7ZM146.04 87c-.24 2.45-.52 5.86-.94 9.26-.23 1.86-1.41 2.83-2.86 2.63-1.56-.21-2.35-1.49-2.11-3.41 3.04-24.71-5.51-44.43-25.81-58.86-3.84-2.73-8.42-4.44-12.7-6.52-1.32-.64-2.4-1.33-2.23-2.96.18-1.77 1.88-2.58 3.88-1.86 7.06 2.53 13.51 6.16 19.21 11.01C137.79 49.32 145.46 66 146.05 87Z"></path><path class="aerogenerador_svg__cls-1" d="M129.83 86.04c-.24 2.46-.45 4.92-.74 7.37-.23 1.96-1.35 2.99-2.88 2.8-1.61-.2-2.45-1.55-2.13-3.57 1.08-6.85.54-13.57-1.71-20.11-4.45-12.92-13.06-21.93-25.79-27-.57-.23-1.19-.43-1.66-.8-1.04-.84-1.35-1.95-.66-3.15.71-1.24 1.8-1.62 3.17-1.14 5.2 1.82 9.92 4.5 14.2 7.95 11.31 9.11 18.04 23.16 18.2 37.66ZM32.3 86.16c.13-19.79 12.32-37.75 30.72-45.08.26-.1.52-.21.79-.3 1.65-.55 2.92-.04 3.48 1.38.52 1.34-.02 2.56-1.53 3.27-1.82.87-3.72 1.6-5.49 2.57-16.16 8.79-24.95 26.56-22.18 44.75.03.22.05.45.08.67.25 2.1-.39 3.26-1.92 3.52-1.65.28-2.82-.68-3.09-2.74-.35-2.67-.57-5.36-.85-8.03Z"></path></g></svg>
          </div>
         <h2 className={styles.title2}>Grandes correctivos</h2>
         <br></br>
         <p className={styles.text}>
              Nos especializamos en llevar a cabo cambios de componentes críticos como la multiplicadora, generadores, palas,
              entre otros. Implementamos soluciones eficientes para mantener la integridad y funcionalidad de los 
              aerogeneradores a largo plazo.
         </p>         
        </div>  
       <div className={styles.column}>
         <Image src="/img/background2.jpg" alt="Imagen" className={styles.image}  width={750} height={550}/>
       </div>         
     </div>

     <div className={styles.twoColumnsContainer}>
       <div className={styles.column}>
         <Image src="/img/maquina1.jpeg" alt="Imagen" className={styles.image2}  width={400} height={600}/>
       </div>
       
        <div className={styles.textColumn}>
        <div className={styles.svgContainer}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176.38 167.03" width="49" height="49">
          <path d="M83.17 61.25c-5.18-4.24-3.73-9.33-3.77-14.04 0-.69 1.31-1.95 1.98-1.93.73.02 1.94 1.15 2.06 1.93.3 2.04.11 4.14.13 6.22.02 3.05 1.82 5.09 4.51 5.16 2.8.06 4.72-2.03 4.73-5.18.01-4.49.07-8.98-.05-13.46-.03-.93-.56-1.99-1.16-2.75-4.22-5.35-8.62-10.56-12.75-15.97-2.58-3.37-.64-7.38 3.59-7.76 1.9-.17 3.82-.08 5.73-.1 1.82-.01 3.64 0 4.95 0-.09-3.98-.26-7.79-.18-11.58.01-.63 1.03-1.61 1.71-1.74.66-.12 2.1.59 2.14 1.03.35 3.98.9 8-.49 12.29h7.22c1.33 0 2.67-.05 3.99.08 4.23.4 6.2 4.41 3.63 7.76-4.25 5.53-8.77 10.85-13.12 16.31-.51.64-.84 1.58-.87 2.39-.1 3.32-.11 6.65-.02 9.97.11 4.13.27 8.23-3.57 11.16 7.12 8.07 14.04 15.91 20.97 23.76 14.24 16.14 28.51 32.26 42.69 48.46 1.51 1.72 3.01 2.55 5.31 2.43 3.4-.17 6.81-.07 10.22-.04 3.21.03 3.65.46 3.65 3.58.01 8.06.01 16.13 0 24.19 0 2.97-.64 3.59-3.69 3.62-2.33.02-4.65 0-6.98 0H5.14c-4.97 0-5.11-.14-5.11-5.2v-22.69c0-3.04.44-3.72 3.47-3.43 3.43.32 5.66-1.09 7.98-3.42 22.79-22.94 45.68-45.78 68.56-68.62.82-.81 1.84-1.42 3.15-2.4ZM4.51 139.91v22.65h167.41v-22.65H4.51Zm148.99-4.47c-1.21-1.4-2-2.34-2.81-3.26l-59.55-67.5c-2.33-2.64-3.49-2.67-6.06-.1-22.87 22.86-45.73 45.73-68.59 68.59-.6.6-1.14 1.24-2 2.19h39.87v-18.18c0-3.87.42-4.3 4.25-4.3h58.35c4.91 0 5.07.15 5.07 4.98v17.57h31.47Zm-94.64-18.11v18.11h58.72v-18.11H58.86Zm36.01-82.79c4.61-5.67 8.91-10.95 13.6-16.71H81.5c4.65 5.81 8.86 11.09 13.36 16.71Z"></path></svg>
         </div>
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

     <div className={styles.twoColumnsContainer2}>
        <div className={styles.textColumn}>
        <div className={styles.svgContainer}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160.01 159.98" width="49" height="49">
            <path d="M153.43 159.98H19.37c-.29-.09-.58-.22-.88-.28-9.07-1.72-14.96-7.01-17.73-15.79-.31-.98-.51-1.99-.76-2.99V18.77c.09-.24.23-.46.27-.71C1.81 9.13 8.12 2.32 16.93.56c2.92-.58 6-.48 9.01-.51 5.45-.06 8.73 3.28 8.73 8.74v28.55h1.84c21.81 0 43.63 0 65.44.02 1.07 0 1.83-.3 2.59-1.07 11.13-11.18 22.29-22.32 33.45-33.47 3.77-3.76 8.47-3.76 12.28 0 2.26 2.23 4.5 4.48 6.74 6.73 3.98 4.01 4 8.64.04 12.61-4.56 4.57-9.13 9.13-13.69 13.7-.38.39-.74.8-1.37 1.48 3.36 0 6.36-.02 9.35 0 5.39.05 8.64 3.31 8.64 8.69v105.25c0 .78-.03 1.57-.19 2.32-.73 3.49-3.13 5.36-6.36 6.37ZM34.67 42.77V113.84c0 5.57-3.24 8.79-8.83 8.84-2.08.02-4.17-.03-6.24.13-8.77.67-15.52 9.4-14.05 18.06 1.4 8.23 8.19 13.79 16.96 13.79 42.86.01 85.72 0 128.57 0 2.68 0 3.58-.89 3.58-3.54V46.16c0-2.57-.88-3.45-3.48-3.46-4.32-.02-8.64.03-12.97-.03-1.18-.02-2.03.32-2.87 1.17-7.85 7.91-15.74 15.77-23.6 23.67-1.7 1.71-3.65 3.02-6.05 3.31-4.08.49-8.17 1.07-12.27 1.12-11.82.15-23.64.05-35.46.05h-1.9v29.19h63.93v-1.84c0-3.64-.01-7.29 0-10.93 0-1.83 1.07-3.04 2.62-3.07 1.55-.02 2.64 1.19 2.7 2.99v39.2c0 .62-.04 1.26-.2 1.85-.71 2.61-2.76 3.97-5.97 3.97h-51.4c-.67 0-1.38-.03-2-.24-1.22-.43-1.81-1.38-1.69-2.67.12-1.29.85-2.11 2.13-2.33.56-.1 1.14-.08 1.71-.08h17.33V106.8H55.96v35.75c0 .52.02 1.04-.02 1.56-.11 1.48-1.08 2.45-2.47 2.52-1.45.07-2.6-.87-2.79-2.37-.07-.56-.04-1.14-.04-1.72V72c-2.69 0-5.18.03-7.67 0-1.81-.03-2.91-1.01-2.97-2.53-.06-1.56 1.11-2.68 2.92-2.78.47-.03.94 0 1.41 0H87.86c.41-4.02.79-7.84 1.2-11.65.27-2.53 1.37-4.66 3.18-6.44 1.86-1.84 3.7-3.7 5.79-5.79H34.67ZM5.32 124.05c2.15-1.49 4.13-3.08 6.3-4.33 4.23-2.44 8.94-2.49 13.65-2.41 3.35.06 4.07-.7 4.07-3.97V9.36c0-.42.02-.83-.01-1.25-.12-1.68-1.11-2.68-2.8-2.74-1.46-.05-2.91-.02-4.37-.01-10.01.02-16.84 6.86-16.84 16.89v101.8Zm132.72-90.61-11.22-11.28c-9.51 9.51-19.14 19.14-28.57 28.56 3.66 3.67 7.48 7.49 11.23 11.24 9.5-9.48 19.11-19.08 28.56-28.52Zm-18.1 73.29H90.73v21.17h29.21v-21.17Zm18.53-96.92c4 4.02 7.8 7.83 11.73 11.77 1.17-1.21 2.47-2.47 3.68-3.82 1.09-1.21 1.11-2.62-.02-3.79a321.15 321.15 0 0 0-7.84-7.82c-1.14-1.09-2.51-1.11-3.66-.09-1.39 1.23-2.68 2.58-3.88 3.75Zm-3.75 4.46-3.73 3.54c3.74 3.75 7.55 7.57 11.09 11.11l3.75-3.54-11.11-11.1ZM94.38 55.35c-.33 3.01-.66 6-.98 9-.12 1.18.28 2.29 1.56 2.22 3.27-.18 6.53-.6 9.74-.91-3.51-3.5-6.87-6.86-10.33-10.31Z"></path></svg>
        </div>
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
         <Image src="/img/maquina2.jpeg" alt="Imagen" className={styles.image2}  width={400} height={600}/>
       </div>         
     </div>
     
     

    </div>
    <div className={styles.section}>

      <section>
        <h2 className={styles.title3}>
          Servicios en parques solares  
        </h2>
      </section>

      <div>
        <p className={styles.text2}>
          Ofrecemos una amplia gama de servicios para la optimización y el mantenimiento de
          parques solares. Nuestro objetivo es garantizar la máxima eficiencia y longevidad de sus
          instalaciones solares a través de nuestros servicios integrales, que incluyen:
        </p>
      </div>

      <ul className={styles.lista}>
        <li className={styles.text3}>
          <strong>Mantenimientos preventivos:</strong> realizamos inspecciones y ajustes periódicos para
          asegurar el funcionamiento óptimo de los sistemas solares.
        </li>
        <li className={styles.text3}>
          <strong>Limpieza de paneles solares:</strong> utilizamos robots especialmente diseñados para
          la limpieza eficiente de los paneles, garantizando su máxima eficiencia.
        </li>
        <li className={styles.text3}>
        <strong>Revisión de cableado:</strong> verificamos las conexiones eléctricas de los paneles
          solares para prevenir fallos y mejorar el rendimiento.
        </li>
        <li className={styles.text3}>
          <strong>Control de estructuras y fundaciones:</strong> evaluamos y mantenemos las
          estructuras y fundaciones para asegurar su integridad y estabilidad.
        </li>
        <li className={styles.text3}>
          <strong>Control termográfico de conexiones eléctricas:</strong> utilizamos tecnología
          termográfica para detectar y corregir problemas en las conexiones eléctricas.
        </li>
        <li className={styles.text3}>
          <strong>Mantenimientos en redes eléctricas de media, baja tensión y
          subestaciones transformadoras:</strong> ofrecemos servicios preventivos para
          mantener en óptimas condiciones las redes eléctricas y subestaciones
          transformadoras.
        </li>
        <li className={styles.text3}>
          <strong>Inspecciones visuales:</strong> realizamos inspecciones detalladas para identificar y
          solucionar posibles problemas en los parques solares.
        </li>
        <li className={styles.text3}>
          <strong>Control de puntos calientes:</strong> detectamos y corregimos puntos calientes que
          podrían comprometer la eficiencia del sistema.
        </li>
        <li className={styles.text3}>
          <strong>Reemplazo de estructuras y componentes:</strong> sustituimos estructuras y
          componentes dañados para mantener la operatividad del parque solar.
        </li>
        <li className={styles.text3}>
          <strong>Muestras de aceites en transformadores:</strong> tomamos y analizamos muestras de
          aceite en transformadores para asegurar su correcto funcionamiento.
        </li>
      </ul>

    </div></>
  );
};

export default ServicesList;
