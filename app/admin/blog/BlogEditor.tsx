"use client"

import { useMemo, useState } from 'react'

interface BlogEditorPost {
  id?: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  meta_description: string | null
  keywords: string[] | null
  published: boolean
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function countH2(content: string) {
  return (content.match(/<h2|^## /gim) || []).length
}

export default function BlogEditor({ post }: { post?: BlogEditorPost | null }) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || '')
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '')
  const [keywords, setKeywords] = useState(post?.keywords?.join(', ') || '')
  const [published, setPublished] = useState(post?.published || false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(false)

  const checks = useMemo(() => [
    { label: 'Title is 35-65 characters', pass: title.length >= 35 && title.length <= 65 },
    { label: 'Slug is readable and unique', pass: slug.length >= 5 && !slug.includes('--') },
    { label: 'Excerpt is 80-165 characters', pass: excerpt.length >= 80 && excerpt.length <= 165 },
    { label: 'Meta description is 80-160 characters', pass: metaDescription.length >= 80 && metaDescription.length <= 160 },
    { label: 'Featured image is set', pass: featuredImage.length > 0 },
    { label: 'Content includes at least two H2 sections', pass: countH2(content) >= 2 },
    { label: 'Content links to consultation or services', pass: /\/contact|\/services/i.test(content) },
    { label: 'Local relevance is included', pass: /pinehurst|woodlands|magnolia|tomball|spring|conroe|houston/i.test(content) },
  ], [title, slug, excerpt, metaDescription, featuredImage, content])

  async function save(nextPublished = published) {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/blog/save', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: post?.id,
          title,
          slug,
          excerpt,
          content,
          featured_image: featuredImage,
          meta_description: metaDescription,
          keywords,
          published: nextPublished,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to save post')
      setMessage(nextPublished ? 'Post published.' : 'Draft saved.')
      setPublished(Boolean(data.post?.published))
      if (!post?.id && data.post?.id) {
        window.location.href = `/admin/blog?edit=${data.post.id}`
      }
    } catch (error: any) {
      setMessage(error?.message || 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-950">{post?.id ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
            <p className="mt-1 text-sm text-gray-600">Write, preview, save drafts, and publish from one place.</p>
          </div>
          <button onClick={() => setPreview(!preview)} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800">
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {preview ? (
          <article className="prose prose-sm mt-6 max-w-none rounded-2xl border border-gray-100 bg-[rgb(var(--color-cream))] p-5">
            <h1>{title || 'Untitled post'}</h1>
            {excerpt && <p><strong>{excerpt}</strong></p>}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        ) : (
          <div className="mt-6 space-y-4">
            <input value={title} onChange={(event) => {
              const next = event.target.value
              setTitle(next)
              if (!post?.slug) setSlug(slugify(next))
            }} placeholder="Post title" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <input value={slug} onChange={(event) => setSlug(slugify(event.target.value))} placeholder="post-slug" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <textarea value={excerpt} onChange={(event) => setExcerpt(event.target.value)} placeholder="Excerpt" rows={3} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <input value={metaDescription} onChange={(event) => setMetaDescription(event.target.value)} placeholder="Meta description" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <input value={featuredImage} onChange={(event) => setFeaturedImage(event.target.value)} placeholder="Featured image URL" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <input value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="Keywords, comma separated" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="HTML or markdown content" rows={16} className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm" />
          </div>
        )}

        {message && <p className="mt-4 rounded-xl bg-[rgb(var(--color-primary-light))] px-4 py-3 text-sm text-gray-800">{message}</p>}

        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => save(false)} disabled={saving} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={() => save(true)} disabled={saving} className="rounded-xl bg-[rgb(var(--color-primary))] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </section>

      <aside className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-bold text-gray-950">SEO Checklist</h3>
        <div className="mt-4 space-y-3">
          {checks.map((check) => (
            <div key={check.label} className="flex gap-3 text-sm">
              <span className={`mt-0.5 h-5 w-5 rounded-full text-center text-xs font-bold ${check.pass ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {check.pass ? '✓' : '!'}
              </span>
              <span className="text-gray-700">{check.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
