"use client"

import React from 'react'
import Image from 'next/image'
import { useLocale } from './LocaleProvider' 

export default function Hero() {
  const { t } = useLocale()
  const heroTitle = t('hero.title') || 'Houston Wellness Consultant'
  const heroSubtitle = t('hero.subtitle') || 'Personalized health & wellness coaching in Pinehurst, TX — helping busy people build sustainable healthy habits.'
  const images = [
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756078132/54707334162_4e1cf2dd7e_o_convert.io_vbughi.png'
  ]

  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [])

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
          <Image src={images[idx]} alt="Wellness coaching" width={1200} height={800} className="object-cover w-full h-72 md:h-96" priority />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-3 gap-4">
        {images.map((src, i) => (
          <button onClick={() => setIdx(i)} key={i} className={`overflow-hidden rounded-md ${i === idx ? 'ring-2 ring-[rgb(var(--color-primary))]' : 'opacity-80'}`}>
            <Image src={src} width={400} height={260} alt={`Lilly photo ${i+1}`} className="object-cover w-full h-24 md:h-32" />
          </button>
        ))}
      </div>
    </section>
  )
}
