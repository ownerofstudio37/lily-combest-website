"use client"

import { useEffect, useState } from "react"
import { Users, MessageSquare, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalContacts: number
  recentContacts: number
  totalBookings: number
  blogPosts: number
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

  const StatCard = ({ icon: Icon, label, value, link }: any) => (
    <Link
      href={link}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="bg-pink-100 p-3 rounded-lg">
          <Icon size={24} className="text-pink-600" />
        </div>
      </div>
    </Link>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your wellness coaching business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          icon={BookOpen}
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/contacts"
            className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 hover:shadow-lg transition"
          >
            <MessageSquare className="text-pink-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900">View Messages</h3>
            <p className="text-sm text-gray-600 mt-1">Check contact form submissions</p>
          </Link>

          <Link
            href="/admin/bookings"
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 hover:shadow-lg transition"
          >
            <BookOpen className="text-yellow-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900">Manage Bookings</h3>
            <p className="text-sm text-gray-600 mt-1">Review scheduled consultations</p>
          </Link>

          <Link
            href="/admin/ai/blog-writer"
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition"
          >
            <TrendingUp className="text-blue-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900">AI Blog Writer</h3>
            <p className="text-sm text-gray-600 mt-1">Generate SEO-optimized posts</p>
          </Link>

          <Link
            href="/admin/ai/meal-plans"
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 hover:shadow-lg transition"
          >
            <BookOpen className="text-green-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-900">Create Meal Plans</h3>
            <p className="text-sm text-gray-600 mt-1">Generate personalized nutrition</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Getting Started</h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex gap-4">
            <div className="text-pink-600 font-bold">1.</div>
            <div>
              <strong>Create Blog Posts</strong> - Use the AI Blog Writer to generate SEO-optimized content targeting the 77362 zip code area.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-pink-600 font-bold">2.</div>
            <div>
              <strong>Generate Service Plans</strong> - Create meal plans, wellness plans, and workout routines using AI tools.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-pink-600 font-bold">3.</div>
            <div>
              <strong>Manage Clients</strong> - Track contacts, bookings, and client communications in one place.
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-pink-600 font-bold">4.</div>
            <div>
              <strong>Monitor Performance</strong> - Check analytics and site performance in Advanced Settings.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
