import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  if (isAdminAuthenticated(request)) {
    return NextResponse.json({
      authenticated: true,
      user: { email: "admin@lillycombest.com", role: "admin" },
    })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
