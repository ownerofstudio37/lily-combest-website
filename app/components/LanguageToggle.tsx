"use client"

import React from 'react'
import { useLocale } from './LocaleProvider'

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  return (
    <div className="flex items-center gap-2">
      <button aria-label="English" onClick={() => setLocale('en')} className={`px-3 py-1 rounded-md ${locale === 'en' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100 text-gray-700'}`}>
        EN
      </button>
      <button aria-label="Español" onClick={() => setLocale('es')} className={`px-3 py-1 rounded-md ${locale === 'es' ? 'bg-[rgb(var(--color-primary))] text-white' : 'bg-gray-100 text-gray-700'}`}>
        ES
      </button>
    </div>
  )
}
