import Image from 'next/image';
import styles from './page.module.css';
import CarouselComponent from '../components/imagenes';
import Objetivos from '@/components/objetivos';
import Card from '@/components/card';

function Home (){

  return (
    <main className={styles.main}>

       <div className={styles.carouselSt}>
      <CarouselComponent/>
      </div>     


      <Objetivos></Objetivos>

      <div className={styles.container}>
        <h1 className={styles.title}>Nos especializamos en</h1>
        <div className={styles.cardContainer}>
          <Card
            image="/img/maquina6.jpeg"
            title="Operación y mantenimiento en general"
            slug="services"
          />
          <Card
            image="/img/parque1.jpg"
            title="Grandes correctivos"
            slug="services"
          />
           <Card
            image="/img/maquina1.jpeg"
            title="Torqueo y tensionado"
            slug="services"
          />

          <Card
            image="/img/maquina2.jpeg"
            title="Revisión y reparación de palas"
             slug="services"
          />
        
      </div>
    </div>  
    </main>
  );
}

export default Home;