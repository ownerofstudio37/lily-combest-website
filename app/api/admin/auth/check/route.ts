import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get("admin_auth")

  if (authCookie?.value === "true") {
    return NextResponse.json({
      authenticated: true,
      user: { email: "admin@lillycombest.com", role: "admin" },
    })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
