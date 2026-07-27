import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/adminAuth'
import { runSeoAudit } from '@/lib/seoAudit'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const audit = await runSeoAudit()
    return NextResponse.json(audit)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to run SEO audit' },
      { status: 500 }
    )
  }
}
