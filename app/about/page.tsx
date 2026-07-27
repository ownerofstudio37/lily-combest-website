"use client"

import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[58vh] bg-[rgb(var(--color-primary-dark))] text-[rgb(var(--color-secondary-light))]">
        <Image src="https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Wellness coaching session focused on nutrition and healthy habits" fill priority className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.82),rgba(20,28,19,0.42),rgba(20,28,19,0.72))]" />
        <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary-light))]">About Lilly</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Wellness coaching for real life.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgba(244,232,237,0.86)]">Serving Pinehurst, The Woodlands, and Greater Houston with practical support for nutrition, movement, sleep, and sustainable habits.</p>
        </div>
      </section>

      <section className="bg-[rgb(var(--color-secondary-light))] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="organic-card p-6 sm:p-8">
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

      </section>

      <section className="bg-[rgb(var(--color-primary-light))] py-16">
        <div className="max-w-6xl mx-auto px-4">
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

      </section>

      <section className="bg-[rgb(47,60,41)] text-[rgb(244,232,237)] py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-[rgba(244,232,237,0.82)] mb-8">Let&apos;s have a free conversation about your goals and what&apos;s holding you back.</p>
          <a href="/contact#consultation-request" className="btn-secondary">Request a Free Consult</a>
        </div>
      </section>

    </main>
  )
}
