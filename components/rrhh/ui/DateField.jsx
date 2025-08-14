'use client';
import React from 'react';
import { DATE_LIMITS } from '@/app/api/rrhh/rrhh.constants';
import { isoToday } from '../../../lib/rrhhValidators';
import InputField from './InputField';

export default function DateField(props){
  const { min=DATE_LIMITS.MIN, max=isoToday(), ...rest } = props;
  return <InputField type="date" min={min} max={max} {...rest} />;
}
