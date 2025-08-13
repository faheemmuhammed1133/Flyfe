'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Checkout from '@/components/Checkout'

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-luxury-black">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-12 bg-charcoal border-b border-dark-gray"
        >
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-luxury-gold mb-4">
                Secure Checkout
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Complete your luxury shopping experience with our secure, encrypted checkout process
              </p>
            </div>
          </div>
        </motion.section>

        {/* Checkout Component */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-12"
        >
          <div className="container mx-auto px-4">
            <Checkout 
              items={[]} 
              onClose={() => {}} 
            />
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
