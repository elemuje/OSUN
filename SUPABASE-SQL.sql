-- ============================================================
-- RTIFN OSUN — SUPABASE SQL SETUP
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- 1. Add updated_at column if it doesn't exist
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Drop old policies if they exist (clean slate)
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Authenticated users can manage posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow all reads on published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow anon full access" ON blog_posts;

-- 3. Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Allow EVERYONE (including anon) to READ published posts
CREATE POLICY "Public read published"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- 5. Allow EVERYONE (anon) to do ALL operations
--    (needed for admin panel without auth system)
CREATE POLICY "Anon full access"
  ON blog_posts FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- 6. Storage bucket policies (run after creating blog-images bucket)
--    Go to Storage → New Bucket → name: blog-images → tick Public → Save
--    Then run the lines below:

DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anon can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anon can delete blog images" ON storage.objects;

CREATE POLICY "Public view blog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Anon upload blog images"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Anon update blog images"
  ON storage.objects FOR UPDATE
  TO anon
  USING (bucket_id = 'blog-images');

CREATE POLICY "Anon delete blog images"
  ON storage.objects FOR DELETE
  TO anon
  USING (bucket_id = 'blog-images');

-- ============================================================
-- DONE. Your admin panel can now:
-- ✅ Read all posts (published + drafts)
-- ✅ Create new posts
-- ✅ Update existing posts
-- ✅ Delete posts
-- ✅ Upload images to blog-images bucket
-- ✅ Toggle published/draft
-- ============================================================

-- ============================================================
-- GALLERY PHOTOS TABLE
-- Run this to enable the photo gallery feature
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_photos (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT,
  image_url   TEXT NOT NULL,
  category    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read gallery"  ON gallery_photos;
DROP POLICY IF EXISTS "Anon manage gallery"  ON gallery_photos;

CREATE POLICY "Public read gallery"
  ON gallery_photos FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anon manage gallery"
  ON gallery_photos FOR ALL TO anon USING (true) WITH CHECK (true);
