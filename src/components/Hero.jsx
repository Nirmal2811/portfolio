import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 })
        .from(titleRef.current.children, { y: 80, opacity: 0, stagger: 0.15, duration: 1 }, '-=0.4')
        .from('.hero-description', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-stats .stat-item', { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.3')
        .from('.hero-scroll-indicator', { opacity: 0, duration: 1 }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToAbout = (e) => {
    e.preventDefault()
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* Decorative background shapes */}
      <div className="hero-bg">
        <div className="hero-gradient-orb hero-gradient-orb--1 parallax" data-speed="0.5"></div>
        <div className="hero-gradient-orb hero-gradient-orb--2 parallax" data-speed="0.3"></div>
        <div className="hero-grid-overlay"></div>
      </div>

      <div className="container hero-content">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10 col-xl-8">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Available for freelance work
            </div>

            <h1 className="hero-title" ref={titleRef}>
              <span className="title-line">I craft</span>
              <span className="title-line title-accent">digital experiences</span>
              <span className="title-line">that inspire</span>
            </h1>

            <p className="hero-description">
              A creative developer specializing in modern web applications with
              bold design, smooth animations, and exceptional user experiences.
            </p>

            <div className="hero-cta">
              <a href="#work" className="btn btn-primary btn-lg btn-glow" onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}>
                View My Work
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-outline btn-lg" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Get in Touch
              </a>
            </div>

            {/* <div className="hero-stats stagger-children">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <button className="hero-scroll-indicator" onClick={scrollToAbout} aria-label="Scroll down">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll</span>
      </button>
    </section>
  )
}
