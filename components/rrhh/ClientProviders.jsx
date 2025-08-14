'use client';
import React from 'react';
import { ToastProvider } from './ui/ToastProvider';

export default function ClientProviders({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
