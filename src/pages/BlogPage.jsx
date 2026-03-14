import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPosts, searchPosts } from '../lib/supabase'
import { BLOG_CATEGORIES } from '../lib/data'
import PostCard from '../components/PostCard'

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const activeCategory = searchParams.get('category') || ''

  useEffect(() => {
    setLoading(true)
    fetchPosts(activeCategory ? { category: activeCategory } : {}).then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [activeCategory])

  const filtered = posts.filter(p =>
    search === '' ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Media Hub</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Blog &amp; News</h1>
        <p className="text-green-200 mt-3">Latest updates, press releases, and policy explainers from RTIFN Osun</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search + Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-10 border border-green-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field flex-1"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all
                ${!activeCategory
                  ? 'bg-green-700 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              All Categories
            </button>
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSearchParams({ category: cat })}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all
                  ${activeCategory === cat
                    ? 'bg-green-700 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-green-50 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="font-display text-xl text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-400 text-sm">
              {search ? `No results for "${search}"` : 'No posts in this category yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        )}

        {/* Supabase CTA */}
        <div className="mt-16 bg-green-50 rounded-xl p-7 border border-green-200 flex flex-col sm:flex-row gap-5 items-start">
          <div className="text-4xl">📝</div>
          <div>
            <h4 className="font-bold text-green-900 mb-1">Post Articles via Supabase</h4>
            <p className="text-green-700 text-sm leading-relaxed">
              This blog is powered by <strong>Supabase</strong>. To publish a new article, go to your
              <strong> Supabase dashboard → Table Editor → blog_posts → Insert row</strong>.
              Set <strong>published = true</strong> and the article appears here instantly.
              See <code className="bg-green-100 px-1 rounded">SUPABASE-GUIDE.md</code> for full instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
