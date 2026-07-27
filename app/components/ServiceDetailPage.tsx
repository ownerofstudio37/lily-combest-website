"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useBooking } from './Booking'
import FaqSchema from './FaqSchema'

interface ServiceDetailPageProps {
  eyebrow: string
  title: string
  subtitle: string
  heroImage: string
  gallery: string[]
  sections: Array<{
    title: string
    body?: string
    items?: string[]
  }>
  bestFor: string[]
  ctaTitle: string
  ctaText: string
  faqs?: Array<{
    question: string
    answer: string
  }>
}

export default function ServiceDetailPage({
  eyebrow,
  title,
  subtitle,
  heroImage,
  gallery,
  sections,
  bestFor,
  ctaTitle,
  ctaText,
  faqs = [],
}: ServiceDetailPageProps) {
  const { openBooking } = useBooking()

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[62vh] overflow-hidden bg-[rgb(var(--color-primary-dark))] text-[rgb(var(--color-secondary-light))]">
        <Image src={heroImage} alt={`${title} with Lilly Combest`} fill priority className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.82),rgba(20,28,19,0.46),rgba(20,28,19,0.72))]" />
        <div className="relative z-10 mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-end px-4 pb-24 pt-14">
          <Link href="/services" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/18">
            <ArrowLeft size={16} />
            Back to Services
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary-light))]">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgba(244,232,237,0.86)]">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={openBooking} className="btn-secondary">Request Free Consultation</button>
            <Link href="/contact#consultation-request" className="btn-quiet bg-white/90">Ask a Question</Link>
          </div>
        </div>
        <svg className="hero-wave z-10" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,64 C180,112 360,112 540,82 C720,52 900,8 1080,30 C1230,48 1320,88 1440,100 L1440,120 L0,120 Z" fill="currentColor" />
        </svg>
      </section>

      <section className="bg-[rgb(var(--color-cream))] py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
          {gallery.map((src, i) => (
            <div key={src} className="overflow-hidden rounded-2xl organic-ring">
              <Image src={src} alt={`${title} wellness coaching support visual ${i + 1}`} width={640} height={500} className="h-32 w-full object-cover md:h-44" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[rgb(var(--color-secondary-light))] py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            {sections.map((section) => (
              <article key={section.title} className="organic-card p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))]">{section.title}</h2>
                {section.body && <p className="mt-3 leading-7 text-gray-700">{section.body}</p>}
                {section.items && (
                  <ul className="mt-5 grid gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-gray-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[rgb(var(--color-primary))]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <aside className="space-y-5">
            <div className="organic-card bg-white/95 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))]">Best Fit For</h2>
              <div className="mt-5 space-y-3">
                {bestFor.map((item) => (
                  <div key={item} className="rounded-2xl bg-[rgba(var(--color-primary-light),0.5)] px-4 py-3 text-sm font-medium text-gray-800">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[rgb(var(--color-primary-dark))] p-7 text-[rgb(var(--color-secondary-light))] shadow-xl">
              <h2 className="text-2xl font-bold">{ctaTitle}</h2>
              <p className="mt-3 leading-7 text-[rgba(244,232,237,0.82)]">{ctaText}</p>
              <button onClick={openBooking} className="btn-secondary mt-6 w-full">Request Free Consultation</button>
            </div>
          </aside>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 px-4 lg:grid-cols-3">
          <article className="organic-card p-6">
            <h2 className="text-xl font-bold text-[rgb(var(--color-ink))]">Who This Helps</h2>
            <p className="mt-3 leading-7 text-gray-700">
              This service is designed for clients who want practical support, simple decisions, and a plan that can flex around work, family, stress, and real-life routines.
            </p>
          </article>
          <article className="organic-card p-6">
            <h2 className="text-xl font-bold text-[rgb(var(--color-ink))]">Local Availability</h2>
            <p className="mt-3 leading-7 text-gray-700">
              Lilly supports clients in Pinehurst, The Woodlands, Magnolia, Tomball, Spring, Conroe, North Houston, and virtual clients across Texas.
            </p>
          </article>
          <article className="organic-card p-6">
            <h2 className="text-xl font-bold text-[rgb(var(--color-ink))]">Related Support</h2>
            <div className="mt-4 grid gap-2 text-sm font-semibold text-[rgb(var(--color-primary))]">
              <Link href="/services/nutrition-meal-planning">Nutrition & Meal Planning</Link>
              <Link href="/services/workout-motivation-coaching">Workout & Motivation Coaching</Link>
              <Link href="/services/virtual-workshops">Virtual Wellness Workshops</Link>
            </div>
          </article>
        </div>

        {faqs.length > 0 && (
          <div className="mx-auto mt-10 max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-[rgb(var(--color-ink))]">Frequently Asked Questions</h2>
            <div className="mt-5 space-y-3">
              {faqs.map((item) => (
                <details key={item.question} className="organic-card p-5">
                  <summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary>
                  <p className="mt-3 leading-7 text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
      {faqs.length > 0 && <FaqSchema items={faqs} />}
    </main>
  )
}
