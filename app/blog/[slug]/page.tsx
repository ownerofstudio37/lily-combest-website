import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import WaveDivider from '../../components/WaveDivider'
import { siteConfig } from '@/lib/siteConfig'
import { contentToHtml } from '@/lib/markdownHtml'
import { extractBlogFaqs } from '@/lib/blogSeo'
import { getPublicPost, getPublicPosts } from '@/lib/publicBlog'

export async function generateStaticParams() {
  const posts = await getPublicPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublicPost(slug)
  if (!post) return {}

  const url = `${siteConfig.url.replace(/\/$/, '')}/blog/${post.slug}`
  const description = post.meta_description || post.excerpt || siteConfig.description

  return {
    title: `${post.title} | Lilly Combest`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.featured_image ? [{ url: post.featured_image, alt: post.title }] : [{ url: siteConfig.ogImage, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.featured_image || siteConfig.ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublicPost(slug)
  if (!post) notFound()

  const url = `${siteConfig.url.replace(/\/$/, '')}/blog/${post.slug}`
  const faqs = extractBlogFaqs(post.content)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image || siteConfig.ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url.replace(/\/$/, '')}/logo.svg`,
      },
    },
    mainEntityOfPage: url,
  }
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null

  return (
    <main className="bg-[rgb(var(--color-cream))]">
      <section className="relative min-h-[54vh] overflow-hidden bg-[rgb(var(--color-primary-dark))] text-[rgb(var(--color-secondary-light))]">
        {post.featured_image && <Image src={post.featured_image} alt={post.title} fill priority className="object-cover opacity-50" />}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.86),rgba(20,28,19,0.48),rgba(20,28,19,0.72))]" />
        <div className="relative z-10 mx-auto flex min-h-[54vh] max-w-4xl flex-col justify-end px-4 pb-24 pt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary-light))]">Wellness Notes</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-[rgba(244,232,237,0.82)]">By {post.author} • {new Date(post.date).toLocaleDateString()} • {post.readingTime} min read</p>
        </div>
        <WaveDivider tone="cream" className="absolute bottom-[-1px] left-0 right-0 z-10 h-20" />
      </section>

      <section className="relative mx-auto max-w-4xl px-4 pb-28 pt-14">
        <div className="article-content mb-10 text-gray-700 organic-card p-6 sm:p-8" dangerouslySetInnerHTML={{ __html: contentToHtml(post.content) }} />
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] bg-[rgb(var(--color-primary-dark))] p-7 text-[rgb(var(--color-secondary-light))]">
            <p className="text-2xl font-bold">Have questions about your own routine?</p>
            <p className="mt-3 leading-7 text-[rgba(244,232,237,0.82)]">Bring your goals, schedule, and sticking points. Lilly can help you choose a realistic next step.</p>
            <a href="/contact#consultation-request" className="btn-secondary mt-5">Request a consultation</a>
          </div>
          <aside className="organic-card p-6">
            <h2 className="text-xl font-bold text-[rgb(var(--color-ink))]">Related Support</h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-[rgb(var(--color-primary))]">
              <a href="/services/wellness-coaching">One-on-one Wellness Coaching</a>
              <a href="/services/nutrition-meal-planning">Nutrition & Meal Planning</a>
              <a href="/services/workout-motivation-coaching">Workout & Motivation Coaching</a>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </main>
  )
}
