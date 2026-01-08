"use client"

import React from 'react'
import Link from 'next/link'
import { useLocale } from '../components/LocaleProvider' 

export default function BlogPage(){
  const { t } = useLocale()
  const posts = (t('blog.posts') && JSON.parse(JSON.stringify(t('blog.posts')))) || []

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{t('blog.title') || 'Blog'}</h1>
      <p className="text-gray-700 mb-8">{t('blog.description') || 'Helpful tips and articles.'}</p>

      <div className="space-y-6">
        {posts.map((p: any) => (
          <article key={p.slug} className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2>
            <p className="text-gray-600 mb-4">{p.excerpt}</p>
            <Link href={`/blog/${p.slug}`} className="text-[rgb(var(--color-primary))] font-medium">{t('blog.read_more') || 'Read more'}</Link>
          </article>
        ))}
      </div>
    </div>
  )
}