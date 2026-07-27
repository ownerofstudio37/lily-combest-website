"use client"

import Link from "next/link"
import { BarChart3, Mail, MessageSquare, Search } from "lucide-react"

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Measurement</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950">Analytics & Insights</h1>
        <p className="mt-2 max-w-2xl text-gray-600">This dashboard now shows connected workflow entry points instead of placeholder traffic numbers.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/contacts" className="organic-card p-6 hover:shadow-md">
          <MessageSquare className="mb-4 text-[rgb(var(--color-primary))]" size={24} />
          <h2 className="font-bold text-gray-950">Contact Submissions</h2>
          <p className="mt-2 text-sm text-gray-600">Review real lead messages captured from the contact form.</p>
        </Link>
        <Link href="/admin/seo" className="organic-card p-6 hover:shadow-md">
          <Search className="mb-4 text-[rgb(var(--color-primary))]" size={24} />
          <h2 className="font-bold text-gray-950">SEO Readiness</h2>
          <p className="mt-2 text-sm text-gray-600">Run route, blog, local SEO, and metadata checks.</p>
        </Link>
        <Link href="/admin/blog" className="organic-card p-6 hover:shadow-md">
          <BarChart3 className="mb-4 text-[rgb(var(--color-primary))]" size={24} />
          <h2 className="font-bold text-gray-950">Content Activity</h2>
          <p className="mt-2 text-sm text-gray-600">Review published posts and drafts that feed organic search.</p>
        </Link>
      </div>

      <div className="rounded-2xl border border-[rgba(var(--color-primary),0.14)] bg-white p-6">
        <div className="flex items-start gap-4">
          <Mail className="mt-1 text-[rgb(var(--color-secondary-dark))]" size={22} />
          <div>
            <h2 className="font-bold text-gray-950">Next Analytics Upgrade</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Connect Google Analytics, Plausible, or another privacy-friendly analytics provider, then replace this panel with live visits, consultation clicks, and contact conversion rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
