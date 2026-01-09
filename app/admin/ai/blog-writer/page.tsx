"use client"

import { useState } from "react"
import { Loader2, Copy, Check } from "lucide-react"

interface BlogContent {
  title: string
  excerpt: string
  content: string
  keywords: string[]
  metaDescription: string
}

const SEO_TARGETS = {
  zipCode: "77362",
  radius: "60 miles",
  cities: ["Tomball", "Spring", "Magnolia", "Pinehurst", "The Woodlands", "Conroe"],
  keywords: [
    "wellness consultant near me",
    "nutrition coaching",
    "meal planning services",
    "fitness coaching",
    "wellness coaching",
    "health consultant",
  ],
}

export default function AiBlogWriter() {
  const [topic, setTopic] = useState("")
  const [selectedKeyword, setSelectedKeyword] = useState("")
  const [tone, setTone] = useState("professional")
  const [wordCount, setWordCount] = useState(1200)
  const [targetAudience, setTargetAudience] = useState("busy professionals")
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<BlogContent | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim() || !selectedKeyword.trim()) {
      setError("Please enter a topic and select a keyword")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/admin/ai/blog-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          keyword: selectedKeyword,
          tone,
          wordCount,
          targetAudience,
          seoTargets: SEO_TARGETS,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate blog post")
      }

      setGeneratedContent(data.content)
    } catch (err: any) {
      setError(err.message || "Failed to generate content")
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveDraft = async () => {
    if (!generatedContent) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/blog/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedContent.title,
          slug: generatedContent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          excerpt: generatedContent.excerpt,
          content: generatedContent.content,
          featured_image: "",
          meta_description: generatedContent.metaDescription,
          keywords: generatedContent.keywords.join(", "),
          published: false,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to save draft")
      }
      alert("Blog post saved as draft successfully!")
    } catch (err: any) {
      alert("Error saving draft: " + (err.message || "Unknown error"))
    } finally {
      setSaving(false)
    }
  }

  const publishPost = async () => {
    if (!generatedContent) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/blog/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedContent.title,
          slug: generatedContent.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          excerpt: generatedContent.excerpt,
          content: generatedContent.content,
          featured_image: "",
          meta_description: generatedContent.metaDescription,
          keywords: generatedContent.keywords.join(", "),
          published: true,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to publish post")
      }
      alert("Blog post published successfully!")
      setGeneratedContent(null)
      setTopic("")
      setSelectedKeyword("")
    } catch (err: any) {
      alert("Error publishing post: " + (err.message || "Unknown error"))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Blog Writer</h1>
        <p className="text-gray-600 mt-2">Generate SEO-optimized blog posts targeting {SEO_TARGETS.zipCode} zip code area</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Blog Topic *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 5 Ways to Improve Sleep Quality"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Should include target keyword</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Target SEO Keyword *</label>
              <select
                value={selectedKeyword}
                onChange={(e) => setSelectedKeyword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select keyword or custom...</option>
                {SEO_TARGETS.keywords.map((kw) => (
                  <option key={kw} value={kw}>
                    {kw}
                  </option>
                ))}
                <option value="custom">+ Custom keyword</option>
              </select>
              {selectedKeyword === "custom" && (
                <input
                  type="text"
                  placeholder="Enter custom keyword"
                  onChange={(e) => setSelectedKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent mt-2"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">Targets: {SEO_TARGETS.zipCode} zip code, {SEO_TARGETS.radius}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., busy professionals, busy parents"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly & Conversational</option>
                <option value="educational">Educational</option>
                <option value="inspiring">Inspiring & Motivational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Word Count: {wordCount}</label>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating || !topic.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Blog Post"
              )}
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <strong>SEO Tips:</strong> AI will automatically include location keywords for {SEO_TARGETS.cities.join(", ")} and optimize for search visibility.
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          {!generatedContent ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              <p>Generated content will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Title */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Title</p>
                    <h2 className="text-2xl font-bold text-gray-900">{generatedContent.title}</h2>
                  </div>
                  <button
                    onClick={() => copyToClipboard(generatedContent.title)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              {/* Meta Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Meta Description (SEO)</p>
                <p className="text-gray-800">{generatedContent.metaDescription}</p>
                <p className="text-xs text-gray-500 mt-2">{generatedContent.metaDescription.length}/160 characters</p>
              </div>

              {/* Keywords */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Focus Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.keywords.map((kw, idx) => (
                    <span key={idx} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Excerpt</p>
                <p className="text-gray-800">{generatedContent.excerpt}</p>
              </div>

              {/* Full Content */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Full Content</p>
                  <button
                    onClick={() => copyToClipboard(generatedContent.content)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div
                    className="text-gray-800 space-y-4 max-h-96 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: generatedContent.content }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button 
                  onClick={saveDraft}
                  disabled={saving}
                  className="flex-1 bg-white border border-gray-300 text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save as Draft"}
                </button>
                <button 
                  onClick={publishPost}
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
                >
                  {saving ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
