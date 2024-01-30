'use client'

import { useState } from 'react';
import styles from '../Styles/form.module.css';

const Form = () => {
 const [message,setMessage] = useState('')
 const handleSubmit = async(event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const response = await fetch(event.target.action,{
    method: 'POST',
    body: data,
    headers:{Accept:'application/json'}
  })

  const result = await response.json()
  if(!response.ok){
    setMessage(result.errors.map(error => error.message).join(','))
    return false
  }

  setMessage("Se ha enviado tu correo satisfactoriamente!")
  event.target.reset();

}

    return(
        <div className={styles.container}> 
        <div>
          <form id='form' action="https://formspree.io/f/xeqyeblr" method="POST" onSubmit={handleSubmit}>
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
            
            <div className={styles.textAlert}>
              <p>{message && <span className={styles.alert}>{message}</span>}</p>
            </div>
             
          </form>
         
        </div>
      </div>
    )

}

export default Form;