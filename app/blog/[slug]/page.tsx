"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocale } from '../../components/LocaleProvider'

interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  featured_image: string
  content: string
  readingTime: number
}

export default function BlogPost({ params }: { params: { slug: string } }){
  const { t } = useLocale()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      const res = await fetch(`/api/blog/${params.slug}`)
      if (res.ok) {
        const data = await res.json()
        setPost(data)
      }
      setLoading(false)
    }
    loadPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 section-cream rounded-[2rem]">
        <p>Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 section-cream rounded-[2rem]">
        <p className="text-gray-700">Post not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 section-petal rounded-[2rem]">
      {post.featured_image && (
        <div className="mb-8 rounded-2xl overflow-hidden organic-ring">
          <Image src={post.featured_image} alt={post.title} width={800} height={400} className="object-cover w-full h-96" />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4 text-slate-900">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        By {post.author} • {new Date(post.date).toLocaleDateString()} • {post.readingTime} min read
      </p>

      <div 
        className="prose prose-lg max-w-none mb-12 text-gray-700 organic-card p-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="border-t border-[rgba(167,146,117,0.35)] pt-8">
        <p className="text-sm text-gray-700">Have questions? <a href="/contact#consultation-request" className="text-[rgb(var(--color-primary))] font-semibold">Request a consultation</a></p>
      </div>
    </div>
  )
}