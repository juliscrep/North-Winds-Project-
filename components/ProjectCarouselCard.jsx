'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/Styles/work.module.css';


export default function ProjectCarouselCard({ slides = [], interval = 3800 }) {
  const count = Math.max(slides.length, 1);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  // relación de aspecto (w/h) por slide para dimensionar el visor sin “bandas”
  const ratiosRef = useRef(slides.map(() => 1));
  const [lbSize, setLbSize] = useState({ w: 0, h: 0 });

  const next = useCallback(() => setIdx((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + count) % count), [count]);
  const goTo = useCallback((i) => setIdx((i + count) % count), [count]);

  // autoplay solo en la card
  useEffect(() => {
    if (paused || count <= 1 || open) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [paused, count, interval, open]);

  const transform = useMemo(() => `translateX(${-idx * 100}%)`, [idx]);
  const current = slides[idx] || slides[0] || {};

  // calcula tamaño óptimo del lightbox para evitar barras laterales
  const computeLbSize = useCallback(
    (i = idx) => {
      if (typeof window === 'undefined') return;
      const ratio = Math.max(0.1, ratiosRef.current[i] || 1);

      // límites del visor
      const maxH = Math.min(window.innerHeight * 0.82, 760); // ~82vh
      const maxW = Math.min(window.innerWidth * 0.96, 1200); // ~96vw

      // ancho ideal en función de la altura
      const idealW = maxH * ratio;

      // usamos el menor entre el ancho máximo disponible y el necesario por ratio
      const finalW = Math.min(maxW, Math.max(320, idealW));
      setLbSize({ w: Math.round(finalW), h: Math.round(maxH) });
    },
    [idx]
  );

  // teclado en lightbox + resize del visor
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const onResize = () => computeLbSize();
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    computeLbSize();
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, next, prev, computeLbSize]);

  return (
    <>
      {/* ===== Card ===== */}
      <article className={styles.card}>
        <div
          className={`${styles.media} ${styles.miniCarousel}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onClick={() => setOpen(true)}
          role="button"
          aria-label={`Abrir galería: ${current.title || 'Proyecto'}`}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(true)}
        >
          {/* track del mini carrusel */}
          <div className={styles.trackMini} style={{ transform }}>
            {slides.map((s, i) => (
              <div className={styles.slideMini} key={`${s.src}-${i}`}>
                <div className={styles.slidePhoto}>
                  <Image
                    src={s.src}
                    alt={s.title || `Proyecto ${i + 1}`}
                    fill
                    className={styles.img}
                    sizes="(min-width: 1200px) 25vw, (min-width: 900px) 33vw, (min-width: 560px) 50vw, 100vw"
                    quality={90}
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* badge de ubicación */}
          {current.location && <span className={styles.badge}>{current.location}</span>}

          {/* caption con título */}
          <div className={styles.caption}>
            <h3 className={styles.cardTitle}>{current.title || 'Proyecto'}</h3>
          </div>
        </div>
      </article>

      {/* ===== Lightbox ===== */}
      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: lbSize.w ? `${lbSize.w}px` : undefined,
              height: lbSize.h ? `${lbSize.h}px` : undefined,
            }}
          >
        
            {count > 1 && (
              <>
                <button className={`${styles.navLB} ${styles.prevLB}`} onClick={prev} aria-label="Anterior">
                  <ArrowLeft />
                </button>
                <button className={`${styles.navLB} ${styles.nextLB}`} onClick={next} aria-label="Siguiente">
                  <ArrowRight />
                </button>
              </>
            )}
            <button className={styles.closeLB} aria-label="Cerrar" onClick={() => setOpen(false)}>
              ×
            </button>

         
            <div className={styles.lbViewport}>
              <div className={styles.lbTrack} style={{ transform: `translateX(${-idx * 100}%)` }}>
                {slides.map((s, i) => (
                  <div className={styles.lbSlide} key={`lb-${s.src}-${i}`}>
                    <div className={styles.lbFrame}>
                      <Image
                        src={s.src}
                        alt={s.title || `Imagen ${i + 1}`}
                        fill
                        className={styles.lbImg}     
                        sizes="100vw"
                        priority={i === idx}
                        quality={95}
                        onLoadingComplete={(img) => {
                          
                          const r = (img.naturalWidth || 1) / (img.naturalHeight || 1);
                          ratiosRef.current[i] = r;
                          if (i === idx) computeLbSize(i);
                        }}
                      />
                    </div>

                  
                    <div className={styles.lbMeta}>
                      {s.location && <span className={styles.lbBadge}>{s.location}</span>}
                      <h3 className={styles.lbTitle}>{s.title}</h3>
                      {s.description && <p className={styles.lbDesc}>{s.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

         
            {count > 1 && (
              <div className={styles.lbDots}>
                {slides.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    className={`${styles.lbDot} ${i === idx ? styles.activeDot : ''}`}
                    aria-label={`Ir a la imagen ${i + 1}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ArrowLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
