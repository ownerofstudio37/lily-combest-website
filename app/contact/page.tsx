"use client"

import React, { useState } from 'react'
import { useLocale } from '../components/LocaleProvider'
import Booking from '../components/Booking'

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
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">{t('contact.title') || 'Contact'}</h1>
      <p className="text-gray-700 mb-6">{t('contact.intro') || 'To schedule a free consultation with Lilly, email'} <a href={`mailto:${t('contact.email')}`} className="text-[rgb(var(--color-primary))] font-medium">{t('contact.email') || 'lilly@lillycombest.com'}</a></p>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <Booking />
      </div>

      <form name="contact" method="POST" onSubmit={handleSubmit} className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <label htmlFor="contact-name" className="block mb-2 text-sm font-medium">{t('contact.form.name') || 'Your name'}</label>
        <input id="contact-name" title="Your name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-4" name="name" autoComplete="name" required />

        <label htmlFor="contact-email" className="block mb-2 text-sm font-medium">{t('contact.form.email') || 'Your email'}</label>
        <input id="contact-email" title="Your email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-4" type="email" name="email" autoComplete="email" required />

        <label htmlFor="contact-message" className="block mb-2 text-sm font-medium">{t('contact.form.message') || 'Message'}</label>
        <textarea id="contact-message" title="Message" placeholder="How can I help you?" value={message} onChange={e => setMessage(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-4" name="message" rows={5} required></textarea>

        <button type="submit" disabled={status === 'sending'} className="bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-md">{status === 'sending' ? 'Sending…' : (t('contact.form.send') || 'Send Message')}</button>

        {status === 'success' && <p className="mt-4 text-green-600">Thanks — we'll be in touch soon.</p>}
        {status === 'error' && <p className="mt-4 text-red-600">Sorry, something went wrong. Try emailing <a href="mailto:lilly@lillycombest.com" className="text-[rgb(var(--color-primary))]">lilly@lillycombest.com</a></p>}
      </form>
    </div>
  )
}
