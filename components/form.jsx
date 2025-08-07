'use client';

import { useState } from 'react';
import styles from '../Styles/form.module.css';
import { formText } from '@/components/constants/form.content';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeqyeblr';

const Form = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.errors?.map((e) => e.message).join(', ') || 'Error al enviar';
        setMessage(errorMessage);
        return;
      }

      setMessage(formText.success);
      event.target.reset();
    } catch (error) {
      setMessage('Ocurrió un error inesperado.');
    }
  };

  return (
    <div className={styles.container}>
      <form id="form" action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit}>
        <h4 className={styles.title}>{formText.title}</h4>

        <input
          type="text"
          id="name"
          name="name"
          placeholder={formText.placeholders.name}
          className={styles.input}
          required
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder={formText.placeholders.email}
          className={styles.input}
          required
        />

        <input
          type="text"
          id="subject"
          name="subject"
          placeholder={formText.placeholders.subject}
          className={styles.input}
          required
        />

        <textarea
          id="message"
          name="message"
          placeholder={formText.placeholders.message}
          className={`${styles.input} ${styles.textarea}`}
          rows={5}
          required
        />

        <div className={styles.btn}>
          <button type="submit" className={styles.button}>
            {formText.button}
          </button>
        </div>

        {message && (
          <div className={styles.textAlert}>
            <span className={styles.alert}>{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
