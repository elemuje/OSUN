const EXECUTIVES = [
  {
    id: 1,
    name: 'Engr. Kunle Oyediran',
    position: 'State Coordinator',
    photo: 'https://drive.google.com/thumbnail?id=19iMLodS2SB7uJUGJDQQAewsLFMJD6q3A&sz=w400',
    initials: 'KO',
    rank: 1,
  },
  {
    id: 2,
    name: 'Alhaji Abdsalam Damola Mojeed',
    position: 'State Secretary',
    photo: 'https://drive.google.com/thumbnail?id=1tLMm6xfAhJH1adm7jf8GTlvC3lRFMPP8&sz=w400',
    initials: 'AD',
    rank: 2,
  },
  {
    id: 4,
    name: 'Faleye Kazeem Oladele',
    position: 'Director of Strategy',
    photo: 'https://drive.google.com/thumbnail?id=1xrlPphHnJOZ9CsYjvBZcNNIGFMWz9rHS&sz=w400',
    initials: 'FK',
    rank: 3,
  },
  {
    id: 5,
    name: 'Adebimpe Mujeeb Adegoke',
    position: 'Director of Media / Spokesperson',
    photo: 'https://drive.google.com/thumbnail?id=17lvCXkkOBY3Bx8b7czZT8wOrEtDWBcIF&sz=w400',
    initials: 'AM',
    rank: 4,
  },
  {
    id: 6,
    name: 'Ajibola Oluwasegun Mathew',
    position: 'Director of New Media',
    photo: 'https://drive.google.com/thumbnail?id=11vsSPgPZ2pVJcDqfldZNgb2KfmmRt1dA&sz=w400',
    initials: 'AO',
    rank: 5,
  },
  {
    id: 7,
    name: 'Olagunju Yussuf Olalekan',
    position: 'Director of Security and Protocol',
    photo: 'https://drive.google.com/thumbnail?id=1gu8QFcx9qVbEeDEB_-zyxt_aI2HLw0RN&sz=w400',
    initials: 'OY',
    rank: 6,
  },
  {
    id: 8,
    name: 'Araromi Olaoluwa Shadrack',
    position: 'Director of Faith and Community Engagement',
    photo: 'https://drive.google.com/thumbnail?id=1N-9f4Ug4NxhzM43L5wzAWg6V1tQivoDY&sz=w400',
    initials: 'AO',
    rank: 7,
  },
  {
    id: 9,
    name: 'Adeolu Timothy Olanrewaju (Larry-Jay)',
    position: 'Director of Students and Mobilization',
    photo: 'https://drive.google.com/thumbnail?id=1ytguHA9uHCAwjuI5vS3MlrHGeVis6nCh&sz=w400',
    initials: 'AT',
    rank: 8,
  },
  {
    id: 10,
    name: 'Israel Olushola Akinloye',
    position: 'Director Contract and Mobilization',
    photo: 'https://drive.google.com/thumbnail?id=1e6jaFNmk4qa1sH6h3i6nowgh2uyvkpef&sz=w400',
    initials: 'IA',
    rank: 9,
  },
  {
    id: 11,
    name: 'Hon. Jamiu Luqman Prince',
    position: 'Director Town Hall',
    photo: 'https://drive.google.com/thumbnail?id=1-cVUacjGYOsMJnRv4VxD2htJs-chS_FH&sz=w400',
    initials: 'JL',
    rank: 10,
  },
  {
    id: 12,
    name: 'Ogundare Monsurat Omolewa',
    position: 'Director Welfare and Event',
    photo: 'https://drive.google.com/thumbnail?id=1vp0CcJfPnQX5dBtsCpjqbMGffBp_k9um&sz=w400',
    initials: 'OM',
    rank: 11,
  },
  {
    id: 13,
    name: 'Adejare Kehinde Ganiyu',
    position: 'Welfare Manager / Treasurer',
    photo: 'https://drive.google.com/thumbnail?id=1L2JF0kq8UnfyKK4YQ4txpuSD7MbpgmW_&sz=w400',
    initials: 'AK',
    rank: 12,
  },
  {
    id: 14,
    name: 'Barr. Peter Adebayo',
    position: 'Legal Adviser',
    photo: 'https://drive.google.com/thumbnail?id=1TJLD2Kb8POLj0VYPPQJTJKkXo5OFqKN1&sz=w400',
    initials: 'PA',
    rank: 13,
  },
  {
    id: 15,
    name: 'Hon. Kareem Taofeek Olanrewaju',
    position: 'Trustee',
    photo: 'https://drive.google.com/thumbnail?id=110EIzPn8FZR-tz9mJ9aNS4-LPHf252wS&sz=w400',
    initials: 'KT',
    rank: 14,
  },
  {
    id: 16,
    name: 'Rasheed Ayotunde Jimoh',
    position: 'Head of Strategic Communication',
    photo: 'https://drive.google.com/thumbnail?id=123MIqHqoiV_CUFLNNv8sSP1tXL9Ddiyg&sz=w400',
    initials: 'RA',
    rank: 15,
  },
  {
    id: 17,
    name: 'Hon. Olabode Oluwatobi Divine',
    position: 'Director Special Duties (Osun State)',
    photo: 'https://drive.google.com/thumbnail?id=1OAnYznSfBrJr1GF6-cPZ9H8ZY3lh2Th5&sz=w400',
    initials: 'OO',
    rank: 16,
  },
  {
    id: 18,
    name: 'Adisa Ismail Adesola',
    position: 'Director of Youth Mobilization',
    photo: 'https://drive.google.com/thumbnail?id=1W6XFkISWDCB9PZBq-tol_gg2Ur47rgE6&sz=w400',
    initials: 'AI',
    rank: 17,
  },
]

const RANK_COLORS = {
  1: 'from-yellow-600 to-yellow-400',
  2: 'from-green-800 to-green-600',
  3: 'from-green-700 to-emerald-500',
  4: 'from-green-600 to-teal-500',
  default: 'from-green-800 to-green-600',
}

export default function ExecutivesPage() {
  const topTwo = EXECUTIVES.filter(e => e.rank <= 2)
  const rest   = EXECUTIVES.filter(e => e.rank >  2)

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Leadership</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">
          Meet Our Executives
        </h1>
        <p className="text-green-200 mt-3 max-w-2xl mx-auto">
          The dedicated leaders driving RTIFN Osun State Chapter's mission across all 30 local government areas of Osun State.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="section-label">Executive Council</span>
          <h2 className="section-title">State Chapter Leadership</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-yellow-500 mx-auto mt-4 rounded" />
        </div>

        {/* Top 2 — large featured cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {topTwo.map(exec => (
            <ExecCard key={exec.id} exec={exec} large />
          ))}
        </div>

        {/* Rest — 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rest.map(exec => (
            <ExecCard key={exec.id} exec={exec} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ExecCard({ exec, large = false }) {
  const gradientClass = RANK_COLORS[exec.rank] || RANK_COLORS.default

  return (
    <div className={`card group text-center overflow-hidden ${large ? 'shadow-xl' : ''}`}>
      {/* Photo */}
      <div className={`relative overflow-hidden ${large ? 'h-72' : 'h-56'}
                       bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
        {exec.photo ? (
          <img
            src={exec.photo}
            alt={exec.name}
            className="w-full h-full object-cover object-top
                       group-hover:scale-105 transition-transform duration-500"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        {/* Initials fallback */}
        <div className={`${exec.photo ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center`}>
          <div className={`${large ? 'w-32 h-32 text-5xl' : 'w-24 h-24 text-3xl'}
                           rounded-full bg-white/20 backdrop-blur-sm flex items-center
                           justify-center font-display font-black text-white
                           ring-4 ring-white/30 shadow-xl`}>
            {exec.initials}
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Body — Name and Position only, no bio */}
      <div className="p-5">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold
                         px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          {exec.position}
        </span>
        <h3 className={`font-display font-bold text-gray-900 ${large ? 'text-xl' : 'text-base'}`}>
          {exec.name}
        </h3>
      </div>
    </div>
  )
}
