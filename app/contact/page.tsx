"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useLocale } from '../components/LocaleProvider'
import WaveDivider from '../components/WaveDivider'

export default function Contact(){
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const messageLength = message.trim().length
  const canSubmit = useMemo(() => name.trim().length > 1 && email.includes('@') && messageLength > 12 && status !== 'sending', [email, messageLength, name, status])

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
      <section className="relative min-h-[48vh] overflow-hidden bg-[rgb(var(--color-primary-dark))] text-[rgb(var(--color-secondary-light))]">
        <Image src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg" alt="Lilly Combest wellness portrait" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.84),rgba(20,28,19,0.48),rgba(20,28,19,0.72))]" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-5xl flex-col justify-end px-4 pb-24 pt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary-light))]">Contact</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">{t('contact.title') || 'Contact'}</h1>
          <p className="mt-4 text-[rgba(244,232,237,0.84)] text-lg max-w-xl">Let&apos;s talk about your wellness goals. No pressure, just an honest conversation.</p>
        </div>
        <WaveDivider tone="petal" className="absolute bottom-[-1px] left-0 right-0 z-10 h-20" />
      </section>

      <section className="relative bg-[rgb(244,232,237)] pb-28 pt-16">
        <div className="max-w-5xl mx-auto px-4">

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Share Your Goals', text: 'Tell Lilly what you want help with and what has felt hard to maintain.' },
              { title: 'Get a Personal Reply', text: 'Lilly will review your note and respond with a practical next step.' },
              { title: 'Choose a Consultation Time', text: 'If it feels aligned, you can schedule a free introductory conversation.' },
            ].map((item) => (
              <div key={item.title} className="organic-card lift-card p-5">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <form id="consultation-request" name="contact" method="POST" onSubmit={handleSubmit} className="organic-card scroll-mt-24 lg:col-span-3 p-6">
              <div className="mb-6 rounded-2xl bg-[rgba(var(--color-primary-light),0.45)] px-4 py-3 text-sm leading-6 text-[rgb(var(--color-primary-dark))]">
                A few details are enough. Lilly can ask follow-up questions after she reviews your note.
              </div>

              <label htmlFor="contact-name" className="block mb-2 text-sm font-medium text-[rgb(var(--color-ink))]">{t('contact.form.name') || 'Your name'}</label>
              <input id="contact-name" title="Your name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="form-field mb-4" name="name" autoComplete="name" required />

              <label htmlFor="contact-email" className="block mb-2 text-sm font-medium text-[rgb(var(--color-ink))]">{t('contact.form.email') || 'Your email'}</label>
              <input id="contact-email" title="Your email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="form-field mb-4" type="email" name="email" autoComplete="email" required />

              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="contact-message" className="block text-sm font-medium text-[rgb(var(--color-ink))]">{t('contact.form.message') || 'Message'}</label>
                <span className={`text-xs font-semibold ${messageLength > 12 ? 'text-[rgb(var(--color-primary))]' : 'text-gray-500'}`}>{messageLength} chars</span>
              </div>
              <textarea id="contact-message" title="Message" placeholder="Tell Lilly your goals and preferred dates/times." value={message} onChange={e => setMessage(e.target.value)} className="form-field mb-4 min-h-36 resize-y" name="message" rows={5} required />

              <button type="submit" disabled={!canSubmit} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">
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
              <div className="organic-card lift-card col-span-2 p-5 lg:col-span-1">
                <p className="text-slate-800 font-semibold">Prefer email?</p>
                <p className="mt-2 text-sm leading-6 text-gray-700">Send preferred dates and goals to <a href="mailto:lilly@lillycombest.com" className="text-[rgb(var(--color-primary))] font-semibold">lilly@lillycombest.com</a>.</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--color-primary))]">Pinehurst, TX 77362</p>
                <p className="mt-1 text-sm text-gray-700">Serving The Woodlands, Tomball, Magnolia, Spring, Conroe, North Houston, and virtual clients across Texas.</p>
              </div>
              <div className="media-zoom rounded-2xl overflow-hidden">
                <Image src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg" alt="Lilly Combest wellness portrait" width={600} height={700} className="h-44 lg:h-60 w-full object-cover" />
              </div>
              <div className="media-zoom rounded-2xl overflow-hidden">
                <Image src="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Yoga and mindful movement" width={600} height={700} className="h-44 lg:h-60 w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
        <WaveDivider tone="dark" className="absolute bottom-[-1px] left-0 right-0 h-20" />
      </section>

      <section className="bg-[rgb(47,60,41)] text-[rgb(244,232,237)] py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <p className="text-lg text-[rgba(244,232,237,0.75)]">Based in Pinehurst, TX 77362 &mdash; serving The Woodlands, Tomball, Magnolia, Spring & Greater Houston.</p>
        </div>
      </section>

    </main>
  )
}
