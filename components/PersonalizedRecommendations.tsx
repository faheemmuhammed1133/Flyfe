'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, TrendingUp, User, Sparkles } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  isNew?: boolean
  isSale?: boolean
  discount?: number
  recommendationReason: string
}

interface PersonalizedRecommendationsProps {
  userId?: string
  currentProductId?: number
  maxItems?: number
}

const PersonalizedRecommendations = ({ 
  userId, 
  currentProductId, 
  maxItems = 6 
}: PersonalizedRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'trending' | 'personal' | 'similar'>('personal')

  // Mock personalized recommendations - in real app, this would come from ML/AI service
  const mockRecommendations: Product[] = [
    {
      id: 201,
      name: 'Sapphire Engagement Ring',
      price: 4299,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 234,
      category: 'Jewelry',
      brand: 'Flyfe Elite',
      isSale: true,
      discount: 14,
      recommendationReason: 'Based on your premium jewelry preferences'
    },
    {
      id: 202,
      name: 'Swiss Chronograph Watch',
      price: 5899,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 89,
      category: 'Watches',
      brand: 'Flyfe Premium',
      isNew: true,
      recommendationReason: 'Customers like you also bought this'
    },
    {
      id: 203,
      name: 'Italian Leather Briefcase',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 156,
      category: 'Accessories',
      brand: 'Flyfe',
      recommendationReason: 'Perfect for your professional style'
    },
    {
      id: 204,
      name: 'Gold Chain Bracelet',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 123,
      category: 'Jewelry',
      brand: 'Flyfe',
      isSale: true,
      discount: 19,
      recommendationReason: 'Trending in your area'
    },
    {
      id: 205,
      name: 'Designer Silk Tie',
      price: 299,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 67,
      category: 'Accessories',
      brand: 'Flyfe',
      recommendationReason: 'Complements your recent purchases'
    },
    {
      id: 206,
      name: 'Pearl Necklace Set',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 178,
      category: 'Jewelry',
      brand: 'Flyfe Elite',
      isNew: true,
      recommendationReason: 'Frequently bought together'
    },
  ]

  useEffect(() => {
    // Simulate API call for personalized recommendations
    const fetchRecommendations = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate loading
      
      let filteredRecommendations = mockRecommendations
      if (currentProductId) {
        filteredRecommendations = mockRecommendations.filter(p => p.id !== currentProductId)
      }
      
      setRecommendations(filteredRecommendations.slice(0, maxItems))
      setIsLoading(false)
    }

    fetchRecommendations()
  }, [userId, currentProductId, maxItems])

  const tabs = [
    { id: 'personal', label: 'For You', icon: User },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'similar', label: 'Similar', icon: Sparkles },
  ]

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="product-card group relative bg-charcoal"
    >
      <Link href={`/products/${product.id}`}>
        {/* Recommendation Badge */}
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="bg-premium-gold/90 text-premium-black px-2 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm"
          >
            Recommended
          </motion.div>
        </div>

        {/* Product Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
              New
            </span>
          )}
          {product.isSale && product.discount && (
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-premium-black/50 flex items-center justify-center transition-opacity duration-300"
          >
            <div className="flex gap-3">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add to cart logic
                }}
                className="premium-button px-4 py-2 flex items-center gap-2"
              >
                <ShoppingBag size={14} />
                Add
              </motion.button>
              
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add to wishlist logic
                }}
                className="p-2 bg-premium-black/70 hover:bg-premium-gold hover:text-premium-black text-white rounded-full transition-all duration-300"
              >
                <Heart size={14} />
              </motion.button>
            </div>
          </motion.div>

          {/* Gold Shimmer Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-gold/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Recommendation Reason */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            viewport={{ once: true }}
            className="text-premium-gold text-xs font-poppins font-medium mb-2 italic"
          >
            {product.recommendationReason}
          </motion.p>

          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="text-gray-500 text-xs uppercase">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-premium-gold fill-current'
                    : 'text-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">
              ({product.reviews})
            </span>
          </div>

          {/* Product Name */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
            className="font-poppins font-semibold text-white mb-3 group-hover:text-premium-gold transition-colors duration-300 leading-tight line-clamp-2"
          >
            {product.name}
          </motion.h3>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-premium-gold font-bold text-lg">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )

  if (isLoading) {
    return (
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-2 border-premium-gold border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-300 font-poppins">
              Curating personalized recommendations for you...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-charcoal">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-premium-gold/10 border border-premium-gold/30 rounded-full px-6 py-2 mb-6">
            <Sparkles size={16} className="text-premium-gold" />
            <span className="text-premium-gold font-poppins font-medium text-sm tracking-wider uppercase">
              Curated for You
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
            Personalized Recommendations
          </h2>
          <p className="text-gray-300 font-poppins max-w-2xl mx-auto">
            Discover premium pieces selected just for you based on your preferences, 
            browsing history, and style profile
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-premium-black border border-dark-gray rounded-none overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-poppins font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-premium-gold text-premium-black'
                    : 'text-gray-300 hover:text-premium-gold hover:bg-premium-gold/10'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-premium-black/50 border border-premium-gold/20 rounded-none p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-4">
              Your Style Profile
            </h3>
            <p className="text-gray-300 font-poppins mb-6">
              Based on your activity, you prefer premium jewelry and premium accessories. 
              You value craftsmanship and tend to invest in timeless pieces.
            </p>
            <Link href="/profile/preferences">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="premium-button px-6 py-2 text-sm"
              >
                Refine Preferences
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalizedRecommendations
