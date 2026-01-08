"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import en from '../../locales/en.json'
import es from '../../locales/es.json'

type Locale = 'en' | 'es'

const translations: Record<Locale, any> = { en, es }

const LocaleContext = createContext({
  locale: 'en' as Locale,
  setLocale: (l: Locale) => {},
  t: (path: string) => '' as string,
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null
    if (stored === 'es' || stored === 'en') setLocale(stored)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('locale', locale)
  }, [locale])

  const t = (path: string) => {
    const parts = path.split('.')
    let cur: any = translations[locale]
    for (const p of parts) {
      if (!cur) return ''
      cur = cur[p]
    }
    return typeof cur === 'string' ? cur : ''
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
