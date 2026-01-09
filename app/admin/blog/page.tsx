import { supabaseAdmin } from '@/lib/supabaseAdmin'

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

export default async function BlogManagement() {
  let posts: BlogPost[] = []
  let error: string | null = null

  try {
    const { data, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (fetchError) throw fetchError
    posts = data || []
  } catch (err: any) {
    console.error('Error loading posts:', err)
    error = err.message || 'Failed to load blog posts'
  }

  const publishedPosts = posts.filter(p => p.published)
  const draftPosts = posts.filter(p => !p.published)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <p className="text-gray-600 mt-2">Manage blog content directly or use the AI Blog Writer to generate SEO-optimized posts</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

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
                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                          <span>Published: {new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                          {post.keywords && post.keywords.length > 0 && (
                            <span>Keywords: {post.keywords.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
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
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Draft</span>
                    </div>
                  </div>
                ))}
              </div>
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
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Draft</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
