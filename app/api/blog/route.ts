import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('slug, title, created_at, excerpt, featured_image, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Blog fetch error:', error)
      const fallbackPosts = await getAllPosts()
      const formattedFallback = fallbackPosts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt || '',
        featured_image: post.featured_image || '',
        readingTime: post.readingTime || 2,
      }))
      return NextResponse.json(formattedFallback)
    }

    // Transform for blog page format
    const posts = (data || []).map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.published_at || post.created_at,
      excerpt: post.excerpt || '',
      featured_image: post.featured_image || '',
      readingTime: Math.ceil((post.excerpt || '').split(/\s+/).length / 200) || 2
    }))

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Blog API error:', error)
    const fallbackPosts = await getAllPosts()
    const formattedFallback = fallbackPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt || '',
      featured_image: post.featured_image || '',
      readingTime: post.readingTime || 2,
    }))
    return NextResponse.json(formattedFallback)
  }
}
