// Executives are ordered by hierarchy as specified

const EXECUTIVES = [
  {
    id: 1,
    name: 'Engr. Kunle Oyediran',
    position: 'State Coordinator',
    bio: 'Leads the overall strategic direction of RTIFN Osun State Chapter, coordinating activities across all 30 local government areas and representing the chapter at the national level.',
    photo: 'https://drive.google.com/thumbnail?id=19iMLodS2SB7uJUGJDQQAewsLFMJD6q3A&sz=w400',
    initials: 'KO',
    rank: 1,
  },
  {
    id: 2,
    name: 'Alhaji Abdsalam Damola Mojeed',
    position: 'State Secretary',
    bio: 'Manages all official documentation, correspondence, and administrative records of RTIFN Osun State Chapter, ensuring smooth coordination across all directorates.',
    photo: 'https://drive.google.com/thumbnail?id=1tLMm6xfAhJH1adm7jf8GTlvC3lRFMPP8&sz=w400',
    initials: 'AD',
    rank: 2,
  },
  {
    id: 3,
    name: '[Director of Strategy — Osun State]',
    position: 'Director of Strategy (Osun State)',
    bio: 'Develops and implements strategic plans specifically for RTIFN Osun State Chapter operations and grassroots activities.',
    photo: null,
    initials: 'DS',
    rank: 3,
  },
  {
    id: 4,
    name: 'Faleye Kazeem Oladele',
    position: 'Director of Strategy',
    bio: 'Coordinates national-level strategic communications and policy direction for the RTIFN movement, aligning all state chapters with the central reform communication agenda.',
    photo: 'https://drive.google.com/thumbnail?id=1xrlPphHnJOZ9CsYjvBZcNNIGFMWz9rHS&sz=w400',
    initials: 'FK',
    rank: 4,
  },
  {
    id: 5,
    name: 'Adebimpe Mujeeb Adegoke',
    position: 'Director of Media / Spokesperson',
    bio: 'Serves as the official spokesperson of RTIFN Osun State Chapter, managing all media relations, press releases, and public communication.',
    photo: 'https://drive.google.com/thumbnail?id=1mBcdVRQvIHpiEdIfRMSgGOyI4K4ciqF_&sz=w400',
    initials: 'AM',
    rank: 5,
  },
  {
    id: 6,
    name: 'Ajibola Oluwasegun Mathew',
    position: 'Director of New Media',
    bio: 'Oversees all digital and social media platforms for RTIFN Osun, driving online engagement, content creation, and digital mobilization campaigns.',
    photo: 'https://drive.google.com/thumbnail?id=11vsSPgPZ2pVJcDqfldZNgb2KfmmRt1dA&sz=w400',
    initials: 'AO',
    rank: 6,
  },
  {
    id: 7,
    name: 'Olagunju Yussuf Olalekan',
    position: 'Director of Security and Protocol',
    bio: 'Ensures the safety and security of RTIFN Osun events and executives, while managing all protocol and official ceremony arrangements.',
    photo: 'https://drive.google.com/thumbnail?id=1gu8QFcx9qVbEeDEB_-zyxt_aI2HLw0RN&sz=w400',
    initials: 'OY',
    rank: 7,
  },
  {
    id: 8,
    name: 'Araromi Olaoluwa Shadrack',
    position: 'Director of Faith and Community Engagement',
    bio: 'Builds bridges between RTIFN Osun and religious and community leaders across the state, ensuring inclusive representation of all faith groups.',
    photo: 'https://drive.google.com/thumbnail?id=1N-9f4Ug4NxhzM43L5wzAWg6V1tQivoDY&sz=w400',
    initials: 'AO',
    rank: 8,
  },
  {
    id: 9,
    name: 'Adeolu Timothy Olanrewaju (Larry-Jay)',
    position: 'Director of Students and Mobilization',
    bio: 'Coordinates student and youth mobilization across tertiary institutions in Osun State, building a strong base of young advocates for the RTIFN movement.',
    photo: 'https://drive.google.com/thumbnail?id=1ytguHA9uHCAwjuI5vS3MlrHGeVis6nCh&sz=w400',
    initials: 'AT',
    rank: 9,
  },
  {
    id: 10,
    name: 'Israel Olushola Akinloye',
    position: 'Director Contract and Mobilization',
    bio: 'Oversees contract management and large-scale mobilization drives, ensuring RTIFN Osun maintains strong operational capacity across all LGAs.',
    photo: 'https://drive.google.com/thumbnail?id=1e6jaFNmk4qa1sH6h3i6nowgh2uyvkpef&sz=w400',
    initials: 'IA',
    rank: 10,
  },
  {
    id: 11,
    name: 'Hon. Jamiu Luqman Prince',
    position: 'Director Town Hall',
    bio: 'Organizes and manages RTIFN town hall meetings and community dialogues across Osun State, facilitating direct communication between government and citizens.',
    photo: 'https://drive.google.com/thumbnail?id=1-cVUacjGYOsMJnRv4VxD2htJs-chS_FH&sz=w400',
    initials: 'JL',
    rank: 11,
  },
  {
    id: 12,
    name: 'Ogundare Monsurat Omolewa',
    position: 'Director Welfare and Event',
    bio: 'Coordinates the welfare of RTIFN members and manages the planning and execution of all chapter events, ensuring professional and impactful programming.',
    photo: 'https://drive.google.com/thumbnail?id=1vp0CcJfPnQX5dBtsCpjqbMGffBp_k9um&sz=w400',
    initials: 'OM',
    rank: 12,
  },
  {
    id: 13,
    name: 'Adejare Kehinde Ganiyu',
    position: 'Welfare Manager / Treasurer',
    bio: 'Manages the financial accounts and welfare fund of RTIFN Osun State Chapter, ensuring transparent and accountable management of chapter resources.',
    photo: 'https://drive.google.com/thumbnail?id=1L2JF0kq8UnfyKK4YQ4txpuSD7MbpgmW_&sz=w400',
    initials: 'AK',
    rank: 13,
  },
  {
    id: 14,
    name: 'Barr. Peter Adebayo',
    position: 'Legal Adviser',
    bio: 'Provides legal counsel and guidance to RTIFN Osun State Chapter, ensuring all activities are conducted within the bounds of Nigerian law and political regulations.',
    photo: 'https://drive.google.com/thumbnail?id=1TJLD2Kb8POLj0VYPPQJTJKkXo5OFqKN1&sz=w400',
    initials: 'PA',
    rank: 14,
  },
  {
    id: 15,
    name: 'Hon. Kareem Taofeek Olanrewaju',
    position: 'Trustee',
    bio: 'Serves as a founding trustee of RTIFN Osun State Chapter, providing institutional guidance, oversight, and long-term vision for the movement.',
    photo: 'https://drive.google.com/thumbnail?id=110EIzPn8FZR-tz9mJ9aNS4-LPHf252wS&sz=w400',
    initials: 'KT',
    rank: 15,
  },
  {
    id: 16,
    name: 'Rasheed Ayotunde Jimoh',
    position: 'Head of Strategic Communication',
    bio: 'Leads the strategic communication initiatives of RTIFN Osun State Chapter, developing messaging frameworks that effectively communicate the Tinubu reform agenda to citizens.',
    photo: 'https://drive.google.com/thumbnail?id=123MIqHqoiV_CUFLNNv8sSP1tXL9Ddiyg&sz=w400',
    initials: 'RA',
    rank: 16,
  },
  {
    id: 17,
    name: 'Hon. Olabode Oluwatobi Divine',
    position: 'Director Special Duties (Osun State)',
    bio: 'Handles special assignments and strategic projects for RTIFN Osun State Chapter, working directly with the State Coordinator on sensitive and high-impact initiatives.',
    photo: 'https://drive.google.com/thumbnail?id=1OAnYznSfBrJr1GF6-cPZ9H8ZY3lh2Th5&sz=w400',
    initials: 'OO',
    rank: 17,
  },
  {
    id: 18,
    name: 'Adisa Ismail Adesola',
    position: 'Director of Youth Mobilization',
    bio: 'Drives youth engagement and mobilization across Osun State, building a dynamic network of young advocates committed to communicating the Tinubu reform agenda.',
    photo: 'https://drive.google.com/thumbnail?id=1W6XFkISWDCB9PZBq-tol_gg2Ur47rgE6&sz=w400',
    initials: 'AI',
    rank: 18,
  },
]

const RANK_COLORS = {
  1: 'from-yellow-600 to-yellow-400',   // Coordinator — gold
  2: 'from-green-800 to-green-600',     // Secretary
  3: 'from-green-700 to-emerald-500',
  4: 'from-green-700 to-emerald-500',
  5: 'from-green-600 to-teal-500',
  6: 'from-teal-700 to-green-500',
  default: 'from-green-800 to-green-600',
}

export default function ExecutivesPage() {
  // Separate top leadership (1-2) for featured display
  const topTwo   = EXECUTIVES.filter(e => e.rank <= 2)
  const rest     = EXECUTIVES.filter(e => e.rank >  2)

  return (
    <div>
      {/* Banner */}
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

        {/* ── TOP 2 — Featured large cards ── */}
        <div className="text-center mb-10">
          <span className="section-label">Executive Council</span>
          <h2 className="section-title">State Chapter Leadership</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-yellow-500 mx-auto mt-4 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
          {topTwo.map(exec => (
            <ExecCard key={exec.id} exec={exec} large />
          ))}
        </div>

        {/* ── REST — Standard grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rest.map(exec => (
            <ExecCard key={exec.id} exec={exec} />
          ))}
        </div>

        {/* Note about position #3 placeholder */}
        <div className="mt-12 bg-yellow-50 rounded-xl p-6 border border-yellow-200 flex gap-4 items-start">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="font-bold text-yellow-800 text-sm mb-1">Director of Strategy — Osun State (Position #3)</p>
            <p className="text-yellow-700 text-sm">
              This position is currently showing a placeholder. Please send the name and photo of the Director of Strategy (Osun State) and I'll update it immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Executive Card Component ──────────────────────────────────
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
              // Fallback to initials if image fails to load
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        {/* Initials fallback — shown if photo missing or fails */}
        <div
          className={`${exec.photo ? 'hidden' : 'flex'} absolute inset-0 
                      items-center justify-center`}
        >
          <div className={`${large ? 'w-32 h-32 text-5xl' : 'w-24 h-24 text-3xl'}
                           rounded-full bg-white/20 backdrop-blur-sm flex items-center 
                           justify-center font-display font-black text-white
                           ring-4 ring-white/30 shadow-xl`}>
            {exec.initials}
          </div>
        </div>

        {/* Rank badge */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white 
                        text-xs font-bold px-2.5 py-1 rounded-full">
          #{exec.rank}
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 
                        bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Body */}
      <div className={`p-5 ${large ? 'p-6' : ''}`}>
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold 
                         px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          {exec.position}
        </span>
        <h3 className={`font-display font-bold text-gray-900 mb-2
                        ${large ? 'text-xl' : 'text-base'}`}>
          {exec.name}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {exec.bio}
        </p>
      </div>
    </div>
  )
}
