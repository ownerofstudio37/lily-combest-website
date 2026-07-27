"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import WaveDivider from '../../components/WaveDivider'

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
        <div className="prose prose-lg max-w-none mb-10 text-gray-700 organic-card p-6 sm:p-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="rounded-[2rem] bg-[rgb(var(--color-primary-dark))] p-7 text-[rgb(var(--color-secondary-light))]">
          <p className="text-lg font-semibold">Have questions about your own routine?</p>
          <a href="/contact#consultation-request" className="btn-secondary mt-4">Request a consultation</a>
        </div>
      </section>
    </main>
  )
}
