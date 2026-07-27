"use client"

import type { ReactNode } from "react"
import { CheckCircle2 } from "lucide-react"

type PlanValue = string | number | boolean | null | undefined | PlanValue[] | { [key: string]: PlanValue }

function humanizeKey(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function cleanText(value: string) {
  return value
    .replace(/^[-*•]\s+/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function renderValue(value: PlanValue): ReactNode {
  if (value === null || value === undefined || value === '') return null

  if (Array.isArray(value)) {
    return (
      <ul className="mt-3 grid gap-2">
        {value.map((item, index) => (
          <li key={index} className="flex gap-3 rounded-xl bg-[rgba(var(--color-primary-light),0.32)] px-3 py-2 text-gray-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--color-primary))]" />
            <div className="min-w-0 flex-1">{renderValue(item)}</div>
          </li>
        ))}
      </ul>
    )
  }

  if (typeof value === 'object') {
    return (
      <div className="mt-3 grid gap-3">
        {Object.entries(value).map(([key, nestedValue]) => {
          const rendered = renderValue(nestedValue)
          if (!rendered) return null
          return (
            <div key={key} className="rounded-xl border border-[rgba(74,93,63,0.1)] bg-white/70 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[rgb(var(--color-primary))]">{humanizeKey(key)}</p>
              <div className="mt-1 text-sm leading-6 text-gray-700">{rendered}</div>
            </div>
          )
        })}
      </div>
    )
  }

  return <span>{cleanText(String(value))}</span>
}

export function PlanSection({ title, value }: { title: string; value: PlanValue }) {
  const rendered = renderValue(value)
  if (!rendered) return null

  return (
    <section className="rounded-2xl border border-[rgba(74,93,63,0.1)] bg-white/82 p-5 shadow-sm">
      <h3 className="text-base font-bold text-gray-950">{title}</h3>
      <div className="mt-2 text-sm leading-7 text-gray-700">{rendered}</div>
    </section>
  )
}

export function PlanShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="organic-card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-[rgba(74,93,63,0.1)] bg-[rgba(var(--color-primary-light),0.32)] p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Generated Plan</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-950">{title}</h2>
          {subtitle && <p className="mt-2 text-sm font-medium text-gray-600">{subtitle}</p>}
        </div>
        {actions}
      </div>
      <div className="grid gap-4 p-5 sm:p-6">
        {children}
      </div>
    </div>
  )
}
