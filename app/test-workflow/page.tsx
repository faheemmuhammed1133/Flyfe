'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ShoppingBag, Heart, User, Search, Eye, ArrowRight } from 'lucide-react'

export default function TestWorkflowPage() {
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
                Workflow Test Page
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Test all navigation flows and component connections in the Flyfe luxury e-commerce platform
              </p>
            </div>
          </div>
        </motion.section>

        {/* Navigation Test Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Home Page */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-luxury-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white">Home Page</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Complete luxury shopping experience with hero section, product carousels, and categories
                </p>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="luxury-button w-full flex items-center justify-center gap-2"
                  >
                    Visit Home <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Product Detail */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <Eye className="text-luxury-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white">Product Detail</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Detailed product view with zoom, reviews, specifications, and related products
                </p>
                <Link href="/products/1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="luxury-button w-full flex items-center justify-center gap-2"
                  >
                    View Product <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Product Catalog */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <Search className="text-luxury-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white">Product Catalog</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Browse all products with advanced filtering, search, and sorting options
                </p>
                <Link href="/catalog">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="luxury-button w-full flex items-center justify-center gap-2"
                  >
                    Browse Catalog <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Checkout Flow */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-luxury-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white">Checkout</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Secure multi-step checkout process with shipping, payment, and order review
                </p>
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="luxury-button w-full flex items-center justify-center gap-2"
                  >
                    Test Checkout <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Header Components */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <Heart className="text-luxury-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white">Wishlist & Cart</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Test shopping cart and wishlist functionality from the header icons
                </p>
                <div className="text-sm text-gray-500">
                  Click the heart or shopping bag icons in the header to test these components
                </div>
              </motion.div>

              {/* User Authentication */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-luxury-gold/20 rounded-full flex items-center justify-center">
                    <User className="text-luxury-gold" size={24} />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-white">User Auth</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Login, register, and password reset modals with form validation
                </p>
                <div className="text-sm text-gray-500">
                  Click the user icon in the header to test authentication flows
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Workflow Instructions */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-montserrat font-bold text-luxury-gold mb-8 text-center">
                Complete Workflow Test
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-luxury-black border border-dark-gray p-6">
                  <h3 className="text-xl font-poppins font-semibold text-white mb-4">
                    🛍️ Shopping Flow
                  </h3>
                  <ol className="text-gray-300 space-y-2 text-sm">
                    <li>1. Browse products on home page or catalog</li>
                    <li>2. Click on any product to view details</li>
                    <li>3. Add items to cart or wishlist</li>
                    <li>4. View cart from header icon</li>
                    <li>5. Proceed to checkout</li>
                    <li>6. Complete secure payment flow</li>
                  </ol>
                </div>
                
                <div className="bg-luxury-black border border-dark-gray p-6">
                  <h3 className="text-xl font-poppins font-semibold text-white mb-4">
                    👤 User Flow
                  </h3>
                  <ol className="text-gray-300 space-y-2 text-sm">
                    <li>1. Click user icon to open auth modal</li>
                    <li>2. Register or login to account</li>
                    <li>3. Save items to wishlist</li>
                    <li>4. View wishlist from heart icon</li>
                    <li>5. Manage saved items</li>
                    <li>6. Complete personalized checkout</li>
                  </ol>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-400 mb-4">
                  All components are fully connected with proper navigation and state management
                </p>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="luxury-button px-8 py-3 text-lg"
                  >
                    Start Shopping Experience
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
