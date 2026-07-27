"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, Settings, BarChart3, MessageSquare, BookOpen, Zap, FileText, Search } from "lucide-react"

interface AdminUser {
  email: string
  role: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth/check")
      if (!response.ok) {
        router.push("/login?next=/admin")
        return
      }
      const data = await response.json()
      setUser(data.user)
      setIsAuthenticated(true)
    } catch (error) {
      router.push("/login?next=/admin")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[rgb(245,241,232)]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[rgba(74,93,63,0.12)] bg-white/90 shadow-sm backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary))]">Wellness Studio</p>
              <h1 className="text-2xl font-bold text-gray-950">Lilly Combest Admin</h1>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="truncate text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-[rgba(var(--color-primary-light),0.55)] hover:text-gray-950"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <nav className="w-full overflow-x-auto border-b border-[rgba(74,93,63,0.1)] bg-white/90 p-3 shadow-sm lg:min-h-screen lg:w-64 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col lg:space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700 font-medium"
            >
              Dashboard
            </Link>

            <div className="contents lg:block lg:pt-4 lg:border-t lg:mt-4">
              <h3 className="hidden text-xs font-semibold text-gray-500 uppercase mb-3 lg:block">CRM & Content</h3>
              <Link
                href="/admin/contacts"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <MessageSquare size={16} />
                Contacts
              </Link>
              <Link
                href="/admin/bookings"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <BookOpen size={16} />
                Bookings
              </Link>
            </div>

            <div className="contents lg:block lg:pt-4 lg:border-t lg:mt-4">
              <h3 className="hidden text-xs font-semibold text-gray-500 uppercase mb-3 lg:block">Content Management</h3>
              <Link
                href="/admin/blog"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <BookOpen size={16} />
                Blog Posts
              </Link>
              <Link
                href="/admin/pages"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <FileText size={16} />
                Pages
              </Link>
            </div>

            <div className="contents lg:block lg:pt-4 lg:border-t lg:mt-4">
              <h3 className="hidden text-xs font-semibold text-gray-500 uppercase mb-3 lg:block">AI Tools</h3>
              <Link
                href="/admin/ai/blog-writer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <Zap size={16} />
                Blog Writer
              </Link>
              <Link
                href="/admin/ai/meal-plans"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <Zap size={16} />
                Meal Plans
              </Link>
              <Link
                href="/admin/ai/wellness-plans"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <Zap size={16} />
                Wellness Plans
              </Link>
              <Link
                href="/admin/ai/workouts"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <Zap size={16} />
                Workouts
              </Link>
            </div>

            <div className="contents lg:block lg:pt-4 lg:border-t lg:mt-4">
              <h3 className="hidden text-xs font-semibold text-gray-500 uppercase mb-3 lg:block">Administration</h3>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <BarChart3 size={16} />
                Analytics
              </Link>
              <Link
                href="/admin/seo"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <Search size={16} />
                SEO Audit
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[rgba(var(--color-primary-light),0.55)] text-gray-700"
              >
                <Settings size={16} />
                Settings
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
