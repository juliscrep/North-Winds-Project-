import styles from './page.module.css';
import Carousel from '../components/carousel';
import Objectives from '@/components/objectives';
import Card from '@/components/card';
import cardData from '@/components/cardData';

function Home() {
  return (
    <main className={`${styles.theme} ${styles.main}`}>
      <div className={styles.carouselSt}>
        <Carousel />
      </div>

      <Objectives />

      <section className={styles.servicesSection} aria-labelledby="services-heading">
        <div className={styles.container}>
          <h2 id="services-heading" className={styles.sectionTitle}>
            Nos especializamos en
          </h2>

          <div className={styles.grid}>
            {cardData.map((card, index) => (
              <Card key={index} image={card.image} title={card.title} slug={card.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
