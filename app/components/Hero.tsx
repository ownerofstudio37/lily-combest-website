"use client"

import React from 'react'
import Image from 'next/image'
import { useLocale } from './LocaleProvider' 

export default function Hero() {
  const { t } = useLocale()
  const heroSubtitle = t('hero.subtitle') || 'Personalized health & wellness coaching in Pinehurst, TX — helping busy people build sustainable healthy habits.'
  const images = [
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
    'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=1800',
    'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1800',
  ]

  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 5500)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      <Image
        src={images[idx]}
        alt="Holistic wellness hero"
        width={1920}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,24,17,0.58)_0%,rgba(18,24,17,0.33)_45%,rgba(18,24,17,0.52)_100%)]" />

      <div className="relative z-10 flex h-full min-h-[78vh] flex-col justify-end px-6 py-8 md:px-12 md:py-12">
        <div className="pb-8 md:pb-14">
          <h1 className="text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] tracking-tight text-[rgb(var(--color-primary-light))]">
            eat well.
            <span className="ml-2 font-serif italic text-[rgba(247,236,241,0.95)]">feel alive.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[rgba(245,244,236,0.88)] md:text-lg">{heroSubtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/contact#consultation-request" className="rounded-full bg-[rgb(var(--color-secondary))] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[rgb(var(--color-primary-dark))]">Request a Clarity Call</a>
            <a href="/about" className="rounded-full bg-[rgba(245,241,232,0.9)] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[rgb(var(--color-primary-dark))]">Our Approach</a>
          </div>

          <div className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-3">
            <div className="rounded-2xl bg-[rgba(248,247,238,0.9)] px-4 py-3 text-center">
              <p className="text-2xl font-bold text-[rgb(var(--color-primary-dark))]">1:1</p>
              <p className="text-xs font-medium text-[rgb(var(--color-primary))]">Personal Coaching</p>
            </div>
            <div className="rounded-2xl bg-[rgba(248,247,238,0.9)] px-4 py-3 text-center">
              <p className="text-2xl font-bold text-[rgb(var(--color-primary-dark))]">TX</p>
              <p className="text-xs font-medium text-[rgb(var(--color-primary))]">Local Expertise</p>
            </div>
            <div className="rounded-2xl bg-[rgba(248,247,238,0.9)] px-4 py-3 text-center">
              <p className="text-2xl font-bold text-[rgb(var(--color-primary-dark))]">100%</p>
              <p className="text-xs font-medium text-[rgb(var(--color-primary))]">Custom Plans</p>
            </div>
          </div>
        </div>
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,72 C160,112 320,112 480,88 C640,64 800,24 960,32 C1120,40 1280,88 1440,104 L1440,120 L0,120 Z" fill="currentColor" />
      </svg>
    </section>
  )
}
