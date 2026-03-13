import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-green-50">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-4">🇳🇬</div>
        <h1 className="font-display text-6xl font-black text-green-900 mb-3">404</h1>
        <h2 className="font-display text-2xl text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-400 leading-relaxed mb-8">
          The page you're looking for doesn't exist. But don't worry — 
          Nigeria is being fixed, and so is this link. Head back home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-green">← Back to Home</Link>
          <Link to="/blog" className="btn-primary">Latest News</Link>
        </div>
      </div>
    </div>
  )
}
