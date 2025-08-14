// app/rrhh/page.jsx (server)
import styles from './rrhh.module.css';
import { rrhhCopy } from './rrhh.content';
import ClientProviders from '@/components/rrhh/ClientProviders';
import RRHHInteractive from '@/components/rrhh/RRHHInteractive';
export const metadata = {
  title: 'Trabajá con nosotros | North Winds',
  description: 'Cargá tu CV o completá el formulario para sumarte al equipo.'
};

export default function RRHHPage() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <h1>{rrhhCopy.title}</h1>
        <p>{rrhhCopy.subtitle}</p>
      </section>

      <ClientProviders>
        <RRHHInteractive />
      </ClientProviders>

      <p className={styles.footer}>{rrhhCopy.privacy}</p>
    </div>
  );
}
