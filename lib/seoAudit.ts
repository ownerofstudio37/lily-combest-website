import { siteConfig } from '@/lib/siteConfig'

export type AuditSeverity = 'critical' | 'high' | 'medium' | 'low'
export type AuditCategory = 'technical' | 'content' | 'local-seo' | 'blog' | 'ux'

export interface SeoAuditFinding {
  id: string
  title: string
  severity: AuditSeverity
  category: AuditCategory
  status: 'open' | 'watch'
  evidence: string
  recommendation: string
}

export interface SeoAuditResult {
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
  findings: SeoAuditFinding[]
}

const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/services',
  '/services/wellness-coaching',
  '/services/nutrition-meal-planning',
  '/services/workout-motivation-coaching',
  '/services/virtual-workshops',
  '/blog',
  '/privacy',
  '/private-card',
]

function addFinding(findings: SeoAuditFinding[], finding: SeoAuditFinding) {
  findings.push(finding)
}

export async function runSeoAudit(): Promise<SeoAuditResult> {
  const findings: SeoAuditFinding[] = []

  if (!siteConfig.phone) {
    addFinding(findings, {
      id: 'local-phone-missing',
      title: 'Local business phone number is missing',
      severity: 'high',
      category: 'local-seo',
      status: 'open',
      evidence: 'siteConfig.phone is empty. Structured data intentionally omits telephone until a public number is available.',
      recommendation: 'Add Lilly’s public business phone number to siteConfig when it is ready to publish.',
    })
  }

  if (!siteConfig.url.includes('lillycombest.com')) {
    addFinding(findings, {
      id: 'site-url-placeholder',
      title: 'Canonical site URL may be misconfigured',
      severity: 'high',
      category: 'technical',
      status: 'open',
      evidence: `siteConfig.url resolved to ${siteConfig.url}.`,
      recommendation: 'Confirm NEXT_PUBLIC_SITE_URL is set to the production canonical domain on Netlify.',
    })
  }

  addFinding(findings, {
    id: 'eeat-content',
    title: 'Wellness content needs verified expertise signals',
    severity: 'medium',
    category: 'content',
    status: 'open',
    evidence: 'Scope-of-practice and process details are present, but Lilly’s real credentials/certifications still need to be added when available.',
    recommendation: 'Add verified credentials, certifications, and professional background details once Lilly confirms the exact wording.',
  })

  addFinding(findings, {
    id: 'manual-search-console',
    title: 'Search Console verification requires account access',
    severity: 'low',
    category: 'technical',
    status: 'watch',
    evidence: 'The admin checklist is available, but Google Search Console submission cannot be automated from the site.',
    recommendation: 'Use /admin/seo and /admin/qa to track property verification, sitemap submission, and URL inspections.',
  })

  const weights: Record<AuditSeverity, number> = {
    critical: 18,
    high: 10,
    medium: 5,
    low: 2,
  }
  const deductions = findings.reduce((sum, finding) => sum + weights[finding.severity], 0)
  const score = Math.max(0, Math.min(100, 100 - deductions))

  return {
    score,
    generatedAt: new Date().toISOString(),
    summary: {
      critical: findings.filter((finding) => finding.severity === 'critical').length,
      high: findings.filter((finding) => finding.severity === 'high').length,
      medium: findings.filter((finding) => finding.severity === 'medium').length,
      low: findings.filter((finding) => finding.severity === 'low').length,
      routesChecked: publicRoutes.length,
      markdownPosts: 0,
    },
    findings,
  }
}
