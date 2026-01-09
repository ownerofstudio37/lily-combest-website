import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(request: NextRequest) {
  try {
    // Get total contacts count
    const { count: totalContacts } = await supabaseAdmin
      .from('contacts')
      .select('*', { count: 'exact', head: true })

    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const { count: recentContacts } = await supabaseAdmin
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString())

    // Get total bookings count
    const { count: totalBookings } = await supabaseAdmin
      .from('bookings')
      .select('*', { count: 'exact', head: true })

    // Get published blog posts count
    const { count: blogPosts } = await supabaseAdmin
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('published', true)

    return NextResponse.json({
      totalContacts: totalContacts || 0,
      recentContacts: recentContacts || 0,
      totalBookings: totalBookings || 0,
      blogPosts: blogPosts || 0,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({
      totalContacts: 0,
      recentContacts: 0,
      totalBookings: 0,
      blogPosts: 0,
    })
  }
}
