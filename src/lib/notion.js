// ============================================================
// NOTION API INTEGRATION
// RTIFN Osun State Chapter Blog System
// ============================================================
// 
// SETUP INSTRUCTIONS:
// 1. Create a Notion Integration at https://www.notion.so/my-integrations
// 2. Copy your "Internal Integration Token"
// 3. Create a Notion database with these properties:
//    - Title (title)
//    - Content (rich_text) 
//    - Date (date)
//    - Author (rich_text)
//    - Category (select) — options: Tinubu Achievements, Economic Reforms, 
//      RTIFN Activities, Policy Explainers, Press Releases, Grassroots Mobilization
//    - FeaturedImage (url)
//    - Excerpt (rich_text)
//    - Slug (rich_text) — URL-friendly post identifier
//    - Published (checkbox) — only checked posts will appear
// 4. Share your database with your integration (click Share → Invite)
// 5. Copy your Database ID from the URL:
//    notion.so/YOUR_WORKSPACE/[DATABASE_ID]?v=...
// 6. Create a .env file in the project root:
//    VITE_NOTION_TOKEN=secret_xxxxxxxxxxxx
//    VITE_NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// ============================================================

const NOTION_TOKEN = import.meta.env.VITE_NOTION_TOKEN
const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID
const NOTION_VERSION = '2022-06-28'

const notionHeaders = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
}

// Helper: extract plain text from Notion rich_text array
const getRichText = (prop) => {
  if (!prop || !prop.rich_text) return ''
  return prop.rich_text.map(r => r.plain_text).join('')
}

// Helper: extract title
const getTitle = (prop) => {
  if (!prop || !prop.title) return 'Untitled'
  return prop.title.map(r => r.plain_text).join('')
}

// Helper: format date
const getDate = (prop) => {
  if (!prop || !prop.date || !prop.date.start) return null
  return prop.date.start
}

// Helper: get select value
const getSelect = (prop) => {
  if (!prop || !prop.select) return ''
  return prop.select.name || ''
}

// Helper: get URL
const getUrl = (prop) => {
  if (!prop || !prop.url) return null
  return prop.url
}

// Helper: get checkbox
const getCheckbox = (prop) => {
  if (!prop) return false
  return prop.checkbox || false
}

// Transform raw Notion page to clean post object
const transformPost = (page) => {
  const props = page.properties
  return {
    id: page.id,
    slug: getRichText(props.Slug) || page.id,
    title: getTitle(props.Title),
    excerpt: getRichText(props.Excerpt),
    author: getRichText(props.Author) || 'RTIFN Media Team',
    date: getDate(props.Date),
    category: getSelect(props.Category),
    featuredImage: getUrl(props.FeaturedImage),
    published: getCheckbox(props.Published),
    content: getRichText(props.Content),
    cover: page.cover?.external?.url || page.cover?.file?.url || null,
  }
}

// Fetch all published posts
export async function fetchPosts(filter = {}) {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    console.warn('⚠️  Notion credentials not configured. Using mock data.')
    return getMockPosts(filter)
  }

  try {
    const filterConditions = [
      { property: 'Published', checkbox: { equals: true } }
    ]

    if (filter.category) {
      filterConditions.push({
        property: 'Category',
        select: { equals: filter.category }
      })
    }

    const body = {
      filter: filterConditions.length === 1 
        ? filterConditions[0] 
        : { and: filterConditions },
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: filter.limit || 50,
    }

    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: notionHeaders,
      body: JSON.stringify(body),
    })

    if (!res.ok) throw new Error(`Notion API error: ${res.status}`)
    const data = await res.json()
    return data.results.map(transformPost)
  } catch (err) {
    console.error('Notion fetch error:', err)
    return getMockPosts(filter)
  }
}

// Fetch single post by slug or ID
export async function fetchPostBySlug(slug) {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    return getMockPosts().find(p => p.slug === slug || p.id === slug) || null
  }

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: notionHeaders,
      body: JSON.stringify({
        filter: {
          and: [
            { property: 'Published', checkbox: { equals: true } },
            { property: 'Slug', rich_text: { equals: slug } },
          ]
        }
      })
    })

    if (!res.ok) throw new Error(`Notion API error: ${res.status}`)
    const data = await res.json()
    if (!data.results.length) return null

    const post = transformPost(data.results[0])

    // Fetch full page blocks for content
    const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${data.results[0].id}/children?page_size=100`, {
      headers: notionHeaders
    })

    if (blocksRes.ok) {
      const blocksData = await blocksRes.json()
      post.blocks = blocksData.results
      post.htmlContent = renderBlocksToHtml(blocksData.results)
    }

    return post
  } catch (err) {
    console.error('Notion fetch post error:', err)
    return getMockPosts().find(p => p.slug === slug) || null
  }
}

// Convert Notion blocks to HTML string
function renderBlocksToHtml(blocks) {
  return blocks.map(block => {
    const text = block[block.type]?.rich_text?.map(r => {
      let t = r.plain_text
      if (r.annotations?.bold) t = `<strong>${t}</strong>`
      if (r.annotations?.italic) t = `<em>${t}</em>`
      if (r.annotations?.code) t = `<code>${t}</code>`
      return t
    }).join('') || ''

    switch (block.type) {
      case 'paragraph': return `<p>${text}</p>`
      case 'heading_1': return `<h1>${text}</h1>`
      case 'heading_2': return `<h2>${text}</h2>`
      case 'heading_3': return `<h3>${text}</h3>`
      case 'bulleted_list_item': return `<ul><li>${text}</li></ul>`
      case 'numbered_list_item': return `<ol><li>${text}</li></ol>`
      case 'quote': return `<blockquote>${text}</blockquote>`
      case 'divider': return `<hr />`
      case 'image': {
        const url = block.image?.external?.url || block.image?.file?.url
        return url ? `<img src="${url}" alt="Article image" class="rounded-lg my-6 w-full" />` : ''
      }
      default: return text ? `<p>${text}</p>` : ''
    }
  }).join('\n')
}

// ============================================================
// MOCK DATA — used when Notion is not configured
// ============================================================
export function getMockPosts(filter = {}) {
  const posts = [
    {
      id: '1',
      slug: 'fuel-subsidy-reform-impact-osun',
      title: 'How the Fuel Subsidy Reform is Unlocking Nigeria\'s Economic Potential',
      excerpt: 'President Tinubu\'s bold decision to remove fuel subsidies has freed over ₦11 trillion annually, now being redirected to critical infrastructure and social investment across Nigeria.',
      author: 'RTIFN Media Team',
      date: '2024-03-10',
      category: 'Economic Reforms',
      featuredImage: null,
      published: true,
      htmlContent: '<p>The removal of the fuel subsidy in May 2023 was one of the most consequential economic decisions in Nigeria\'s recent history...</p><h2>What the Subsidy Was Costing Nigeria</h2><p>For decades, fuel subsidies consumed an ever-growing share of Nigeria\'s federal budget, leaving little room for investment in education, healthcare, and infrastructure...</p><blockquote>Nigeria cannot subsidize consumption while neglecting investment in the future.</blockquote><p>The freed funds are now being channeled into targeted welfare programs, infrastructure rehabilitation, and support for state governments through increased FAAC allocations.</p>',
    },
    {
      id: '2',
      slug: 'rtifn-osun-ward-by-ward-mobilization',
      title: 'RTIFN Osun Launches Ward-by-Ward Sensitization Campaign Across All 30 LGAs',
      excerpt: 'The Osun State chapter of RTIFN has begun an intensive grassroots mobilization drive to communicate President Tinubu\'s reform agenda to citizens at the ward level.',
      author: 'Comrade Adebayo Taiwo',
      date: '2024-03-08',
      category: 'RTIFN Activities',
      featuredImage: null,
      published: true,
      htmlContent: '<p>RTIFN Osun State Chapter has commenced its most ambitious grassroots engagement drive to date...</p>',
    },
    {
      id: '3',
      slug: 'faac-allocation-increase-states',
      title: 'Record FAAC Allocations Under Tinubu: What It Means for Osun State',
      excerpt: 'Monthly federation account distributions to states have surged significantly under President Tinubu, giving Osun State and others more resources for local development.',
      author: 'RTIFN Policy Desk',
      date: '2024-03-05',
      category: 'Tinubu Achievements',
      featuredImage: null,
      published: true,
      htmlContent: '<p>One of the less-discussed but highly impactful outcomes of President Tinubu\'s economic reforms is the dramatic increase in FAAC allocations to states and local governments...</p>',
    },
    {
      id: '4',
      slug: 'new-minimum-wage-workers-welfare',
      title: 'New Minimum Wage: Tinubu\'s Commitment to Nigerian Workers',
      excerpt: 'The approved new minimum wage signals the Tinubu administration\'s commitment to improving the welfare of workers across all sectors of the Nigerian economy.',
      author: 'RTIFN Media Team',
      date: '2024-02-28',
      category: 'Policy Explainers',
      featuredImage: null,
      published: true,
      htmlContent: '<p>The Tinubu administration has made improving workers\' welfare a central pillar of its economic reform agenda...</p>',
    },
    {
      id: '5',
      slug: 'osun-rtifn-press-release-march-2024',
      title: 'Press Release: RTIFN Osun Commends Federal Government on Infrastructure Investment',
      excerpt: 'RTIFN Osun State Chapter issues official statement commending the Federal Government\'s renewed commitment to road infrastructure and power sector investment.',
      author: 'Office of the State Coordinator',
      date: '2024-02-20',
      category: 'Press Releases',
      featuredImage: null,
      published: true,
      htmlContent: '<p>The Osun State Chapter of RTIFN (Relax, Tinubu Is Fixing Nigeria) wishes to commend the Federal Government of Nigeria under the leadership of President Bola Ahmed Tinubu for the renewed and vigorous investment in infrastructure across the nation...</p>',
    },
    {
      id: '6',
      slug: 'cashless-policy-transparency-governance',
      title: 'How Cashless Government Operations Are Fighting Corruption',
      excerpt: 'The digitization of government payments under Tinubu\'s administration has significantly reduced leakages, ghost workers, and opacity in public financial management.',
      author: 'RTIFN Policy Desk',
      date: '2024-02-15',
      category: 'Economic Reforms',
      featuredImage: null,
      published: true,
      htmlContent: '<p>One of the hallmarks of the Tinubu administration\'s approach to governance has been the aggressive digitization of government transactions and payment systems...</p>',
    },
  ]

  if (filter.category) {
    return posts.filter(p => p.category === filter.category)
  }
  if (filter.limit) {
    return posts.slice(0, filter.limit)
  }
  return posts
}
