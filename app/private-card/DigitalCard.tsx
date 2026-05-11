"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { QrCode, UserRoundPlus, Link2, Check, HeartPulse, Salad, MoonStar } from 'lucide-react'

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

export default function DigitalCard({ cardUrl }: { cardUrl: string }) {
  const [showQr, setShowQr] = useState(false)
  const [copied, setCopied] = useState(false)

  const services = [
    {
      title: '1:1 Wellness Coaching',
      description: 'Clear, realistic support for energy, habits, and follow-through.',
      icon: HeartPulse,
    },
    {
      title: 'Nutrition Guidance',
      description: 'Simple meal planning and nutrition support that fits real life.',
      icon: Salad,
    },
    {
      title: 'Stress & Sleep Support',
      description: 'Gentle systems to help restore calm, recovery, and consistency.',
      icon: MoonStar,
    },
  ]

  const qrSrc = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=${encodeURIComponent(cardUrl)}`,
    [cardUrl],
  )

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(cardUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[60vh] overflow-hidden bg-[rgb(47,60,41)] text-[rgb(244,232,237)]">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg"
          alt="Lilly Combest portrait"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,24,17,0.72)_0%,rgba(18,24,17,0.48)_46%,rgba(18,24,17,0.62)_100%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-32 md:pt-36 md:pb-36">
          <p className="text-xs uppercase tracking-[0.18em] text-[rgba(244,232,237,0.72)] mb-3">Digital Business Card</p>
          <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] tracking-tight max-w-3xl">
            Lilly Combest
            <span className="block font-serif italic text-[rgba(247,236,241,0.94)]">wellness coaching</span>
          </h1>
          <p className="text-[rgba(244,232,237,0.86)] max-w-2xl text-lg mt-5">
            Personalized wellness support for women and busy families who want healthier routines that actually last.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-2xl bg-[rgba(248,247,238,0.9)] px-4 py-3 text-center">
              <p className="text-lg font-bold text-[rgb(var(--color-primary-dark))]">1:1</p>
              <p className="text-[11px] font-medium text-[rgb(var(--color-primary))]">Coaching</p>
            </div>
            <div className="rounded-2xl bg-[rgba(248,247,238,0.9)] px-4 py-3 text-center">
              <p className="text-lg font-bold text-[rgb(var(--color-primary-dark))]">TX</p>
              <p className="text-[11px] font-medium text-[rgb(var(--color-primary))]">Local + Virtual</p>
            </div>
            <div className="rounded-2xl bg-[rgba(248,247,238,0.9)] px-4 py-3 text-center">
              <p className="text-lg font-bold text-[rgb(var(--color-primary-dark))]">Real</p>
              <p className="text-[11px] font-medium text-[rgb(var(--color-primary))]">Life Plans</p>
            </div>
          </div>
        </div>

        <Wave fill="rgb(245,241,232)" />
      </section>

      <section className="relative bg-[rgb(245,241,232)] py-14 pb-24">
        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <article className="organic-card p-6 md:p-8 shadow-[0_20px_60px_rgba(47,60,41,0.08)]">
            <p className="text-xs uppercase tracking-[0.16em] text-[rgba(47,60,41,0.56)] mb-3">Quick Connect</p>
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg"
                  alt="Lilly Combest"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[rgb(var(--color-ink))]">Lilly Combest</h2>
                <p className="text-[rgb(var(--color-primary))] font-medium">Wellness Coaching</p>
                <p className="mt-2 text-gray-600 text-sm">Pinehurst, TX • The Woodlands • Greater Houston</p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-gray-700 leading-relaxed">
              Lilly helps clients build sustainable habits around food, energy, stress, and everyday wellness with a calm, personalized approach.
            </p>

            <div className="mt-6 space-y-2 text-gray-700 text-sm md:text-base">
              <p><span className="font-semibold">Email:</span> <a className="text-[rgb(var(--color-primary))]" href="mailto:lilly@lillycombest.com">lilly@lillycombest.com</a></p>
              <p><span className="font-semibold">Site:</span> <a className="text-[rgb(var(--color-primary))]" href="https://lillycombest.com" target="_blank" rel="noreferrer noopener">lillycombest.com</a></p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/lilly-combest-contact.vcf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-primary-dark))] text-[rgb(var(--color-secondary-light))] px-5 py-3 font-semibold hover:brightness-110 transition"
              >
                <UserRoundPlus size={18} />
                Add to Contacts
              </a>

              <button
                type="button"
                onClick={() => setShowQr((s) => !s)}
                className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-primary-dark))] px-5 py-3 font-semibold hover:brightness-105 transition"
              >
                <QrCode size={18} />
                {showQr ? 'Hide QR' : 'Show QR'}
              </button>

              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(74,93,63,0.25)] bg-white/70 text-[rgb(var(--color-primary-dark))] px-5 py-3 font-semibold hover:bg-white transition"
              >
                {copied ? <Check size={18} /> : <Link2 size={18} />}
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </article>

          <article className="organic-card p-6 md:p-8 bg-[linear-gradient(180deg,rgba(244,232,237,0.78)_0%,rgba(245,241,232,0.98)_100%)]">
            <h3 className="text-xl font-semibold text-[rgb(var(--color-ink))]">Scan to Open Card</h3>
            <p className="text-gray-600 mt-2 text-sm">Open this page on another phone instantly.</p>

            {showQr ? (
              <div className="mt-5 rounded-2xl bg-white p-4 border border-[rgba(74,93,63,0.12)] max-w-[340px]">
                <Image
                  src={qrSrc}
                  alt="QR code linking to Lilly Combest digital card"
                  width={320}
                  height={320}
                  className="w-full h-auto rounded-lg"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-[rgba(74,93,63,0.28)] bg-white/60 p-8 text-center text-gray-600">
                Tap “Show QR” to display a scannable code.
              </div>
            )}

            <p className="mt-5 text-xs text-gray-500 break-all">{cardUrl}</p>
          </article>
        </div>

        <Wave fill="rgb(244,232,237)" flip />
      </section>

      <section className="bg-[rgb(244,232,237)] py-14">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[rgba(47,60,41,0.56)] mb-3">About Lilly</p>
            <h2 className="text-3xl font-semibold text-[rgb(var(--color-ink))]">A calm, practical approach to feeling better.</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Lilly blends wellness coaching, nutrition support, and habit-building guidance into plans that feel realistic, supportive, and easy to maintain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article key={service.title} className="organic-card p-5 hover:shadow-md transition">
                  <div className="mb-4 inline-flex rounded-xl bg-[rgba(var(--color-secondary-light),0.78)] p-2 text-[rgb(var(--color-primary-dark))]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-900">{service.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{service.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
