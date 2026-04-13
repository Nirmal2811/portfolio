import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Startup Inc.',
    text: 'Working with this developer was an absolute game-changer. The attention to detail and creative vision exceeded all expectations. Our conversion rate jumped 40% after the redesign.',
    avatar: 'SC',
    color: '#6c63ff',
  },
  {
    name: 'Marcus Rivera',
    role: 'Product Lead, TechCorp',
    text: 'The animations and interactions are buttery smooth. Every micro-detail was carefully considered. This is the most polished product we\'ve ever shipped.',
    avatar: 'MR',
    color: '#00c9a7',
  },
  {
    name: 'Emily Thompson',
    role: 'Founder, DesignLab',
    text: 'Incredible sense of design paired with deep technical expertise. They turned our rough concepts into a stunning, high-performance application.',
    avatar: 'ET',
    color: '#f857a6',
  },
  {
    name: 'David Park',
    role: 'CTO, DataFlow',
    text: 'Not only is the code clean and maintainable, but the user experience is outstanding. Our users love the smooth scrolling and intuitive navigation.',
    avatar: 'DP',
    color: '#ffa726',
  },
  {
    name: 'Lisa Moreau',
    role: 'Marketing Director, Brandly',
    text: 'The dark/light mode implementation alone was worth the investment. Our engagement metrics show users spend 60% more time on site.',
    avatar: 'LM',
    color: '#7c4dff',
  },
]

function StarRating() {
  return (
    <div className="testimonial-stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">
            What clients <span className="text-gradient">say</span>
          </h2>
          <p className="section-subtitle">
            Trusted by startups and established brands to deliver exceptional digital products.
          </p>
        </div>

        <div className="fade-up">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-card">
                  <StarRating />
                  <blockquote className="testimonial-text">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
