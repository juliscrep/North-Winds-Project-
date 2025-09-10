'use client'

import { useState, useRef } from 'react'
import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import { ClickAwayListener } from '@mui/material'
import ChatbotWidget from '../ChatBot/ChatbotWidget'
import { whatsappMessage } from './const'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedNorthWindsProIcon from '../NorthWindsIcon/AnimatedNorthWindsProIcon'

export default function FloatingButtons() {
  // Sanitizamos el número (por si viene con +, espacios, guiones, etc.)
  const whatsappNumberRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const whatsappNumber = whatsappNumberRaw.replace(/\D/g, '')
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/north.winds.sa/'
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/north-winds-sa/'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  const [chatOpen, setChatOpen] = useState(false)
  const chatButtonRef = useRef(null)
  const toggleChat = () => setChatOpen(v => !v)

  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(v => !v)
  const closeMenu = () => setMenuOpen(false)

  const basePos = { bottom: 20, right: 20 }
  const chatPos = { bottom: 96, right: 24 }

  return (
    <>
      <ClickAwayListener onClickAway={closeMenu}>
        <Box sx={{ position: 'fixed', ...basePos, zIndex: 1300 }}>
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
                        width: 48,
                        height: 48,
                        color: '#fff',
                        background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                        boxShadow: '0 10px 24px rgba(0,0,0,.22)',
                        '&:hover': { filter: 'brightness(1.05)', transform: 'translateY(-1px)' },
                        transition: 'transform .16s ease, filter .16s ease',
                      }}
                    >
                      <FaInstagram size={20} color="#fff" />
                    </IconButton>
                  </Tooltip>
                </motion.div>

                {/* LinkedIn full (nuevo) */}
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: -208 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26, delay: .04 }}
                  style={{ position: 'absolute', right: 0, bottom: 0 }}
                >
                  <Tooltip title="LinkedIn" placement="top">
                    <IconButton
                      component="a"
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      sx={{
                        width: 48, height: 48,
                        color: '#fff',
                        bgcolor: '#0a66c2', // color marca LinkedIn
                        boxShadow: '0 10px 24px rgba(0,0,0,.22)',
                        '&:hover': { bgcolor: '#095aa9', transform: 'translateY(-1px)' },
                        transition: 'transform .16s ease, filter .16s ease'
                      }}
                    >
                      <FaLinkedin size={20} />
                    </IconButton>
                  </Tooltip>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* FAB combinado (se mantiene igual; abre/cierra el menú) */}
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
             <Box sx={{ position: 'relative', width: 56, height: 56 }}>
              {/* WhatsApp tercio izquierdo */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                clipPath: 'polygon(0 0, 33.333% 0, 33.333% 100%, 0 100%)',
                bgcolor: '#25d366'
              }} />

              {/* Instagram tercio medio */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                clipPath: 'polygon(33.333% 0, 66.666% 0, 66.666% 100%, 33.333% 100%)',
                background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
              }} />

              {/* LinkedIn tercio derecho */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                clipPath: 'polygon(66.666% 0, 100% 0, 100% 100%, 66.666% 100%)',
                bgcolor: '#0a66c2'
              }} />

              {/* Divisores suaves */}
              <Box sx={{
                position: 'absolute',
                top: 4, bottom: 4, left: '33.333%',
                width: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,.6)',
                transform: 'translateX(-1px)'
              }} />
              <Box sx={{
                position: 'absolute',
                top: 4, bottom: 4, left: '66.666%',
                width: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,.6)',
                transform: 'translateX(-1px)'
              }} />

              {/* Iconos centrados por tercio */}
              <Box sx={{
                position: 'absolute', left: 0, top: 0, width: '33.333%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
              }}>
                <FaWhatsapp size={18} />
              </Box>
              <Box sx={{
                position: 'absolute', left: '33.333%', top: 0, width: '33.333%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
              }}>
                <FaInstagram size={17} />
              </Box>
              <Box sx={{
                position: 'absolute', left: '66.666%', top: 0, width: '33.333%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
              }}>
                <FaLinkedin size={17} />
              </Box>
            </Box>
            </IconButton>
          </motion.div>
        </Box>
      </ClickAwayListener>

      {/* Chatbot */}
      <Tooltip title="Asistente digital" placement="left">
        <IconButton
          ref={chatButtonRef}
          onClick={toggleChat}
          aria-label="Abrir Chatbot"
          sx={{
            position: 'fixed',
            ...chatPos,
            zIndex: 1300,
            width: 56,
            height: 56,
            color: '#fff',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(25,118,210,1), rgba(76,175,80,0.95))',
            boxShadow: '0 12px 28px rgba(0,0,0,.22)',
            transition: 'transform .18s ease, box-shadow .18s ease, filter .18s ease',
            '&:hover': { transform: 'translateY(-2px) scale(1.03)', boxShadow: '0 16px 32px rgba(0,0,0,.28)', filter: 'brightness(1.03)' },
            '&:active': { transform: 'scale(.98)' },
          }}
        >
          <AnimatedNorthWindsProIcon
            size={56}
            spinSeconds={8}
            primary="#111827"
            blade="#0F172A"
            accent="#22C55E"
            bgStart="#E9F4FF"
            bgEnd="#F4FFF7"
          />
        </IconButton>
      </Tooltip>

      <ChatbotWidget
        anchorEl={chatButtonRef.current}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  )
}
