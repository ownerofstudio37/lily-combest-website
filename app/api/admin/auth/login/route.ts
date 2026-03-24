import { NextRequest, NextResponse } from "next/server"
import { adminSessionCookie, createAdminSessionToken } from '@/lib/adminAuth'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set(adminSessionCookie.name, createAdminSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: adminSessionCookie.maxAge,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ message: "Invalid password" }, { status: 401 })
}
