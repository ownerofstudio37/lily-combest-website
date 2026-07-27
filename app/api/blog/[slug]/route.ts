import { NextResponse } from 'next/server'
import { getPublicPost } from '@/lib/publicBlog'

export async function GET(req: Request, { params }: { params: { slug?: string } }) {
  try {
    if (params.slug) {
      const post = await getPublicPost(params.slug)
      if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
      return NextResponse.json(post)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
