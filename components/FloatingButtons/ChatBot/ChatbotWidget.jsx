'use client'

import { ROOT_SUGGESTIONS, SERVICE_SUGGESTIONS } from './constants'
import { useState, useEffect, useRef } from 'react'
import Slide from '@mui/material/Slide'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/SendRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import RobotIcon from '@mui/icons-material/SmartToyRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import { ClickAwayListener } from '@mui/material'

const getGreeting = () => {
  const h = new Date().getHours()
  const tramo = h < 12 ? 'buenos días' : h < 18 ? 'buenas tardes' : 'buenas noches'
  return `Hola, ${tramo} 👋 Soy tu asistente de NorthWinds. ¿En qué puedo ayudarte hoy?`
}


export default function ChatbotWidget({ anchorEl, open, onClose }) {
  const [messages, setMessages] = useState([{ from: 'bot', text: getGreeting() }])
  const [input, setInput] = useState('')
  const [menu, setMenu] = useState('root')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendToApi = async (text) => {
    try {
      setIsTyping(true)
      const res = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      setIsTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: data.answer }])
      setMenu('root') // re-mostramos sugerencias siempre
    } catch {
      setIsTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: 'Error de conexión. Intenta de nuevo.' }])
      setMenu('root')
    }
  }

  const handleSend = async (forcedText) => {
    const text = (forcedText ?? input).trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    await sendToApi(text)
  }

  const handleRootChip = (key) => {
    if (key === 'servicios') return setMenu('services')
    if (key === 'ubicacion')  return handleSend('ubicación')
    if (key === 'contacto')   return handleSend('contacto')
    if (key === 'horario')    return handleSend('horario')
    if (key === 'presupuesto')return handleSend('presupuesto')
  }

  const handleServiceChip = (query) => handleSend(query)

  if (!open) return null

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Slide in={open} direction="up" mountOnEnter unmountOnExit>
        <Paper
          elevation={10}
          sx={{
            position: 'fixed',
            right: 24,
            bottom: { xs: 88, sm: 96 },  // encima del botón de WhatsApp
            width: { xs: 340, sm: 400 }, // un poquito más grande
            height: { xs: '65vh', sm: '560px' }, // alto máximo, no empuja la página
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
            zIndex: 1300,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(25,118,210,0.1), rgba(76,175,80,0.08))',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
                <RobotIcon fontSize="small" />
              </Avatar>
              <Box sx={{ fontWeight: 700 }}>NorthWinds Chat</Box>
            </Box>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Mensajes: scroll interno con overscroll controlado */}
          <Box
            sx={{
              flex: 1,
              px: 1.25,
              pt: 1,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              bgcolor: 'rgba(255,255,255,0.9)',
              // Scrollbar sutil (WebKit + Firefox)
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': { width: 8 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 8 },
              '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
            }}
          >
            {messages.map((m, i) => {
              const isBot = m.from === 'bot'
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 1.2,
                    flexDirection: isBot ? 'row' : 'row-reverse',
                    alignItems: 'flex-end',
                  }}
                >
                  <Avatar sx={{ width: 28, height: 28, bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>
                    {isBot ? <RobotIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                  </Avatar>
                  <Box
                    sx={{
                      px: 1.25,
                      py: 0.9,
                      bgcolor: isBot ? 'grey.100' : 'primary.light',
                      borderRadius: 2,
                      maxWidth: '82%',
                      whiteSpace: 'pre-wrap',
                      border: isBot ? '1px solid' : 'none',
                      borderColor: isBot ? 'divider' : 'transparent',
                    }}
                  >
                    {m.text}
                  </Box>
                </Box>
              )
            })}

            {isTyping && (
              <Box sx={{ display: 'flex', gap: 1, mb: 1.2, alignItems: 'flex-end' }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
                  <RobotIcon fontSize="small" />
                </Avatar>
                <Box
                  sx={{
                    px: 1.25,
                    py: 0.9,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    maxWidth: '60%',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  Escribiendo…
                </Box>
              </Box>
            )}

            <div ref={endRef} />
          </Box>

          {/* Sugerencias persistentes (root o services) */}
          <Divider />
          <Box sx={{ px: 1.25, py: 1 }}>
            {menu === 'root' && (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {ROOT_SUGGESTIONS.map((s) => (
                  <Chip
                    key={s.key}
                    label={s.label}
                    onClick={() => handleRootChip(s.key)}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  />
                ))}
                <Chip
                  label="Ver servicios"
                  onClick={() => setMenu('services')}
                  color="primary"
                  sx={{ borderRadius: 2 }}
                />
              </Stack>
            )}
            {menu === 'services' && (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {SERVICE_SUGGESTIONS.map((s) => (
                  <Chip
                    key={s.label}
                    label={s.label}
                    onClick={() => handleServiceChip(s.query)}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  />
                ))}
                <Chip
                  label="Volver"
                  onClick={() => setMenu('root')}
                  color="primary"
                  sx={{ borderRadius: 2 }}
                />
              </Stack>
            )}
          </Box>

          {/* Input */}
          <Divider />
          <Box sx={{ p: 1.25, display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Escribe tu mensaje…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton onClick={() => handleSend()} color="primary">
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </ClickAwayListener>
  )
}
