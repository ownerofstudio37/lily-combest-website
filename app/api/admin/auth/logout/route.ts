import { NextRequest, NextResponse } from "next/server"
import { adminSessionCookie } from '@/lib/adminAuth'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.set(adminSessionCookie.name, "", { maxAge: 0, path: '/' })
  return response
}
