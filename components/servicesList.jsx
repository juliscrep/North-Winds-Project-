import React from "react";
import styles from "../Styles/servicesList.module.css";

const ServicesList = () => {
  return (
    <div className={styles.especialidadesContainer}>
      <section className={styles.especialidadSection}>
        <h2>
          NOS ESPECIALIZAMOS EN
        </h2>
      </section>

      <div className={styles.especialidadesFlexContainer}>
        <section className={styles.especialidadFlexItem}>
          <div className={styles.iconBox}>
            <i className="fa fa-search"></i>
          </div>
          <div className={styles.textContainer}>
            <h6 className={styles.iconBoxTitle}>Revisión de palas</h6>
          </div>
        </section>

        <section className={styles.especialidadFlexItem}>
          <div className={styles.iconBox}>
            <i className="fas fa-bolt"></i>
          </div>
          <div className={styles.textContainer}>
            <h6 className={styles.iconBoxTitle}>Torqueo y tensiónado</h6>
          </div>
        </section>

        <section className={styles.especialidadFlexItem}>
          <div className={styles.iconBox}>
            <i className="fas fa-anchor"></i>
          </div>
          <div className={styles.textContainer}>
            <h6 className={styles.iconBoxTitle}>Reparación de palas</h6>
          </div>
        </section>

        <section className={styles.especialidadFlexItem}>
          <div className={styles.iconBox}>
            <i className="fa fa-wrench"></i>
          </div>
          <div className={styles.textContainer}>
            <h6 className={styles.iconBoxTitle}>Grandes correctivos</h6>
          </div>
        </section>

        <section className={styles.especialidadFlexItem}>
          <div className={styles.iconBox}>
            <i className="fas fa-cogs"></i>
          </div>
          <div className={styles.textContainer}>
            <h6 className={styles.iconBoxTitle}>Operación y mantenimiento en general</h6>
            <p className={styles.iconBoxDescription}></p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesList;
