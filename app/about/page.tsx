"use client"

import React from 'react'
import { useLocale } from '../components/LocaleProvider'
import Image from 'next/image'

function Wave({ fill, flip }: { fill: string; flip?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={`block w-full h-[72px]${flip ? ' scale-x-[-1]' : ''}`}
      >
        <path d="M0,36 C320,72 640,0 960,36 C1120,54 1300,20 1440,40 L1440,72 L0,72 Z" fill={fill} />
      </svg>
    </div>
  )
}

export default function About() {
  const { t } = useLocale()

  return (
    <main className="overflow-x-hidden">

      {/* ── DARK GREEN: Page Header ───────────────────────────── */}
      <section className="relative bg-[rgb(47,60,41)] text-[rgb(244,232,237)] pt-28 pb-32">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t('about.title') || 'About Lilly'}</h1>
          <p className="text-[rgba(244,232,237,0.8)] text-lg max-w-xl">Wellness consultant serving Pinehurst, The Woodlands & Greater Houston.</p>
        </div>
        <Wave fill="rgb(244,232,237)" />
      </section>

      {/* ── PETAL PINK: Bio + Photo Grid ─────────────────────── */}
      <section className="relative bg-[rgb(244,232,237)] py-20 pb-28">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-700 mb-5 text-lg leading-relaxed">As a passionate Wellness Consultant serving Pinehurst, The Woodlands, and Greater Houston, Lilly Combest helps clients build healthy routines that feel realistic and sustainable.</p>
              <p className="text-gray-700 mb-5 leading-relaxed">Her approach blends nutrition, movement, sleep, and stress support into one personalized strategy. No extreme plans. No all-or-nothing mindset. Just practical changes that fit your real life.</p>
              <p className="text-gray-700 leading-relaxed">If you&apos;re looking for a local wellness coach in Texas who focuses on long-term progress, Lilly can guide you with accountability and support at each step.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg col-span-2">
                <Image
                  src="https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Wellness coaching session focused on nutrition and healthy habits"
                  width={900}
                  height={700}
                  className="h-64 w-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg"
                  alt="Lilly Combest coaching portrait"
                  width={500}
                  height={500}
                  className="h-40 w-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg"
                  alt="Fresh healthy ingredients"
                  width={500}
                  height={500}
                  className="h-40 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave out → mint green */}
        <Wave fill="rgb(220,232,199)" flip />
      </section>

      {/* ── MINT GREEN: What Makes Her Different ─────────────── */}
      <section className="relative bg-[rgb(220,232,199)] py-20 pb-28">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[rgb(var(--color-ink))]">What Makes Her Different</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Real-world strategies for busy lifestyles',
              'No extreme diets or complicated systems',
              'Sustainable, long-term habit building',
              'Personalized support tailored to your goals',
            ].map((item) => (
              <div key={item} className="organic-card p-5 flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[rgb(var(--color-primary))] text-white flex items-center justify-center text-xs">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave out → dark green */}
        <Wave fill="rgb(47,60,41)" />
      </section>

      {/* ── DARK GREEN: CTA ───────────────────────────────────── */}
      <section className="bg-[rgb(47,60,41)] text-[rgb(244,232,237)] py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-[rgba(244,232,237,0.82)] mb-8">Let&apos;s have a free conversation about your goals and what&apos;s holding you back.</p>
          <a href="/contact#consultation-request" className="inline-block bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-primary-dark))] font-bold px-8 py-4 rounded-full hover:brightness-105 transition">Request a Free Consult</a>
        </div>
      </section>

    </main>
  )
}
