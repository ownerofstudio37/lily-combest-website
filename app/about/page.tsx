import React from 'react'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{ /* locale-aware title below */ }</h1>
      <AboutBody />
    </div>
  )
}

function AboutBody(){
  const { t } = require('../../components/LocaleProvider').useLocale()
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{t('about.title') || 'About Lilly'}</h1>
      <p className="text-gray-700 mb-4">{t('about.paragraph') || 'Lilly Combest is a health and wellness consultant based in Pinehurst, NC. She helps busy people build lasting habits for better energy, improved sleep, and sustainable nutrition.'}</p>
      <h2 className="font-semibold mt-6 mb-2">Approach</h2>
      <p className="text-gray-700">Lilly blends practical behavior change strategies with evidence-informed nutrition guidance. Her coaching is warm, non-judgmental, and tailored to each client's lifestyle.</p>
    </>
  )
}
