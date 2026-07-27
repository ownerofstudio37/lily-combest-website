"use client"

import React from 'react'
import Link from 'next/link'
import { useLocale } from '../components/LocaleProvider'
import { useBooking } from '../components/Booking'
import Image from 'next/image'
import FaqSchema from '../components/FaqSchema'

function Wave({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg className={`pointer-events-none absolute bottom-[-1px] left-0 right-0 z-10 h-20 w-full ${flip ? '-scale-x-100' : ''}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,64 C180,112 360,112 540,82 C720,52 900,8 1080,30 C1230,48 1320,88 1440,100 L1440,120 L0,120 Z" fill={fill} />
    </svg>
  )
}

export default function Services() {
  const { t } = useLocale()
  const { openBooking } = useBooking()

  const featuredPhotos = [
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg',
    'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
  ]

  const services = [
    { title: 'One-on-One Wellness Coaching', description: 'Personalized guidance to help you build sustainable habits. Perfect for clients who want customized support for their unique lifestyle and goals.', href: '/services/wellness-coaching', image: 'https://images.pexels.com/photos/7176292/pexels-photo-7176292.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { title: 'Nutrition & Meal Planning', description: 'Evidence-based nutrition strategies without the complexity. Lilly helps you create a realistic eating plan that fits your schedule and preferences.', href: '/services/nutrition-meal-planning', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { title: 'Workout & Motivation Coaching', description: 'Custom workout plans tailored to your goals and fitness level. Includes weekly accountability calls to keep you motivated and on track.', href: '/services/workout-motivation-coaching', image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { title: 'Virtual Workshops', description: 'Group workshops on topics like meal prep, sleep optimization, and stress management. Great for teams, offices, or community groups.', href: '/services/virtual-workshops', image: 'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  ]

  const faqItems = [
    { question: 'How do I get started with wellness coaching?', answer: 'Start with a free consultation call. Lilly reviews your goals, current routine, and challenges, then recommends the best coaching plan for you.' },
    { question: 'Do you offer virtual sessions?', answer: 'Yes. Coaching and wellness planning can be done virtually, so clients in Pinehurst and nearby cities can get support from anywhere.' },
    { question: 'Are meal plans customized?', answer: 'Yes. Every meal plan is personalized to your lifestyle, preferences, and goals. The focus is sustainable habits, not restrictive dieting.' },
    { question: 'Which areas do you serve?', answer: 'Lilly serves Pinehurst, The Woodlands, Spring, Magnolia, and the Greater Houston area, plus virtual clients across Texas.' },
  ]

  return (
    <main className="overflow-x-hidden">

      {/* ── HERO: Page Header + Photo Strip ───────────────────── */}
      <section className="relative min-h-[72vh] overflow-hidden bg-[rgb(47,60,41)] pb-28 pt-28 text-[rgb(244,232,237)]">
        <Image src={featuredPhotos[2]} alt="" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.88),rgba(20,28,19,0.58),rgba(20,28,19,0.78))]" />
        <div className="relative z-20 mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[rgb(var(--color-primary-light))]">Wellness Services</p>
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">{t('services.title') || 'Services'}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[rgba(244,232,237,0.84)]">{t('services.desc') || 'Support that meets you where you are — clear, practical, and sustainable.'}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={openBooking} className="btn-secondary">Request a Clarity Call</button>
              <Link href="#service-options" className="btn-quiet bg-white/90">Explore Services</Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
            {featuredPhotos.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl organic-ring bg-white/10">
                <Image src={src} alt={`Holistic coaching highlight ${i + 1}`} width={500} height={420} className="h-28 w-full object-cover md:h-36" />
              </div>
            ))}
          </div>
        </div>
        <Wave fill="rgb(245,241,232)" />
      </section>

      {/* ── CREAM: Service Cards ─────────────────────────────────────────────── */}
      <section id="service-options" className="relative bg-[rgb(245,241,232)] pb-28 pt-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} href={service.href} className="organic-card overflow-hidden hover:shadow-lg transition block">
                <div className="h-64 overflow-hidden">
                  <Image src={service.image} alt={`${service.title} service`} width={1000} height={700} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-slate-900">{service.title}</h2>
                  <p className="text-gray-700 mb-3">{service.description}</p>
                  <span className="text-[rgb(var(--color-primary))] font-medium text-sm">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Wave fill="rgb(244,232,237)" flip />
      </section>

      {/* ── PETAL PINK: CTA ───────────────────────────────────────────────────── */}
      <section className="relative bg-[rgb(244,232,237)] pb-28 pt-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--color-ink))]">Ready to get started?</h2>
          <p className="text-gray-700 mb-6">Request a free 30-minute introductory call and Lilly will confirm a time that works for both of you.</p>
          <button onClick={openBooking} className="btn-primary">
            {t('section.book') || 'Request a free consult'}
          </button>
        </div>
        <Wave fill="rgb(220,232,199)" />
      </section>

      {/* ── MINT GREEN: FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-[rgb(220,232,199)] py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[rgb(var(--color-ink))]">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="organic-card p-4">
                <summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary>
                <p className="mt-2 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FaqSchema items={faqItems} />
    </main>
  )
}
