'use client'

import { useState, useEffect, useRef } from 'react'
import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import { ClickAwayListener } from '@mui/material'

export default function ChatbotWidget({ anchorEl, open, onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! 👋 Soy tu asistente de NorthWinds. ¿En qué puedo ayudarte hoy?' }
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return
    setMessages((msgs) => [...msgs, { from: 'user', text }])
    setInput('')

    try {
      const res = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const { answer } = await res.json()
      setMessages((msgs) => [...msgs, { from: 'bot', text: answer }])
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: 'Error de conexión. Por favor, intenta de nuevo.' }
      ])
    }
  }

  if (!open) return null

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top-end"
        transition
        modifiers={[{ name: 'offset', options: { offset: [0, -8] } }]}>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'bottom right' }}>
            <Paper
              elevation={3}
              sx={{
                width: 300,
                maxHeight: 400,
                bgcolor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box component="span" fontWeight="bold">NorthWinds Chat</Box>
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1, px: 1, pt: 0.5, overflowY: 'auto' }}>
                {messages.map((m, i) => (
                  <Box
                    key={i}
                    sx={{ mb: 1, px: 1, py: 0.5,
                      alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
                      bgcolor: m.from === 'bot' ? 'grey.100' : 'primary.light',
                      borderRadius: 1, maxWidth: '75%' }}>
                    {m.text}
                  </Box>
                ))}
                <div ref={endRef} />
              </Box>

              <Box sx={{ p: 1, display: 'flex', borderTop: '1px solid', borderColor: 'divider' }}>
                <TextField
                  fullWidth variant="outlined" size="small"
                  placeholder="Escribe tu mensaje..."
                  value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
                <IconButton onClick={handleSend} sx={{ ml: 1 }}>
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ClickAwayListener>
  )
}

