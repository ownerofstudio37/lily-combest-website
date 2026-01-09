"use client"

import React from 'react'
import { useLocale } from '../components/LocaleProvider'

export default function About() {
  const { t } = useLocale()
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{t('about.title') || 'About Lilly'}</h1>
      <p className="text-gray-700 mb-6 text-lg">{t('about.paragraph') || 'Lilly Combest is a health and wellness consultant based in Pinehurst, NC. She helps busy people build lasting habits for better energy, improved sleep, and sustainable nutrition.'}</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Approach</h2>
      <p className="text-gray-700 mb-6">Lilly blends practical behavior change strategies with evidence-informed nutrition guidance. Her coaching is warm, non-judgmental, and tailored to each client's lifestyle.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">What Makes Her Different</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Real-world strategies for busy lifestyles</li>
        <li>No extreme diets or complicated systems</li>
        <li>Sustainable, long-term habit building</li>
        <li>Personalized support tailored to your goals</li>
      </ul>
    </div>
  )
}
