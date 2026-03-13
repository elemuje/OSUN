import { useState } from 'react'

const CATEGORIES = ['All', 'Meetings', 'Community Engagement', 'Leadership', 'Campaign Events']

// Placeholder gallery items — replace with real photos
const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: [
    'RTIFN Osun Executive Meeting',
    'Community Outreach — Ife Central',
    'Ward Sensitization Drive',
    'RTIFN Osun Inaugural Summit',
    'Media Briefing — Q1 2024',
    'Leadership Engagement Session',
    'Town Hall — Iwo LGA',
    'Mobilization Rally — Osogbo',
    'Youth Volunteer Training',
    'Community Forum — Ilesa',
    'RTIFN Osun Press Conference',
    'Grassroots Engagement — Ejigbo',
  ][i],
  category: ['Meetings', 'Community Engagement', 'Community Engagement', 'Meetings',
             'Leadership', 'Leadership', 'Community Engagement', 'Campaign Events',
             'Campaign Events', 'Community Engagement', 'Meetings', 'Community Engagement'][i],
  gradient: [
    'from-green-800 to-green-600',
    'from-green-700 to-emerald-500',
    'from-emerald-800 to-green-600',
    'from-green-900 to-green-700',
    'from-green-600 to-teal-500',
    'from-green-800 to-green-500',
    'from-teal-700 to-green-600',
    'from-green-700 to-green-500',
    'from-emerald-700 to-green-500',
    'from-green-800 to-emerald-600',
    'from-green-900 to-green-600',
    'from-green-700 to-teal-600',
  ][i],
  emoji: ['🏛️','🤝','📢','🎉','📰','👥','🏘️','⚡','🎓','🗣️','📋','🌿'][i],
}))

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === activeCategory)

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
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all
                ${activeCategory === cat
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-md 
                         hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl opacity-40 group-hover:opacity-60 transition-opacity">
                  {item.emoji}
                </span>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all 
                              flex items-end p-3">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 
                                transition-all duration-300 text-left">
                  <span className="text-xs text-white/70 uppercase tracking-wider">{item.category}</span>
                  <p className="text-white font-bold text-sm leading-tight">{item.title}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Placeholder notice */}
        <div className="mt-12 bg-amber-50 rounded-xl p-7 border border-amber-200 flex gap-4 items-start">
          <span className="text-3xl">📸</span>
          <div>
            <h4 className="font-bold text-amber-900 mb-1">Add Real Photos</h4>
            <p className="text-amber-700 text-sm leading-relaxed">
              Replace the placeholder items in <code className="bg-amber-100 px-1.5 py-0.5 rounded">src/pages/GalleryPage.jsx</code> with real RTIFN event photos. 
              You can upload images to a service like Cloudinary, ImgBB, or Google Drive (with public links) 
              and add the URLs to the gallery items array.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className={`h-64 bg-gradient-to-br ${lightbox.gradient} flex items-center justify-center`}>
              <span className="text-8xl opacity-50">{lightbox.emoji}</span>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-green-500 uppercase tracking-wider">
                {lightbox.category}
              </span>
              <h3 className="font-display text-xl font-bold text-gray-900 mt-1 mb-3">
                {lightbox.title}
              </h3>
              <p className="text-sm text-gray-400">
                RTIFN Osun State Chapter — {lightbox.category} Activity
              </p>
              <button
                onClick={() => setLightbox(null)}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 font-semibold"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
