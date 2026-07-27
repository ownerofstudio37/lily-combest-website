const baseUrl = (process.env.SMOKE_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

async function check(name, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options)
  if (!response.ok) {
    throw new Error(`${name} failed: ${response.status} ${response.statusText}`)
  }
  console.log(`ok ${name}`)
  return response
}

await check('homepage', '/')
await check('services', '/services')
await check('blog', '/blog')
await check('contact', '/contact')
await check('sitemap', '/sitemap.xml')
await check('robots', '/robots.txt')

if (process.env.ADMIN_PASSWORD) {
  const login = await check('admin login', '/api/admin/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }),
  })
  const cookie = login.headers.get('set-cookie')?.split(';')[0]
  await check('admin auth check', '/api/admin/auth/check', {
    headers: cookie ? { cookie } : {},
  })
  await check('admin seo audit api', '/api/admin/seo/audit', {
    headers: cookie ? { cookie } : {},
  })
} else {
  console.log('skip admin checks: ADMIN_PASSWORD not set')
}
