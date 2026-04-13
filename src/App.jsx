import { useEffect } from 'react'
import Lenis from 'lenis'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useScrollAnimations } from './hooks/useGsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AnimatedBg from './components/AnimatedBg'
import Skills from './components/Skills'
import Chatbot from './components/Chatbot'

function AppContent() {
  const { theme } = useTheme()

  useScrollAnimations()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <AnimatedBg />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
      <ToastContainer
        position="bottom-right"
        theme={theme}
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
