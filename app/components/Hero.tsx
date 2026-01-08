"use client"

import React from 'react'
import Image from 'next/image'
import { useLocale } from './LocaleProvider' 

export default function Hero() {
  const { t } = useLocale()
  const heroTitle = t('hero.title') || 'Houston Wellness Consultant'
  const heroSubtitle = t('hero.subtitle') || 'Personalized health & wellness coaching in Pinehurst, NC — helping busy people build sustainable healthy habits.'
  const heroImage = 'https://images.unsplash.com/photo-1526403224743-8b3b9b5d4a88?q=80&w=1600&auto=format&fit=crop'

  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-lg text-gray-700 mb-6">{heroSubtitle}</p>

          <div className="flex gap-4">
            <a href="/contact" className="inline-block bg-[rgb(var(--color-primary))] text-white px-6 py-3 rounded-lg">{t('hero.cta') || 'Book a Consult'}</a>
            <a href="/about" className="inline-block border border-slate-200 px-6 py-3 rounded-lg">{t('section.ready_title') || 'Learn More'}</a>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image src={heroImage} alt="Wellness coaching" width={800} height={600} className="object-cover w-full h-72 md:h-96" priority />
        </div>
      </div>
    </section>
  )
}
