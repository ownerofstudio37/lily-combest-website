import { NextRequest, NextResponse } from "next/server"
import { adminSessionCookie, createAdminSessionToken, getConfiguredAdminPassword } from '@/lib/adminAuth'
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request, 'admin-login', { limit: 6, windowMs: 15 * 60 * 1000 })
  if (limited) return limited

  const { password } = await request.json()
  const adminPassword = getConfiguredAdminPassword()

  if (!adminPassword) {
    return NextResponse.json(
      { message: "Admin password is not configured" },
      { status: 500 }
    )
  }

  if (password === adminPassword) {
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
