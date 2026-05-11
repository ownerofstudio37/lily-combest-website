"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { QrCode, UserRoundPlus, Link2, Check } from 'lucide-react'

export default function DigitalCard({ cardUrl }: { cardUrl: string }) {
  const [showQr, setShowQr] = useState(false)
  const [copied, setCopied] = useState(false)

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
      <section className="relative bg-[rgb(47,60,41)] text-[rgb(244,232,237)] pt-28 pb-28">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[rgba(244,232,237,0.7)] mb-3">Private Share Link</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Lilly Combest Digital Card</h1>
          <p className="text-[rgba(244,232,237,0.85)] max-w-2xl text-lg">
            A private, mobile-friendly business card page. Share this directly or let people scan the QR code.
          </p>
        </div>
      </section>

      <section className="bg-[rgb(245,241,232)] py-16">
        <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <article className="organic-card p-6 md:p-8">
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

            <div className="mt-6 space-y-2 text-gray-700">
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
      </section>
    </main>
  )
}
