'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import ProductCarousel from '@/components/ProductCarousel'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProducts from '@/components/FeaturedProducts'
import Newsletter from '@/components/Newsletter'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CinematicLoader from '@/components/CinematicLoader'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load time for cinematic effect
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <CinematicLoader key="loader" />}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="min-h-screen bg-premium-black"
          >
            <Header />
            
            <main>
              {/* Hero Section with Cinematic Effects */}
              <HeroSection />
              
              {/* Featured Categories */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="py-20"
              >
                <div className="container mx-auto px-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-16 text-premium-gold"
                  >
                    Premium Categories
                  </motion.h2>
                  <CategoryGrid />
                </div>
              </motion.section>

              {/* Product Carousel */}
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-charcoal"
              >
                <div className="container mx-auto px-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-16 text-white"
                  >
                    Trending Now
                  </motion.h2>
                  <ProductCarousel />
                </div>
              </motion.section>

              {/* Featured Products Grid */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20"
              >
                <div className="container mx-auto px-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-16 text-premium-gold"
                  >
                    Featured Products
                  </motion.h2>
                  <FeaturedProducts />
                </div>
              </motion.section>

              {/* Newsletter Section */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-20 bg-premium-gradient"
              >
                <Newsletter />
              </motion.section>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
