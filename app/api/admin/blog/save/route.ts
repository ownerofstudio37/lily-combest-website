import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, slug, excerpt, content, featured_image, meta_description, keywords, published } = body

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, and content are required' },
        { status: 400 }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Server not configured with Supabase credentials' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

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
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
