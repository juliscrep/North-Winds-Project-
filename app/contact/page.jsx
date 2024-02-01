import styles from "../../Styles/contact.module.css";
import Map from "../../components/map";
import Image from 'next/image';
import Form from "../../components/form";

function ContactPage(){

    return(
    <><div className={styles.twoColumnsContainer}>    
     
        <div className={styles.textColumn}>
            <h2 className={styles.title}>¡Contáctanos!</h2>
            
             <div className={styles.contactSection} >
                <i className={`fa fa-home ${styles.icon}`}></i>
            
            <h6 className={styles.iconBoxTitle2}>RN60 y Av. 24 de Mayo, Aimogasta, La Rioja, Argentina (CP 5310)</h6>
            <h6 className={styles.iconBoxTitle4}>Horario de atención: Lunes a viernes de 8:00hs a 12:00hs y de 14:00hs a 18:00hs</h6>
                     
             </div>
            
            <div className={styles.contactSection} >
                <i className="fa fa-phone"></i>
                <span className={styles.iconBoxTitle}>(+54) 380 4617560</span>
                <h6 className={styles.iconBoxTitle3}> (+54) 3827 453714</h6>
            </div>                
        
            <div className={styles.contactSection}>
                <i className="fa fa-envelope"></i>
                <span className={styles.iconBoxTitle}>northwinds1223@gmail.com</span>
            </div>        
        </div>
        <Form></Form>

    </div><Map></Map></>
    )
}

export default ContactPage