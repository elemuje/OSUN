import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchPostBySlug } from '../lib/notion'
import { format } from 'date-fns'

const CATEGORY_COLORS = {
  'Tinubu Achievements': 'bg-yellow-100 text-yellow-800',
  'Economic Reforms': 'bg-green-100 text-green-800',
  'RTIFN Activities': 'bg-blue-100 text-blue-800',
  'Policy Explainers': 'bg-purple-100 text-purple-800',
  'Press Releases': 'bg-red-100 text-red-800',
  'Grassroots Mobilization': 'bg-orange-100 text-orange-800',
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(true)
    fetchPostBySlug(slug).then(data => {
      if (!data) setNotFound(true)
      else setPost(data)
      setLoading(false)
    })
  }, [slug])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-green-100 rounded w-3/4" />
          <div className="h-4 bg-green-50 rounded w-1/2" />
          <div className="h-64 bg-green-100 rounded-xl" />
          <div className="space-y-3">
            <div className="h-4 bg-green-50 rounded" />
            <div className="h-4 bg-green-50 rounded w-5/6" />
            <div className="h-4 bg-green-50 rounded w-4/6" />
          </div>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-5">📭</div>
        <h1 className="font-display text-3xl text-gray-700 mb-3">Article Not Found</h1>
        <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn-green">← Back to Blog</Link>
      </div>
    )
  }

  const dateStr = post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''
  const catColor = CATEGORY_COLORS[post.category] || 'bg-green-100 text-green-800'
  const content = post.htmlContent || post.content || ''

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Article Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-green-300 hover:text-white text-sm flex items-center gap-2 mb-5 transition-colors">
            ← Back to Blog
          </Link>
          {post.category && (
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full mb-4 inline-block ${catColor}`}>
              {post.category}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-black leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-green-200 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white">
                {post.author?.charAt(0) || 'R'}
              </span>
              {post.author}
            </span>
            {dateStr && <span>📅 {dateStr}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-xl overflow-hidden shadow-xl mb-10 -mt-6">
            <img src={post.featuredImage} alt={post.title}
              className="w-full max-h-[500px] object-cover" />
          </div>
        )}

        {/* Article Body */}
        <article className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
          {post.excerpt && (
            <p className="text-xl text-gray-600 italic border-l-4 border-green-500 pl-5 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {/* Share Buttons */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-green-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Share This Article
          </h4>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white 
                         font-bold px-5 py-2.5 rounded-md text-sm transition-all hover:-translate-y-0.5"
            >
              📘 Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white 
                         font-bold px-5 py-2.5 rounded-md text-sm transition-all hover:-translate-y-0.5"
            >
              𝕏 Twitter
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white 
                         font-bold px-5 py-2.5 rounded-md text-sm transition-all hover:-translate-y-0.5"
            >
              📲 WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white 
                         font-bold px-5 py-2.5 rounded-md text-sm transition-all hover:-translate-y-0.5"
            >
              ✈️ Telegram
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 
                         font-bold px-5 py-2.5 rounded-md text-sm transition-all"
            >
              🔗 Copy Link
            </button>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="text-center">
          <Link to="/blog" className="btn-green">
            ← More Articles
          </Link>
        </div>
      </div>
    </div>
  )
}
