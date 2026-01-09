import { getAllPosts, getPost } from '@/lib/blog'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { slug?: string } }) {
  try {
    if (params.slug) {
      const post = getPost(params.slug)
      if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(post)
    } else {
      const posts = await getAllPosts()
      return NextResponse.json(posts)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
