"use client"

import { BarChart3, CheckCircle2, Database, KeyRound, Settings } from "lucide-react"
import AdminHealthPanel from "../components/AdminHealthPanel"

const requiredEnv = [
  'ADMIN_PASSWORD',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'GEMINI_API_KEY',
  'NEXT_PUBLIC_CALENDLY_URL',
]

const schemaTables = [
  {
    name: 'contacts',
    purpose: 'Contact form submissions and lead follow-up.',
    columns: ['id uuid primary key', 'name text', 'email text', 'message text', 'source text', 'created_at timestamptz'],
  },
  {
    name: 'blog_posts',
    purpose: 'Admin-created blog drafts and published posts.',
    columns: ['id uuid primary key', 'title text', 'slug text unique', 'excerpt text', 'content text', 'featured_image text', 'meta_description text', 'keywords text[]', 'published boolean', 'published_at timestamptz', 'created_at timestamptz', 'updated_at timestamptz'],
  },
  {
    name: 'meal_plans',
    purpose: 'AI-assisted nutrition plans created in admin.',
    columns: ['id uuid primary key', 'client_name text', 'title text', 'duration text', 'calories text', 'meals jsonb', 'shopping_list jsonb', 'notes text', 'created_at timestamptz'],
  },
  {
    name: 'bookings',
    purpose: 'Consultation requests and booking metrics.',
    columns: ['id uuid primary key', 'name text', 'email text', 'phone text', 'service text', 'preferred_date timestamptz', 'notes text', 'created_at timestamptz'],
  },
]

export default function AdminSettings() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Operations</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950">Advanced Settings</h1>
        <p className="mt-2 max-w-2xl text-gray-600">Launch configuration and technical checks without fake performance or deployment data.</p>
      </div>

      <AdminHealthPanel />

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
          <p className="mt-2 text-sm leading-6 text-gray-600">Use Netlify deploy logs for build history and rollback. Local production builds now pass from the current project folder after the Next 16 migration; keep watching production logs when dependencies change.</p>
        </section>

        <section className="organic-card p-6 xl:col-span-3">
          <Database className="mb-4 text-[rgb(var(--color-primary))]" size={24} />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-950">Supabase Schema Guide</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">Use this as the admin setup checklist when creating or reviewing tables. The live health panel above will still show whether the configured project can be reached.</p>
            </div>
            <span className="rounded-full bg-[rgba(var(--color-primary-light),0.55)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--color-primary))]">Reference</span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {schemaTables.map((table) => (
              <div key={table.name} className="rounded-2xl border border-[rgba(74,93,63,0.12)] bg-white/70 p-4">
                <h3 className="font-semibold text-gray-950">{table.name}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">{table.purpose}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {table.columns.map((column) => (
                    <code key={column} className="rounded-lg bg-[rgba(var(--color-primary-light),0.45)] px-2 py-1 text-xs text-gray-800">
                      {column}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
