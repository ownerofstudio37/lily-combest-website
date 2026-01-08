"use client"

import React from 'react'
import { useLocale } from './LocaleProvider'

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const isEs = locale === 'es'

  return (
    <div className="relative inline-flex items-center rounded-full bg-white border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
      <div className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-200 rounded-full ${isEs ? 'bg-[rgb(var(--color-secondary))] translate-x-full' : 'bg-[rgb(var(--color-primary))] translate-x-0'}`} />
      <button aria-label="English" aria-pressed={!isEs} onClick={() => setLocale('en')} className={`relative z-10 px-3 py-1 text-sm font-medium w-12 text-center ${isEs ? 'text-gray-700' : 'text-white'}`}>
        EN
      </button>
      <button aria-label="Español" aria-pressed={isEs} onClick={() => setLocale('es')} className={`relative z-10 px-3 py-1 text-sm font-medium w-12 text-center ${isEs ? 'text-white' : 'text-gray-700'}`}>
        ES
      </button>
    </div>
  )
}
