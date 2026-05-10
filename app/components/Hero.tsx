"use client"

import React from 'react'
import Image from 'next/image'
import { useLocale } from './LocaleProvider' 

export default function Hero() {
  const { t } = useLocale()
  const heroTitle = t('hero.title') || 'Houston Wellness Consultant'
  const heroSubtitle = t('hero.subtitle') || 'Personalized health & wellness coaching in Pinehurst, TX — helping busy people build sustainable healthy habits.'
  const images = [
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
    'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ]

  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden pt-16 pb-12 section-petal">
      <div className="absolute -left-24 top-20 h-64 w-64 organic-blob bg-[rgba(181,125,141,0.18)] blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-72 w-72 organic-blob bg-[rgba(167,146,117,0.16)] blur-3xl" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--color-primary-dark))] organic-ring">
            Pinehurst, TX + Virtual Coaching
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">{heroTitle}</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-xl">{heroSubtitle}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact#consultation-request" className="inline-block bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-white px-6 py-3 rounded-xl shadow hover:shadow-md transition">{t('hero.cta') || 'Request a Consultation Date'}</a>
            <a href="/about" className="inline-block border border-[rgba(167,146,117,0.35)] bg-white px-6 py-3 rounded-xl text-slate-800 hover:bg-[rgba(255,255,255,0.92)] transition">{t('section.ready_title') || 'Learn More'}</a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="organic-card p-3">
              <p className="text-xl font-bold text-slate-900">1:1</p>
              <p className="text-xs text-slate-600">Personal Coaching</p>
            </div>
            <div className="organic-card p-3">
              <p className="text-xl font-bold text-slate-900">TX</p>
              <p className="text-xs text-slate-600">Local Expertise</p>
            </div>
            <div className="organic-card p-3">
              <p className="text-xl font-bold text-slate-900">100%</p>
              <p className="text-xs text-slate-600">Custom Plans</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden shadow-xl organic-ring">
          <Image src={images[idx]} alt="Wellness coaching consultation in Pinehurst Texas" width={1200} height={800} className="object-cover w-full h-72 md:h-[28rem]" priority />
          <div className="absolute bottom-5 left-5 organic-card px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--color-primary-dark))] font-semibold">Holistic Wellness</p>
            <p className="text-sm text-slate-700">Nutrition • Movement • Mindset • Recovery</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {images.map((src, i) => (
          <button
            onClick={() => setIdx(i)}
            key={i}
            className={`overflow-hidden rounded-2xl transition ${i === idx ? 'ring-2 ring-[rgb(var(--color-primary))]' : 'opacity-85 hover:opacity-100'}`}
            aria-label={`Show wellness photo ${i + 1}`}
            title={`Show wellness photo ${i + 1}`}
          >
            <Image src={src} width={400} height={260} alt={`Wellness lifestyle photo ${i+1}`} className="object-cover w-full h-24 md:h-28" />
          </button>
        ))}
      </div>

      <div className="mt-10 h-10 w-full bg-white/70 soft-wave-top" />
    </section>
  )
}
