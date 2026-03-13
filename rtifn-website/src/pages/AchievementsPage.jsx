import { ACHIEVEMENTS } from '../lib/data'

export default function AchievementsPage() {
  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Reform Tracker</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Tinubu Achievements</h1>
        <p className="text-green-200 mt-3 max-w-2xl mx-auto">
          Tracking the Reforms of President Bola Ahmed Tinubu — explained simply, backed by facts.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Intro */}
        <div className="bg-green-50 rounded-xl p-8 mb-14 border border-green-100">
          <h2 className="font-display text-2xl text-green-900 font-bold mb-3">
            Why This Tracker Matters
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            In a media landscape filled with noise, misinformation, and political scoring, RTIFN Osun 
            is committed to presenting factual, clear explanations of the Tinubu administration's reform 
            agenda. This tracker documents each major policy with its rationale, implementation status, 
            and expected impact on ordinary Nigerians.
          </p>
        </div>

        {/* Achievements List */}
        <div className="space-y-8">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={a.id}
              id={a.slug}
              className="bg-white rounded-xl shadow-md border border-green-100 overflow-hidden 
                         hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${a.color} p-6 flex items-center gap-5`}>
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center 
                                text-3xl flex-shrink-0">
                  {a.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                    {a.category}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-white">{a.title}</h2>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-1 bg-white/20 rounded-full 
                                px-3 py-1 text-white text-xs font-bold">
                  #{i + 1}
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-700 leading-relaxed mb-5 text-base">
                  {a.detail}
                </p>
                <div className="flex items-center gap-2 pt-4 border-t border-green-50">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-600 text-sm font-semibold">Reform in Progress — Ongoing</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-10 text-center text-white">
          <div className="text-4xl mb-4">📢</div>
          <h3 className="font-display text-2xl font-bold mb-3">
            Spread the Word
          </h3>
          <p className="text-green-200 mb-6 max-w-lg mx-auto text-sm leading-relaxed">
            Share these facts with your family, friends, and community. 
            The truth about Nigeria's transformation must reach every ward, every market, every household.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/?text=Check%20out%20RTIFN%20Osun%20State%20Chapter%20website"
               target="_blank" rel="noopener noreferrer"
               className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-sm 
                          text-sm uppercase tracking-wide transition-all">
              📲 Share on WhatsApp
            </a>
            <a href="https://twitter.com/intent/tweet?text=Relax%2C%20Tinubu%20Is%20Fixing%20Nigeria%20-%20See%20the%20facts"
               target="_blank" rel="noopener noreferrer"
               className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-sm 
                          text-sm uppercase tracking-wide transition-all">
              𝕏 Share on Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
