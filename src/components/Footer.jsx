import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../lib/data'

export default function Footer() {
  const hasFacebook  = SITE.social.facebook  && SITE.social.facebook.length  > 0
  const hasTwitter   = SITE.social.twitter   && SITE.social.twitter.length   > 0
  const hasInstagram = SITE.social.instagram && SITE.social.instagram.length > 0

  return (
    <footer className="bg-green-950 text-green-200">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-yellow-500 flex-shrink-0 bg-white">
                <Logo size={56} />
              </div>
              <div>
                <div className="font-display text-white font-bold text-sm leading-tight">RTIFN Osun</div>
                <div className="text-green-400 text-xs">State Chapter</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-green-300 mb-5">
              We are patriots committed to communicating the truth about Nigeria's transformation
              under President Bola Ahmed Tinubu. Relax, Tinubu Is Fixing Nigeria.
            </p>
            <div className="flex gap-3 flex-wrap">
              {hasFacebook && (
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                   className="w-9 h-9 rounded-lg bg-blue-700 hover:bg-blue-600 flex items-center justify-center text-white transition-all hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
              )}
              {hasTwitter && (
                <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter/X"
                   className="w-9 h-9 rounded-lg bg-sky-600 hover:bg-sky-500 flex items-center justify-center text-white font-black text-sm transition-all hover:-translate-y-0.5">
                  𝕏
                </a>
              )}
              {hasInstagram && (
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                   className="w-9 h-9 rounded-lg bg-pink-600 hover:bg-pink-500 flex items-center justify-center text-white transition-all hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none"/></svg>
                </a>
              )}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                 className="w-9 h-9 rounded-lg bg-green-600 hover:bg-green-500 flex items-center justify-center text-white transition-all hover:-translate-y-0.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.393A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 pb-2 border-b border-green-800">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home','/'],['About RTIFN','/about'],['Meet Executives','/executives'],['Achievements','/achievements'],['Blog / News','/blog']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-green-300 hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span className="text-green-600">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 pb-2 border-b border-green-800">Resources</h4>
            <ul className="space-y-2">
              {[['Events','/events'],['Media Gallery','/gallery'],['Join RTIFN','/join'],['Contact Us','/contact'],['Press Releases','/blog?category=Press+Releases']].map(([label, path]) => (
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
              <li className="flex gap-2"><span>📍</span><span>{SITE.address}</span></li>
              <li><a href={`tel:${SITE.phone}`} className="hover:text-yellow-400 flex gap-2 transition-colors"><span>📞</span> {SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-yellow-400 flex gap-2 transition-colors"><span>✉️</span> {SITE.email}</a></li>
              <li className="pt-1">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2.5 rounded-md text-sm transition-all hover:-translate-y-0.5">
                  📲 Join Our WhatsApp Group
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-green-500 text-center sm:text-left">
            © {new Date().getFullYear()} RTIFN Osun State Chapter. All Rights Reserved. 🇳🇬
          </p>
          <p className="text-xs text-green-600">
            Founded {SITE.founded} · Developed by{' '}
            <a
              href="https://mujeebdev.vercel.app/#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
            >
              MJD
            </a>
            {' '}Concept
          </p>
        </div>
      </div>
    </footer>
  )
}
