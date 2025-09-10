// /app/api/rrhh/submit/route.js
export const runtime = 'nodejs';

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { renderApplicationHTML } from '@/lib/rrhhEmailTemplates';
import fs from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_MB = 10;

function getTransport() {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // true para 465 (SSL), false si usás 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function saveJson(kind, payload) {
  try {
    if (process.env.SAVE_SUBMISSIONS !== 'true') return;
    const dir = path.join(process.cwd(), '.data', kind);
    await fs.mkdir(dir, { recursive: true });
    const file = `${Date.now()}-${(payload?.fields?.fullName || 'anon').replace(/\s+/g, '_')}.json`;
    await fs.writeFile(path.join(dir, file), JSON.stringify(payload, null, 2), 'utf8');
  } catch {}
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const type = form.get('type') || 'manual';         // 'upload' | 'manual'
    const fields = JSON.parse(form.get('fields') || '{}');

    // Honeypot
    if (fields?.website) return NextResponse.json({ message: 'OK' }, { status: 200 });

    // Adjunto opcional
    const file = form.get('file');
    const attachments = [];
    if (file && typeof file.arrayBuffer === 'function') {
      const sizeMB = (file.size || 0) / (1024 * 1024);
      if (sizeMB > MAX_MB) {
        return NextResponse.json({ error: `Adjunto excede ${MAX_MB}MB.` }, { status: 400 });
      }
      if (file.type && !ALLOWED_MIME.includes(file.type)) {
        return NextResponse.json({ error: 'Formato de adjunto no permitido.' }, { status: 400 });
      }
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name || 'cv',
        content: buf,
        contentType: file.type || 'application/octet-stream',
      });
    }

    const html = renderApplicationHTML(fields, type);
    const subject = `[RRHH] ${fields.fullName || 'Postulación'} — ${fields.area || 'Sin área'}`;
    const textBody =
      `Nueva postulación (${type === 'upload' ? 'con CV adjunto' : 'formulario manual'})\n` +
      `Nombre: ${fields.fullName || '—'}\n` +
      `Email: ${fields.email || '—'}\n` +
      `Tel: ${fields.phone || '—'}\n` +
      `Puesto: ${fields.area || '—'}`;

    await getTransport().sendMail({
      from: process.env.MAIL_FROM,            // tu Gmail o remitente autenticado
      to: process.env.MAIL_TO,                // buzón de RRHH
      subject,
      text: textBody,                         // <<<<<< AQUI DEFINIDO
      html,
      attachments: attachments.length ? attachments : undefined,
      replyTo: fields.email
        ? `${fields.fullName || ''} <${fields.email}>`
        : undefined,
    });

    await saveJson('rrhh', {
      type,
      fields,
      file: file ? { name: file.name, type: file.type, size: file.size } : null,
    });

    return NextResponse.json({ message: 'Postulación enviada con éxito.' }, { status: 200 });
  } catch (err) {
    console.error('RRHH submit error:', err);
    return NextResponse.json({ error: 'No se pudo enviar la postulación.' }, { status: 500 });
  }
}
