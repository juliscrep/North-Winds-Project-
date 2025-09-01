'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessDialog({
  open,
  iconSrc = '/public/img/logo.jpeg',
  title = '¡Felicitaciones!',
  message = 'Muchas gracias. Ya registramos tu postulación en nuestra base de selección. Cuando se abra una posición adecuada, nos pondremos en contacto.',
  primaryText = 'Aceptar',
  onAccept,            // callback al hacer click
}) {
  const btnRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (open) btnRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onKeyDown={(e) => { if (e.key === 'Escape') onAccept?.(); }}
      style={{
        position:'fixed', inset:0, zIndex:1000,
        background:'rgba(0,0,0,.55)', display:'flex',
        alignItems:'center', justifyContent:'center', padding:16
      }}
    >
      <div
        style={{
          width:'min(520px, 96vw)',
          borderRadius:16,
          background:'linear-gradient(180deg, #0f1620, #131a25)',
          border:'1px solid #2d3642',
          color:'#e6edf3',
          boxShadow:'0 18px 48px rgba(0,0,0,.35)',
          padding:20, textAlign:'center'
        }}
      >
        <img
          src={iconSrc}
          alt="NorthWinds"
          width={56}
          height={56}
          style={{ display:'block', margin:'4px auto 12px' }}
        />
        <h2 style={{ margin:'0 0 6px', fontSize:22, lineHeight:1.15 }}>{title}</h2>
        <p style={{ margin:'0 0 16px', opacity:.9, fontSize:15 }}>
          {message}
        </p>

        <div style={{ display:'flex', justifyContent:'center' }}>
          <button
            ref={btnRef}
            onClick={onAccept ?? (() => router.push('/'))}
            style={{
              padding:'12px 18px', fontWeight:700, cursor:'pointer',
              borderRadius:10, border:'none',
              background:'#2faa44', color:'#fff',
              boxShadow:'0 10px 22px rgba(47,170,68,.24)'
            }}
          >
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
}
