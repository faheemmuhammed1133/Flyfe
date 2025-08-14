'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronDown, Sparkles } from 'lucide-react'

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 250])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    // GSAP Cinematic Animations
    const tl = gsap.timeline()
    
    // Parallax particles animation
    gsap.set('.hero-particle', {
      opacity: 0,
      scale: 0,
    })

    tl.to('.hero-particle', {
      opacity: 1,
      scale: 1,
      duration: 2,
      stagger: 0.1,
      ease: 'power2.out',
    })
    .to('.hero-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2,
    }, 0)

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute bg-premium-gold rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-premium-black via-charcoal/50 to-premium-black"
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-premium-gold/10 border border-premium-gold/30 rounded-full px-6 py-2 mb-8"
        >
          <Sparkles size={16} className="text-premium-gold" />
          <span className="text-premium-gold font-poppins font-medium text-sm tracking-wider uppercase">
            Premium Collection 2024
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-6 leading-tight"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="block"
          >
            Premium
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="block text-premium-gold gold-shimmer"
          >
            Redefined
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-xl md:text-2xl text-gray-300 font-poppins font-light mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the pinnacle of premium shopping with our curated collection of 
          premium products, crafted for those who demand excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            className="premium-button text-lg px-10 py-4"
          >
            Explore Collection
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden bg-transparent border border-white text-white px-10 py-4 font-montserrat font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-premium-black text-lg"
          >
            Watch Story
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
        >
          {[
            { number: '10K+', label: 'Premium Products' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '99.9%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-montserrat font-bold text-premium-gold mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 font-poppins tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-premium-gold hover:text-gold-light transition-colors duration-300"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-poppins tracking-widest uppercase">Scroll</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-premium-black to-transparent" />
    </section>
  )
}

export default HeroSection
