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
      <div className="max-w-3xl mx-auto py-16 px-4">
        <p>Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <p className="text-gray-700">Post not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      {post.featured_image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image src={post.featured_image} alt={post.title} width={800} height={400} className="object-cover w-full h-96" />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        By {post.author} • {new Date(post.date).toLocaleDateString()} • {post.readingTime} min read
      </p>

      <div className="prose prose-lg max-w-none mb-12 text-gray-700">
        <MarkdownContent content={post.content} />
      </div>

      <div className="border-t pt-8">
        <p className="text-sm text-gray-600">Have questions? <a href="/contact" className="text-[rgb(var(--color-primary))] font-semibold">Get in touch</a></p>
      </div>
    </div>
  )
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <div>
      {content.split('\n').map((line, i) => {
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(3)}</h2>
        }
        if (line.startsWith('# ')) {
          return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.slice(2)}</h3>
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="ml-6 list-disc">{line.slice(2)}</li>
        }
        if (line.trim() === '') {
          return <div key={i} className="h-4" />
        }
        return <p key={i} className="mb-4">{line}</p>
      })}
    </div>
  )
}