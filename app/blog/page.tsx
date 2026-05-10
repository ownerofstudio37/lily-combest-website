"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from '../components/LocaleProvider'

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  featured_image: string
  readingTime: number
}

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
      <div className="max-w-4xl mx-auto py-16 px-4 section-cream rounded-[2rem]">
        <h1 className="text-3xl font-bold mb-4">{t('blog.title') || 'Blog'}</h1>
        <p className="text-gray-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 section-petal rounded-[2rem]">
      <h1 className="text-3xl font-bold mb-4">{t('blog.title') || 'Blog'}</h1>
      <p className="text-gray-700 mb-8">{t('blog.description') || 'Helpful tips and articles.'}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg',
          'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600',
          'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg',
        ].map((src, i) => (
          <div key={i} className="rounded-2xl overflow-hidden organic-ring">
            <Image src={src} alt={`Blog wellness mood image ${i + 1}`} width={500} height={400} className="h-24 md:h-32 w-full object-cover" />
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
          {error}
        </div>
      )}

      {!error && posts.length === 0 && (
        <div className="mb-6 organic-card px-4 py-6 text-slate-600">
          No blog posts available yet.
        </div>
      )}

      <div className="space-y-8">
        {posts.map((p) => (
          <article key={p.slug} className="organic-card overflow-hidden hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-3 gap-4 md:gap-0">
              {p.featured_image && (
                <div className="md:col-span-1 h-48 md:h-auto overflow-hidden">
                  <Image src={p.featured_image} alt={p.title} width={400} height={300} className="object-cover w-full h-full" />
                </div>
              )}
              <div className={`p-6 ${p.featured_image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <h2 className="text-2xl font-semibold mb-2">
                  <Link href={`/blog/${p.slug}`} className="text-[rgb(var(--color-primary))] hover:underline">{p.title}</Link>
                </h2>
                <p className="text-sm text-gray-500 mb-3">{new Date(p.date).toLocaleDateString()} · {p.readingTime} min read</p>
                <p className="text-gray-700 mb-4">{p.excerpt}</p>
                <Link href={`/blog/${p.slug}`} className="text-[rgb(var(--color-primary))] font-medium hover:underline">{t('blog.read_more') || 'Read more'} →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}