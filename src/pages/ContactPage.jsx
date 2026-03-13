import { useState } from 'react'
import { SITE } from '../lib/data'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setSent(true)
  }

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Get in Touch</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Contact Us</h1>
        <p className="text-green-200 mt-3 max-w-xl mx-auto">
          Reach out to RTIFN Osun State Chapter — we're here to hear from you
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <h2 className="font-display text-2xl font-bold text-green-900 mb-2">Our Contact Details</h2>

            {[
              {
                icon: '📍', label: 'Office Address',
                content: SITE.address,
                link: null,
              },
              {
                icon: '📞', label: 'Phone Number',
                content: SITE.phone,
                link: `tel:${SITE.phone}`,
              },
              {
                icon: '✉️', label: 'Email Address',
                content: SITE.email,
                link: `mailto:${SITE.email}`,
              },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-sm border border-green-100">
                <div className="w-11 h-11 rounded-lg bg-green-700 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} className="text-green-800 font-semibold hover:text-green-600 text-sm">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-700 text-sm">{item.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-green-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Follow Us</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Facebook', href: SITE.social.facebook, bg: 'bg-blue-600', emoji: '📘' },
                  { label: 'Twitter/X', href: SITE.social.twitter, bg: 'bg-sky-500', emoji: '𝕏' },
                  { label: 'Instagram', href: SITE.social.instagram, bg: 'bg-pink-600', emoji: '📸' },
                  { label: 'YouTube', href: SITE.social.youtube, bg: 'bg-red-600', emoji: '▶️' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     className={`${s.bg} text-white rounded-lg px-4 py-2.5 text-sm font-bold 
                                 flex items-center gap-2 hover:opacity-90 transition-all hover:-translate-y-0.5`}>
                    <span>{s.emoji}</span> {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={SITE.whatsapp}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-400 text-white 
                         p-5 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 
                         hover:shadow-xl group"
            >
              <span className="text-3xl">📲</span>
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-green-100 text-xs font-normal">Fastest response — usually within hours</p>
              </div>
              <span className="ml-auto text-xl group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4">📬</div>
                  <h3 className="font-display text-2xl font-bold text-green-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. A member of RTIFN Osun team will respond to you shortly.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 text-green-600 font-bold text-sm hover:text-green-800 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-green-900 mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                          Your Name *
                        </label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          placeholder="Full name" required className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="your@email.com" required className="input-field" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                        Subject *
                      </label>
                      <input type="text" name="subject" value={form.subject} onChange={handleChange}
                        placeholder="What is your message about?" required className="input-field" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                        Message *
                      </label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder="Write your message here..." required rows={6}
                        className="input-field resize-none" />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white 
                                 font-black py-4 rounded-md uppercase tracking-wider transition-all 
                                 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending...
                        </>
                      ) : '✉️ Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
