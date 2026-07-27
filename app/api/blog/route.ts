import { NextResponse } from 'next/server'
import { getPublicPosts } from '@/lib/publicBlog'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const posts = await getPublicPosts()
    return NextResponse.json(posts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt || '',
      featured_image: post.featured_image || '',
      readingTime: post.readingTime || 2,
    })))
  } catch (error) {
    console.error('Blog API error:', error)
    return NextResponse.json([])
  }
}
