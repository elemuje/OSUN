import { EXECUTIVES } from '../lib/data'

export default function ExecutivesPage() {
  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Leadership</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Meet Our Executives</h1>
        <p className="text-green-200 mt-3 max-w-xl mx-auto">
          The dedicated leaders driving RTIFN Osun State Chapter's mission across all 30 local government areas.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="section-label">Executive Council</span>
          <h2 className="section-title">State Chapter Leadership</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-yellow-500 mx-auto mt-4 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXECUTIVES.map((exec, i) => (
            <div
              key={exec.id}
              className="card group text-center overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Photo */}
              <div className="relative h-52 bg-gradient-to-br from-green-800 to-green-600 
                              flex items-center justify-center overflow-hidden">
                {exec.photo ? (
                  <img src={exec.photo} alt={exec.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center 
                                  justify-center font-display text-4xl font-black text-white 
                                  ring-4 ring-white/30 shadow-xl">
                    {exec.initials}
                  </div>
                )}
                {/* Green overlay on hover */}
                <div className="absolute inset-0 bg-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Body */}
              <div className="p-6">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold 
                                 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  {exec.position}
                </span>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  {exec.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {exec.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-14 bg-green-50 rounded-xl p-8 border border-green-100 text-center">
          <p className="text-green-700 font-semibold mb-1">
            ℹ️ Update Executive Profiles
          </p>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            To add real names, photos, and updated biographies, edit the <code className="bg-green-100 px-1.5 py-0.5 rounded text-green-800">src/lib/data.js</code> file 
            and update the <code className="bg-green-100 px-1.5 py-0.5 rounded text-green-800">EXECUTIVES</code> array with actual leadership details.
          </p>
        </div>
      </div>
    </div>
  )
}
