import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { NextResponse } from 'next/server'
import { getPost } from '@/lib/blog'

export async function GET(req: Request, { params }: { params: { slug?: string } }) {
  try {
    if (params.slug) {
      const { data: post, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

      if (error || !post) {
        const fallback = getPost(params.slug)
        if (!fallback) return NextResponse.json({ error: 'Not found' }, { status: 404 })

        return NextResponse.json({
          slug: fallback.slug,
          title: fallback.title,
          date: fallback.date,
          author: fallback.author,
          featured_image: fallback.featured_image,
          content: fallback.content,
          readingTime: fallback.readingTime,
        })
      }

      return NextResponse.json(post)
    } else {
      const { data: posts, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { nullsFirst: false, ascending: false })

      if (error) {
        return NextResponse.json([], { status: 200 })
      }

      return NextResponse.json(posts || [])
    }
  } catch (error) {
    if (params.slug) {
      const fallback = getPost(params.slug)
      if (!fallback) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json({
        slug: fallback.slug,
        title: fallback.title,
        date: fallback.date,
        author: fallback.author,
        featured_image: fallback.featured_image,
        content: fallback.content,
        readingTime: fallback.readingTime,
      })
    }

    return NextResponse.json([], { status: 200 })
  }
}
