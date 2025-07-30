'use client'

import { FaWhatsapp, FaRobot } from 'react-icons/fa'
import styles from './FloatingButtons.module.css'
import {whatsappMessage} from './const'

export default function FloatingButtons() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  const chatbotLink = '/chatbot'

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp}
        aria-label="Chatear por WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <a
        href={chatbotLink}
        className={styles.chatbot}
        aria-label="Abrir Chatbot"
      >
        <FaRobot />
      </a>
    </>
  )
}
