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

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch('/api/blog')
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">{t('blog.title') || 'Blog'}</h1>
        <p className="text-gray-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{t('blog.title') || 'Blog'}</h1>
      <p className="text-gray-700 mb-8">{t('blog.description') || 'Helpful tips and articles.'}</p>

      <div className="space-y-8">
        {posts.map((p) => (
          <article key={p.slug} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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