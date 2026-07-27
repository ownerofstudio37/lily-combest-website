"use client"

import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react'

interface HealthStatus {
  generatedAt: string
  env: Array<{ key: string; label: string; ok: boolean; required: boolean }>
  services: Record<string, boolean>
  tables: Array<{ table: string; ok: boolean; message: string }>
}

export default function AdminHealthPanel({ compact = false }: { compact?: boolean }) {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadHealth() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/health')
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to load health status')
      setHealth(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to load health status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHealth()
  }, [])

  const rows = health ? [
    ...Object.entries(health.services).map(([key, ok]) => ({ label: key, ok, message: ok ? 'Configured' : 'Missing configuration' })),
    ...health.tables.map((table) => ({ label: table.table, ok: table.ok, message: table.message })),
  ] : []

  return (
    <section className="organic-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Admin Health</h2>
          <p className="mt-1 text-sm text-gray-600">Configuration and database reachability checks.</p>
        </div>
        <button onClick={loadHealth} disabled={loading} className="rounded-xl border border-gray-200 p-2 text-gray-700 hover:bg-[rgb(var(--color-cream))] disabled:opacity-60" aria-label="Refresh health status">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {loading && !health && <p className="mt-4 text-sm text-gray-600">Checking systems...</p>}

      {health && (
        <div className={`mt-5 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4'}`}>
          {rows.map((item) => (
            <div key={item.label} className="rounded-xl border border-gray-100 bg-white/75 p-3">
              <div className="flex items-center gap-2">
                {item.ok ? <CheckCircle2 size={17} className="text-green-700" /> : <AlertTriangle size={17} className="text-amber-700" />}
                <p className="text-sm font-bold capitalize text-gray-950">{item.label.replace(/_/g, ' ')}</p>
              </div>
              <p className="mt-1 text-xs leading-5 text-gray-600">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
