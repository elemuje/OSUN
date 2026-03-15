// ============================================================
// SUPABASE INTEGRATION — RTIFN Osun State Chapter
// Project: https://sffarqdvxngtnhuttchm.supabase.co
// ============================================================

export const SUPABASE_URL      = 'https://sffarqdvxngtnhuttchm.supabase.co'
export const STORAGE_BUCKET    = 'blog-images'

// ── Get the correct anon key ──────────────────────────────────
// The sb_publishable_ key is a Supabase dashboard key, NOT the REST API key.
// The real anon key must come from:
// Supabase Dashboard → Settings → API → Project API keys → anon / public
// It is a long JWT string starting with "eyJ..."
// Paste it below between the quotes:
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const getHeaders = () => ({
  'Content-Type':  'application/json',
  'apikey':        SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
})

// ── base fetch ────────────────────────────────────────────────
async function sb(path, options = {}) {
  if (!SUPABASE_ANON_KEY || !SUPABASE_ANON_KEY.startsWith('eyJ')) {
    throw new Error(
      'Invalid Supabase API key. Go to Supabase → Settings → API → copy the "anon public" key (starts with eyJ...) and add it to your .env file as VITE_SUPABASE_ANON_KEY'
    )
  }

  const { headers: extraHeaders, ...restOptions } = options

  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: { ...getHeaders(), ...(extraHeaders || {}) },
    ...restOptions,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || err?.hint || `Supabase error ${res.status}`)
  }

  if (res.status === 204) return null
  return res.json()
}

// ── normalise a row ───────────────────────────────────────────
function normalise(row) {
  return {
    id:            String(row.id),
    slug:          row.slug,
    title:         row.title,
    excerpt:       row.excerpt     || '',
    content:       row.content     || '',
    htmlContent:   row.content     || '',
    author:        row.author      || 'RTIFN Media Team',
    date:          row.created_at,
    category:      row.category    || '',
    featuredImage: row.featured_image || null,
    published:     row.published,
  }
}

// ── PUBLIC: fetch published posts ─────────────────────────────
export async function fetchPosts(filter = {}) {
  try {
    const params = new URLSearchParams({
      select:    'id,title,slug,excerpt,author,category,featured_image,created_at,published',
      published: 'eq.true',
      order:     'created_at.desc',
    })
    if (filter.category) params.set('category', `eq.${filter.category}`)
    if (filter.limit)    params.set('limit', String(filter.limit))
    const data = await sb(`/blog_posts?${params}`)
    return (data || []).map(normalise)
  } catch (err) {
    console.error('fetchPosts error:', err)
    return getMockPosts(filter)
  }
}

// ── PUBLIC: fetch single post by slug ─────────────────────────
export async function fetchPostBySlug(slug) {
  try {
    const params = new URLSearchParams({
      select:    '*',
      slug:      `eq.${slug}`,
      published: 'eq.true',
      limit:     '1',
    })
    const data = await sb(`/blog_posts?${params}`)
    if (!data || !data.length) return null
    return normalise(data[0])
  } catch (err) {
    console.error('fetchPostBySlug error:', err)
    return getMockPosts().find(p => p.slug === slug) || null
  }
}

// ── ADMIN: fetch ALL posts (published + drafts) ───────────────
export async function adminFetchAllPosts() {
  const params = new URLSearchParams({
    select: 'id,title,slug,excerpt,author,category,featured_image,created_at,published',
    order:  'created_at.desc',
  })
  const data = await sb(`/blog_posts?${params}`)
  return (data || []).map(normalise)
}

// ── ADMIN: create post ────────────────────────────────────────
export async function adminCreatePost(post) {
  const data = await sb('/blog_posts', {
    method:  'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      title:          post.title,
      slug:           post.slug,
      excerpt:        post.excerpt        || '',
      content:        post.content        || '',
      author:         post.author         || 'RTIFN Media Team',
      category:       post.category       || '',
      featured_image: post.featured_image || null,
      published:      post.published      || false,
    }),
  })
  return data ? normalise(data[0]) : null
}

// ── ADMIN: update post ────────────────────────────────────────
export async function adminUpdatePost(id, updates) {
  const data = await sb(`/blog_posts?id=eq.${id}`, {
    method:  'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ ...updates, updated_at: new Date().toISOString() }),
  })
  return data ? normalise(data[0]) : null
}

// ── ADMIN: delete post ────────────────────────────────────────
export async function adminDeletePost(id) {
  await sb(`/blog_posts?id=eq.${id}`, { method: 'DELETE' })
  return true
}

// ── ADMIN: toggle published ───────────────────────────────────
export async function adminTogglePublished(id, currentValue) {
  return adminUpdatePost(id, { published: !currentValue })
}

// ── ADMIN: upload image to Supabase Storage ───────────────────
export async function adminUploadImage(file) {
  if (!SUPABASE_ANON_KEY || !SUPABASE_ANON_KEY.startsWith('eyJ')) {
    throw new Error('Invalid API key. See instructions in supabase.js')
  }

  const ext      = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path     = `posts/${filename}`

  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${path}`,
    {
      method:  'POST',
      headers: {
        apikey:          SUPABASE_ANON_KEY,
        Authorization:  `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': file.type,
        'x-upsert':     'true',
      },
      body: file,
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || 'Image upload failed')
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`
}

// ── generate URL-safe slug from title ─────────────────────────
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

// ── MOCK DATA (fallback when API key not yet set) ─────────────
export function getMockPosts(filter = {}) {
  const posts = [
    {
      id: '1', slug: 'fuel-subsidy-reform-impact',
      title: "How the Fuel Subsidy Reform is Unlocking Nigeria's Economic Potential",
      excerpt: "President Tinubu's bold decision to remove fuel subsidies has freed over ₦11 trillion annually.",
      author: 'RTIFN Media Team', date: '2026-01-10',
      category: 'Economic Reforms', featuredImage: null, published: true,
      htmlContent: '<p>The removal of the fuel subsidy was one of the most consequential economic decisions in recent history...</p>',
    },
    {
      id: '2', slug: 'rtifn-osun-ward-sensitization',
      title: 'RTIFN Osun Launches Ward-by-Ward Sensitization Campaign',
      excerpt: 'RTIFN has begun an intensive grassroots mobilization drive across all 30 LGAs.',
      author: 'RTIFN Media Team', date: '2026-01-15',
      category: 'RTIFN Activities', featuredImage: null, published: true,
      htmlContent: '<p>RTIFN Osun State Chapter has commenced its most ambitious grassroots engagement drive to date...</p>',
    },
    {
      id: '3', slug: 'faac-allocation-increase',
      title: 'Record FAAC Allocations Under Tinubu',
      excerpt: 'Monthly federation account distributions to states have surged significantly.',
      author: 'RTIFN Policy Desk', date: '2026-01-20',
      category: 'Tinubu Achievements', featuredImage: null, published: true,
      htmlContent: '<p>One of the most impactful outcomes of President Tinubu\'s reforms is the dramatic increase in FAAC allocations...</p>',
    },
  ]
  let result = [...posts]
  if (filter.category) result = result.filter(p => p.category === filter.category)
  if (filter.limit)    result = result.slice(0, filter.limit)
  return result
}
