'use client';
import React from 'react';
import { LANG_LEVELS } from '@/app/api/rrhh/rrhh.constants';
import SelectField from './SelectField';
import {TX } from '@/app/api/rrhh/rrhh.texts';

export default function LanguageLevelSelect({ styles, id, value, onChange, disabled, error }){
  return (
    <SelectField
      styles={styles}
      id={id}
      label={TX.labels.level}
      value={value}
      onChange={onChange}
      options={LANG_LEVELS}
      disabled={disabled}
      error={error}
    />
  );
}
