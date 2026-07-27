"use client"

import type { ComponentType } from "react"
import { useEffect, useState } from "react"
import { AlertCircle, ArrowRight, BookOpen, CalendarDays, MessageSquare, Search, Sparkles, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import AdminHealthPanel from "./components/AdminHealthPanel"

interface DashboardStats {
  totalContacts: number
  recentContacts: number
  totalBookings: number
  blogPosts: number
  warning?: string
}

interface StatCardProps {
  icon: ComponentType<{ size?: number; className?: string }>
  label: string
  value: number
  link: string
}

interface ActionCardProps {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  href: string
}

function StatCard({ icon: Icon, label, value, link }: StatCardProps) {
  return (
    <Link
      href={link}
      className="group organic-card p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(74,93,63,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-[rgba(var(--color-secondary-light),0.45)] p-3 text-[rgb(var(--color-primary))] transition group-hover:bg-[rgba(var(--color-primary-light),0.7)]">
          <Icon size={22} />
        </div>
      </div>
    </Link>
  )
}

function ActionCard({ icon: Icon, title, description, href }: ActionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[rgba(74,93,63,0.12)] bg-white/75 p-5 transition hover:-translate-y-0.5 hover:border-[rgba(74,93,63,0.28)] hover:shadow-[0_14px_32px_rgba(74,93,63,0.12)]"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(var(--color-primary-light),0.5)] text-[rgb(var(--color-primary))]">
        <Icon size={21} />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-gray-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
        </div>
        <ArrowRight size={18} className="mt-1 shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-[rgb(var(--color-primary))]" />
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    recentContacts: 0,
    totalBookings: 0,
    blogPosts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Command Center</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-950">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-gray-600">Contacts, content, SEO, and launch checks in one calm workspace.</p>
      </div>

      <AdminHealthPanel compact />

      {stats.warning && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{stats.warning}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Contacts"
          value={stats.totalContacts}
          link="/admin/contacts"
        />
        <StatCard
          icon={MessageSquare}
          label="Recent Messages"
          value={stats.recentContacts}
          link="/admin/contacts"
        />
        <StatCard
          icon={CalendarDays}
          label="Bookings"
          value={stats.totalBookings}
          link="/admin/bookings"
        />
        <StatCard
          icon={BookOpen}
          label="Blog Posts"
          value={stats.blogPosts}
          link="/admin/blog"
        />
      </div>

      <section className="organic-card p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Next Moves</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-950">Quick Actions</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-600">The tools Lilly will use most often are grouped first so the admin feels useful, not crowded.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ActionCard icon={MessageSquare} title="View Messages" description="Check contact form submissions" href="/admin/contacts" />
          <ActionCard icon={CalendarDays} title="Manage Bookings" description="Review scheduled consultations" href="/admin/bookings" />
          <ActionCard icon={TrendingUp} title="AI Blog Writer" description="Generate SEO-optimized posts" href="/admin/ai/blog-writer" />
          <ActionCard icon={Sparkles} title="Create Meal Plans" description="Draft personalized nutrition" href="/admin/ai/meal-plans" />
          <ActionCard icon={Search} title="Run SEO Audit" description="Review metadata and local SEO gaps" href="/admin/seo" />
        </div>
      </section>

      <section className="organic-card p-6 sm:p-8">
        <h2 className="text-xl font-bold text-gray-950 mb-6">Getting Started</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex gap-4">
            <div className="font-bold text-[rgb(var(--color-primary))]">1.</div>
            <div>
              <strong>Create Blog Posts</strong> - Use the AI Blog Writer to generate SEO-optimized content targeting the 77362 zip code area.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="font-bold text-[rgb(var(--color-primary))]">2.</div>
            <div>
              <strong>Generate Service Plans</strong> - Create meal plans, wellness plans, and workout routines using AI tools.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="font-bold text-[rgb(var(--color-primary))]">3.</div>
            <div>
              <strong>Manage Clients</strong> - Track contacts, bookings, and client communications in one place.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="font-bold text-[rgb(var(--color-primary))]">4.</div>
            <div>
              <strong>Monitor Performance</strong> - Check analytics and site performance in Advanced Settings.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
