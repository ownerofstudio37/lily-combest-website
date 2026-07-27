import { NextRequest, NextResponse } from 'next/server'
import { getPublicPost } from '@/lib/publicBlog'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const post = await getPublicPost(slug)
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
