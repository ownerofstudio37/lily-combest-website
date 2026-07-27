import { NextRequest, NextResponse } from 'next/server'

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

function getClientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
}

export function checkRateLimit(
  request: NextRequest,
  key: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now()
  const bucketKey = `${key}:${getClientIp(request)}`
  const bucket = buckets.get(bucketKey)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + options.windowMs })
    return null
  }

  bucket.count += 1
  if (bucket.count <= options.limit) return null

  const retryAfter = Math.ceil((bucket.resetAt - now) / 1000)
  return NextResponse.json(
    { error: 'Too many requests. Please wait a moment and try again.' },
    {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    },
  )
}
