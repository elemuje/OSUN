import { useState, useEffect, useRef } from 'react'
import {
  adminFetchAllPosts,
  adminCreatePost,
  adminUpdatePost,
  adminDeletePost,
  adminTogglePublished,
  adminUploadImage,
  generateSlug,
} from '../lib/supabase'
import { BLOG_CATEGORIES } from '../lib/data'

// ── Simple admin password (change this to your own) ──────────
const ADMIN_PASSWORD = 'rtifnosun2026'

const EMPTY_FORM = {
  title: '', slug: '', excerpt: '', content: '',
  author: 'RTIFN Media Team', category: '', featured_image: '', published: false,
}

export default function AdminPage() {
  const [authed,    setAuthed]    = useState(() => sessionStorage.getItem('rtifn_admin') === '1')
  const [password,  setPassword]  = useState('')
  const [wrongPass, setWrongPass] = useState(false)

  if (!authed) {
    return (
      <div className="min-h-screen bg-green-950 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-green-500">
            <img src="/logo.jpeg" alt="RTIFN" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display text-2xl font-black text-green-900 mb-1">Admin Panel</h1>
          <p className="text-gray-400 text-sm mb-6">RTIFN Osun State Chapter</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => { setPassword(e.target.value); setWrongPass(false) }}
            onKeyDown={e => e.key === 'Enter' && login()}
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm mb-3 outline-none
              ${wrongPass ? 'border-red-400 bg-red-50' : 'border-green-200 focus:border-green-500'}`}
          />
          {wrongPass && <p className="text-red-500 text-xs mb-3">Incorrect password. Try again.</p>}
          <button onClick={login}
            className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all">
            Login →
          </button>
          <p className="text-xs text-gray-300 mt-4">
            Default password: <code className="bg-gray-100 px-1 rounded text-gray-500">rtifnosun2026</code>
          </p>
        </div>
      </div>
    )
  }

  function login() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('rtifn_admin', '1')
      setAuthed(true)
    } else {
      setWrongPass(true)
    }
  }

  return <AdminDashboard onLogout={() => { sessionStorage.removeItem('rtifn_admin'); setAuthed(false) }} />
}

// ── Main dashboard ────────────────────────────────────────────
function AdminDashboard({ onLogout }) {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [view,    setView]    = useState('list')   // 'list' | 'new' | 'edit'
  const [editing, setEditing] = useState(null)
  const [toast,   setToast]   = useState(null)
  const [delConfirm, setDelConfirm] = useState(null)

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    setLoading(true)
    try {
      const data = await adminFetchAllPosts()
      setPosts(data)
    } catch (e) {
      showToast('Failed to load posts: ' + e.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  async function handleToggle(post) {
    try {
      await adminTogglePublished(post.id, post.published)
      showToast(post.published ? 'Post unpublished.' : 'Post published! ✅')
      loadPosts()
    } catch (e) {
      showToast('Error: ' + e.message, 'error')
    }
  }

  async function handleDelete(id) {
    try {
      await adminDeletePost(id)
      setDelConfirm(null)
      showToast('Post deleted.')
      loadPosts()
    } catch (e) {
      showToast('Delete failed: ' + e.message, 'error')
    }
  }

  function openEdit(post) {
    setEditing({
      ...post,
      featured_image: post.featuredImage || '',
      content: post.htmlContent || post.content || '',
    })
    setView('edit')
  }

  const published = posts.filter(p => p.published).length
  const drafts    = posts.filter(p => !p.published).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl font-semibold text-sm
          ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {delConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="text-5xl mb-3">🗑️</div>
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Delete Post?</h3>
            <p className="text-gray-500 text-sm mb-6">
              "<strong>{delConfirm.title}</strong>" will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)}
                className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-2.5 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={() => handleDelete(delConfirm.id)}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-green-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-yellow-400">
            <img src="/logo.jpeg" alt="RTIFN" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-display font-bold text-sm leading-tight">RTIFN Osun Admin</div>
            <div className="text-green-300 text-xs">Blog Management Panel</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {view !== 'list' && (
            <button onClick={() => { setView('list'); setEditing(null) }}
              className="text-green-300 hover:text-white text-sm font-semibold">
              ← Back to Posts
            </button>
          )}
          {view === 'list' && (
            <button onClick={() => { setEditing(null); setView('new') }}
              className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-black px-4 py-2 rounded-lg text-sm">
              + New Post
            </button>
          )}
          <button onClick={onLogout}
            className="text-green-400 hover:text-white text-xs font-semibold border border-green-700 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── LIST VIEW ── */}
        {view === 'list' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Posts', value: posts.length, color: 'bg-green-700', icon: '📝' },
                { label: 'Published',   value: published,    color: 'bg-green-500', icon: '✅' },
                { label: 'Drafts',      value: drafts,       color: 'bg-yellow-500', icon: '📋' },
              ].map(s => (
                <div key={s.label} className={`${s.color} text-white rounded-xl p-5 text-center shadow-md`}>
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="font-display text-3xl font-black">{s.value}</div>
                  <div className="text-xs opacity-80 font-semibold uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100">
              <div className="flex items-center justify-between px-6 py-4 border-b border-green-50">
                <h2 className="font-display text-lg font-bold text-green-900">All Blog Posts</h2>
                <button onClick={loadPosts}
                  className="text-green-600 hover:text-green-800 text-sm font-semibold flex items-center gap-1">
                  ↻ Refresh
                </button>
              </div>

              {loading ? (
                <div className="py-16 text-center">
                  <div className="animate-spin text-4xl mb-3">⏳</div>
                  <p className="text-gray-400 font-semibold">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="text-gray-400 font-semibold">No posts yet.</p>
                  <button onClick={() => setView('new')}
                    className="mt-4 bg-green-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-green-600">
                    Write First Post
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-green-50">
                  {posts.map(post => (
                    <div key={post.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 hover:bg-green-50/50 transition-colors">
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-green-700 to-green-500 flex-shrink-0 flex items-center justify-center text-white text-xl">
                        {post.featuredImage
                          ? <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
                          : '📰'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">{post.title}</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0
                            ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {post.published ? '✅ Live' : '📋 Draft'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                          <span>{post.category}</span>
                          <span>·</span>
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.date ? new Date(post.date).toLocaleDateString('en-GB') : ''}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleToggle(post)}
                          title={post.published ? 'Unpublish' : 'Publish'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                            ${post.published
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                          {post.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button onClick={() => openEdit(post)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all">
                          ✏️ Edit
                        </button>
                        <button onClick={() => setDelConfirm(post)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 transition-all">
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── NEW / EDIT FORM VIEW ── */}
        {(view === 'new' || view === 'edit') && (
          <PostForm
            initial={view === 'edit' ? editing : null}
            onSave={async (formData) => {
              try {
                if (view === 'edit') {
                  await adminUpdatePost(editing.id, {
                    title:          formData.title,
                    slug:           formData.slug,
                    excerpt:        formData.excerpt,
                    content:        formData.content,
                    author:         formData.author,
                    category:       formData.category,
                    featured_image: formData.featured_image,
                    published:      formData.published,
                  })
                  showToast('Post updated! ✅')
                } else {
                  await adminCreatePost(formData)
                  showToast('Post created! ✅')
                }
                setView('list')
                loadPosts()
              } catch (e) {
                showToast('Error: ' + e.message, 'error')
              }
            }}
            onCancel={() => { setView('list'); setEditing(null) }}
            isEdit={view === 'edit'}
          />
        )}
      </div>
    </div>
  )
}

// ── Post Form (New & Edit) ────────────────────────────────────
function PostForm({ initial, onSave, onCancel, isEdit }) {
  const [form,        setForm]        = useState(initial || { ...EMPTY_FORM })
  const [imgLoading,  setImgLoading]  = useState(false)
  const [saving,      setSaving]      = useState(false)
  const [imgPreview,  setImgPreview]  = useState(initial?.featuredImage || initial?.featured_image || '')
  const [imgError,    setImgError]    = useState('')
  const fileRef = useRef()

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value }
      // Auto-generate slug from title on new posts
      if (name === 'title' && !isEdit) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  async function handleImagePick(e) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate
    if (!file.type.startsWith('image/')) {
      setImgError('Please select an image file (JPG, PNG, etc.)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setImgError('Image must be under 5MB')
      return
    }

    setImgError('')
    setImgLoading(true)

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file)
    setImgPreview(localUrl)

    try {
      const publicUrl = await adminUploadImage(file)
      setForm(prev => ({ ...prev, featured_image: publicUrl }))
      setImgPreview(publicUrl)
    } catch (err) {
      setImgError('Upload failed: ' + err.message + '. Check that your blog-images storage bucket exists and is public.')
      setImgPreview('')
      setForm(prev => ({ ...prev, featured_image: '' }))
    } finally {
      setImgLoading(false)
    }
  }

  function removeImage() {
    setImgPreview('')
    setForm(prev => ({ ...prev, featured_image: '' }))
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim())    return alert('Title is required')
    if (!form.slug.trim())     return alert('Slug is required')
    if (!form.category)        return alert('Please select a category')
    if (!form.content.trim())  return alert('Content cannot be empty')
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-2xl font-black text-green-900">
          {isEdit ? '✏️ Edit Post' : '📝 New Post'}
        </h2>
        <label className="flex items-center gap-3 cursor-pointer bg-white px-4 py-2 rounded-xl border border-green-200 shadow-sm">
          <span className="text-sm font-bold text-gray-600">
            {form.published ? '✅ Published' : '📋 Draft'}
          </span>
          <div
            onClick={() => setForm(p => ({ ...p, published: !p.published }))}
            className={`w-12 h-6 rounded-full transition-all relative cursor-pointer
              ${form.published ? 'bg-green-500' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-all
              ${form.published ? 'left-6' : 'left-0.5'}`} />
          </div>
        </label>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column — Main Content */}
        <div className="lg:col-span-2 space-y-5">

          {/* Title */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
              Post Title *
            </label>
            <input name="title" value={form.title} onChange={handleChange} required
              placeholder="Enter your article headline..."
              className="w-full text-xl font-display font-bold text-gray-900 border-0 outline-none placeholder-gray-300 resize-none" />
          </div>

          {/* Slug */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
              URL Slug * <span className="text-gray-400 font-normal normal-case">(auto-generated from title)</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">/blog/</span>
              <input name="slug" value={form.slug} onChange={handleChange} required
                placeholder="url-friendly-slug"
                className="flex-1 text-sm text-green-700 font-mono border-0 outline-none bg-green-50 px-3 py-2 rounded-lg" />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
              Excerpt / Summary
            </label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3}
              placeholder="1–2 sentence summary shown on the blog listing page..."
              className="w-full text-sm text-gray-700 border-0 outline-none resize-none placeholder-gray-300 leading-relaxed" />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
              Article Content * <span className="text-gray-400 font-normal normal-case">(HTML supported)</span>
            </label>
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                ['H2', '<h2>Section Title</h2>'],
                ['Para', '<p>Your paragraph here.</p>'],
                ['Quote', '<blockquote>Quote text here.</blockquote>'],
                ['Bold', '<strong>bold text</strong>'],
                ['List', '<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>'],
              ].map(([label, snippet]) => (
                <button key={label} type="button"
                  onClick={() => setForm(p => ({ ...p, content: p.content + '\n' + snippet }))}
                  className="text-xs bg-green-50 hover:bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-lg border border-green-200 transition-all">
                  + {label}
                </button>
              ))}
            </div>
            <textarea name="content" value={form.content} onChange={handleChange} required
              rows={18}
              placeholder="<p>Start writing your article here...</p>&#10;&#10;<h2>Section Heading</h2>&#10;<p>More content...</p>"
              className="w-full text-sm text-gray-700 font-mono border-0 outline-none resize-y bg-gray-50 rounded-lg p-4 leading-relaxed placeholder-gray-300" />
            <p className="text-xs text-gray-400 mt-2">
              Tip: Use &lt;p&gt; for paragraphs, &lt;h2&gt; for headings, &lt;blockquote&gt; for quotes, &lt;ul&gt;&lt;li&gt; for lists
            </p>
          </div>
        </div>

        {/* Right Column — Meta */}
        <div className="space-y-5">

          {/* Featured Image Upload */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-3">
              Featured Image
            </label>

            {imgPreview ? (
              <div className="relative mb-3 rounded-xl overflow-hidden">
                <img src={imgPreview} alt="Preview"
                  className="w-full h-44 object-cover rounded-xl" />
                <button type="button" onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-500 text-white 
                             rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  ✕
                </button>
                {imgLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                    <div className="text-white font-bold text-sm animate-pulse">Uploading...</div>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-green-300 rounded-xl h-40 flex flex-col 
                           items-center justify-center cursor-pointer hover:border-green-500 
                           hover:bg-green-50 transition-all">
                {imgLoading ? (
                  <div className="text-center">
                    <div className="text-3xl animate-spin mb-2">⏳</div>
                    <p className="text-green-600 font-semibold text-sm">Uploading...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-green-700 font-bold text-sm">Click to upload image</p>
                    <p className="text-gray-400 text-xs mt-1">JPG, PNG, WebP — max 5MB</p>
                  </div>
                )}
              </div>
            )}

            <input ref={fileRef} type="file" accept="image/*"
              onChange={handleImagePick} className="hidden" />

            {imgError && (
              <p className="text-red-500 text-xs mt-2 leading-relaxed">{imgError}</p>
            )}

            {form.featured_image && !imgLoading && (
              <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                ✅ Image uploaded successfully
              </p>
            )}
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
              Category *
            </label>
            <select name="category" value={form.category} onChange={handleChange} required
              className="w-full border-2 border-green-100 focus:border-green-500 rounded-lg px-3 py-2.5 text-sm outline-none bg-white">
              <option value="">— Select Category —</option>
              {BLOG_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-2">
              Author
            </label>
            <input name="author" value={form.author} onChange={handleChange}
              placeholder="Author name"
              className="w-full border-2 border-green-100 focus:border-green-500 rounded-lg px-3 py-2.5 text-sm outline-none" />
          </div>

          {/* Publish Status */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-3">
              Publish Status
            </label>
            <div className="space-y-2">
              {[
                { val: false, label: '📋 Save as Draft', desc: 'Not visible to public' },
                { val: true,  label: '✅ Publish Now',   desc: 'Visible on website immediately' },
              ].map(opt => (
                <label key={String(opt.val)}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border-2 transition-all
                    ${form.published === opt.val ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200'}`}>
                  <input type="radio" name="published" checked={form.published === opt.val}
                    onChange={() => setForm(p => ({ ...p, published: opt.val }))}
                    className="mt-0.5 accent-green-600" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button type="submit" disabled={saving || imgLoading}
              className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white 
                         font-black py-4 rounded-xl text-base uppercase tracking-wide transition-all 
                         hover:shadow-lg flex items-center justify-center gap-2">
              {saving ? (
                <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg> Saving...</>
              ) : isEdit ? '💾 Save Changes' : '🚀 Create Post'}
            </button>
            <button type="button" onClick={onCancel}
              className="w-full border-2 border-gray-200 text-gray-500 font-bold py-3 rounded-xl 
                         text-sm hover:bg-gray-50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
