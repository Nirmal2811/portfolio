import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up animations
      gsap.utils.toArray('.fade-up').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Fade-in animations
      gsap.utils.toArray('.fade-in').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Stagger children
      gsap.utils.toArray('.stagger-children').forEach((el) => {
        gsap.from(el.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Parallax elements
      gsap.utils.toArray('.parallax').forEach((el) => {
        const speed = el.dataset.speed || 0.3
        gsap.to(el, {
          yPercent: -30 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Scale-in
      gsap.utils.toArray('.scale-in').forEach((el) => {
        gsap.from(el, {
          scale: 0.85,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Horizontal slide
      gsap.utils.toArray('.slide-left').forEach((el) => {
        gsap.from(el, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray('.slide-right').forEach((el) => {
        gsap.from(el, {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])
}
