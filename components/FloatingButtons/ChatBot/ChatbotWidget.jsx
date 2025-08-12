'use client'

import { ROOT_SUGGESTIONS, SERVICE_SUGGESTIONS } from './constants'
import { useState, useEffect, useRef, useMemo } from 'react'
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
import RestartIcon from '@mui/icons-material/RestartAltRounded'
import PersonIcon from '@mui/icons-material/PersonRounded'
import TopicIcon from '@mui/icons-material/TopicRounded'
import { ClickAwayListener, useMediaQuery, useTheme } from '@mui/material'
import AnimatedNorthWindsProIcon from '../NorthWindsIcon/AnimatedNorthWindsProIcon'

const getGreeting = () => {
  const h = new Date().getHours()
  const tramo = h < 12 ? 'buenos días' : h < 18 ? 'buenas tardes' : 'buenas noches'
  return `Hola, ${tramo} 👋 Soy tu asistente de NorthWinds. ¿En qué puedo ayudarte hoy?`
}

const TOPIC_LABELS = {
  servicios: 'Servicios',
  presupuesto: 'Presupuesto',
  horario: 'Horario',
  ubicacion: 'Ubicación',
  contacto: 'Contacto',
  rrhh_postulaciones: 'Empleo',
  ambito_geografico: 'Ámbito de trabajo',
  exterior: 'Trabajo en el exterior',
  disponibilidad: 'Disponibilidad',
  equipo_certificaciones: 'Equipo y certificaciones',
  eolico_mantenimiento: 'Eólico · O&M',
  eolico_correctivos: 'Eólico · Grandes correctivos',
  eolico_torqueo: 'Eólico · Torqueo y tensionado',
  eolico_palas: 'Eólico · Palas',
  eolico_inspecciones: 'Eólico · Inspecciones',
  eolico_calidad: 'Eólico · Calidad',
  eolico_obra: 'Eólico · Obra',
  eolico_montaje: 'Eólico · Montaje',
  solar_servicios: 'Solar · Servicios',
  saludo: 'Saludo',
  ayuda_menu: 'Ayuda',
  gracias: 'Gracias',
  despedida: 'Despedida',
}

const TOPIC_QUERIES = {
  servicios: 'servicios',
  presupuesto: 'presupuesto',
  horario: 'horario',
  ubicacion: 'ubicación',
  contacto: 'contacto',
  rrhh_postulaciones: 'empleo',
  ambito_geografico: 'dónde trabajan',
  exterior: 'trabajan en el exterior',
  disponibilidad: 'disponibilidad',
  equipo_certificaciones: 'formación del equipo',
  eolico_mantenimiento: 'mantenimiento eólico',
  eolico_correctivos: 'grandes correctivos eólicos',
  eolico_torqueo: 'torqueo',
  eolico_palas: 'reparación de palas',
  eolico_inspecciones: 'inspecciones eólicas',
  eolico_calidad: 'control de calidad',
  eolico_obra: 'inspección en obra',
  eolico_montaje: 'montaje de turbinas',
  solar_servicios: 'servicios solares',
}

const RELATED_TOPICS = {
  servicios: ['presupuesto', 'contacto', 'ubicacion', 'solar_servicios', 'eolico_mantenimiento'],
  presupuesto: ['contacto', 'servicios', 'ubicacion'],
  ubicacion: ['contacto', 'servicios', 'presupuesto'],
  contacto: ['horario', 'servicios', 'presupuesto'],
  rrhh_postulaciones: ['servicios', 'ubicacion'],
  eolico_mantenimiento: ['eolico_palas', 'eolico_inspecciones', 'presupuesto'],
  eolico_palas: ['eolico_mantenimiento', 'eolico_correctivos', 'presupuesto'],
  eolico_correctivos: ['eolico_mantenimiento', 'eolico_inspecciones'],
  eolico_inspecciones: ['eolico_mantenimiento', 'eolico_calidad'],
  eolico_calidad: ['eolico_inspecciones', 'eolico_montaje'],
  eolico_obra: ['eolico_montaje', 'eolico_calidad'],
  eolico_montaje: ['eolico_obra', 'eolico_calidad'],
  solar_servicios: ['servicios', 'presupuesto', 'contacto'],
}

export default function ChatbotWidget({ anchorEl, open, onClose }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')) // ✅ solo desktop muestra “Tópicos consultados”

  const [messages, setMessages] = useState([{ from: 'bot', text: getGreeting() }])
  const [input, setInput] = useState('')
  const [menu, setMenu] = useState('root')
  const [isTyping, setIsTyping] = useState(false)

  // ya se saludó
  const [seenTopics, setSeenTopics] = useState(['saludo'])
  // últimos topics devueltos por backend (para chips contextuales)
  const [lastTopics, setLastTopics] = useState([])
  // historial de últimos 5 topics (para “Tópicos consultados”)
  const [topicHistory, setTopicHistory] = useState([])

  const endRef = useRef(null)
  const lastBotRef = useRef(null)

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.from === 'bot') {
      lastBotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  }, [messages])

  useEffect(() => {
    if (isTyping) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isTyping])

  const appendBot = (text) => setMessages((m) => [...m, { from: 'bot', text }])
  const appendUser = (text) => setMessages((m) => [...m, { from: 'user', text }])

  const resetChat = () => {
    setMessages([{ from: 'bot', text: getGreeting() }])
    setInput('')
    setMenu('root')
    setIsTyping(false)
    setSeenTopics(['saludo'])
    setLastTopics([])
    setTopicHistory([])
  }

  const sendToApi = async (text) => {
    try {
      setIsTyping(true)
      const res = await fetch('/api/nlp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, seenTopics }),
      })
      const data = await res.json()
      setIsTyping(false)

      if (data?.answer) appendBot(data.answer)

      if (Array.isArray(data?.topics) && data.topics.length) {
        setSeenTopics((prev) => Array.from(new Set([...prev, ...data.topics])))
        setLastTopics(data.topics)

        const blacklist = new Set(['fallback', 'no_topic', 'policy_numeros'])
        const incoming = data.topics.filter((t) => !blacklist.has(t))
        setTopicHistory((prev) => {
          const merged = [...incoming, ...prev.filter((t) => !incoming.includes(t))]
          return merged.slice(0, 5)
        })
      } else {
        setLastTopics([])
      }

      setMenu('root')
    } catch {
      setIsTyping(false)
      appendBot('Error de conexión. Intentá de nuevo.')
      setMenu('root')
    }
  }

  const handleSend = async (forcedText) => {
    const text = (forcedText ?? input).trim()
    if (!text) return
    appendUser(text)
    setInput('')
    await sendToApi(text)
  }

  const handleRootChip = (key) => {
    if (key === 'servicios') return setMenu('services')
    if (key === 'ubicacion') return handleSend('ubicación')
    if (key === 'contacto') return handleSend('contacto')
    if (key === 'horario') return handleSend('horario')
    if (key === 'presupuesto') return handleSend('presupuesto')
  }

  const handleServiceChip = (query) => handleSend(query)

  const contextChips = useMemo(() => {
    const has = (t) => lastTopics?.includes?.(t)
    const chips = []

    if (has('ubicacion')) {
      chips.push(
        { label: 'Contacto', onClick: () => handleSend('contacto') },
        { label: 'Presupuesto', onClick: () => handleSend('presupuesto') },
        { label: 'Ver servicios', onClick: () => setMenu('services') },
      )
    }
    if (has('servicios')) {
      chips.push(
        ...SERVICE_SUGGESTIONS.slice(0, 4).map((s) => ({ label: s.label, onClick: () => handleServiceChip(s.query) })),
        { label: 'Presupuesto', onClick: () => handleSend('presupuesto') }
      )
    }
    if (has('presupuesto')) {
      chips.push(
        { label: 'Contacto', onClick: () => handleSend('contacto') },
        { label: 'Ubicación', onClick: () => handleSend('ubicación') }
      )
    }
    if (has('contacto')) {
      chips.push(
        { label: 'Horario', onClick: () => handleSend('horario') },
        { label: 'Ver servicios', onClick: () => setMenu('services') }
      )
    }
    if (has('rrhh_postulaciones')) {
      chips.push(
        { label: 'Ver servicios', onClick: () => setMenu('services') },
        { label: 'Ubicación', onClick: () => handleSend('ubicación') }
      )
    }

    const seen = new Set()
    return chips.filter((c) => !seen.has(c.label) && seen.add(c.label))
  }, [lastTopics])

  const topicChips = useMemo(() => {
    if (!topicHistory?.length) return []
    const dedup = new Set()
    return topicHistory
      .map((t) => ({ key: t, label: TOPIC_LABELS[t] || t }))
      .filter((t) => !!t.label)
      .filter((t) => !dedup.has(t.key) && dedup.add(t.key))
      .map((t) => ({
        ...t,
        onClick: () => {
          if (t.key === 'servicios') return setMenu('services')
          const q = TOPIC_QUERIES[t.key] || t.label
          return handleSend(q)
        },
      }))
  }, [topicHistory])

  const relatedChips = useMemo(() => {
    const current = topicHistory[0]
    const rel = RELATED_TOPICS[current] || []
    const used = new Set(topicHistory)
    return rel
      .filter((t) => !used.has(t))
      .slice(0, 6)
      .map((t) => ({
        key: t,
        label: TOPIC_LABELS[t] || t,
        onClick: () => handleSend(TOPIC_QUERIES[t] || (TOPIC_LABELS[t] || t)),
      }))
  }, [topicHistory])

  if (!open) return null

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Slide in={open} direction="up" mountOnEnter unmountOnExit>
        <Paper
          elevation={10}
          sx={{
            position: 'fixed',
            right: 24,
            bottom: { xs: 88, sm: 96 },
            // ✅ responsive: más ancho en desktop, compacto en móvil
            width: { xs: 'min(94vw, 420px)', sm: 520, md: 560 },
            height: { xs: '68vh', sm: '600px' },
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
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'transparent' }}>
              <AnimatedNorthWindsProIcon
                size={56}
                spinSeconds={8}
                primary="#111827"
                blade="#0F172A"
                accent="#22C55E"
                bgStart="#E9F4FF"
                bgEnd="#F4FFF7"
              />
            </Avatar>
              <Box sx={{ fontWeight: 700 }}>NorthWinds Chat</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton size="small" title="Reiniciar" onClick={resetChat}>
                <RestartIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Mensajes */}
          <Box
            sx={{
              flex: 1,
              px: 1.25,
              pt: 1,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              bgcolor: 'rgba(255,255,255,0.9)',
              scrollbarWidth: 'thin',
              '&::-webkit-scrollbar': { width: 8 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 8 },
              '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
            }}
          >
            {messages.map((m, i) => {
              const isBot = m.from === 'bot'
              const isLast = i === messages.length - 1
              return (
                <Box
                  key={i}
                  ref={isBot && isLast ? lastBotRef : null}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 1.2,
                    flexDirection: isBot ? 'row' : 'row-reverse',
                    alignItems: 'flex-end',
                  }}
                >
                  <Avatar sx={{ width: 28, height: 28, bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>
                    {isBot ? <AnimatedNorthWindsProIcon size={22} title="NorthWinds"  /> : <PersonIcon fontSize="small" />}
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
                  <AnimatedNorthWindsProIcon size={22} title="NorthWinds" />
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

          {/* Bandeja de tópicos consultados — solo desktop */}
          {isDesktop && (
            <>
              <Divider />
              <Box sx={{ px: 1.25, py: topicChips.length ? 1 : 0 }}>
                {!!topicChips.length && (
                  <Box
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      background: 'linear-gradient(180deg, rgba(25,118,210,0.04), rgba(76,175,80,0.04))',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                      <TopicIcon fontSize="small" />
                      <Box sx={{ fontWeight: 700, fontSize: 14 }}>Tópicos consultados</Box>
                    </Box>
                    <Box sx={{ color: 'text.secondary', fontSize: 13, mb: 1 }}>
                      Tocá un tópico para ver info relacionada o volver a buscar detalles.
                    </Box>

                    {/* Grid de últimos 5 tópicos */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: 0.75,
                        mb: relatedChips.length ? 1 : 0,
                      }}
                    >
                      {topicChips.map((c) => (
                        <Chip
                          key={c.key}
                          label={c.label}
                          onClick={c.onClick}
                          variant="filled"
                          color="primary"
                          size="small"
                          sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                          disabled={isTyping}
                        />
                      ))}
                    </Box>

                    {/* Temas relacionados al más reciente */}
                    {!!relatedChips.length && (
                      <>
                        <Box sx={{ color: 'text.secondary', fontSize: 12, mb: 0.5 }}>
                          Temas relacionados
                        </Box>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          {relatedChips.map((c) => (
                            <Chip
                              key={c.key}
                              label={c.label}
                              onClick={c.onClick}
                              variant="outlined"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              disabled={isTyping}
                            />
                          ))}
                        </Stack>
                      </>
                    )}
                  </Box>
                )}
              </Box>
            </>
          )}

          {/* Sugerencias contextuales + persistentes */}
          <Box sx={{ px: 1.25, pb: 1, display: 'grid', gap: 0.75 }}>
            {!!contextChips.length && (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {contextChips.map((c) => (
                  <Chip
                    key={c.label}
                    label={c.label}
                    onClick={c.onClick}
                    variant="filled"
                    color="primary"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    disabled={isTyping}
                  />
                ))}
              </Stack>
            )}

            {menu === 'root' && (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {ROOT_SUGGESTIONS.map((s) => (
                  <Chip
                    key={s.key}
                    label={s.label}
                    onClick={() => handleRootChip(s.key)}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                    disabled={isTyping}
                  />
                ))}
                <Chip
                  label="Ver servicios"
                  onClick={() => setMenu('services')}
                  color="primary"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  disabled={isTyping}
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
                    size="small"
                    sx={{ borderRadius: 2 }}
                    disabled={isTyping}
                  />
                ))}
                <Chip
                  label="Volver"
                  onClick={() => setMenu('root')}
                  color="primary"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  disabled={isTyping}
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
              placeholder="Escribí tu mensaje…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              disabled={isTyping}
            />
            <IconButton onClick={() => handleSend()} color="primary" disabled={!input.trim() || isTyping}>
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </ClickAwayListener>
  )
}
