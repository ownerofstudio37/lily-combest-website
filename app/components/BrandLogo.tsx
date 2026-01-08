"use client"

import React, { useEffect, useState } from 'react'

const LOGO_KEY = 'brandLogo'
const DEFAULT = '/logo.svg'

export default function BrandLogo({ width = 40, height = 40 }: { width?: number; height?: number }){
  const [src, setSrc] = useState<string>(DEFAULT)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(LOGO_KEY) : null
    if (stored) setSrc(stored)
  }, [])

  return (
    <img src={src} alt="Lilly Combest logo" width={width} height={height} className="w-10 h-10 object-contain" />
  )
}
