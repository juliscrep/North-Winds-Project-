'use client';

import React, { useState, useId } from 'react';


/**
 * Componente de ícono SVG animado.
 * Uso: como decoración dentro de un botón o como control independiente.
 * Entradas: props de tamaño, colores, animación y eventos.
 * Salida: JSX.Element (ícono animado).
 * Nota: si se usa dentro de otro botón, tratarlo como decorativo (aria-hidden).
 */
/**
 * Props:
 * - as: 'span' | 'button' | 'div'  (default: 'span')
 * - onClick: solo se usa si as === 'button'
 * - title: label accesible (solo si as === 'button'); dentro de otros botones se oculta (aria-hidden)
 * - className, size, colores, spinSeconds, etc. 
 */
export default function AnimatedNorthWindsProIcon({
  as = 'span',
  size = 48,
  primary = '#0F172A',
  blade = '#0F172A',
  accent = '#22C55E',
  face = '#0F172A',
  bgStart = '#E8F1FF',
  bgEnd = '#F6FFF8',
  spinSeconds = 10,
  onClick,
  className,
  title = 'Abrir chat de NorthWinds',
}) {
  const Tag = as;
  const uid = useId();
  const [isPressed, setIsPressed] = useState(false);

  const interactive = Tag === 'button';

  return (
    <Tag
      {...(interactive
        ? {
            type: 'button',
            'aria-label': title,
            title,
            onClick,
            onMouseDown: () => setIsPressed(true),
            onMouseUp: () => setIsPressed(false),
            onMouseLeave: () => setIsPressed(false),
            style: {
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              lineHeight: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }
        : {
            'aria-hidden': true,
            title: undefined,
            onMouseDown: () => setIsPressed(true),
            onMouseUp: () => setIsPressed(false),
            onMouseLeave: () => setIsPressed(false),
            style: { lineHeight: 0, display: 'inline-flex' },
          })}
      className={className}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        role="img"
        aria-hidden={!interactive}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`${uid}-bg`} cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor={bgStart} />
            <stop offset="100%" stopColor={bgEnd} />
          </radialGradient>
          <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.22" />
          </filter>
        </defs>

        <g filter={`url(#${uid}-shadow)`}>
          <circle cx="80" cy="80" r="76" fill={`url(#${uid}-bg)`} />

          {/* Antena */}
          <g stroke={primary} strokeWidth="3" fill="none">
            <line x1="80" y1="22" x2="80" y2="30" strokeLinecap="round" />
            <circle cx="80" cy="18" r="3.5" fill={accent} stroke="none" />
          </g>

          {/* Cabeza */}
          <g>
            <rect x="53" y="32" width="54" height="34" rx="10" fill="#fff" stroke={primary} strokeWidth="3" />
            <circle cx="68" cy="46" r="3" fill={face} />
            <circle cx="92" cy="46" r="3" fill={face} />
            <path d="M66,56 Q80,62 94,56" stroke={face} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>

          {/* Cuello */}
          <rect x="73" y="66" width="14" height="8" rx="3" fill="#fff" stroke={primary} strokeWidth="3" />

          {/* Pecho */}
          <rect x="38" y="76" width="84" height="40" rx="14" fill="#fff" stroke={primary} strokeWidth="3" />

          {/* Turbina en el pecho */}
          <g transform="translate(80,96)">
            <circle r="9.5" fill={accent} stroke={primary} strokeWidth="2" />
            <g className="blades">
              <path d="M0,-9 L 6,-58 Q 7,-62 4,-66 Q 1,-70 -2,-66 Q -5,-62 -4,-58 L 0,-9 Z" fill={blade} />
              <path d="M0,-9 L 6,-58 Q 7,-62 4,-66 Q 1,-70 -2,-66 Q -5,-62 -4,-58 L 0,-9 Z" fill={blade} transform="rotate(120)" />
              <path d="M0,-9 L 6,-58 Q 7,-62 4,-66 Q 1,-70 -2,-66 Q -5,-62 -4,-58 L 0,-9 Z" fill={blade} transform="rotate(240)" />
            </g>
          </g>

          {/* Base */}
          <rect x="64" y="118" width="32" height="10" rx="4" fill="#fff" stroke={primary} strokeWidth="3" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .blades {
          transform-box: view-box;
          transform-origin: 0 0;
          animation: spin ${spinSeconds}s linear infinite;
          will-change: transform;
        }
        svg { transition: transform 120ms ease; }
        ${isPressed ? 'svg { transform: scale(0.98); }' : ''}
      `}</style>
    </Tag>
  );
}
