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

const curatedImages = [
  { label: 'Fresh meals', url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077261/54707332078_c4a60a9e45_k_per4mx.jpg' },
  { label: 'Lilly portrait', url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1774335295/LillyHeadshot-37_1_djbfa5.jpg' },
  { label: 'Mindful movement', url: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { label: 'Wellness routine', url: 'https://images.pexels.com/photos/8436463/pexels-photo-8436463.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { label: 'Meal planning', url: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { label: 'Recovery', url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077375/54708498315_242445c364_k_q9qsvb.jpg' },
]

const linkSuggestions = [
  { terms: ['sleep', 'stress', 'routine', 'habit'], label: 'Wellness Coaching', href: '/services/wellness-coaching' },
  { terms: ['meal', 'nutrition', 'food', 'prep', 'grocery'], label: 'Nutrition & Meal Planning', href: '/services/nutrition-meal-planning' },
  { terms: ['workout', 'movement', 'fitness', 'motivation'], label: 'Workout & Motivation Coaching', href: '/services/workout-motivation-coaching' },
  { terms: ['team', 'group', 'workshop', 'office'], label: 'Virtual Wellness Workshops', href: '/services/virtual-workshops' },
  { terms: ['consult', 'call', 'start'], label: 'Request a Consultation', href: '/contact#consultation-request' },
]

function getSuggestedLinks(content: string, title: string) {
  const haystack = `${title} ${content}`.toLowerCase()
  return linkSuggestions.filter((suggestion) =>
    suggestion.terms.some((term) => haystack.includes(term)) && !content.includes(suggestion.href),
  )
}

function parseFaqPairs(content: string) {
  const faqStart = content.search(/^## Quick FAQ\s*$/im)
  if (faqStart === -1) return [{ question: '', answer: '' }]
  const faqBlock = content.slice(faqStart)
  const pairs = [...faqBlock.matchAll(/\*\*(.+?\?)\*\*\s*\n+([\s\S]*?)(?=\n+\*\*.+?\?\*\*|\n+## |\s*$)/g)]
    .map((match) => ({ question: match[1].trim(), answer: match[2].trim() }))
    .filter((item) => item.question || item.answer)
  return pairs.length ? pairs : [{ question: '', answer: '' }]
}

function applyFaqBlock(content: string, faqs: Array<{ question: string; answer: string }>) {
  const cleanContent = content.replace(/\n*## Quick FAQ[\s\S]*?(?=\n## |\s*$)/i, '').trim()
  const validFaqs = faqs.filter((item) => item.question.trim() && item.answer.trim())
  if (!validFaqs.length) return cleanContent

  const faqBlock = [
    '## Quick FAQ',
    ...validFaqs.flatMap((item) => [`**${item.question.trim()}**`, item.answer.trim()]),
  ].join('\n\n')

  return `${cleanContent}\n\n${faqBlock}`.trim()
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
  const [faqs, setFaqs] = useState(() => parseFaqPairs(post?.content || ''))
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
    { label: 'FAQ section is included', pass: faqs.some((item) => item.question.trim() && item.answer.trim()) },
  ], [title, slug, excerpt, metaDescription, featuredImage, content, faqs])

  const suggestedLinks = useMemo(() => getSuggestedLinks(content, title), [content, title])

  function insertLink(label: string, href: string) {
    setContent((current) => `${current.trim()}\n\nLearn more: [${label}](${href})`.trim())
  }

  function updateFaq(index: number, field: 'question' | 'answer', value: string) {
    setFaqs((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item))
  }

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
          content: applyFaqBlock(content, faqs),
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
            <div className="rounded-2xl border border-gray-100 bg-[rgb(var(--color-cream))] p-4">
              <p className="text-sm font-bold text-gray-950">Approved Image Picker</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {curatedImages.map((image) => (
                  <button
                    key={image.url}
                    type="button"
                    onClick={() => setFeaturedImage(image.url)}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold ${featuredImage === image.url ? 'border-[rgb(var(--color-primary))] bg-white text-[rgb(var(--color-primary))]' : 'border-gray-200 bg-white/70 text-gray-700'}`}
                  >
                    {image.label}
                  </button>
                ))}
              </div>
            </div>
            <input value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="Keywords, comma separated" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="HTML or markdown content" rows={16} className="w-full rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm" />
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-gray-950">Blog FAQs</p>
                <button type="button" onClick={() => setFaqs((current) => [...current, { question: '', answer: '' }])} className="rounded-lg bg-[rgb(var(--color-primary))] px-3 py-2 text-xs font-bold text-white">
                  Add FAQ
                </button>
              </div>
              <div className="mt-3 space-y-3">
                {faqs.map((item, index) => (
                  <div key={index} className="grid gap-2 rounded-xl bg-[rgb(var(--color-cream))] p-3">
                    <input value={item.question} onChange={(event) => updateFaq(index, 'question', event.target.value)} placeholder="Question, ending with ?" className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
                    <textarea value={item.answer} onChange={(event) => updateFaq(index, 'answer', event.target.value)} placeholder="Short, helpful answer" rows={2} className="rounded-lg border border-gray-200 px-3 py-2 text-sm" />
                  </div>
                ))}
              </div>
            </div>
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
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="font-bold text-gray-950">Internal Link Suggestions</h3>
          <div className="mt-3 space-y-2">
            {suggestedLinks.length === 0 ? (
              <p className="text-sm text-gray-600">Relevant service links are already included or no strong match yet.</p>
            ) : suggestedLinks.map((suggestion) => (
              <button
                key={suggestion.href}
                type="button"
                onClick={() => insertLink(suggestion.label, suggestion.href)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-left text-sm font-semibold text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-cream))]"
              >
                Add {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
