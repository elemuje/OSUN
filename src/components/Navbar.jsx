import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../lib/data'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Executives', path: '/executives' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Blog', path: '/blog' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-green-900 shadow-2xl' : 'bg-green-900'
    }`}>
      {/* Top strip */}
      <div className="bg-green-950 text-center py-1.5 px-4 text-xs text-green-300 font-semibold tracking-wider hidden sm:block">
        🇳🇬 &nbsp; RELAX, TINUBU IS FIXING NIGERIA &nbsp;|&nbsp; RTIFN OSUN STATE CHAPTER &nbsp; 🇳🇬
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md
                            ring-2 ring-yellow-500 group-hover:ring-yellow-400 transition-all">
              <Logo size={36} />
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-white text-sm font-bold leading-tight">
                RTIFN Osun State Chapter
              </div>
              <div className="text-green-300 text-xs tracking-wide">
                Relax, Tinubu Is Fixing Nigeria
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-all rounded-sm
                  ${location.pathname === link.path
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-green-100 hover:text-white hover:bg-green-800'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/join"
              className="ml-3 bg-yellow-500 text-green-900 font-bold px-4 py-2 text-sm uppercase 
                         tracking-wide hover:bg-yellow-400 transition-all rounded-sm"
            >
              Join RTIFN
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 rounded focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-green-950 border-t border-green-800">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-6 py-3.5 text-sm font-semibold uppercase tracking-wide 
                border-b border-green-900 transition-all
                ${location.pathname === link.path
                  ? 'text-yellow-400 bg-green-900'
                  : 'text-green-100 hover:text-white hover:bg-green-900'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/join"
            className="block mx-6 my-4 text-center bg-yellow-500 text-green-900 font-bold py-3 
                       text-sm uppercase tracking-wide rounded-sm hover:bg-yellow-400"
          >
            Join RTIFN
          </Link>
        </div>
      )}
    </nav>
  )
}
