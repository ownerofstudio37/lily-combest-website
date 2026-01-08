import React from 'react'
import { useLocale } from './LocaleProvider'

export default function Services(){
  const { t } = useLocale()
  const title = t('services.title') || 'Services'
  const desc = t('services.desc') || 'Support that meets you where you are — clear, practical, and sustainable.'
  const list = (t('services.list') && JSON.parse(JSON.stringify(t('services.list')))) || [
    'One-on-one Wellness Coaching',
    'Nutrition & Meal Planning',
    'Stress & Sleep Coaching',
    'Virtual Workshops'
  ]

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">{desc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((s: string) => (
            <div key={s} className="p-6 border rounded-lg shadow-sm bg-white">
              <h3 className="font-semibold mb-2">{s}</h3>
              <p className="text-sm text-gray-700">&nbsp;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
