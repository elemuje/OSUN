import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const CATEGORY_COLORS = {
  'Tinubu Achievements': 'bg-yellow-100 text-yellow-800',
  'Economic Reforms': 'bg-green-100 text-green-800',
  'RTIFN Activities': 'bg-blue-100 text-blue-800',
  'Policy Explainers': 'bg-purple-100 text-purple-800',
  'Press Releases': 'bg-red-100 text-red-800',
  'Grassroots Mobilization': 'bg-orange-100 text-orange-800',
}

export default function PostCard({ post, featured = false }) {
  const dateStr = post.date ? format(new Date(post.date), 'MMMM d, yyyy') : ''
  const catColor = CATEGORY_COLORS[post.category] || 'bg-green-100 text-green-800'

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="block group">
        <div className="card h-full flex flex-col">
          {/* Image area */}
          <div className="relative overflow-hidden h-56 bg-gradient-to-br from-green-800 to-green-600">
            {post.featuredImage ? (
              <img src={post.featuredImage} alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl opacity-30 text-white">
                📰
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {post.category && (
              <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${catColor}`}>
                {post.category}
              </span>
            )}
          </div>
          {/* Body */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
              <span>{dateStr}</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h3 className="font-display text-lg text-gray-900 mb-2 leading-snug group-hover:text-green-700 transition-colors flex-1">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
            )}
            <span className="text-green-600 font-bold text-sm uppercase tracking-wide group-hover:gap-3 
                             flex items-center gap-2 transition-all">
              Read More <span>→</span>
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <div className="bg-white rounded-lg border border-green-100 p-5 hover:shadow-lg 
                      hover:-translate-y-0.5 transition-all duration-300 flex gap-4">
        <div className="flex-1 min-w-0">
          {post.category && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block ${catColor}`}>
              {post.category}
            </span>
          )}
          <h3 className="font-display text-base text-gray-900 mb-1 leading-snug 
                         group-hover:text-green-700 transition-colors">
            {post.title}
          </h3>
          <div className="text-xs text-gray-400 flex gap-2">
            <span>{dateStr}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-md bg-gradient-to-br from-green-700 to-green-500 
                        flex-shrink-0 overflow-hidden">
          {post.featuredImage
            ? <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-xl text-white opacity-40">📰</div>
          }
        </div>
      </div>
    </Link>
  )
}
