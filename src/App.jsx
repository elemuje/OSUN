import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage        from './pages/HomePage'
import AboutPage       from './pages/AboutPage'
import ExecutivesPage  from './pages/ExecutivesPage'
import AchievementsPage from './pages/AchievementsPage'
import BlogPage        from './pages/BlogPage'
import BlogPostPage    from './pages/BlogPostPage'
import EventsPage      from './pages/EventsPage'
import GalleryPage     from './pages/GalleryPage'
import JoinPage        from './pages/JoinPage'
import ContactPage     from './pages/ContactPage'
import NotFoundPage    from './pages/NotFoundPage'

function ScrollToTop() {
  // Scroll to top on route change
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
  }
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/executives"     element={<ExecutivesPage />} />
            <Route path="/achievements"   element={<AchievementsPage />} />
            <Route path="/blog"           element={<BlogPage />} />
            <Route path="/blog/:slug"     element={<BlogPostPage />} />
            <Route path="/events"         element={<EventsPage />} />
            <Route path="/gallery"        element={<GalleryPage />} />
            <Route path="/join"           element={<JoinPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="*"              element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/2348000000000"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 
                     hover:bg-green-400 text-white flex items-center justify-center text-2xl 
                     shadow-2xl hover:-translate-y-1 hover:shadow-green-300/50 transition-all duration-300
                     ring-4 ring-white"
        >
          📲
        </a>
      </div>
    </BrowserRouter>
  )
}
