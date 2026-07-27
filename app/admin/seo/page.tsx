"use client"

import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, RefreshCw, Search, ShieldAlert } from 'lucide-react'

type Severity = 'critical' | 'high' | 'medium' | 'low'

interface SeoFinding {
  id: string
  title: string
  severity: Severity
  category: string
  status: 'open' | 'watch'
  evidence: string
  recommendation: string
}

interface SeoAudit {
  score: number
  generatedAt: string
  summary: {
    critical: number
    high: number
    medium: number
    low: number
    routesChecked: number
    markdownPosts: number
  }
  findings: SeoFinding[]
}

const severityStyles: Record<Severity, string> = {
  critical: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  low: 'bg-slate-100 text-slate-700 border-slate-200',
}

export default function AdminSeoAudit() {
  const [audit, setAudit] = useState<SeoAudit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadAudit = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/seo/audit')
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to run SEO audit')
      setAudit(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to run SEO audit')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAudit()
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Search Visibility</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">SEO Audit</h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Local, technical, and blog checks for Lilly Combest&apos;s wellness site.
          </p>
        </div>
        <button
          onClick={loadAudit}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--color-primary))] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Run Audit
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
          {error}
        </div>
      )}

      {loading && !audit && (
        <div className="rounded-2xl bg-white p-8 text-gray-600 shadow-sm">
          Running SEO checks...
        </div>
      )}

      {audit && (
        <>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">SEO Readiness Score</p>
                  <p className="mt-2 text-5xl font-bold text-gray-950">{audit.score}</p>
                </div>
                {audit.summary.critical || audit.summary.high ? (
                  <ShieldAlert className="text-orange-600" size={36} />
                ) : (
                  <CheckCircle2 className="text-green-600" size={36} />
                )}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Last run: {new Date(audit.generatedAt).toLocaleString()}
              </p>
            </div>

            {[
              ['Critical', audit.summary.critical, 'text-red-700'],
              ['High', audit.summary.high, 'text-orange-700'],
              ['Medium', audit.summary.medium, 'text-amber-700'],
            ].map(([label, value, color]) => (
              <div key={String(label)} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`mt-2 text-4xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[rgba(74,93,63,0.12)] bg-[rgba(var(--color-primary-light),0.42)] p-5">
              <Search className="mb-3 text-[rgb(var(--color-primary))]" size={22} />
              <p className="font-semibold text-gray-950">{audit.summary.routesChecked} public routes checked</p>
              <p className="mt-1 text-sm text-gray-700">Metadata, route coverage, and crawlability basics.</p>
            </div>
            <div className="rounded-2xl border border-[rgba(74,93,63,0.12)] bg-white p-5">
              <p className="font-semibold text-gray-950">{audit.summary.markdownPosts} markdown posts checked</p>
              <p className="mt-1 text-sm text-gray-700">Fallback blog content, excerpts, images, and depth.</p>
            </div>
            <div className="rounded-2xl border border-[rgba(74,93,63,0.12)] bg-white p-5">
              <p className="font-semibold text-gray-950">Google-aligned priorities</p>
              <p className="mt-1 text-sm text-gray-700">Helpful content, page experience, and structured data readiness.</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-950">Findings</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {audit.findings.map((finding) => (
                <article key={finding.id} className="p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${severityStyles[finding.severity]}`}>
                          {finding.severity}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase text-gray-600">
                          {finding.category}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-gray-950">{finding.title}</h3>
                    </div>
                    {finding.status === 'watch' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        <AlertTriangle size={14} />
                        Watch
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-gray-600"><strong>Evidence:</strong> {finding.evidence}</p>
                  <p className="mt-2 text-sm text-gray-800"><strong>Recommendation:</strong> {finding.recommendation}</p>
                </article>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
