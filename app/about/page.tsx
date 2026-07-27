"use client"

import React from 'react'
import Image from 'next/image'
import WaveDivider from '../components/WaveDivider'

export default function About() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[58vh] overflow-hidden bg-[rgb(var(--color-primary-dark))] text-[rgb(var(--color-secondary-light))]">
        <Image src="https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Wellness coaching session focused on nutrition and healthy habits" fill priority className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.82),rgba(20,28,19,0.42),rgba(20,28,19,0.72))]" />
        <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end px-4 pb-24 pt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary-light))]">About Lilly</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Wellness coaching for real life.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgba(244,232,237,0.86)]">Serving Pinehurst, The Woodlands, and Greater Houston with practical support for nutrition, movement, sleep, and sustainable habits.</p>
        </div>
        <WaveDivider tone="cream" className="absolute bottom-[-1px] left-0 right-0 z-10 h-20" />
      </section>

      <section className="relative bg-[rgb(var(--color-secondary-light))] pb-28 pt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="organic-card lift-card p-6 sm:p-8">
              <p className="text-gray-700 mb-5 text-lg leading-relaxed">As a passionate Wellness Consultant serving Pinehurst, The Woodlands, and Greater Houston, Lilly Combest helps clients build healthy routines that feel realistic and sustainable.</p>
              <p className="text-gray-700 mb-5 leading-relaxed">Her approach blends nutrition, movement, sleep, and stress support into one personalized strategy. No extreme plans. No all-or-nothing mindset. Just practical changes that fit your real life.</p>
              <p className="text-gray-700 leading-relaxed">If you&apos;re looking for a local wellness coach in Texas who focuses on long-term progress, Lilly can guide you with accountability and support at each step.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="media-zoom rounded-2xl overflow-hidden shadow-lg col-span-2">
                <Image
                  src="https://images.pexels.com/photos/3823076/pexels-photo-3823076.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Wellness coaching session focused on nutrition and healthy habits"
                  width={900}
                  height={700}
                  className="h-64 w-full object-cover"
                />
              </div>
              <div className="media-zoom rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg"
                  alt="Lilly Combest coaching portrait"
                  width={500}
                  height={500}
                  className="h-40 w-full object-cover"
                />
              </div>
              <div className="media-zoom rounded-xl overflow-hidden shadow-sm">
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
        <WaveDivider tone="mint" className="absolute bottom-[-1px] left-0 right-0 h-20" />
      </section>

      <section className="relative bg-[rgb(var(--color-primary-light))] pb-28 pt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Approach</p>
            <h2 className="mt-2 text-3xl font-bold text-[rgb(var(--color-ink))]">What Makes Her Different</h2>
            <p className="mt-3 leading-7 text-gray-700">Lilly&apos;s coaching style is built for people who need wellness to feel clear, doable, and steady, not overwhelming.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Real-world strategies for busy lifestyles',
              'No extreme diets or complicated systems',
              'Sustainable, long-term habit building',
              'Personalized support tailored to your goals',
            ].map((item) => (
              <div key={item} className="organic-card lift-card p-5 flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[rgb(var(--color-primary))] text-white flex items-center justify-center text-xs">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="organic-card lift-card p-6">
              <h3 className="text-xl font-bold text-[rgb(var(--color-ink))]">Local Wellness Support</h3>
              <p className="mt-3 leading-7 text-gray-700">Lilly works with clients in Pinehurst, The Woodlands, Magnolia, Tomball, Spring, Conroe, North Houston, and the greater Houston area. Sessions can focus on steady nutrition, movement, sleep, stress, and realistic routines for Texas families and professionals.</p>
            </div>
            <div className="organic-card lift-card p-6">
              <h3 className="text-xl font-bold text-[rgb(var(--color-ink))]">Scope of Practice</h3>
              <p className="mt-3 leading-7 text-gray-700">Wellness coaching is educational and supportive. It is not emergency care, diagnosis, medical treatment, nutrition therapy for a medical condition, or a replacement for your physician, registered dietitian, therapist, or other licensed provider.</p>
            </div>
          </div>
        </div>
        <WaveDivider tone="dark" className="absolute bottom-[-1px] left-0 right-0 h-20" />
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
