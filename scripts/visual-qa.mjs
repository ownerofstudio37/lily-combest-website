import { chromium } from '@playwright/test'
import fs from 'fs/promises'
import path from 'path'

const baseUrl = (process.env.VISUAL_QA_BASE_URL || process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '')
const outDir = path.join(process.cwd(), 'artifacts', 'visual-qa')

const pages = [
  ['home', '/'],
  ['services', '/services'],
  ['service-wellness', '/services/wellness-coaching'],
  ['about', '/about'],
  ['blog', '/blog'],
  ['article', '/blog/simple-meal-prep'],
  ['contact', '/contact'],
]

const viewports = [
  ['mobile', { width: 390, height: 844 }],
  ['tablet', { width: 768, height: 1024 }],
  ['desktop', { width: 1440, height: 1000 }],
]

await fs.mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const findings = []

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await context.newPage()

  for (const [name, route] of pages) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
    const status = response?.status() || 0
    if (status >= 400) findings.push(`${viewportName} ${route} returned ${status}`)

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    if (bodyWidth > viewport.width + 2) {
      findings.push(`${viewportName} ${route} has horizontal overflow: ${bodyWidth}px > ${viewport.width}px`)
    }

    await page.screenshot({
      path: path.join(outDir, `${viewportName}-${name}.png`),
      fullPage: true,
    })
  }

  await context.close()
}

await browser.close()

if (findings.length) {
  console.error(findings.join('\n'))
  process.exit(1)
}

console.log(`visual QA screenshots saved to ${outDir}`)
