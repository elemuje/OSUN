import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchPosts } from '../lib/notion'
import { ACHIEVEMENTS, SITE } from '../lib/data'
import PostCard from '../components/PostCard'
import Logo from '../components/Logo'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts({ limit: 6 }).then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-800 to-green-700 
                          overflow-hidden py-20 md:py-28 px-6">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[600px] h-[600px] bg-green-500 opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center 
                            ring-4 ring-yellow-500 shadow-2xl animate-[fadeUp_0.5s_ease_forwards]">
              <Logo size={80} />
            </div>
          </div>

          <div className="inline-block bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 
                          text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest mb-5
                          animate-[fadeUp_0.6s_ease_forwards]">
            Official RTIFN Osun State Platform
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white mb-5 
                         leading-tight animate-[fadeUp_0.7s_ease_forwards]">
            Relax, <span className="text-yellow-400">Tinubu</span> Is<br className="hidden md:block" />
            Fixing Nigeria
          </h1>

          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed
                        animate-[fadeUp_0.8s_ease_forwards]">
            Join thousands of Osun State citizens supporting President Bola Ahmed Tinubu's bold 
            reform agenda. We communicate the truth about Nigeria's transformation — ward by ward, 
            community by community.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-[fadeUp_0.9s_ease_forwards]">
            <Link to="/join" className="btn-primary text-base px-8 py-4">
              ✊ Join the Movement
            </Link>
            <Link to="/blog" className="btn-outline text-base px-8 py-4">
              📰 Latest Updates
            </Link>
            <Link to="/executives" className="btn-outline text-base px-8 py-4">
              👥 Our Leadership
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 mt-10 animate-[fadeUp_1s_ease_forwards]">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center 
                          justify-center text-white transition-all hover:-translate-y-0.5 text-sm">
              f
            </a>
            <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center 
                          justify-center text-white transition-all hover:-translate-y-0.5 text-sm font-bold">
              𝕏
            </a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center 
                          justify-center text-white transition-all hover:-translate-y-0.5 text-sm">
              ig
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-lg bg-green-500/50 hover:bg-green-500/70 flex items-center 
                          justify-center text-white transition-all hover:-translate-y-0.5 text-lg">
              📲
            </a>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-white border-b-4 border-green-600 shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-green-100">
            {[
              { n: '30', label: 'LGA Chapters' },
              { n: '5,000+', label: 'Members in Osun' },
              { n: '50+', label: 'Reforms Tracked' },
              { n: '2023', label: 'Year Founded' },
            ].map(s => (
              <div key={s.label} className="text-center px-4 py-2">
                <div className="font-display text-3xl font-black text-green-800">{s.n}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="py-20 bg-green-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Reform Tracker</span>
            <h2 className="section-title">Tinubu Reform Updates</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tracking the bold economic and governance reforms reshaping Nigeria under President Tinubu's leadership.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-yellow-500 mx-auto mt-4 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((a, i) => (
              <Link to={`/achievements#${a.slug}`} key={a.id}
                className={`card group p-6 style-[animation-delay:${i * 100}ms]`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center 
                                 justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {a.icon}
                </div>
                <span className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1 block">
                  {a.category}
                </span>
                <h3 className="font-display text-lg text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.summary}</p>
                <div className="mt-4 text-green-600 text-sm font-bold flex items-center gap-2 
                                group-hover:gap-3 transition-all">
                  Learn More <span>→</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/achievements" className="btn-green">
              View All Achievements →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LATEST POSTS ===== */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="section-label">Latest</span>
              <h2 className="section-title mb-0">News &amp; Updates</h2>
            </div>
            <Link to="/blog" className="text-green-600 font-bold text-sm uppercase tracking-wide 
                                         hover:text-green-800 hidden md:flex items-center gap-2">
              View All Posts →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="bg-green-50 rounded-lg h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/blog" className="btn-green">All News & Updates →</Link>
          </div>
        </div>
      </section>

      {/* ===== ACTIVITIES ===== */}
      <section className="py-20 bg-green-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">On The Ground</span>
            <h2 className="section-title">RTIFN Activities in Osun State</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🤝', title: 'Grassroots Mobilization', desc: 'Ward-by-ward sensitization explaining Tinubu\'s reforms in simple terms to everyday citizens.' },
              { icon: '📢', title: 'Media Campaigns', desc: 'Digital and traditional media outreach countering misinformation with verified facts.' },
              { icon: '🏛️', title: 'Town Hall Meetings', desc: 'Regular community dialogues across all 30 LGAs bridging policy and the people.' },
              { icon: '🌱', title: 'Youth Empowerment', desc: 'Training young volunteers to become effective advocates for good governance.' },
            ].map(a => (
              <div key={a.title} className="card p-6 text-center hover:border-green-400">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="font-display text-base font-bold text-green-900 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOIN CTA ===== */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-900 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🇳🇬</div>
          <h2 className="font-display text-4xl md:text-5xl text-white font-black mb-5">
            Join the Movement
          </h2>
          <p className="text-green-100 text-lg mb-8 leading-relaxed">
            Be part of the thousands of Osun State citizens standing with President Tinubu's vision 
            for a better, stronger, and more prosperous Nigeria. Your voice and your commitment matter.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/join" className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-black 
                                         px-10 py-4 rounded-sm text-lg uppercase tracking-wide 
                                         transition-all hover:-translate-y-1 hover:shadow-xl">
              Register as a Member
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-sm 
                          text-base uppercase tracking-wide transition-all hover:-translate-y-1">
              📲 Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
