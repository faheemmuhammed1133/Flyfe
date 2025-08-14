'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCatalog from '@/components/ProductCatalog'
import { Search } from 'lucide-react'

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-premium-black">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-gray-900 via-premium-black to-gray-900 py-20"
        >
          {/* Premium Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-premium-gold/5 via-transparent to-premium-gold/5 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6"
            >
              Premium <span className="text-premium-gold">Collection</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-300 font-poppins mb-12 max-w-2xl mx-auto"
            >
              Discover our curated selection of premium products, crafted for those who demand excellence
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-lg mx-auto relative"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-premium-gold transition-colors duration-300" size={20} />
                <input
                  type="text"
                  placeholder="Search premium products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/70 backdrop-blur-md border border-gray-700/50 text-white placeholder-gray-400 focus:border-premium-gold focus:bg-gray-800/90 focus:ring-1 focus:ring-premium-gold/30 transition-all duration-300 outline-none rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Smooth Transition */}
        <div className="h-px bg-gradient-to-r from-transparent via-premium-gold/20 to-transparent" />

        {/* Product Catalog */}
        <section className="bg-gradient-to-b from-gray-900/50 to-premium-black py-16">
          <ProductCatalog searchQuery={searchQuery} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
