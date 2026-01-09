import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Placeholder stats - in a real app, this would query a database
  return NextResponse.json({
    totalContacts: 0,
    recentContacts: 0,
    totalBookings: 0,
    blogPosts: 0,
  })
}
