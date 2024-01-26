import styles from "../../Styles/contact.module.css";
import Mapa from "../../components/map";

function ContactPage(){

    return(
    <><div className={styles.contactText}>
            <h2>¡Contáctenos!</h2>
            <br></br>
            <div class="stm_contacts_widget  style_1">

                <section className={styles.especialidadSection}>
                    <div className={styles.iconBox}>
                        <i className="fa fa-map-marker"></i>
                    </div>
                    <h6 className={styles.iconBoxTitle}>Buenos Aires - Argentina</h6>
                </section>

                <section className={styles.especialidadSection}>
                    <div className={styles.iconBox}>
                        <i className="fa fa-phone"></i>
                    </div>
                    <h6 className={styles.iconBoxTitle}>(011) 37144855</h6>
                </section>

                <section className={styles.especialidadSection}>
                    <div className={styles.iconBox}>
                        <i className="fa fa-envelope"></i>
                    </div>
                    <h6 className={styles.iconBoxTitle}>nortwinds1223@gmail.com</h6>
                </section>
                <br></br>
            </div>

            <h4 className={styles.especialidadSection}>Háganos saber si tiene alguna pregunta, desea dejar un comentario o desea obtener más información.</h4>
            <br>
            </br>
            <div className={styles.btnDark}>
                <div class="elementor-button-wrapper">
                    <a class="elementor-button elementor-button-link elementor-size-xl" href="mailto:nortwinds1223@gmail.com">
                        <span class="elementor-button-content-wrapper">
                            <span class="elementor-button-text btn-dark">Enviar</span>
                        </span>
                    </a>
                </div>
            </div>

        </div><Mapa></Mapa></>
    )
}

export default ContactPage