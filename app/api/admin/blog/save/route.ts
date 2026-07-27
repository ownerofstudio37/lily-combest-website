import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { isAdminAuthenticated } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, title, excerpt, content, featured_image, meta_description, keywords, published } = body
    const slug = String(body.slug || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, and content are required' },
        { status: 400 }
      )
    }

    const duplicateQuery = supabaseAdmin
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .limit(1)

    if (id) duplicateQuery.neq('id', id)
    const { data: duplicates, error: duplicateError } = await duplicateQuery
    if (duplicateError) throw duplicateError
    if (duplicates?.length) {
      return NextResponse.json(
        { error: 'A blog post with this slug already exists. Choose a unique slug before saving.' },
        { status: 409 },
      )
    }

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featured_image: featured_image || null,
      meta_description: meta_description || null,
      keywords: keywords ? keywords.split(',').map((k: string) => k.trim()) : [],
      published: published || false,
      published_at: published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }

    if (id) {
      // Update existing post
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating blog post:', error)
        throw error
      }

      return NextResponse.json({
        success: true,
        post: data,
      })
    } else {
      // Create new post
      const { data, error } = await supabaseAdmin
        .from('blog_posts')
        .insert([{
          ...postData,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating blog post:', error)
        throw error
      }

      return NextResponse.json({
        success: true,
        post: data,
      })
    }
  } catch (error: any) {
    console.error('Error saving blog post:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save blog post' },
      { status: 500 }
    )
  }
}
