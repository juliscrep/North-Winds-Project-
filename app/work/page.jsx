import eact from "react";
import styles from "../../Styles/work.module.css";
import Image from 'next/image';

export default function workPage() {
  return (

    <><div>
        <section>
        <h2 className={styles.title}>
          Trabajos realizados en el año 2024
        </h2>
      </section>
      </div>
      
      
        <div className={styles.column}>
            <Image src="/img/trabajosRealizados/trabajo1.jpeg" alt="img" className={styles.image}  width={350} height={550} />
          
            <Image src="/img/trabajosRealizados/trabajo2.jpeg" alt="img" className={styles.image}  width={350} height={550} />

            <Image src="/img/trabajosRealizados/trabajo3.jpeg" alt="img" className={styles.image}  width={350} height={550} />
        
        </div> 
       
        <div className={styles.column}>
            <Image src="/img/trabajosRealizados/trabajo4.jpeg" alt="img" className={styles.image}  width={350} height={550} />

            <Image src="/img/trabajosRealizados/trabajo5.jpeg" alt="img" className={styles.image}  width={350} height={550} />

            <Image src="/img/trabajosRealizados/trabajo6.jpeg" alt="img" className={styles.image}  width={350} height={550} />
            
        </div> 
        </>
  )
}
