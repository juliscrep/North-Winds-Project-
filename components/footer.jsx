import styles from '../Styles/footer.module.css';


function Footer(){
    const currentYear = new Date().getFullYear();

    return(
        <div className={styles.footer}>
            <p> Copyright &copy; Todos los derechos reservados {currentYear}. North Winds S.A</p>
        </div>
   )
}

export default Footer