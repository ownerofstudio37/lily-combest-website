"use client"

import React from 'react'
import { useLocale } from '../../components/LocaleProvider' 

export default function BlogPost({ params }: { params: { slug: string } }){
  const { t } = useLocale()
  const posts = (t('blog.posts') && JSON.parse(JSON.stringify(t('blog.posts')))) || []
  const post = posts.find((p: any) => p.slug === params.slug)

  if (!post) return (
    <div className="max-w-3xl mx-auto py-16 px-4">Post not found</div>
  )

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.excerpt}</p>
      <div className="prose max-w-none">
        <p>{/* Placeholder article content - replace with real content later */}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vel tincidunt tincidunt, nunc urna pulvinar justo, at bibendum mi ante et sapien.</p>
      </div>
    </div>
  )
}