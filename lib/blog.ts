import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  featured_image: string
  tags: string[]
  content: string
  readingTime: number
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return []
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  const posts = files.map(f => getPost(f.replace('.md', ''))).filter(Boolean) as BlogPost[]
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) return null
  
  const content = fs.readFileSync(filePath, 'utf-8')
  const { frontmatter, body } = parseMdx(content)
  
  if (!frontmatter.slug || !frontmatter.title) return null
  
  const readingTime = Math.ceil(body.split(/\s+/).length / 200)
  
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    date: frontmatter.date,
    author: frontmatter.author || 'Lilly Combest',
    excerpt: frontmatter.excerpt || '',
    featured_image: frontmatter.featured_image || '',
    tags: frontmatter.tags || [],
    content: body,
    readingTime
  }
}

function parseMdx(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) return { frontmatter: {}, body: content }
  
  const frontmatterStr = match[1]
  const body = match[2]
  
  const frontmatter: Record<string, any> = {}
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key.trim()) {
      let value: any = valueParts.join(':').trim()
      // Parse YAML-ish values
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/"/g, ''))
      } else if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (!isNaN(Number(value)) && value !== '') value = Number(value)
      else value = value.replace(/^["']|["']$/g, '')
      frontmatter[key.trim()] = value
    }
  })
  
  return { frontmatter, body }
}
