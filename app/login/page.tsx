"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || "Login failed")
        return
      }

      router.push("/admin")
    } catch (error) {
      setError("An error occurred. Please try again.")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Lilly's Admin</h1>
            <p className="text-gray-600 mt-2">Dashboard Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            Admin dashboard for managing content, clients, and wellness services.
          </p>
        </div>
      </div>
    </div>
  )
}
