'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star, Sparkles } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
}

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(2)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Gold Watch',
      price: 2499,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 128,
      isNew: true,
    },
    {
      id: 2,
      name: 'Premium Leather Bag',
      price: 899,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 89,
      isSale: true,
    },
    {
      id: 3,
      name: 'Designer Sunglasses',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Silk Scarf Collection',
      price: 299,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 203,
      isNew: true,
    },
    {
      id: 5,
      name: 'Diamond Earrings',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 67,
    },
    {
      id: 6,
      name: 'Cashmere Coat',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 94,
      isSale: true,
    },
  ])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Handle responsive breakpoints
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth
      if (width < 768) {
        setItemsPerView(2) // Mobile: 2 items
      } else if (width < 1024) {
        setItemsPerView(3) // Tablet: 3 items
      } else {
        setItemsPerView(4) // Desktop: 4 items
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Enhanced autoscroll with pause on hover
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentIndex((prev) => {
            const nextIndex = prev >= maxIndex ? 0 : prev + 1
            return nextIndex
          })
        }
      }, 3500) // Smoother timing
    }

    startAutoScroll()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [maxIndex, isHovered])

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-premium-gold/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-premium-gold/10">
          
          {/* Premium Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-premium-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Product Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
            {product.isNew && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-premium-gold to-yellow-400 text-premium-black px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1"
              >
                <Sparkles size={10} />
                New
              </motion.div>
            )}
            {product.isSale && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
              >
                Sale
              </motion.div>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-3 right-3 z-20 p-2 bg-premium-black/70 backdrop-blur-md rounded-full text-white hover:text-premium-gold hover:bg-premium-gold/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Heart size={16} />
          </motion.button>

          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            {/* Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-premium-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Quick Add Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ scale: 1.05, y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-premium-gold text-premium-black px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-premium-gold/25 transition-all duration-300"
              >
                <ShoppingBag size={16} />
                Quick Add
              </motion.button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-premium-gold fill-current'
                      : 'text-gray-500'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-2">({product.reviews})</span>
            </div>

            {/* Product Name */}
            <h3 className="font-poppins font-semibold text-white mb-3 text-sm leading-tight group-hover:text-premium-gold transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-premium-gold font-bold text-lg">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Header with Navigation */}
      <div className="flex justify-between items-center mb-8">
        {/* Premium Navigation Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-premium-gold/20 rounded-xl text-premium-gold hover:border-premium-gold/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
            disabled={currentIndex === 0}
          >
            <div className="absolute inset-0 bg-premium-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ChevronLeft size={20} className="relative z-10" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 border border-premium-gold/20 rounded-xl text-premium-gold hover:border-premium-gold/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed overflow-hidden"
            disabled={currentIndex === maxIndex}
          >
            <div className="absolute inset-0 bg-premium-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ChevronRight size={20} className="relative z-10" />
          </motion.button>
        </div>

        {/* Premium Progress Indicators */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 mr-2">
            {currentIndex + 1} / {maxIndex + 1}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: Math.max(1, maxIndex + 1) }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 h-2 bg-gradient-to-r from-premium-gold to-yellow-400' 
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-premium-gold/30"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Products Grid */}
      <div className="relative overflow-hidden rounded-2xl">
        <motion.div
          animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
          transition={{ 
            duration: 1.2, 
            ease: [0.23, 1, 0.32, 1], // Premium easing curve
            type: "tween"
          }}
          className="flex"
          style={{ width: `${Math.ceil(products.length / itemsPerView) * 100}%` }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Premium View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link href="/catalog">
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 40px rgba(255, 215, 0, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-r from-premium-gold to-yellow-400 text-premium-black px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Explore All Premium Products
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight size={20} />
              </motion.div>
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default ProductCarousel
