'use client'

import { useState, useRef } from 'react'
import { FaWhatsapp, FaInstagram, FaRobot } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import { ClickAwayListener } from '@mui/material'
import ChatbotWidget from '../ChatBot/ChatbotWidget'
import { whatsappMessage } from './const'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingButtons() {
  // LINKS
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/north.winds.sa/'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Chatbot
  const [chatOpen, setChatOpen] = useState(false)
  const chatButtonRef = useRef(null)
  const toggleChat = () => setChatOpen(v => !v)

  // Split FAB
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(v => !v)
  const closeMenu = () => setMenuOpen(false)

  const basePos = { bottom: 20, right: 20 }
  const chatPos = { bottom: 96, right: 24 }

  return (
    <>
      {/* CONTENEDOR FIJO DEL FAB COMBINADO */}
      <ClickAwayListener onClickAway={closeMenu}>
        <Box sx={{ position: 'fixed', ...basePos, zIndex: 1300 }}>
          {/* BOTONES DESPLEGADOS (a la IZQUIERDA, para no chocar con el chat) */}
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* WhatsApp full */}
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: -72 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  style={{ position: 'absolute', right: 0, bottom: 0 }}
                >
                  <Tooltip title="WhatsApp" placement="top">
                    <IconButton
                      component="a"
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      sx={{
                        width: 48, height: 48, color: '#fff',
                        bgcolor: '#25d366',
                        boxShadow: '0 10px 24px rgba(0,0,0,.22)',
                        '&:hover': { bgcolor: '#1ebe57', transform: 'translateY(-1px)' },
                        transition: 'transform .16s ease, filter .16s ease'
                      }}
                    >
                      <FaWhatsapp size={22} />
                    </IconButton>
                  </Tooltip>
                </motion.div>

                {/* Instagram full */}
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: -140 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: .02 }}
                  style={{ position: 'absolute', right: 0, bottom: 0 }}
                >
                  <Tooltip title="Instagram" placement="top">
                    <IconButton
                      component="a"
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      sx={{
                        width: 48, height: 48, color: '#fff',
                        background:
                          'radial-gradient(30% 30% at 30% 30%, #ffd776, transparent), ' +
                          'linear-gradient(135deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)',
                        boxShadow: '0 10px 24px rgba(0,0,0,.22)',
                        '&:hover': { filter: 'brightness(1.05)', transform: 'translateY(-1px)' },
                        transition: 'transform .16s ease, filter .16s ease'
                      }}
                    >
                      <FaInstagram size={20} />
                    </IconButton>
                  </Tooltip>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* FAB COMBINADO: mitad WhatsApp / mitad Instagram */}
          <motion.div
            animate={{ rotate: menuOpen ? -90 : 0, scale: menuOpen ? 1.04 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <IconButton
              onClick={toggleMenu}
              aria-label="Abrir opciones"
              sx={{
                width: 56,
                height: 56,
                p: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 12px 28px rgba(0,0,0,.22)',
                transition: 'box-shadow .2s ease, transform .2s ease',
                '&:hover': { boxShadow: '0 16px 32px rgba(0,0,0,.28)', transform: 'translateY(-1px)' },
                background: 'transparent'
              }}
            >
              {/* Círculo dividido en dos mitades con iconos */}
              <Box sx={{ position: 'relative', width: 56, height: 56 }}>
                {/* Mitad izquierda: WhatsApp */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                  bgcolor: '#25d366'
                }} />
                {/* Mitad derecha: Instagram */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
                  background:
                    'radial-gradient(30% 30% at 30% 30%, #ffd776, transparent),' +
                    'linear-gradient(135deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)'
                }} />
                {/* Divisor sutil */}
                <Box sx={{
                  position: 'absolute', top: 4, bottom: 4, left: '50%',
                  width: 1, bgcolor: 'rgba(255,255,255,.6)', transform: 'translateX(-.5px)'
                }} />
                {/* Iconos centrados en cada mitad */}
                <Box sx={{
                  position: 'absolute', left: 0, top: 0, width: '50%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  <FaWhatsapp size={20} />
                </Box>
                <Box sx={{
                  position: 'absolute', left: '50%', top: 0, width: '50%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  <FaInstagram size={18} />
                </Box>
              </Box>
            </IconButton>
          </motion.div>
        </Box>
      </ClickAwayListener>

      {/* BOTÓN FLOTANTE DEL CHATBOT (queda igual, con tooltip) */}
      <Tooltip title="Asistente digital" placement="left">
        <IconButton
          ref={chatButtonRef}
          onClick={toggleChat}
          aria-label="Abrir Chatbot"
          sx={{
            position: 'fixed',
            ...chatPos,
            zIndex: 1300,
            width: 56, height: 56, color: '#fff', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(25,118,210,1), rgba(76,175,80,0.95))',
            boxShadow: '0 12px 28px rgba(0,0,0,.22)',
            transition: 'transform .18s ease, box-shadow .18s ease, filter .18s ease',
            '&:hover': { transform: 'translateY(-2px) scale(1.03)', boxShadow: '0 16px 32px rgba(0,0,0,.28)', filter: 'brightness(1.03)' },
            '&:active': { transform: 'scale(.98)' }
          }}
        >
          <FaRobot size={22} />
        </IconButton>
      </Tooltip>

      {/* CHAT WIDGET */}
      <ChatbotWidget
        anchorEl={chatButtonRef.current}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  )
}
