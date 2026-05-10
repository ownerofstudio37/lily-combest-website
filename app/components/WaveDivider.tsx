import React from 'react'

type WaveTone = 'cream' | 'petal' | 'mint'

const toneClass: Record<WaveTone, string> = {
  cream: 'wave-divider--cream',
  petal: 'wave-divider',
  mint: 'wave-divider wave-divider--mint',
}

export default function WaveDivider({ tone = 'petal' }: { tone?: WaveTone }) {
  return (
    <svg className={toneClass[tone]} viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,56 C170,90 340,16 560,38 C760,58 940,94 1140,74 C1260,62 1360,50 1440,58 L1440,100 L0,100 Z" fill="currentColor" />
    </svg>
  )
}
