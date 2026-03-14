import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import AdminPage       from './pages/AdminPage'

function Layout() {
  const location = useLocation()
  const isAdmin  = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdmin && <Navbar />}
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
          <Route path="/admin"          element={<AdminPage />} />
          <Route path="*"               element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <a
          href="https://chat.whatsapp.com/Li6sEGcN5Jw33BlGEwNCAk?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          title="Join RTIFN WhatsApp Group"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 
                     hover:bg-green-400 text-white flex items-center justify-center text-2xl 
                     shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-4 ring-white"
        >
          📲
        </a>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
