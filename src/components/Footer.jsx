import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../lib/data'

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center ring-2 ring-yellow-500">
                <Logo size={40} />
              </div>
              <div>
                <div className="font-display text-white font-bold text-sm leading-tight">RTIFN Osun</div>
                <div className="text-green-400 text-xs">State Chapter</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-green-300 mb-5">
              We are patriots committed to communicating the truth about Nigeria's transformation under President Bola Ahmed Tinubu.
            </p>
            <div className="flex gap-3">
              <SocialIcon href={SITE.social.facebook} label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </SocialIcon>
              <SocialIcon href={SITE.social.twitter} label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </SocialIcon>
              <SocialIcon href={SITE.social.instagram} label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="white" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/></svg>
              </SocialIcon>
              <SocialIcon href={SITE.social.youtube} label="YouTube" bg="bg-red-600 hover:bg-red-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 pb-2 border-b border-green-800">Quick Links</h4>
            <ul className="space-y-2">
              {[
                ['Home', '/'],
                ['About RTIFN', '/about'],
                ['Meet Executives', '/executives'],
                ['Achievements', '/achievements'],
                ['Blog / News', '/blog'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-green-300 hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="text-green-600">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 pb-2 border-b border-green-800">Resources</h4>
            <ul className="space-y-2">
              {[
                ['Events', '/events'],
                ['Media Gallery', '/gallery'],
                ['Join RTIFN', '/join'],
                ['Contact Us', '/contact'],
                ['Press Releases', '/blog?category=Press+Releases'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-green-300 hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="text-green-600">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 pb-2 border-b border-green-800">Contact Us</h4>
            <ul className="space-y-3 text-sm text-green-300">
              <li className="flex gap-2">
                <span>📍</span>
                <span>{SITE.address}</span>
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-yellow-400 flex gap-2">
                  <span>📞</span> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-yellow-400 flex gap-2">
                  <span>✉️</span> {SITE.email}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={SITE.whatsapp}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold 
                             px-4 py-2.5 rounded-md text-sm transition-all hover:-translate-y-0.5"
                >
                  📲 Join Our WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-green-500 text-center sm:text-left">
            © {new Date().getFullYear()} RTIFN Osun State Chapter. All Rights Reserved. 🇳🇬
          </p>
          <p className="text-xs text-green-600">
            Built with ❤️ for a better Nigeria
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, label, children, bg = 'bg-green-700 hover:bg-green-600' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center text-white transition-all hover:-translate-y-0.5`}
    >
      {children}
    </a>
  )
}
