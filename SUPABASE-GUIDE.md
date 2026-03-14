# RTIFN Osun — Supabase Blog Setup Guide
## Complete Step-by-Step Instructions

---

## PART 1: CREATE YOUR SUPABASE PROJECT

### Step 1 — Sign Up
1. Go to https://supabase.com
2. Click **Start your project** → sign up with Google or email
3. Click **New Project**
4. Fill in:
   - **Name**: `rtifn-osun`
   - **Database Password**: choose a strong password — SAVE THIS
   - **Region**: choose closest to Nigeria → `West EU (Ireland)` or `East US`
5. Click **Create new project** — wait ~2 minutes for setup

---

## PART 2: CREATE THE DATABASE TABLE

### Step 2 — Open SQL Editor
1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Paste this SQL and click **Run**:

```sql
-- Create the blog_posts table
CREATE TABLE blog_posts (
  id           BIGSERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT,
  author       TEXT DEFAULT 'RTIFN Media Team',
  category     TEXT,
  featured_image TEXT,
  published    BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast slug lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Create index for filtering by published status
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Create index for filtering by category
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ published posts (public blog)
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Allow authenticated users (you) to do everything
CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

4. You should see **"Success. No rows returned"** — table is created ✅

---

## PART 3: UPLOAD THE SAMPLE BLOG POSTS (CSV)

### Step 3 — Import the CSV
1. In Supabase dashboard, click **Table Editor** in left sidebar
2. Click on the **blog_posts** table
3. Click **Insert** → **Import data from CSV**
4. Upload the file: `rtifn-blog-posts.csv`
5. Make sure columns match correctly → click **Import**
6. You should see 8 sample posts loaded ✅

---

## PART 4: GET YOUR API CREDENTIALS

### Step 4 — Copy Your Keys
1. In Supabase dashboard, click **Settings** (gear icon) in left sidebar
2. Click **API**
3. Copy these two values:

```
Project URL:  https://xxxxxxxxxxxx.supabase.co
anon/public:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Send these to Claude OR paste them into your `.env` file:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## PART 5: HOW TO POST NEW ARTICLES (Daily Use)

### Option A — Using Supabase Table Editor (Easiest)
1. Go to supabase.com → your project → **Table Editor** → **blog_posts**
2. Click **Insert row**
3. Fill in:
   - `title` — your article headline
   - `slug` — URL version e.g. `my-article-title` (no spaces, use hyphens)
   - `excerpt` — 1-2 sentence summary
   - `content` — your full article in HTML (see template below)
   - `author` — your name
   - `category` — pick one: Tinubu Achievements / Economic Reforms / RTIFN Activities / Policy Explainers / Press Releases / Grassroots Mobilization
   - `featured_image` — paste a direct image URL (optional)
   - `published` — set to `true` to make it live, `false` to save as draft
4. Click **Save** — article appears on the website instantly ✅

### Option B — Using Supabase Dashboard SQL
```sql
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, published)
VALUES (
  'Your Article Title Here',
  'your-article-slug',
  'Brief summary of the article.',
  '<p>Your article content in HTML format.</p>',
  'RTIFN Media Team',
  'RTIFN Activities',
  true
);
```

---

## CONTENT HTML TEMPLATE

Copy this template when writing articles in Supabase:

```html
<p>Opening paragraph introducing the topic. Keep it engaging and factual.</p>

<h2>Section Heading</h2>
<p>Body paragraph with details about this section.</p>

<h2>Another Section</h2>
<p>More content here. You can write as many paragraphs as needed.</p>

<blockquote>An important quote or highlight goes here.</blockquote>

<p>Closing paragraph summarizing the key message.</p>
```

---

## BLOG CATEGORIES (use exactly as written below)

| Category | Use For |
|----------|---------|
| Tinubu Achievements | Government reforms and policy wins |
| Economic Reforms | Economy, subsidy, forex, FAAC news |
| RTIFN Activities | Chapter meetings, outreach, events |
| Policy Explainers | Breaking down policies in simple terms |
| Press Releases | Official RTIFN Osun statements |
| Grassroots Mobilization | Ward campaigns, community engagement |

---

## PART 6: ADD IMAGE TO A POST

### Using a Free Image Host
1. Go to https://imgbb.com (free, no signup needed)
2. Upload your photo → copy the **Direct Link** (ends in .jpg or .png)
3. Paste that link into the `featured_image` column in Supabase

### Example:
```
https://i.ibb.co/abc123/my-photo.jpg
```

---

## PART 7: MANAGE DRAFTS vs PUBLISHED

- Set `published = false` → article is saved but NOT visible on website (draft)
- Set `published = true` → article is LIVE on website immediately
- To unpublish: set `published = false` again at any time

---

## QUESTIONS?

Send your Supabase **Project URL** and **anon key** to Claude and the full
Supabase integration will be built into the website code automatically.
