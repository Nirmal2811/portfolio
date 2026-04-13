import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'React.js', level: 95, color: '#61dafb' },
  { name: 'JavaScript', level: 92, color: '#f7df1e' },
  { name: 'HTML / CSS', level: 96, color: '#e44d26' },
  { name: 'GSAP Animations', level: 85, color: '#88ce02' },
  { name: 'UI / UX Design', level: 88, color: '#f857a6' },
  { name: 'Bootstrap / Tailwind', level: 90, color: '#7952b3' },
  { name: 'TypeScript', level: 78, color: '#3178c6' },
  { name: 'Node.js', level: 75, color: '#339933' },
]

const TOOLS = [
  'VS Code', 'Figma', 'Git', 'GitHub', 'Vite', 'Webpack',
  'Postman', 'NPM', 'Chrome DevTools', 'Vercel', 'Netlify', 'Firebase',
]

function SkillBar({ name, level, color }) {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [level])

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-percent" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          ref={barRef}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        >
          <div className="skill-bar-glow" style={{ background: color }}></div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header fade-up">
          <span className="section-tag">Skills</span>
          <h2 className="section-title">
            My <span className="text-gradient">expertise</span>
          </h2>
          <p className="section-subtitle">
            A blend of technical skills and creative tools refined over years of professional experience.
          </p>
        </div>

        <div className="row g-5">
          {/* Skill Bars */}
          <div className="col-lg-7 fade-up">
            <div className="skills-bars">
              {SKILLS.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Tools & Soft Skills */}
          <div className="col-lg-5 fade-up">
            <div className="skills-side">
              <div className="skill-orbit">
                <div className="orbit-center">
                  <span className="orbit-label">Core</span>
                </div>
                <div className="orbit-ring orbit-ring--1">
                  <div className="orbit-dot" style={{ '--i': 0 }}>⚛️</div>
                  <div className="orbit-dot" style={{ '--i': 1 }}>⚡</div>
                  <div className="orbit-dot" style={{ '--i': 2 }}>🎨</div>
                  <div className="orbit-dot" style={{ '--i': 3 }}>🎬</div>
                </div>
                <div className="orbit-ring orbit-ring--2">
                  <div className="orbit-dot" style={{ '--i': 0 }}>📦</div>
                  <div className="orbit-dot" style={{ '--i': 1 }}>🔗</div>
                  <div className="orbit-dot" style={{ '--i': 2 }}>🖥️</div>
                  <div className="orbit-dot" style={{ '--i': 3 }}>🚀</div>
                </div>
              </div>

              <div className="tools-grid">
                <h3 className="tools-title">Tools & Platforms</h3>
                <div className="tools-tags stagger-children">
                  {TOOLS.map((tool) => (
                    <span className="tool-tag" key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
