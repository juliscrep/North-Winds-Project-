import styles from "../../Styles/contact.module.css";
import Map from "../../components/map";
import Image from 'next/image';

function ContactPage(){

    return(
    <><div className={styles.twoColumnsContainer}>
    <div>
      <Image src="/img/videoParque.gif" alt="Imagen" className={styles.image}  width={650} height={500}/>
    </div>
    
     <div className={styles.textColumn}>
        <h2 className={styles.title}>¡Contáctanos!</h2>
       
        <div className={styles.contactSection}>
            <i className="fa fa-home"></i>
            <span className={styles.iconBoxTitle}>RN60 y Av. 24 de Mayo, Aimogasta, La Rioja, Argentina (CP 5310)</span>
            <h6 className={styles.iconBoxTitle2}>Horario de atención: Lunes a viernes de 8:00hs a 12:00hs y de 14:00hs a 18:00hs</h6>
        </div>           
    
        <div className={styles.contactSection} >
            <i className="fa fa-phone"></i>
            <span className={styles.iconBoxTitle}>(+54) 380 4617560</span>
            <h6 className={styles.iconBoxTitle2}> (+54) 3827 453714</h6>
        </div>                
        
        <div className={styles.contactSection}>
            <i className="fa fa-envelope"></i>
            <span className={styles.iconBoxTitle}>nortwinds1223@gmail.com</span>
        </div>  

        <div className={styles.btnSection}>
            <h4> ¿Necesitas información adicional o una cotización? Estamos para ayudarte. 
           Envíanos un correo electrónico y nos pondremos en contacto contigo en breve para proporcionarte toda la información que necesitas.</h4> 
        </div>

        <div className={styles.btn}>
            <a className={styles.bn39} href="mailto:nortwinds1223@gmail.com"><span className={styles.bn39span} >Enviar</span></a>
        </div>
      
    </div>
    
    
  </div><Map></Map></>
    )
}

export default ContactPage