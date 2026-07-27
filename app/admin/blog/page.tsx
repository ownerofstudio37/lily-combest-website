import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabaseAdmin'
import BlogEditor from './BlogEditor'

export const dynamic = 'force-dynamic'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  meta_description: string | null
  keywords: string[] | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

function getFreshness(post: BlogPost) {
  const referenceDate = new Date(post.published_at || post.updated_at || post.created_at)
  const ageDays = Math.floor((Date.now() - referenceDate.getTime()) / (1000 * 60 * 60 * 24))

  if (ageDays >= 365) {
    return { label: 'Needs refresh', className: 'bg-red-100 text-red-800', note: `${ageDays} days old` }
  }

  if (ageDays >= 180) {
    return { label: 'Review soon', className: 'bg-amber-100 text-amber-800', note: `${ageDays} days old` }
  }

  return { label: 'Fresh', className: 'bg-green-100 text-green-800', note: `${ageDays} days old` }
}

export default async function BlogManagement({ searchParams }: { searchParams?: { edit?: string } }) {
  let posts: BlogPost[] = []
  let warning: string | null = null

  try {
    if (!isSupabaseAdminConfigured) {
      warning = 'Supabase is not configured. Blog editor is available, but saved posts cannot be loaded until environment variables are set.'
    } else {
    const { data, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (fetchError) throw fetchError
    posts = data || []
    }
  } catch (err: any) {
    console.error('Error loading posts:', err)
    warning = err.message ? `Blog table is not reachable: ${err.message}` : 'Failed to load blog posts'
  }

  const publishedPosts = posts.filter(p => p.published)
  const draftPosts = posts.filter(p => !p.published)
  const selectedPost = posts.find((post) => post.id === searchParams?.edit) || null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <p className="text-gray-600 mt-2">Manage blog content directly or use the AI Blog Writer to generate SEO-optimized posts</p>
      </div>

      {warning && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
          {warning}
        </div>
      )}

      <BlogEditor key={selectedPost?.id || 'new'} post={selectedPost} />

      {/* Published Posts */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Published Posts ({publishedPosts.length})</h2>
          <a href="/admin/ai/blog-writer" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            + Generate with AI
          </a>
        </div>
        {publishedPosts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No published posts yet. Use the AI Blog Writer to create your first post.</p>
          </div>
        ) : (
          <div className="divide-y">
            {publishedPosts.map(post => (
              <div key={post.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">/blog/{post.slug}</p>
                    {post.excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>}
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                      <span>Published: {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                      <span className={`rounded-full px-2 py-1 text-xs font-bold ${getFreshness(post).className}`}>{getFreshness(post).label} · {getFreshness(post).note}</span>
                      {post.keywords && post.keywords.length > 0 && (
                        <span>Keywords: {post.keywords.join(', ')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/admin/blog?edit=${post.id}`} className="text-[rgb(var(--color-primary))] hover:underline text-sm">
                      Edit
                    </a>
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm">
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Draft Posts */}
      {draftPosts.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Drafts ({draftPosts.length})</h2>
          </div>
          <div className="divide-y">
            {draftPosts.map(post => (
              <div key={post.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">/blog/{post.slug}</p>
                    <p className="text-xs text-gray-500 mt-2">Saved: {new Date(post.updated_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={`/admin/blog?edit=${post.id}`} className="text-[rgb(var(--color-primary))] hover:underline text-sm">
                      Edit
                    </a>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Draft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
