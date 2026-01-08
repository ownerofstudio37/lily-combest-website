import React from 'react'
import { useLocale } from '../components/LocaleProvider'

export default function Contact(){
  const { t } = useLocale()
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{t('contact.title') || 'Contact'}</h1>
      <p className="text-gray-700 mb-6">{t('contact.intro') || 'To schedule a free consultation with Lilly, email'} <a href={`mailto:${t('contact.email')}`} className="text-[rgb(var(--color-primary))]">{t('contact.email') || 'hello@lillycombest.com'}</a></p>

      <form action="mailto:hello@lillycombest.com" method="POST" encType="text/plain" className="max-w-xl">
        <label className="block mb-2 text-sm font-medium">{t('contact.form.name') || 'Your name'}</label>
        <input className="w-full border rounded-md px-3 py-2 mb-4" name="name" />

        <label className="block mb-2 text-sm font-medium">{t('contact.form.email') || 'Your email'}</label>
        <input className="w-full border rounded-md px-3 py-2 mb-4" type="email" name="email" />

        <label className="block mb-2 text-sm font-medium">{t('contact.form.message') || 'Message'}</label>
        <textarea className="w-full border rounded-md px-3 py-2 mb-4" name="message" rows={5}></textarea>

        <button type="submit" className="bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded-md">{t('contact.form.send') || 'Send Message'}</button>
      </form>
    </div>
  )
}
