import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div>
      {/* Banner */}
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Who We Are</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">About RTIFN Osun</h1>
        <p className="text-green-200 mt-3 max-w-xl mx-auto">
          The Official Political Media & Mobilization Platform for RTIFN Osun State Chapter
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* About Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">About RTIFN</span>
              <h2 className="section-title">Relax, Tinubu Is Fixing Nigeria</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                RTIFN (Relax, Tinubu Is Fixing Nigeria) is a grassroots political movement dedicated to communicating 
                the truth about President Bola Ahmed Tinubu's administration and its bold reform agenda. 
                We believe in factual, transparent political communication that empowers citizens to understand 
                the policies being implemented in their name.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Osun State Chapter was established to serve as the authoritative voice of RTIFN in Osun 
                State, coordinating activities across all 30 local government areas and mobilizing citizens 
                to support the national transformation agenda.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We operate through community engagement, media campaigns, policy explainers, and direct 
                grassroots mobilization — putting truth at the center of political discourse in Osun State.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-800 to-green-600 rounded-2xl p-8 text-white">
              <div className="text-5xl mb-4 text-center">🇳🇬</div>
              <h3 className="font-display text-2xl font-bold text-center mb-6">Our Core Values</h3>
              <ul className="space-y-3">
                {[
                  ['🎯', 'Truth & Transparency in political communication'],
                  ['🤝', 'Grassroots democracy and citizen engagement'],
                  ['📊', 'Evidence-based policy communication'],
                  ['🌱', 'Inclusive development for all Nigerians'],
                  ['⚡', 'Bold leadership and decisive action'],
                ].map(([icon, text]) => (
                  <li key={text} className="flex gap-3 items-start">
                    <span className="text-lg">{icon}</span>
                    <span className="text-green-100 text-sm leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Vision, Mission, Objectives */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-7 shadow-md border border-green-100 border-t-4 border-t-green-600">
            <div className="text-3xl mb-3">🔭</div>
            <h3 className="font-display text-xl font-bold text-green-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A Nigeria where citizens have access to accurate, unfiltered information about government 
              policies and their positive impact on everyday life — enabling informed civic participation 
              and supporting progressive national transformation.
            </p>
          </div>
          <div className="bg-white rounded-xl p-7 shadow-md border border-green-100 border-t-4 border-t-yellow-500">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-display text-xl font-bold text-green-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To serve as the premier grassroots communication platform for President Tinubu's reform 
              agenda in Osun State — mobilizing citizens, correcting misinformation, and building 
              broad-based support for Nigeria's ongoing economic and governance transformation.
            </p>
          </div>
          <div className="bg-white rounded-xl p-7 shadow-md border border-green-100 border-t-4 border-t-green-400">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-display text-xl font-bold text-green-900 mb-3">Our Objectives</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex gap-2"><span className="text-green-500">✓</span> Communicate government policies clearly</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span> Counter political misinformation</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span> Mobilize citizens across all 30 LGAs</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span> Build a network of informed advocates</li>
              <li className="flex gap-2"><span className="text-green-500">✓</span> Support the RTIFN national agenda</li>
            </ul>
          </div>
        </section>

        {/* Message from State Coordinator */}
        <section className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 md:p-12 
                            border border-green-100 shadow-md mb-16">
          <span className="section-label">Leadership Message</span>
          <h2 className="section-title mb-6">Message from the State Coordinator</h2>
          <div className="grid md:grid-cols-4 gap-8 items-start">
            <div className="text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto ring-4 ring-green-200 shadow-xl bg-white">
                <img src="/kunle-oyediran.jpeg" alt="Engr. Kunle Oyediran" className="w-full h-full object-cover object-top" />
              </div>
              <p className="font-bold text-green-900 mt-3 text-sm">Engr. Kunle Oyediran</p>
              <p className="text-green-600 text-xs">State Coordinator</p>
              <p className="text-green-500 text-xs">RTIFN Osun State Chapter</p>
            </div>
            <div className="md:col-span-3">
              <blockquote className="text-gray-700 text-lg italic leading-relaxed border-l-4 
                                     border-green-500 pl-6 mb-4">
                "The people of Osun State deserve to know the truth about what President Tinubu's 
                administration is doing for Nigeria. RTIFN Osun exists to bridge that gap — to take 
                the facts from Abuja to the wards, the markets, and the farms of our great state."
              </blockquote>
              <p className="text-gray-600 leading-relaxed mb-3">
                We live in an era of information warfare, where political opponents work overtime to 
                obscure the genuine progress being made by this administration. Our job — your job as 
                a member of RTIFN — is to counter that narrative with facts, figures, and real stories 
                of change.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I invite every citizen of Osun State who believes in progress, in truth, and in 
                a better Nigeria to join our movement. Together, we will ensure that every ward in 
                Osun State hears the message: <strong className="text-green-700">Relax, Tinubu Is Fixing Nigeria.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link to="/join" className="btn-green text-base px-10 py-4">
            ✊ Join RTIFN Osun Today
          </Link>
        </div>
      </div>
    </div>
  )
}
