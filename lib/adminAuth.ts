const SESSION_COOKIE = 'admin_auth'
const SESSION_TTL_SECONDS = 60 * 60 * 24 // 24 hours

function getSessionSecret() {
  const env = (globalThis as any)?.process?.env || {}
  return env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || 'dev-admin-secret-change-me'
}

export function createAdminSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  return `admin.${exp}.${getSessionSecret()}`
}

export function verifyAdminSessionToken(token?: string | null): boolean {
  if (!token) return false
  const [role, expRaw, secret] = token.split('.')
  if (role !== 'admin' || !expRaw || !secret) return false
  try {
    const exp = Number(expRaw)
    if (secret !== getSessionSecret()) return false
    if (!exp || exp < Math.floor(Date.now() / 1000)) return false
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
