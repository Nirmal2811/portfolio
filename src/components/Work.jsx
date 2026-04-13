import { useState, useCallback } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const PROJECTS = [
  {
    title: 'E-Commerce Platform',
    category: 'Web App',
    description: 'Full-stack shopping experience with real-time inventory and payment integration.',
    color: '#6c63ff',
    tags: ['React', 'Flask', 'Postgres'],
    image: '/Ecom.png',
  },
  {
    title: 'Ticketing & Attendance System',
    category: 'Web App',
    description: 'Comprehensive ticketing and attendance management system with real-time analytics.',
    color: '#00c9a7',
    tags: ['React', 'Flask', 'Postgres'],
    image: '/Ticketing.png',
  },
  {
    title: 'HeartLink India',
    category: 'Website',
    description: 'Non-profit website for HeartLink India, a charity focused on providing cardiac care to underserved communities.',
    color: '#f857a6',
    tags: ['Wordpress ACF', 'Razorpay Integration'],
    image: '/Heartlinkindia.png',
  },
  {
    title: 'Kerala Ayurveda',
    category: 'Website',
    description: 'Informative website for Kerala Ayurveda, showcasing their range of products and services with a focus on holistic wellness.',
    color: '#ff6b6b',
    tags: ['React', 'Framer Motion'],
    image: '/Ayurveda.png',
  },
  
]

const FILTERS = ['All', ...new Set(PROJECTS.map((p) => p.category))]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter)

  const slides = filtered.map((p) => ({ src: p.image, alt: p.title }))

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index)
  }, [])

  return (
    <section id="work" className="work-section">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Selected <span className="text-gradient">works</span>
          </h2>
          <p className="section-subtitle">
            A curated showcase of projects that reflect my passion for creative development.
          </p>
        </div>

        <div className="work-filters fade-up">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${f === activeFilter ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {filtered.map((project, i) => (
            <div className="work-card scale-in" key={project.title}>
              <div
                className="work-card-image"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="work-card-overlay" style={{ background: `linear-gradient(135deg, ${project.color}cc, ${project.color}33)` }}>
                  <span className="overlay-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="work-card-body">
                <span className="work-category" style={{ color: project.color }}>{project.category}</span>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-description">{project.description}</p>
                <div className="work-tags">
                  {project.tags.map((tag) => (
                    <span className="work-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
      />
    </section>
  )
}
