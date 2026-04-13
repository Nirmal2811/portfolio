export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <span className="brand-accent">{'<'}</span>Dev<span className="brand-accent">{'/>'}</span>
            </a>
            <p className="footer-tagline">
              Crafting digital experiences with passion and precision.
            </p>
          </div>

          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#work">Work</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-bottom">
            <p>&copy; {year} All rights reserved. Built with React &amp; passion.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
