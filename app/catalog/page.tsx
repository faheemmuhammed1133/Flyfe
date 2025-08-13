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
    <div className="min-h-screen bg-luxury-black">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-luxury-gradient py-20"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6"
            >
              Luxury <span className="text-luxury-gold">Collection</span>
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
              className="max-w-md mx-auto relative"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search luxury products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-luxury-black/50 backdrop-blur-sm border border-luxury-gold/30 text-white placeholder-gray-400 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all duration-300 outline-none rounded-none"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Product Catalog */}
        <section className="py-16">
          <ProductCatalog searchQuery={searchQuery} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
