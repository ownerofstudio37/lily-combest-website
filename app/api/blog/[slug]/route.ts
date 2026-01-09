import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { NextResponse } from 'next/server'

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
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      }

      return NextResponse.json(post)
    } else {
      const { data: posts, error } = await supabaseAdmin
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { nullsFirst: false, ascending: false })

      if (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
      }

      return NextResponse.json(posts || [])
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
