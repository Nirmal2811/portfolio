const HIGHLIGHTS = [
  { number: '50+', label: 'Projects Completed' },
  { number: '30+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '15+', label: 'Awards Won' },
]

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Building fast, scalable web applications with modern frameworks and best practices.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Crafting intuitive interfaces with a focus on user experience and visual aesthetics.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Motion & Animation',
    description: 'Creating captivating scroll-driven animations and micro-interactions that engage users.',
  },
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section header */}
        <div className="section-header fade-up">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Designing the <span className="text-gradient">future of web</span>
          </h2>
        </div>

        <div className="about-layout">
          {/* Left — Profile card */}
          <div className="about-profile slide-left">
            <div className="about-avatar">
              <div className="avatar-placeholder">
                <img src="/Nirmal11.jpeg" alt="Profile" className="avatar-image" />
              </div>
              <div className="avatar-ring"></div>
              <div className="avatar-status"></div>
            </div>

            <div className="about-highlights stagger-children">
              {HIGHLIGHTS.map((h, i) => (
                <div className="highlight-item" key={i}>
                  <span className="highlight-number">{h.number}</span>
                  <span className="highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Bio + Services */}
          <div className="about-content slide-right">
            <div className="about-bio">
              <p className="about-intro">
                I&apos;m a creative developer who thrives at the intersection of design and engineering.
                With over 5 years of experience, I build digital products that are not only beautiful
                but perform exceptionally.
              </p>
              <p className="about-description">
                My approach combines meticulous attention to detail with cutting-edge technology.
                I believe every interaction should feel intentional — from the smoothest scroll
                animation to the boldest typographic choice. I partner with startups and brands
                to turn ambitious visions into polished, high-converting digital experiences.
              </p>
            </div>

            <div className="about-services stagger-children">
              {SERVICES.map((s, i) => (
                <div className="service-card" key={i}>
                  <div className="service-icon">{s.icon}</div>
                  <div>
                    <h3 className="service-title">{s.title}</h3>
                    <p className="service-description">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cta fade-up">
              <a
                href="#contact"
                className="btn btn-primary btn-glow"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Let&apos;s Talk
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#work"
                className="btn btn-outline"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
