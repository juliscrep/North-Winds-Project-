'use client'

import { FaWhatsapp, FaRobot } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import styles from './FloatingButtons.module.css'
import { useState, useRef } from 'react'
import ChatbotWidget from '../ChatBot/ChatbotWidget'
import {whatsappMessage} from './const'

export default function FloatingButtons() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

   const [anchorEl, setAnchorEl] = useState(null)
  const handleChatClick = (e) => setAnchorEl(prev => (prev ? null : e.currentTarget))
  const chatOpen = Boolean(anchorEl)

  return (
    <>
      {/* WhatsApp flotante */}
      <IconButton
        component="a"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        sx={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 1300,
          bgcolor: '#25d366', color: '#fff', width: 56, height: 56,
          '&:hover': { bgcolor: '#1ebe57' }
        }}
      >
        <FaWhatsapp size={28} />
      </IconButton>

      {/* Chatbot flotante */}
      <IconButton
        onClick={handleChatClick}
        aria-label="Abrir Chatbot"
        sx={{
          position: 'fixed', bottom: 90, right: 20, zIndex: 1300,
          bgcolor: 'primary.main', color: '#fff', width: 56, height: 56,
          '&:hover': { bgcolor: 'primary.dark' }
        }}
      >
        <FaRobot size={28} />
      </IconButton>

      {/* Popper chat */}
      <ChatbotWidget
        anchorEl={anchorEl}
        open={chatOpen}
        onClose={() => setAnchorEl(null)}
      />
    </>
  )
}
