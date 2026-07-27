import { createClient } from '@supabase/supabase-js'
import { getAllPosts, getPost } from '@/lib/blog'

export interface PublicBlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  featured_image: string
  content: string
  readingTime: number
  meta_description?: string
  keywords?: string[]
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length / 200))
}

function normalizePost(post: any): PublicBlogPost {
  const date = post.published_at || post.created_at || post.date || new Date().toISOString()
  const content = post.content || ''
  return {
    slug: post.slug,
    title: post.title,
    date,
    author: post.author || 'Lilly Combest',
    excerpt: post.excerpt || post.meta_description || '',
    featured_image: post.featured_image || '',
    content,
    readingTime: post.readingTime || readingTime(content || post.excerpt || ''),
    meta_description: post.meta_description || post.excerpt || '',
    keywords: Array.isArray(post.keywords) ? post.keywords : [],
  }
}

export async function getPublicPosts(): Promise<PublicBlogPost[]> {
  const supabase = getSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (!error && data?.length) return data.map(normalizePost)
  }

  const fallbackPosts = await getAllPosts()
  return fallbackPosts.map(normalizePost)
}

export async function getPublicPost(slug: string): Promise<PublicBlogPost | null> {
  const supabase = getSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (!error && data) return normalizePost(data)
  }

  const fallback = getPost(slug)
  return fallback ? normalizePost(fallback) : null
}
