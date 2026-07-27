"use client"

import { BarChart3, CheckCircle2, KeyRound, Settings } from "lucide-react"

const requiredEnv = [
  'ADMIN_PASSWORD',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'GEMINI_API_KEY',
  'NEXT_PUBLIC_CALENDLY_URL',
]

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Operations</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950">Advanced Settings</h1>
        <p className="mt-2 max-w-2xl text-gray-600">Launch configuration and technical checks without fake performance or deployment data.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="organic-card p-6">
          <BarChart3 className="mb-4 text-[rgb(var(--color-primary))]" size={24} />
          <h2 className="text-xl font-semibold text-gray-950">Performance</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">Run Lighthouse or production Core Web Vitals after the final image/content pass. No placeholder score is shown here.</p>
        </section>

        <section className="organic-card p-6 xl:col-span-2">
          <KeyRound className="mb-4 text-[rgb(var(--color-primary))]" size={24} />
          <h2 className="text-xl font-semibold text-gray-950">Environment Variables</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {requiredEnv.map((key) => (
              <div key={key} className="flex items-center gap-2 rounded-xl bg-[rgba(var(--color-primary-light),0.45)] px-3 py-2 text-sm font-medium text-gray-800">
                <CheckCircle2 size={16} className="text-[rgb(var(--color-primary))]" />
                {key}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">These are managed in Netlify. Add optional `ADMIN_SESSION_SECRET` when you want session rotation separate from the login password.</p>
        </section>

        <section className="organic-card p-6 xl:col-span-3">
          <Settings className="mb-4 text-[rgb(var(--color-secondary-dark))]" size={24} />
          <h2 className="text-xl font-semibold text-gray-950">Deployment Notes</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">Use Netlify deploy logs for build history and rollback. The local folder path still contains an apostrophe, so production-like local builds should run from a clean path or after moving the project folder.</p>
        </section>
      </div>
    </div>
  )
}
