import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const PARTICLE_COUNT = 40

export default function AnimatedBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate particles
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      const color = isDark ? '255,255,255' : '0,0,0'

      particles.forEach((p) => {
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`
        ctx.fill()
      })

      // Draw faint connections for nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${color}, ${0.04 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Floating gradient orbs animated with GSAP
  const orb1 = useRef(null)
  const orb2 = useRef(null)
  const orb3 = useRef(null)

  useEffect(() => {
    const orbs = [orb1.current, orb2.current, orb3.current]
    const tweens = orbs.map((el, i) =>
      gsap.to(el, {
        x: `random(-120, 120)`,
        y: `random(-120, 120)`,
        duration: 8 + i * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      })
    )
    return () => tweens.forEach((t) => t.kill())
  }, [])

  return (
    <div className="animated-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="floating-orb floating-orb--1" ref={orb1}></div>
      <div className="floating-orb floating-orb--2" ref={orb2}></div>
      <div className="floating-orb floating-orb--3" ref={orb3}></div>
    </div>
  )
}
