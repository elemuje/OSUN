import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiDownload, FiSearch } from 'react-icons/fi'
import { BOOK_PATH, BOOK_PDF, BOOK_TITLE, READING_KEY, findChapter, readPreference, savePreference } from '../lib/pbatBook'
import '../pbat.css'

function TextRuns({ block }) {
  return block.runs.map((run, index) => {
    let content = run.text.split(/(\[S\d{3}\])/g).map((part, partIndex) =>
      /^\[S\d{3}\]$/.test(part)
        ? <a key={partIndex} href={`#source-${part.slice(1, -1).toLowerCase()}`} className="book-reference">{part}</a>
        : part
    )
    if (run.bold) content = <strong>{content}</strong>
    if (run.italic) content = <em>{content}</em>
    if (run.href) return <a key={index} href={run.href} target="_blank" rel="noopener noreferrer">{content}</a>
    return <span key={index}>{content}</span>
  })
}

export default function PbatPage() {
  const [book, setBook] = useState(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState('')
  const [fontSize, setFontSize] = useState(() => {
    const saved = readPreference(`${READING_KEY}-font`, 18)
    return Number.isFinite(saved) ? Math.min(24, Math.max(16, saved)) : 18
  })
  const [savedPlace, setSavedPlace] = useState(() => readPreference(READING_KEY, null))
  const readerRef = useRef(null)
  const articleRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const chapters = book?.chapters || []
  const target = location.hash.slice(1)
  const chapter = findChapter(chapters, target) || chapters[0]
  const chapterIndex = chapters.indexOf(chapter)
  const previous = chapters[chapterIndex - 1]
  const next = chapters[chapterIndex + 1]
  const savedChapter = savedPlace && findChapter(chapters, savedPlace.id)

  useEffect(() => {
    const controller = new AbortController()
    setError(false)
    fetch(`${BOOK_PATH}/book.json`, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Book unavailable')
        return response.json()
      })
      .then(data => {
        if (!Array.isArray(data.chapters) || !data.chapters.length) throw new Error('Book unavailable')
        setBook(data)
      })
      .catch(reason => { if (reason.name !== 'AbortError') setError(true) })
    return () => controller.abort()
  }, [attempt])

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${BOOK_TITLE} | PBAT2.0 | RTIFN Osun`
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [])

  useEffect(() => {
    if (!chapter || !target) return
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(target) || readerRef.current
      element?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [chapter?.id, target, book])

  useEffect(() => {
    if (!chapter || !articleRef.current) return
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (!visible) return
      const place = { id: visible.target.id, label: visible.target.textContent }
      savePreference(READING_KEY, place)
      setSavedPlace(place)
    }, { rootMargin: '-110px 0px -55% 0px', threshold: 0 })
    articleRef.current.querySelectorAll('[data-reading-position]').forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [chapter?.id, book])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term.length < 2) return []
    const matches = []
    for (const section of chapters) {
      let point = null
      for (const block of section.blocks) {
        if (block.type === 'point') point = block
        if (block.text.toLowerCase().includes(term)) {
          const id = block.id || point?.id || section.id
          if (!matches.some(match => match.id === id)) {
            matches.push({ id, title: point?.text || (block.type === 'source' ? block.text : section.title), section: section.title })
          }
        }
      }
    }
    return matches
  }, [query, book])

  function goTo(id) {
    setQuery('')
    if (target === id) {
      (document.getElementById(id) || readerRef.current)?.scrollIntoView({ block: 'start' })
    } else {
      navigate({ pathname: '/pbat2-0', hash: `#${id}` })
    }
  }

  function changeFont(delta) {
    const value = Math.max(16, Math.min(24, fontSize + delta))
    setFontSize(value)
    savePreference(`${READING_KEY}-font`, value)
  }

  return (
    <div className="pbat-page">
      <section className="pbat-intro" aria-labelledby="pbat-title">
        <div className="pbat-intro-inner">
          <div className="pbat-intro-copy">
            <p className="pbat-eyebrow">RTIFN Osun State Chapter · Digital library</p>
            <h1 id="pbat-title">PBAT2.0</h1>
            <h2>Road to 2027:<br /><span>Renewed Hope 2.0</span></h2>
            <p className="pbat-description">Read the book online. Explore 100 numbered points on Nigeria’s
              projects, policies and reforms, and the benefits they aim to bring to citizens.</p>
            <p className="pbat-book-facts">100 points <span>·</span> 10 sections <span>·</span> November 2026 edition</p>
            <div className="pbat-actions">
              <button type="button" onClick={() => chapter && goTo(chapters[0].id)} disabled={!book} className="pbat-primary">
                <FiBookOpen aria-hidden="true" /> Start reading <FiArrowRight aria-hidden="true" />
              </button>
              <a href={BOOK_PDF} download className="pbat-download"><FiDownload aria-hidden="true" /> Download PDF <span>(1.1 MB)</span></a>
            </div>
            <div className="pbat-credits">
              <p>Compiled, designed and created by <strong>Adebimpe Mujeeb Adegoke</strong>, Director of Media.</p>
              <p>RTIFN Osun State Chapter, under the leadership of <strong>Engr. Kunle Oyediran</strong>.</p>
            </div>
          </div>
          <div className="pbat-cover-wrap">
            <img src={`${BOOK_PATH}/front-cover.webp`} alt="Approved front cover of Road to 2027: Renewed Hope 2.0"
              width="300" height="424" className="pbat-cover" />
            <p>Read freely. Download for offline reading.</p>
          </div>
        </div>
      </section>

      <section ref={readerRef} id="book-reader" className="pbat-reader" aria-label="Online book reader">
        {error ? (
          <div className="pbat-status" role="alert">
            <h2>The web edition could not load.</h2>
            <p>Please try again, or read the complete PDF.</p>
            <button onClick={() => setAttempt(value => value + 1)} className="pbat-primary">Try again</button>
            <a href={BOOK_PDF} target="_blank" rel="noopener noreferrer">Open the book PDF</a>
          </div>
        ) : !book ? <p className="pbat-status" role="status">Loading the book…</p> : (
          <>
            {savedChapter && savedPlace.id !== target && (
              <div className="pbat-resume">
                <span><FiBookOpen aria-hidden="true" /> Your place is saved on this device.</span>
                <button onClick={() => goTo(savedPlace.id)}>Continue: {savedPlace.label} <FiArrowRight aria-hidden="true" /></button>
              </div>
            )}
            <div className="pbat-reader-grid">
              <aside className="pbat-sidebar" aria-label="Book contents">
                <div className="pbat-sidebar-heading"><FiBookOpen aria-hidden="true" /><h2>Inside the book</h2></div>
                <label className="pbat-search-label" htmlFor="book-search">Search the book</label>
                <div className="pbat-search"><FiSearch aria-hidden="true" /><input id="book-search" type="search"
                  value={query} onChange={event => setQuery(event.target.value)} placeholder="Try education or Osun" /></div>
                {query.trim().length >= 2 ? (
                  <div className="pbat-search-results">
                    <p role="status">{results.length} {results.length === 1 ? 'result' : 'results'}</p>
                    {results.length === 0 && <p>Try a different word or phrase.</p>}
                    {results.map(result => <button key={result.id} onClick={() => goTo(result.id)}>{result.title}<small>{result.section}</small></button>)}
                    <button className="pbat-clear-search" onClick={() => setQuery('')}>Back to contents</button>
                  </div>
                ) : (
                  <>
                    <label className="pbat-mobile-label" htmlFor="book-chapter">Choose a section</label>
                    <select id="book-chapter" className="pbat-chapter-select" value={chapter.id} onChange={event => goTo(event.target.value)}>
                      {chapters.map(section => <option key={section.id} value={section.id}>{section.title}</option>)}
                    </select>
                    <nav className="pbat-chapter-nav" aria-label="Chapters">
                      {chapters.map(section => <a key={section.id} href={`#${section.id}`} aria-current={chapter.id === section.id ? 'true' : undefined}
                        onClick={event => { event.preventDefault(); goTo(section.id) }}>
                        {section.title}<small>{section.range || (section === chapters[0] ? 'Introduction' : 'Reference & publication')}</small>
                      </a>)}
                    </nav>
                    {chapter.range && <details className="pbat-point-guide">
                      <summary>Jump to a point in this section</summary>
                      {chapter.blocks.filter(block => block.type === 'point').map(block => <a key={block.id} href={`#${block.id}`}
                        onClick={event => { event.preventDefault(); goTo(block.id) }}>{block.text}</a>)}
                    </details>}
                  </>
                )}
              </aside>

              <div className="pbat-reading-panel">
                <div className="pbat-reader-toolbar">
                  <p>Section {chapterIndex + 1} of {chapters.length}</p>
                  <div className="pbat-text-controls" role="group" aria-label="Text size">
                    <span>Text size</span>
                    <button onClick={() => changeFont(-1)} disabled={fontSize <= 16} aria-label="Decrease text size">A−</button>
                    <button onClick={() => changeFont(1)} disabled={fontSize >= 24} aria-label="Increase text size">A+</button>
                  </div>
                </div>
                <article ref={articleRef} className="pbat-book-content" style={{ fontSize: `${fontSize}px` }} aria-labelledby={chapter.id}>
                  <p className="pbat-reading-kicker">{book.title}</p>
                  <h2 id={chapter.id} data-reading-position="true">{chapter.title}</h2>
                  {chapter.blocks.map((block, index) => {
                    if (block.type === 'point') return <h3 key={index} id={block.id} data-reading-position="true"><TextRuns block={block} /></h3>
                    if (block.type === 'source') return <h3 key={index} id={block.id} className="pbat-source-title"><TextRuns block={block} /></h3>
                    return <p key={index} className={block.type === 'benefit' ? 'pbat-benefit' : block.type === 'note' ? 'pbat-note' : undefined}><TextRuns block={block} /></p>
                  })}
                  {chapterIndex === chapters.length - 1 && <img className="pbat-back-cover" src={`${BOOK_PATH}/back-cover.webp`}
                    alt="Back cover of Road to 2027: Renewed Hope 2.0" loading="lazy" width="300" height="424" />}
                </article>
                <nav className="pbat-pagination" aria-label="Reading navigation">
                  {previous ? <button onClick={() => goTo(previous.id)}><FiArrowLeft aria-hidden="true" /><span><small>Previous section</small>{previous.title}</span></button> : <span />}
                  {next ? <button onClick={() => goTo(next.id)}><span><small>Next section</small>{next.title}</span><FiArrowRight aria-hidden="true" /></button>
                    : <a href={BOOK_PDF} download><span><small>Keep a copy</small>Download the complete PDF</span><FiDownload aria-hidden="true" /></a>}
                </nav>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
