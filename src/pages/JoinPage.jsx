import { useState } from 'react'
import { OSUN_LGAS, SITE } from '../lib/data'

const OCCUPATIONS = [
  'Student', 'Civil Servant', 'Business Owner', 'Trader', 'Farmer',
  'Teacher/Educator', 'Healthcare Worker', 'Artisan/Craftsman',
  'Journalist/Media', 'Lawyer', 'Engineer', 'Unemployed', 'Other'
]

export default function JoinPage() {
  const [form, setForm] = useState({
    fullName: '', lga: '', ward: '', phone: '', email: '', occupation: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.lga) e.lga = 'Please select your LGA'
    if (!form.ward.trim()) e.ward = 'Ward is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^(\+?234|0)[789]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid Nigerian phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address'
    if (!form.occupation) e.occupation = 'Please select your occupation'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)

    // ================================================================
    // GOOGLE APPS SCRIPT — Membership Registration
    // Submissions go directly into Google Sheet
    // ================================================================
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7a1j0Qh4CI6ZMtkTp4i5aVmO-w6wKtPhxyExsqjUUi6yUuUN479nnnzIA5O3gfGoq/exec'

    try {
      const params = new URLSearchParams({
        fullName:   form.fullName,
        lga:        form.lga,
        ward:       form.ward,
        phone:      form.phone,
        email:      form.email || '',
        occupation: form.occupation,
      })

      await fetch(`${SCRIPT_URL}?${params}`, {
        method: 'GET',
        mode:   'no-cors',
      })

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center px-6 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center 
                          text-4xl mx-auto mb-6 animate-[fadeUp_0.5s_ease_forwards]">
            ✅
          </div>
          <h2 className="font-display text-3xl font-black text-green-900 mb-3">
            Welcome to RTIFN Osun!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Thank you, <strong>{form.fullName}</strong>! Your membership registration has been received. 
            A member of our team will reach out to you on <strong>{form.phone}</strong> to complete 
            your onboarding into the RTIFN Osun family.
          </p>
          <div className="bg-green-50 rounded-xl p-5 mb-6 text-sm text-green-700">
            <p className="font-bold mb-1">Next Steps:</p>
            <ol className="text-left space-y-1 list-decimal list-inside">
              <li>Watch for a call from your LGA coordinator</li>
              <li>Join our WhatsApp group for instant updates</li>
              <li>Attend the next chapter meeting in your area</li>
            </ol>
          </div>
          <a
            href="https://chat.whatsapp.com/Li6sEGcN5Jw33BlGEwNCAk?mode=gi_t"
            target="_blank" rel="noopener noreferrer"
            className="btn-green w-full justify-center text-base py-3.5"
          >
            📲 Join Our WhatsApp Group Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Membership</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Join the Movement</h1>
        <p className="text-green-200 mt-3 max-w-xl mx-auto">
          Register as an RTIFN Osun State Chapter member and become part of Nigeria's transformation story
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          
          {/* Left: Why Join */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-green-900 mb-5">
              Why Join RTIFN?
            </h2>
            <div className="space-y-4">
              {[
                { icon: '🎯', title: 'Be Part of History', desc: 'Become a documented advocate of Nigeria\'s most ambitious reform era.' },
                { icon: '📢', title: 'Amplify the Truth', desc: 'Get training and resources to effectively communicate facts to your community.' },
                { icon: '🤝', title: 'Build Your Network', desc: 'Connect with like-minded citizens and leaders across Osun State.' },
                { icon: '📊', title: 'Get Policy Updates', desc: 'Receive regular briefings on government achievements direct from source.' },
                { icon: '⚡', title: 'Drive Change', desc: 'Participate in community outreach, town halls, and mobilization campaigns.' },
              ].map(b => (
                <div key={b.title} className="flex gap-3 items-start p-4 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="font-bold text-green-900 text-sm">{b.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-700 rounded-xl p-5 text-white text-center">
              <p className="font-bold mb-1 text-sm">Quick Join via WhatsApp</p>
              <p className="text-green-200 text-xs mb-3">Already decided? Join our WhatsApp group instantly.</p>
              <a href="https://chat.whatsapp.com/Li6sEGcN5Jw33BlGEwNCAk?mode=gi_t"
                 target="_blank" rel="noopener noreferrer"
                 className="inline-block bg-green-400 hover:bg-green-300 text-green-900 font-bold 
                            px-5 py-2 rounded-md text-sm transition-all">
                📲 Join WhatsApp Group
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="mb-7">
                <h2 className="font-display text-2xl font-bold text-green-900">Membership Registration</h2>
                <p className="text-gray-400 text-sm mt-1">All fields marked * are required</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full legal name"
                    className={`input-field ${errors.fullName ? 'border-red-400 bg-red-50' : ''}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* LGA */}
                <div>
                  <label className="block text-sm font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                    Local Government Area *
                  </label>
                  <select
                    name="lga"
                    value={form.lga}
                    onChange={handleChange}
                    className={`input-field ${errors.lga ? 'border-red-400 bg-red-50' : ''}`}
                  >
                    <option value="">— Select Your LGA —</option>
                    {OSUN_LGAS.map(lga => (
                      <option key={lga} value={lga}>{lga}</option>
                    ))}
                  </select>
                  {errors.lga && <p className="text-red-500 text-xs mt-1">{errors.lga}</p>}
                </div>

                {/* Ward */}
                <div>
                  <label className="block text-sm font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                    Ward *
                  </label>
                  <input
                    type="text"
                    name="ward"
                    value={form.ward}
                    onChange={handleChange}
                    placeholder="e.g. Ward 5, Ayedaade"
                    className={`input-field ${errors.ward ? 'border-red-400 bg-red-50' : ''}`}
                  />
                  {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. 08012345678"
                    className={`input-field ${errors.phone ? 'border-red-400 bg-red-50' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                    Email Address <span className="text-gray-400 font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`input-field ${errors.email ? 'border-red-400 bg-red-50' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-bold text-green-800 mb-1.5 uppercase tracking-wide">
                    Occupation *
                  </label>
                  <select
                    name="occupation"
                    value={form.occupation}
                    onChange={handleChange}
                    className={`input-field ${errors.occupation ? 'border-red-400 bg-red-50' : ''}`}
                  >
                    <option value="">— Select Occupation —</option>
                    {OCCUPATIONS.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
                </div>

                {/* Privacy note */}
                <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
                  By submitting this form, you agree to be contacted by RTIFN Osun State Chapter regarding 
                  membership activities. Your information will not be shared with third parties.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-700 hover:bg-green-600 disabled:bg-green-300 text-white 
                             font-black py-4 rounded-md text-base uppercase tracking-wider transition-all 
                             hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    '✊ Join the Movement'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
