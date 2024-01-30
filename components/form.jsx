import styles from '../Styles/form.module.css';

const Form = () => {

    return(
        <div className={styles.container}> 
        <div>
          <form action="https://formsubmit.co/45771992cd24f30aecb1ab8b34003eb6" method="POST">
            <h4 className={styles.title}>
                ¿Necesitas información adicional o una cotización? Estamos para ayudarte.
                Envíanos un correo electrónico y nos pondremos en contacto contigo en breve para proporcionarte toda la información que necesitas.
            </h4>
            <input placeholder="Nombre completo" type='text' id="name" name="name" className={styles.input}></input>
            <input placeholder="Correo electrónico" type='email' id="email" name="email" className={styles.input}></input>
            <input placeholder="Asunto" type='subject' id="subject" name="subject" className={styles.input}></input>
            <textarea placeholder="Escribe tu mensaje aquí..." name='message' id="message" className={`${styles.input} ${styles.textarea}`}>
            </textarea>
            <div className={styles.btn}>
                <button className={styles.button}>Enviar</button>
            </div>

            <input type='hidden' name="_next" value='http://localhost:3000/contact'></input>
            <input type='hidden' name='_captcha' value='false'></input>
            <input type="hidden" name="_subject" value="Nuevo correo de pagina web northWinds!"></input>
          </form>
        </div>
      </div>
    )

}

export default Form;