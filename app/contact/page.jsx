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
            
                <span className={styles.iconBoxTitle2}>RN60 y Av. 24 de Mayo, Aimogasta, La Rioja, Argentina (CP 5310)</span>
                               
             </div>
            
             <div className={styles.contactSection} >
                <i className={`fa fa-clock ${styles.icon}`}></i>
            
               <span className={styles.iconBoxTitle4}>Horario de atención: Lunes a viernes de 8:00hs a 12:00hs y de 14:00hs a 18:00hs</span>
                     
             </div>

            <div className={styles.contactSection} >
                <i className="fa fa-phone"></i>
                <span className={styles.iconBoxTitle2}>(+54) 380 4617560 / (+54) 3827 453714</span>
            </div>                
        
            <div className={styles.contactSection}>
                <i className="fa fa-envelope"></i>
                <span className={styles.iconBoxTitle2}>northwinds1223@gmail.com</span>
            </div>        
        </div>
        <Form></Form>

    </div><Map></Map></>
    )
}

export default ContactPage