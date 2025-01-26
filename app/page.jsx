import styles from './page.module.css';
import Carousel from '../components/carousel';
import Objectives from '@/components/objectives';
import Card from '@/components/card';
import cardData from '@/components/cardData';

function Home (){

  return (
    <main className={styles.main}>

       <div className={styles.carouselSt}>
      <Carousel/>
      </div>     


      <Objectives></Objectives>

      <div className={styles.container}>
        <h1 className={styles.title}>Nos especializamos en</h1>
        <div className={styles.cardContainer}>
          
        {cardData.map((card, index) => (
            <Card key={index} image={card.image} title={card.title} slug={card.slug} />
          ))}        
        
      </div>
    </div>  
    </main>
  );
}

export default Home;