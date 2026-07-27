import * as crypto from 'crypto'

const SESSION_COOKIE = 'admin_auth'
const SESSION_TTL_SECONDS = 60 * 60 * 24 // 24 hours

function getSessionSecret() {
  const env = (globalThis as any)?.process?.env || {}
  return env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || (env.NODE_ENV === 'production' ? '' : 'dev-admin-secret-change-me')
}

function signSession(exp: number) {
  const secret = getSessionSecret()
  if (!secret) return ''

  return crypto
    .createHmac('sha256', secret)
    .update(`admin.${exp}`)
    .digest('base64url')
}

function constantTimeEqual(a: string, b: string) {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && crypto.timingSafeEqual(left, right)
}

export function createAdminSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const signature = signSession(exp)
  if (!signature) throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD is required')
  return `admin.${exp}.${signature}`
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false
  const [role, expRaw, signature] = token.split('.')
  if (role !== 'admin' || !expRaw || !signature) return false
  try {
    const exp = Number(expRaw)
    if (!exp || exp < Math.floor(Date.now() / 1000)) return false
    const expected = signSession(exp)
    if (!expected || !constantTimeEqual(signature, expected)) return false
    return true
  } catch {
    return false
  }
}

export function isAdminAuthenticated(request: any): boolean {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  return verifyAdminSessionToken(token)
}

export const adminSessionCookie = {
  name: SESSION_COOKIE,
  maxAge: SESSION_TTL_SECONDS,
}

export function getConfiguredAdminPassword() {
  const password = process.env.ADMIN_PASSWORD
  if (password) return password
  return process.env.NODE_ENV === 'production' ? '' : 'admin123'
}
