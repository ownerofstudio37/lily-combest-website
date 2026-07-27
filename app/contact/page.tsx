"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useLocale } from '../components/LocaleProvider'

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

export default function Contact(){
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName(''); setEmail(''); setMessage('')
        setTimeout(() => setStatus('idle'), 5000)
      } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  return (
    <main className="overflow-x-hidden">

      {/* ── DARK GREEN: Page Header ──────────────────────────────────── */}
      <section className="relative bg-[rgb(47,60,41)] text-[rgb(244,232,237)] pt-28 pb-32">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t('contact.title') || 'Contact'}</h1>
          <p className="text-[rgba(244,232,237,0.8)] text-lg max-w-xl">Let&apos;s talk about your wellness goals. No pressure, just an honest conversation.</p>
        </div>
        <Wave fill="rgb(244,232,237)" />
      </section>

      {/* ── PETAL PINK: Form + Images ──────────────────────────────── */}
      <section className="relative bg-[rgb(244,232,237)] py-20 pb-28">
        <div className="max-w-5xl mx-auto px-4">

          <div className="mb-8 organic-card p-5">
            <p className="text-slate-800 font-medium">Prefer email?</p>
            <p className="text-gray-700 mt-1">Send your preferred dates and goals to <a href="mailto:lilly@lillycombest.com" className="text-[rgb(var(--color-primary))] font-medium">lilly@lillycombest.com</a>.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <form id="consultation-request" name="contact" method="POST" onSubmit={handleSubmit} className="lg:col-span-3 organic-card p-6">
              <label htmlFor="contact-name" className="block mb-2 text-sm font-medium text-[rgb(var(--color-ink))]">{t('contact.form.name') || 'Your name'}</label>
              <input id="contact-name" title="Your name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full border border-[rgba(74,93,63,0.2)] rounded-lg px-3 py-2 mb-4 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]" name="name" autoComplete="name" required />

              <label htmlFor="contact-email" className="block mb-2 text-sm font-medium text-[rgb(var(--color-ink))]">{t('contact.form.email') || 'Your email'}</label>
              <input id="contact-email" title="Your email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-[rgba(74,93,63,0.2)] rounded-lg px-3 py-2 mb-4 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]" type="email" name="email" autoComplete="email" required />

              <label htmlFor="contact-message" className="block mb-2 text-sm font-medium text-[rgb(var(--color-ink))]">{t('contact.form.message') || 'Message'}</label>
              <textarea id="contact-message" title="Message" placeholder="Tell Lilly your goals and preferred dates/times." value={message} onChange={e => setMessage(e.target.value)} className="w-full border border-[rgba(74,93,63,0.2)] rounded-lg px-3 py-2 mb-4 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))]" name="message" rows={5} required />

              <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                {status === 'sending' ? 'Sending…' : (t('contact.form.send') || 'Send Message')}
              </button>

              {status === 'success' && (
                <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-900">
                  <p className="font-semibold">Thanks, your request was sent.</p>
                  <p className="mt-1 text-sm">Lilly will review your goals and reply with next steps or consultation times. You can also email <a href="mailto:lilly@lillycombest.com" className="font-semibold underline">lilly@lillycombest.com</a>.</p>
                </div>
              )}
              {status === 'error' && <p className="mt-4 text-red-600">Sorry, something went wrong. Try emailing <a href="mailto:lilly@lillycombest.com" className="text-[rgb(var(--color-primary))]">lilly@lillycombest.com</a></p>}
            </form>

            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="rounded-2xl overflow-hidden">
                <Image src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg" alt="Lilly Combest wellness portrait" width={600} height={700} className="h-44 lg:h-60 w-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <Image src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Yoga and mindful movement" width={600} height={700} className="h-44 lg:h-60 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave out → dark green */}
        <Wave fill="rgb(47,60,41)" flip />
      </section>

      {/* ── DARK GREEN: Footer CTA ─────────────────────────────────────── */}
      <section className="bg-[rgb(47,60,41)] text-[rgb(244,232,237)] py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-lg text-[rgba(244,232,237,0.75)]">Based in Pinehurst, TX 77362 &mdash; serving The Woodlands, Tomball, Magnolia, Spring & Greater Houston.</p>
        </div>
      </section>

    </main>
  )
}
