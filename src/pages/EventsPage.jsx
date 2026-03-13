import { useState } from 'react'
import { EVENTS } from '../lib/data'
import { format } from 'date-fns'

const TYPE_STYLES = {
  meeting:     { color: 'bg-blue-100 text-blue-800',   label: 'Meeting',       icon: '🏛️' },
  outreach:    { color: 'bg-green-100 text-green-800',  label: 'Outreach',      icon: '🤝' },
  media:       { color: 'bg-purple-100 text-purple-800', label: 'Media Brief',  icon: '📢' },
  mobilization:{ color: 'bg-orange-100 text-orange-800', label: 'Mobilization', icon: '⚡' },
}

export default function EventsPage() {
  const [tab, setTab] = useState('upcoming')

  const filtered = EVENTS.filter(e => e.status === tab)

  return (
    <div>
      <div className="page-banner">
        <p className="text-green-300 text-sm uppercase tracking-widest mb-2">Calendar</p>
        <h1 className="font-display text-4xl md:text-5xl text-white font-black">Events</h1>
        <p className="text-green-200 mt-3 max-w-xl mx-auto">
          RTIFN Osun State Chapter meetings, outreach programs, and mobilization activities
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        {/* Tabs */}
        <div className="flex gap-3 mb-10 bg-green-50 p-1.5 rounded-xl w-fit">
          {['upcoming', 'past'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-7 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all
                ${tab === t
                  ? 'bg-green-700 text-white shadow-md'
                  : 'text-green-700 hover:bg-green-100'}`}
            >
              {t === 'upcoming' ? '📅 Upcoming' : '📋 Past Events'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-400 font-semibold">No {tab} events at this time.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map(event => {
              const typeInfo = TYPE_STYLES[event.type] || TYPE_STYLES.meeting
              const dateObj = new Date(event.date)
              const day = format(dateObj, 'd')
              const month = format(dateObj, 'MMM')
              const year = format(dateObj, 'yyyy')

              return (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 transition-all hover:shadow-xl
                    ${tab === 'upcoming' ? 'border-green-500' : 'border-gray-300'}`}
                >
                  <div className="flex gap-0">
                    {/* Date Box */}
                    <div className={`flex-shrink-0 w-20 flex flex-col items-center justify-center py-5 px-3
                      ${tab === 'upcoming' ? 'bg-green-800' : 'bg-gray-500'}`}>
                      <span className="font-display text-3xl font-black text-white leading-none">{day}</span>
                      <span className="text-xs uppercase font-bold text-green-200">{month}</span>
                      <span className="text-xs text-green-300">{year}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeInfo.color}`}>
                          {typeInfo.icon} {typeInfo.label}
                        </span>
                        {tab === 'upcoming' && (
                          <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                            ● Upcoming
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg font-bold text-gray-900 mb-1.5">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">🕐 {event.time}</span>
                        <span className="flex items-center gap-1">📍 {event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Add to calendar CTA */}
        {tab === 'upcoming' && filtered.length > 0 && (
          <div className="mt-10 bg-green-50 rounded-xl p-7 border border-green-100 text-center">
            <p className="text-green-700 font-semibold mb-2">📲 Stay Updated</p>
            <p className="text-gray-500 text-sm mb-4">
              Join our WhatsApp group to receive real-time updates on all RTIFN Osun events and activities.
            </p>
            <a
              href="https://chat.whatsapp.com/Li6sEGcN5Jw33BlGEwNCAk?mode=gi_t"
              target="_blank" rel="noopener noreferrer"
              className="btn-green text-sm"
            >
              📲 Join WhatsApp Group
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
