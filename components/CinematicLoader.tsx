'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CinematicLoader = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate random particles for cinematic effect
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="cinematic-loader"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-luxury-black">
        <div className="gold-particles">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 3,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Logo Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-montserrat font-black text-luxury-gold tracking-wider"
            initial={{ letterSpacing: '0.5em', opacity: 0 }}
            animate={{ letterSpacing: '0.1em', opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }}
          >
            FLYFE
          </motion.h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-white text-lg md:text-xl font-poppins font-light tracking-widest uppercase"
        >
          Luxury Redefined
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 1.8 }}
          className="mt-12 h-0.5 bg-luxury-gold relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-gold-light to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      </div>

      {/* Cinematic Overlay Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-black/20 to-luxury-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.div>
  )
}

export default CinematicLoader
