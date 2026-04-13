import { useState } from 'react'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_9cgowss'
const EMAILJS_TEMPLATE_ID = 'template_yvrebrs'
const EMAILJS_PUBLIC_KEY = 'WZpyoFhKdv9I1F6Hb'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          user_message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )

      console.log('✅ Message sent successfully:', result)
      toast.success('Message sent! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('❌ EmailJS Error Details:', error.text, error.status)
      toast.error(`Error: ${error.text || 'Something went wrong. Please try again.'}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-wrapper">
              <div className="row g-0">
                <div className="col-lg-5">
                  <div className="contact-info slide-left">
                    <span className="section-tag">Contact</span>
                    <h2 className="contact-title">
                      Let&apos;s work <span className="text-gradient">together</span>
                    </h2>
                    <p className="contact-description">
                      Have a project in mind? Let&apos;s create something extraordinary together. Drop me a line and I&apos;ll get back to you within 24 hours.
                    </p>

                    <div className="contact-details">
                      <div className="contact-detail-item">
                        <div className="contact-detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                        <span>nirmalkm2811@gmail.com</span>
                      </div>
                      <div className="contact-detail-item">
                        <div className="contact-detail-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <span>Coimbatore, TN</span>
                      </div>
                    </div>

                    <div className="contact-socials">
                      {['GitHub', 'LinkedIn', 'Twitter'].map((s) => (
                        <a href="#" key={s} className="social-link" aria-label={s}>{s}</a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-7">
                  <form className="contact-form slide-right" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="5"
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg btn-glow w-100" disabled={sending}>
                      {sending ? (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <span className="spinner"></span> Sending...
                        </span>
                      ) : (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          Send Message
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
