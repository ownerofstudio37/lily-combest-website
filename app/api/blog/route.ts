import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { NextResponse } from 'next/server'

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
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
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
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
