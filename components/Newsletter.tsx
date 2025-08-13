'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Sparkles } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-full mb-8"
        >
          <Sparkles className="text-luxury-gold" size={32} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-6"
        >
          Stay in the 
          <span className="text-luxury-gold"> Loop</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 font-poppins mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Be the first to discover our exclusive collections, limited editions, 
          and receive insider access to luxury deals.
        </motion.p>

        {!isSubscribed ? (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 bg-luxury-black border border-dark-gray text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all duration-300 outline-none"
                required
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="luxury-button px-8 py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Subscribe
                  <Send size={16} />
                </>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full px-8 py-4 mb-4">
              <div className="w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center">
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-4 h-4 text-luxury-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
              <span className="text-luxury-gold font-poppins font-semibold">
                Successfully Subscribed!
              </span>
            </div>
            <p className="text-gray-300 font-poppins">
              Welcome to the Flyfe family. Check your inbox for exclusive offers.
            </p>
          </motion.div>
        )}

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              title: 'Exclusive Access',
              description: 'First look at new collections and limited editions'
            },
            {
              title: 'Special Offers',
              description: 'Subscriber-only discounts and luxury deals'
            },
            {
              title: 'Style Insights',
              description: 'Expert tips and luxury lifestyle content'
            }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-luxury-gold font-poppins font-semibold mb-2 text-lg">
                {benefit.title}
              </h3>
              <p className="text-gray-400 font-poppins text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-12 text-gray-500 text-sm"
        >
          <span>✓ No spam, ever</span>
          <span>✓ Unsubscribe anytime</span>
          <span>✓ Privacy protected</span>
        </motion.div>
      </div>
    </div>
  )
}

export default Newsletter
