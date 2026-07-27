"use client"

import { useEffect, useState } from 'react'
import { ClipboardCheck } from 'lucide-react'

const storageKey = 'lilly-admin-production-qa'

const sections = [
  {
    title: 'Authentication',
    items: [
      'Log in with the production admin password.',
      'Refresh `/admin` and confirm the session persists.',
      'Log out and confirm protected admin pages redirect to login.',
    ],
  },
  {
    title: 'Blog Workflow',
    items: [
      'Create a draft post with title, slug, excerpt, meta description, image, keywords, and FAQ.',
      'Use internal link suggestions and confirm links insert into content.',
      'Preview the draft before publishing.',
      'Publish the post and confirm it appears on `/blog` and its article page.',
      'Edit the published post and confirm duplicate slug protection works.',
    ],
  },
  {
    title: 'Lead Flow',
    items: [
      'Submit the public contact form with a real test email.',
      'Confirm the contact appears in Supabase/admin Contacts.',
      'Confirm Lilly receives the Resend notification.',
      'Confirm the submitter receives the confirmation email.',
    ],
  },
  {
    title: 'SEO Launch',
    items: [
      'Run `/admin/seo` and review current findings.',
      'Open `/sitemap.xml` and confirm service/blog URLs are present.',
      'Submit sitemap in Google Search Console.',
      'Inspect homepage, services page, and newest blog post in Search Console.',
    ],
  },
  {
    title: 'Responsive QA',
    items: [
      'Check homepage on mobile, tablet, and desktop.',
      'Check Services and one service detail page.',
      'Check Blog index and one article page.',
      'Check Contact form and Admin Blog editor on mobile/tablet.',
    ],
  },
]

export default function AdminQaPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) setChecked(JSON.parse(stored))
    } catch {
      setChecked({})
    }
  }, [])

  function toggle(item: string) {
    setChecked((current) => {
      const next = { ...current, [item]: !current[item] }
      localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
  }

  const total = sections.reduce((sum, section) => sum + section.items.length, 0)
  const complete = Object.values(checked).filter(Boolean).length

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Production QA</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950">Admin QA Checklist</h1>
        <p className="mt-2 max-w-2xl text-gray-600">Manual checks for the parts that need production credentials, email delivery, or Search Console access.</p>
      </div>

      <section className="organic-card p-6">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-[rgb(var(--color-primary))]" size={26} />
          <div>
            <h2 className="text-xl font-bold text-gray-950">{complete} of {total} checks complete</h2>
            <p className="text-sm text-gray-600">Saved in this browser.</p>
          </div>
        </div>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[rgb(var(--color-cream))]">
          <div className="h-full bg-[rgb(var(--color-primary))]" style={{ width: `${Math.round((complete / total) * 100)}%` }} />
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="organic-card p-6">
            <h2 className="text-xl font-bold text-gray-950">{section.title}</h2>
            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <label key={item} className="flex gap-3 rounded-xl bg-white/75 p-3 text-sm text-gray-800">
                  <input type="checkbox" checked={Boolean(checked[item])} onChange={() => toggle(item)} className="mt-1 h-4 w-4 rounded border-gray-300" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
