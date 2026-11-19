import { Link } from 'react-router-dom'
import { FiBookOpen, FiDownload, FiArrowRight } from 'react-icons/fi'
import { BOOK_PATH, BOOK_PDF } from '../lib/pbatBook'

export default function PbatBookSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-20" aria-labelledby="pbat-home-title">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[240px_1fr] gap-10 md:gap-16 items-center">
        <Link to="/pbat2-0" className="justify-self-center" aria-label="Read Road to 2027: Renewed Hope 2.0">
          <img src={`${BOOK_PATH}/front-cover.webp`} alt="Road to 2027: Renewed Hope 2.0 book cover"
            loading="lazy" width="240" height="339" className="w-48 md:w-60 rounded-sm shadow-2xl" />
        </Link>
        <div>
          <span className="section-label">PBAT2.0</span>
          <h2 id="pbat-home-title" className="section-title">Road to 2027:<br />Renewed Hope 2.0</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mt-4">
            Explore the book from RTIFN Osun State Chapter. Read 100 numbered points on
            projects, policies and reforms, with each point followed by its benefit to citizens.
          </p>
          <p className="text-sm text-green-700 font-semibold mt-4">100 points · 10 sections · Read freely online</p>
          <div className="flex flex-wrap gap-4 mt-7">
            <Link to="/pbat2-0" className="btn-green"><FiBookOpen aria-hidden="true" /> Read the book <FiArrowRight aria-hidden="true" /></Link>
            <a href={BOOK_PDF} download className="inline-flex items-center gap-2 text-green-800 font-semibold px-3 py-3 hover:underline">
              <FiDownload aria-hidden="true" /> Download PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
