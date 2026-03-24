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
    'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/4473867/pexels-photo-4473867.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ]

  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative pt-16 pb-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-50 via-white to-amber-50" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-700 ring-1 ring-pink-200">
            Pinehurst, TX + Virtual Coaching
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-slate-900">{heroTitle}</h1>
          <p className="mt-4 text-lg text-slate-700">{heroSubtitle}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/contact" className="inline-block bg-gradient-to-r from-pink-500 to-amber-400 text-white px-6 py-3 rounded-lg shadow hover:shadow-md transition">{t('hero.cta') || 'Book a Consult'}</a>
            <a href="/about" className="inline-block border border-slate-300 bg-white px-6 py-3 rounded-lg text-slate-800 hover:bg-slate-50 transition">{t('section.ready_title') || 'Learn More'}</a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
              <p className="text-xl font-bold text-slate-900">1:1</p>
              <p className="text-xs text-slate-600">Personal Coaching</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
              <p className="text-xl font-bold text-slate-900">TX</p>
              <p className="text-xs text-slate-600">Local Expertise</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/80 p-3">
              <p className="text-xl font-bold text-slate-900">100%</p>
              <p className="text-xs text-slate-600">Custom Plans</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200">
          <Image src={images[idx]} alt="Wellness coaching consultation in Pinehurst Texas" width={1200} height={800} className="object-cover w-full h-72 md:h-[28rem]" priority />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {images.map((src, i) => (
          <button
            onClick={() => setIdx(i)}
            key={i}
            className={`overflow-hidden rounded-xl transition ${i === idx ? 'ring-2 ring-[rgb(var(--color-primary))]' : 'opacity-80 hover:opacity-100'}`}
            aria-label={`Show wellness photo ${i + 1}`}
            title={`Show wellness photo ${i + 1}`}
          >
            <Image src={src} width={400} height={260} alt={`Wellness lifestyle photo ${i+1}`} className="object-cover w-full h-24 md:h-28" />
          </button>
        ))}
      </div>
    </section>
  )
}
