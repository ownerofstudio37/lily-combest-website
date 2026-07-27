"use client"

import React from 'react'
import { useLocale } from './LocaleProvider'

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const isEs = locale === 'es'
  const label = isEs ? 'Español' : 'English'

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--color-primary),0.14)] bg-white/90 p-1 shadow-sm" aria-label={`Language selector, current language ${label}`}>
      <button
        type="button"
        aria-label="Switch to English"
        aria-pressed={!isEs}
        onClick={() => setLocale('en')}
        className={`min-h-9 rounded-full px-3 text-sm font-bold ${isEs ? 'text-[rgb(var(--color-primary-dark))] hover:bg-[rgba(var(--color-primary-light),0.5)]' : 'bg-[rgb(var(--color-primary))] text-white shadow-sm'}`}
      >
        English
      </button>
      <button
        type="button"
        aria-label="Cambiar a Español"
        aria-pressed={isEs}
        onClick={() => setLocale('es')}
        className={`min-h-9 rounded-full px-3 text-sm font-bold ${isEs ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-primary-dark))] shadow-sm' : 'text-[rgb(var(--color-primary-dark))] hover:bg-[rgba(var(--color-primary-light),0.5)]'}`}
      >
        Español
      </button>
    </div>
  )
}
