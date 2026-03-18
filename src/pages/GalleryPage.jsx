import { useState, useEffect } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../lib/supabase'

// ── Album definitions ─────────────────────────────────────────
const ALBUMS = [
  { id: 'meetings',   label: 'RTIFN Meetings',        icon: '🏛️', color: 'from-green-800 to-green-600',   driveFolder: '1bZnjzwQ8maG34WfGGw7xx0dsKM4iLAeU' },
  { id: 'community',  label: 'Community Engagement',  icon: '🤝', color: 'from-emerald-700 to-green-500', driveFolder: '1BkyrSfMUATXSLbOCHtXrhM48PJg8Bp3f' },
  { id: 'leadership', label: 'Leadership',             icon: '👥', color: 'from-green-900 to-green-700',   driveFolder: '1VMnjGIE7ye3qk8RnTm6y-RXKzQHMTiwW' },
  { id: 'campaign',   label: 'Campaign Events',        icon: '⚡', color: 'from-teal-700 to-green-600',   driveFolder: '1NJCg30Y49xvWldT9HDKhAKqcrAskamzE' },
]

// Convert any Google Drive share/open link to a display thumbnail
function toThumb(url, size = 400) {
  if (!url) return null
  // Already a thumbnail URL
  if (url.includes('thumbnail?id=')) return url
  // drive.google.com/open?id=XXX
  const openMatch = url.match(/[?&]id=([\w-]{10,})/)
  if (openMatch) return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w${size}`
  // drive.google.com/file/d/XXX
  const fileMatch = url.match(/\/file\/d\/([\w-]{10,})/)
  if (fileMatch) return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w${size}`
  // Raw file ID (25+ chars)
  if (/^[\w-]{25,}$/.test(url.trim())) return `https://drive.google.com/thumbnail?id=${url.trim()}&sz=w${size}`
  return url
}

// Fetch photos from Supabase gallery table
async function fetchGalleryPhotos(category = null) {
  try {
    const params = new URLSearchParams({
      select: 'id,title,image_url,category,created_at',
      order:  'created_at.desc',
    })
    if (category) params.set('category', `eq.${category}`)

    const res = await fetch(`${SUPABASE_URL}/rest/v1/gallery_photos?${params}`, {
      headers: {
        apikey:        SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      }
    })
    if (!res.ok) return []
    return await res.json()
  } catch { return [] }
}

export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState('all')
  const [photos,      setPhotos]      = useState([])
  const [loading,     setLoading]     = useState(true)
  const [lightbox,    setLightbox]    = useState(null)
  const [tableExists, setTableExists] = useState(true)

  useEffect(() => { loadPhotos() }, [activeAlbum])

  async function loadPhotos() {
    setLoading(true)
    const data = await fetchGalleryPhotos(activeAlbum === 'all' ? null : activeAlbum)
    if (data === null || (Array.isArray(data) && data.length === 0 && !tableExists)) {
      setTableExists(false)
    }
    setPhotos(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  // Group by category for "all" view
  const grouped = ALBUMS.map(album => ({
    ...album,
    photos: photos.filter(p => p.category === album.id),
  }))

  const displayList = activeAlbum === 'all'
    ? grouped
    : grouped.filter(a => a.id === activeAlbum)

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Photo Archive</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Media Gallery</h1>
        <p className="text-green-200 mt-3 max-w-xl mx-auto">
          Moments from RTIFN Osun State Chapter's activities, engagements, and community outreach
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <button onClick={() => setActiveAlbum('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all
              ${activeAlbum === 'all' ? 'bg-green-700 text-white shadow-md' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
            All Photos {photos.length > 0 && `(${photos.length})`}
          </button>
          {ALBUMS.map(album => (
            <button key={album.id} onClick={() => setActiveAlbum(album.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all flex items-center gap-2
                ${activeAlbum === album.id ? 'bg-green-700 text-white shadow-md' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
              {album.icon} {album.label}
            </button>
          ))}
        </div>

        {/* Setup notice if table doesn't exist yet */}
        {!tableExists && (
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-10 flex gap-4 items-start">
            <span className="text-3xl">⚙️</span>
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Gallery Table Setup Required</h4>
              <p className="text-amber-700 text-sm leading-relaxed mb-2">
                Run this SQL in your Supabase dashboard to enable the gallery:
              </p>
              <pre className="bg-amber-100 text-amber-800 text-xs p-3 rounded-lg overflow-x-auto">{`CREATE TABLE gallery_photos (
  id          BIGSERIAL PRIMARY KEY,
  title       TEXT,
  image_url   TEXT NOT NULL,
  category    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON gallery_photos FOR SELECT TO anon USING (true);
CREATE POLICY "Anon manage gallery" ON gallery_photos FOR ALL TO anon USING (true) WITH CHECK (true);`}</pre>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 animate-pulse">📸</div>
            <p className="text-green-700 font-semibold">Loading gallery...</p>
          </div>
        ) : (
          displayList.map(album => (
            <div key={album.id} className="mb-14">
              {/* Album header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${album.color} flex items-center justify-center text-xl`}>
                    {album.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-green-900">{album.label}</h2>
                    <p className="text-xs text-gray-400">
                      {album.photos.length > 0 ? `${album.photos.length} photo${album.photos.length !== 1 ? 's' : ''}` : 'No photos yet'}
                    </p>
                  </div>
                </div>
                <a href={`https://drive.google.com/drive/folders/${album.driveFolder}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-green-600 hover:text-green-800 font-semibold flex items-center gap-1 
                             border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-all">
                  📁 Open Drive Folder
                </a>
              </div>

              {album.photos.length === 0 ? (
                <div className="bg-green-50 rounded-xl border-2 border-dashed border-green-200 py-14 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${album.color} mx-auto mb-4 flex items-center justify-center text-3xl`}>
                    {album.icon}
                  </div>
                  <p className="text-green-700 font-semibold mb-1">No photos yet</p>
                  <p className="text-gray-400 text-sm">Add photos via the Admin Panel → Gallery</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {album.photos.map((photo, idx) => {
                    const thumb = toThumb(photo.image_url, 400)
                    return (
                      <button key={photo.id}
                        onClick={() => setLightbox({ photo, album, idx, total: album.photos.length })}
                        className="group relative aspect-square rounded-xl overflow-hidden shadow-md 
                                   hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
                                   bg-green-100 focus:outline-none">
                        <img src={thumb} alt={photo.title || album.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={e => { e.target.parentElement.style.display = 'none' }} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all 
                                        flex items-center justify-center">
                          <span className="text-white text-2xl opacity-0 group-hover:opacity-100 
                                          scale-75 group-hover:scale-100 transition-all duration-200">🔍</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))
        )}

      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={toThumb(lightbox.photo.image_url, 1200)} alt={lightbox.photo.title || ''}
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
            <button onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-10 h-10 bg-black/60 hover:bg-black/80 text-white 
                         rounded-full flex items-center justify-center text-xl font-bold">✕</button>
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold">
              {lightbox.album.icon} {lightbox.album.label} · {lightbox.idx + 1} / {lightbox.total}
              {lightbox.photo.title && ` · ${lightbox.photo.title}`}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
