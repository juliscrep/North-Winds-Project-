'use client'

import * as React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Divider, Link
} from '@mui/material'

export default function PrivacyPolicyDialog({
  open,
  onClose,
  company = 'NorthWinds S.A.',
  contactEmail = 'northwinds1223@gmail.com',
  lastUpdated = '1 de septiembre de 2025'
}) {
  const titleId = 'privacy-policy-title'
  const descId = 'privacy-policy-desc'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
      aria-labelledby={titleId}
      aria-describedby={descId}
      PaperProps={{
        elevation: 8,
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle id={titleId} sx={{ pb: 1 }}>
        Políticas de Privacidad
        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
          Última actualización: {lastUpdated}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent
        id={descId}
        dividers
        sx={{
          py: 2.25,
          // tipografía más pequeña y consistente
          '&, & *': { fontSize: 13, lineHeight: 1.6 },
          // títulos de sección con estética corporativa
          '& .pp-section-title': {
            fontWeight: 700,
            letterSpacing: '.02em',
            color: 'text.primary',
            mt: 1.25,
            mb: 0.5
          },
          // listas limpias
          '& ul': { paddingLeft: 2.5, margin: 0 },
          '& li': { marginBottom: 0.5 }
        }}
      >
        <Typography>
          En <strong>{company}</strong> respetamos tu privacidad y nos comprometemos a tratar
          tus datos personales de forma lícita, leal, transparente y segura. Esta Política
          describe qué información recolectamos, para qué la usamos, con quién la compartimos,
          por cuánto tiempo la conservamos y qué derechos podés ejercer.
        </Typography>

        <Typography className="pp-section-title">1) Responsable del tratamiento</Typography>
        <Typography>
          <strong>{company}</strong>, RN60 y Av. 24 de Mayo, Aimogasta, La Rioja, Argentina.
          Contacto: <Link href={`mailto:${contactEmail}`} underline="hover">{contactEmail}</Link>.
        </Typography>

        <Typography className="pp-section-title">2) Alcance</Typography>
        <Typography>
          Esta política aplica a los datos personales proporcionados en procesos de selección
          y/o a través de nuestros formularios web, correos y canales de contacto vinculados al
          área de RR.HH., y a comunicaciones relacionadas.
        </Typography>

        <Typography className="pp-section-title">3) Datos que podemos tratar</Typography>
        <ul>
          <li>Identificación y contacto: nombre y apellido, email, teléfono.</li>
          <li>Información profesional: formación, experiencia, certificaciones, CV y referencias.</li>
          <li>Datos técnicos mínimos: metadatos del envío (fecha/hora, dirección IP y agente de usuario) para seguridad y registro.</li>
          <li>Información adicional que nos brindes en tu mensaje o durante entrevistas.</li>
        </ul>
        <Typography sx={{ color: 'text.secondary' }}>
          No solicitamos datos sensibles salvo que sean estrictamente necesarios y con base legal adecuada.
          Evitá incluir información innecesaria o de terceros sin autorización.
        </Typography>

        <Typography className="pp-section-title">4) Finalidades del tratamiento</Typography>
        <ul>
          <li>Gestionar tu postulación y procesos de selección presentes o futuros.</li>
          <li>Contactarte para coordinar entrevistas, pruebas o intercambios de información.</li>
          <li>Verificación de antecedentes laborales (cuando corresponda y según normativa).</li>
          <li>Cumplir obligaciones legales y atender requerimientos de autoridades competentes.</li>
          <li>Mejorar nuestros procesos de selección y experiencia del postulante.</li>
        </ul>

        <Typography className="pp-section-title">5) Bases legales</Typography>
        <ul>
          <li><em>Consentimiento</em> del postulante al remitir su información.</li>
          <li><em>Interés legítimo</em> en evaluar la idoneidad de perfiles para posiciones actuales o futuras.</li>
          <li><em>Cumplimiento de obligaciones legales</em> aplicables.</li>
        </ul>

        <Typography className="pp-section-title">6) Destinatarios y encargados</Typography>
        <Typography>
          Podremos compartir tus datos dentro de {company} (RR.HH. y áreas de contratación).
          No cedemos tus datos a terceros salvo: (i) obligación legal o requerimiento de autoridad,
          (ii) prestadores que actúen como <em>encargados</em> de tratamiento (por ejemplo, hosting,
          herramientas de reclutamiento, soporte TI) bajo acuerdos de confidencialidad y seguridad.
        </Typography>

        <Typography className="pp-section-title">7) Transferencias internacionales</Typography>
        <Typography>
          Si, por motivos operativos, tus datos fueran alojados o accedidos desde otros países,
          aplicaremos salvaguardas adecuadas y acuerdos contractuales razonables, procurando niveles
          de protección equivalentes a los exigidos por la normativa aplicable.
        </Typography>

        <Typography className="pp-section-title">8) Plazos de conservación</Typography>
        <Typography>
          Conservaremos tu información durante la vigencia del proceso de selección y por un período
          razonable para oportunidades futuras, salvo que solicites su eliminación antes, siempre que
          no exista una obligación legal que requiera su conservación.
        </Typography>

        <Typography className="pp-section-title">9) Seguridad</Typography>
        <Typography>
          Implementamos medidas técnicas y organizativas razonables para resguardar tus datos
          contra acceso, uso o divulgación no autorizados, así como pérdida, alteración o destrucción.
          Ningún sistema es totalmente infalible; si detectás incidentes de seguridad, escribinos a{' '}
          <Link href={`mailto:${contactEmail}`} underline="hover">{contactEmail}</Link>.
        </Typography>

        <Typography className="pp-section-title">10) Derechos de las personas usuarias</Typography>
        <Typography>
          Podés solicitar: acceso, rectificación/actualización, supresión, limitación u oposición al
          tratamiento y portabilidad (cuando aplique). También podés retirar tu consentimiento sin
          efectos retroactivos. Para ejercerlos, escribí a{' '}
          <Link href={`mailto:${contactEmail}`} underline="hover">{contactEmail}</Link>.
        </Typography>

        <Typography className="pp-section-title">11) Menores de edad</Typography>
        <Typography>
          Nuestros procesos de selección no están dirigidos a menores de edad. Si considerás que hemos
          recibido datos de una persona menor sin autorización, contactanos para gestionarlo.
        </Typography>

        <Typography className="pp-section-title">12) Cookies y tecnologías similares</Typography>
        <Typography>
          Podríamos utilizar cookies/tecnologías análogas en nuestros sitios con fines operativos,
          de seguridad, medición y mejora. Para más información, consultá nuestra política de cookies
          (si corresponde).
        </Typography>

        <Typography className="pp-section-title">13) Actualizaciones de esta política</Typography>
        <Typography>
          Podemos modificar esta política para reflejar cambios normativos u operativos. Publicaremos
          la versión vigente y la fecha de actualización.
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1.5, display: 'block' }}>
          Aviso: Este texto es informativo y debe ser revisado por asesoría legal para su adecuación a tu operación
          y a la normativa vigente aplicable.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 1.5 }}>
        <Button onClick={onClose} variant="contained">Entendido</Button>
      </DialogActions>
    </Dialog>
  )
}
