"use client"

export default function BlogManagement() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <p className="text-gray-600 mt-2">Manage blog content directly or use the AI Blog Writer to generate SEO-optimized posts</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Published Posts</h2>
          <a href="/admin/ai/blog-writer" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            + Generate with AI
          </a>
        </div>
        <div className="p-8 text-center text-gray-500">
          <p>No posts yet. Use the AI Blog Writer to create your first post.</p>
        </div>
      </div>
    </div>
  )
}
