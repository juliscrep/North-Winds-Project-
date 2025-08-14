// /components/rrhh/manual/sections/PersonalContactSection.jsx
'use client';
import React from 'react';
import { jobAreas, formPlaceholders } from '../../../../app/rrhh/rrhh.content';

export default function PersonalContactSection({ styles, fields, errors, setField }) {
  return (
    <div className={styles.grid}>
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="fullName">Nombre y apellido</label>
          <input
            id="fullName"
            className={styles.input}
            placeholder={formPlaceholders.fullName}
            value={fields.fullName}
            onChange={(e)=>setField('fullName', e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <div className={styles.error}>{errors.fullName}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={styles.input}
            placeholder={formPlaceholders.email}
            value={fields.email}
            onChange={(e)=>setField('email', e.target.value)}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            className={styles.input}
            placeholder={formPlaceholders.phone}
            value={fields.phone}
            onChange={(e)=>setField('phone', e.target.value)}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}
        </div>

        <div className={styles.field}>
          <label htmlFor="documentId">Documento / ID</label>
          <input
            id="documentId"
            className={styles.input}
            placeholder="DNI / Pasaporte / ID"
            value={fields.documentId}
            onChange={(e)=>setField('documentId', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="birthdate">Fecha de nacimiento</label>
          <input
            id="birthdate"
            type="date"
            className={styles.input}
            value={fields.birthdate}
            onChange={(e)=>setField('birthdate', e.target.value)}
          />
        </div>

        {/* ÚNICO SELECTOR: Puesto */}
        <div className={styles.field}>
          <label htmlFor="area">Puesto al que postulás</label>
          <select
            id="area"
            className={styles.select}
            value={fields.area}
            onChange={(e)=>setField('area', e.target.value)}
          >
            {jobAreas.map((a)=> <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="base">Base/Residencia</label>
          <input
            id="base"
            className={styles.input}
            placeholder="Ciudad / Provincia / País"
            value={fields.location}
            onChange={(e)=>setField('location', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="linkedin">LinkedIn (opcional)</label>
          <input
            id="linkedin"
            className={styles.input}
            placeholder="https://www.linkedin.com/in/usuario"
            value={fields.linkedin}
            onChange={(e)=>setField('linkedin', e.target.value)}
            autoComplete="url"
          />
        </div>
      </div>

      {/* Dirección completa (todo texto) */}
      <div className={styles.grid2}>
        <div className={styles.field}>
          <label htmlFor="country">País</label>
          <input id="country" className={styles.input} value={fields.address.country}
                 onChange={(e)=>setField('address.country', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="province">Provincia/Estado</label>
          <input id="province" className={styles.input} value={fields.address.province}
                 onChange={(e)=>setField('address.province', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="city">Ciudad</label>
          <input id="city" className={styles.input} value={fields.address.city}
                 onChange={(e)=>setField('address.city', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="addressLine">Dirección</label>
          <input id="addressLine" className={styles.input} value={fields.address.addressLine}
                 onChange={(e)=>setField('address.addressLine', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="postalCode">Código postal</label>
          <input id="postalCode" className={styles.input} value={fields.address.postalCode}
                 onChange={(e)=>setField('address.postalCode', e.target.value)} />
        </div>
      </div>
    </div>
  );
}
