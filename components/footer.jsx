import Link from 'next/link'
import styles from "../Styles/footer.module.css"


function Footer(){

    return(
        <div className={styles.footer}>
            <p> Copyright &copy; Todos los derechos reservados 2024. North Winds S.A</p>
        </div>
   )
}

export default Footer