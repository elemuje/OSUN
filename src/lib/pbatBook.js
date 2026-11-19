export const BOOK_PATH = '/books/pbat2-0'
export const BOOK_PDF = `${BOOK_PATH}/road-to-2027-renewed-hope-2.0.pdf`
export const BOOK_TITLE = 'Road to 2027: Renewed Hope 2.0'
export const READING_KEY = 'rtifn-pbat2-reading-v1'

export function readPreference(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function savePreference(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Reading remains available when browser storage is disabled.
  }
}

export function findChapter(chapters, id) {
  return chapters.find(chapter => chapter.id === id || chapter.blocks.some(block => block.id === id))
}
