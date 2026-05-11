"use client"

import React, { useEffect, useState } from 'react'

const LOGO_KEY = 'brandLogo'
const LOGO_VERSION = 'green-v2'
const DEFAULT_MARK = `/logo.svg?v=${LOGO_VERSION}`
const DEFAULT_WORDMARK = `/logo-wordmark.svg?v=${LOGO_VERSION}`

function normalizeLogoSrc(src: string | null, variant: LogoVariant): string {
  if (variant === 'wordmark') return DEFAULT_WORDMARK
  if (!src) return DEFAULT_MARK

  const clean = src.split('?')[0]
  const allowed = new Set([
    '/logo.svg',
    '/logo-badge.svg',
    '/logo-badge-word.svg',
    '/logo-wordmark.svg',
  ])

  if (!allowed.has(clean)) return DEFAULT_MARK
  return `${clean}?v=${LOGO_VERSION}`
}

type LogoVariant = 'mark' | 'wordmark'

export default function BrandLogo({
  width = 40,
  height = 40,
  variant = 'mark',
  className = '',
}: {
  width?: number
  height?: number
  variant?: LogoVariant
  className?: string
}){
  const [src, setSrc] = useState<string>(variant === 'wordmark' ? DEFAULT_WORDMARK : DEFAULT_MARK)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(LOGO_KEY) : null
    const normalized = normalizeLogoSrc(stored, variant)
    setSrc(normalized)

    if (typeof window !== 'undefined' && variant === 'mark') {
      localStorage.setItem(LOGO_KEY, normalized)
    }
  }, [variant])

  return (
    <img
      src={src}
      alt={variant === 'wordmark' ? 'Lilly Combest wordmark' : 'Lilly Combest logo'}
      width={width}
      height={height}
      className={`object-contain ${className}`.trim()}
    />
  )
}
