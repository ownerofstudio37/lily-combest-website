"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '../components/LocaleProvider'
import WaveDivider from '../components/WaveDivider'

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  featured_image: string
  readingTime: number
}

const moodImages = [
  'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
  'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
]

export default function BlogPage(){
  const { t } = useLocale()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/blog')
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'Failed to load blog posts')
        setPosts(Array.isArray(data) ? data : [])
      } catch (err: any) {
        setPosts([])
        setError(err?.message || 'Failed to load blog posts')
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="section-cream rounded-[2rem] p-8">
          <h1 className="text-3xl font-bold mb-4">{t('blog.title') || 'Blog'}</h1>
          <p className="text-gray-700">Loading wellness notes...</p>
        </div>
      </main>
    )
  }

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <main className="overflow-x-hidden bg-[rgb(var(--color-cream))]">
      <section className="relative min-h-[52vh] overflow-hidden bg-[rgb(var(--color-primary-dark))] px-4 pb-24 pt-28 text-[rgb(var(--color-secondary-light))]">
        <Image src={moodImages[0]} alt="" fill priority className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,19,0.86),rgba(20,28,19,0.5),rgba(20,28,19,0.74))]" />
        <div className="relative z-10 mx-auto flex min-h-[36vh] max-w-6xl flex-col justify-end">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-primary-light))]">Wellness Notes</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">{t('blog.title') || 'Blog'}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[rgba(244,232,237,0.86)]">{t('blog.description') || 'Helpful tips and articles.'}</p>
        </div>
        <WaveDivider tone="cream" className="absolute bottom-[-1px] left-0 right-0 z-10 h-20" />
      </section>

    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="section-petal rounded-[2rem] px-5 py-10 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[rgb(var(--color-primary))]">Wellness Notes</p>
        <h2 className="mt-2 text-4xl font-bold text-[rgb(var(--color-ink))]">Explore by Topic</h2>
        <p className="mt-3 max-w-2xl text-gray-700">Browse nutrition, sleep, stress, habits, and local wellness guidance.</p>

        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          {['Nutrition', 'Sleep', 'Stress', 'Habits', 'Local Wellness'].map((label) => (
            <span key={label} className="rounded-full border border-[rgba(var(--color-primary),0.18)] bg-white/70 px-4 py-2 text-[rgb(var(--color-primary-dark))]">
              {label}
            </span>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {moodImages.map((src, i) => (
            <div key={src} className="rounded-2xl overflow-hidden organic-ring">
              <Image src={src} alt={`Blog wellness mood image ${i + 1}`} width={500} height={400} className="h-24 md:h-32 w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {error && (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-950">
          <p className="font-semibold">Blog posts are temporarily unavailable.</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      )}

      {!error && posts.length === 0 && (
        <div className="mt-8 organic-card px-6 py-8 text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">Fresh wellness notes are coming soon.</h2>
          <p className="mt-2">Until then, request a consultation and Lilly can point you toward the right next step for your goals.</p>
          <Link href="/contact#consultation-request" className="btn-primary mt-5">Request a Consult</Link>
        </div>
      )}

      {featuredPost && (
        <article className="organic-card mt-8 overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {featuredPost.featured_image && (
              <div className="h-64 lg:col-span-2 lg:h-auto">
                <Image src={featuredPost.featured_image} alt={featuredPost.title} width={800} height={640} className="h-full w-full object-cover" />
              </div>
            )}
            <div className={`p-6 sm:p-8 ${featuredPost.featured_image ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[rgb(var(--color-primary))]">Featured</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p className="mt-3 text-sm text-gray-500">{new Date(featuredPost.date).toLocaleDateString()} · {featuredPost.readingTime} min read</p>
              <p className="mt-4 text-gray-700">{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.slug}`} className="btn-secondary mt-6">{t('blog.read_more') || 'Read more'}</Link>
            </div>
          </div>
        </article>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {remainingPosts.map((p) => (
          <article key={p.slug} className="organic-card overflow-hidden hover:shadow-md transition-shadow">
            {p.featured_image && (
              <div className="h-48 overflow-hidden">
                <Image src={p.featured_image} alt={p.title} width={700} height={430} className="object-cover w-full h-full" />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${p.slug}`} className="text-[rgb(var(--color-primary-dark))] hover:underline">{p.title}</Link>
              </h2>
              <p className="text-sm text-gray-500 mb-3">{new Date(p.date).toLocaleDateString()} · {p.readingTime} min read</p>
              <p className="text-gray-700 mb-4">{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="font-medium text-[rgb(var(--color-primary))] hover:underline">{t('blog.read_more') || 'Read more'} →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
    </main>
  )
}
