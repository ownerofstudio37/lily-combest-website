import fs from 'fs'
import path from 'path'
import { getAllPosts } from '@/lib/blog'
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

const appDir = path.join(process.cwd(), 'app')

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

function fileExists(relativePath: string) {
  return fs.existsSync(path.join(process.cwd(), relativePath))
}

function routeToDir(route: string) {
  if (route === '/') return appDir
  return path.join(appDir, route.replace(/^\//, ''))
}

function hasRouteMetadata(route: string) {
  const dir = routeToDir(route)
  const page = path.join(dir, 'page.tsx')
  const head = path.join(dir, 'head.tsx')
  if (!fs.existsSync(page)) return false
  const pageSource = fs.readFileSync(page, 'utf8')
  return fs.existsSync(head) || pageSource.includes('export const metadata') || pageSource.includes('generateMetadata')
}

function addFinding(findings: SeoAuditFinding[], finding: SeoAuditFinding) {
  findings.push(finding)
}

export async function runSeoAudit(): Promise<SeoAuditResult> {
  const findings: SeoAuditFinding[] = []
  const posts = await getAllPosts()

  if (!siteConfig.phone) {
    addFinding(findings, {
      id: 'local-phone-missing',
      title: 'Local business phone number is missing',
      severity: 'high',
      category: 'local-seo',
      status: 'open',
      evidence: 'lib/siteConfig.ts has phone set to an empty string. Structured data intentionally omits telephone until a public number is available.',
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

  const routesWithoutMetadata = publicRoutes.filter((route) => !hasRouteMetadata(route))
  if (routesWithoutMetadata.length > 0) {
    addFinding(findings, {
      id: 'route-metadata-gaps',
      title: 'Some public routes do not define page-level metadata',
      severity: 'high',
      category: 'technical',
      status: 'open',
      evidence: routesWithoutMetadata.join(', '),
      recommendation: 'Add route-specific title, description, canonical, and Open Graph metadata to each important public page.',
    })
  }

  if (fileExists('app/blog/[slug]/page.tsx')) {
    const blogSlugSource = fs.readFileSync(path.join(process.cwd(), 'app/blog/[slug]/page.tsx'), 'utf8')
    if (blogSlugSource.includes('"use client"') && !blogSlugSource.includes('generateMetadata')) {
      addFinding(findings, {
        id: 'blog-post-client-metadata',
        title: 'Blog article pages do not generate server metadata per post',
        severity: 'high',
        category: 'blog',
        status: 'open',
        evidence: 'app/blog/[slug]/page.tsx is a client component that fetches post content after render.',
        recommendation: 'Split blog article rendering into a server page with generateMetadata and a client child only where interaction is needed.',
      })
    }
    if (!blogSlugSource.includes('BlogPosting')) {
      addFinding(findings, {
        id: 'blog-post-schema',
        title: 'Blog article pages are missing BlogPosting schema',
        severity: 'medium',
        category: 'blog',
        status: 'open',
        evidence: 'app/blog/[slug]/page.tsx does not include BlogPosting structured data.',
        recommendation: 'Add BlogPosting JSON-LD with headline, description, image, dates, author, publisher, and canonical URL.',
      })
    }
  }

  for (const post of posts) {
    if (!post.excerpt || post.excerpt.length < 80 || post.excerpt.length > 165) {
      addFinding(findings, {
        id: `post-excerpt-${post.slug}`,
        title: `Blog post excerpt needs SEO tuning: ${post.title}`,
        severity: 'medium',
        category: 'blog',
        status: 'open',
        evidence: `Excerpt length is ${post.excerpt?.length || 0} characters.`,
        recommendation: 'Write a people-first meta-style summary between roughly 80 and 160 characters with the primary topic and benefit.',
      })
    }

    if (!post.featured_image) {
      addFinding(findings, {
        id: `post-image-${post.slug}`,
        title: `Blog post is missing a featured image: ${post.title}`,
        severity: 'medium',
        category: 'blog',
        status: 'open',
        evidence: `content/blog/${post.slug}.md does not define featured_image.`,
        recommendation: 'Add a relevant image that clearly matches the wellness topic and can be used in Open Graph previews.',
      })
    }

    if (post.readingTime < 3) {
      addFinding(findings, {
        id: `post-depth-${post.slug}`,
        title: `Blog post is thin for organic search: ${post.title}`,
        severity: 'medium',
        category: 'content',
        status: 'open',
        evidence: `Estimated reading time is ${post.readingTime} minute(s).`,
        recommendation: 'Expand the post with specific examples, local context, FAQs, and an expert takeaway from Lilly.',
      })
    }
  }

  if (fileExists('public/robots.txt')) {
    const robots = fs.readFileSync(path.join(process.cwd(), 'public/robots.txt'), 'utf8')
    if (robots.includes('Disallow: /_next/')) {
      addFinding(findings, {
        id: 'robots-next-assets',
        title: 'robots.txt blocks Next.js asset paths',
        severity: 'medium',
        category: 'technical',
        status: 'open',
        evidence: 'public/robots.txt includes Disallow: /_next/.',
        recommendation: 'Remove the /_next/ disallow rule so crawlers can fetch JS/CSS needed for rendering and page quality checks.',
      })
    }
    if (!robots.includes('Sitemap:')) {
      addFinding(findings, {
        id: 'robots-sitemap',
        title: 'robots.txt does not advertise the sitemap',
        severity: 'medium',
        category: 'technical',
        status: 'open',
        evidence: 'No Sitemap directive found.',
        recommendation: 'Add the production sitemap URL to robots.txt.',
      })
    }
  }

  if (fileExists('app/admin/seo/page.tsx')) {
    const adminSeoSource = fs.readFileSync(path.join(process.cwd(), 'app/admin/seo/page.tsx'), 'utf8')
    if (!adminSeoSource.includes('Search Console Launch Checklist')) {
      addFinding(findings, {
        id: 'search-console-workflow',
        title: 'Search Console workflow is not visible in admin',
        severity: 'low',
        category: 'technical',
        status: 'watch',
        evidence: 'Admin SEO page does not show sitemap submission or indexing checks.',
        recommendation: 'Add launch checklist items for Search Console property verification, sitemap submission, and key-page inspection.',
      })
    }
  }

  addFinding(findings, {
    id: 'eeat-content',
    title: 'Wellness content needs stronger expertise signals',
    severity: 'medium',
    category: 'content',
    status: 'open',
    evidence: 'Scope-of-practice and process details are present, but Lilly’s real credentials/certifications still need to be added when available.',
    recommendation: 'Add verified credentials, certifications, and professional background details once Lilly confirms the exact wording.',
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
      markdownPosts: posts.length,
    },
    findings,
  }
}
