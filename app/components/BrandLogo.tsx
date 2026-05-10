"use client"

import React, { useEffect, useState } from 'react'

const LOGO_KEY = 'brandLogo'
const DEFAULT_MARK = '/logo.svg'
const DEFAULT_WORDMARK = '/logo-wordmark.svg'

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
    if (variant === 'wordmark') {
      setSrc(DEFAULT_WORDMARK)
      return
    }
    const stored = typeof window !== 'undefined' ? localStorage.getItem(LOGO_KEY) : null
    if (stored) setSrc(stored)
    else setSrc(DEFAULT_MARK)
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
