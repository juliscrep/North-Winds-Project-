import styles from './rrhh.module.css';
import { rrhhCopy } from './rrhh.content';
import RRHHInteractive from '../../components/rrhh/RRHHInteractive';

export const metadata = {
  title: 'Trabajá con nosotros | North Winds',
  description: 'Cargá tu CV o completá el formulario para sumarte al equipo.'
};

export default function RRHHPage() {
  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.hero}>
          <h1>{rrhhCopy.title}</h1>
          <p>{rrhhCopy.subtitle}</p>
        </section>

        <RRHHInteractive />

        <p className={styles.footer} style={{ marginTop: 12 }}>
          {rrhhCopy.privacy}
        </p>
      </div>
    </>
  );
}
