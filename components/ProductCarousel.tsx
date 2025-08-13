'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from 'lucide-react'

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
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Luxury Gold Watch',
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

  const itemsPerView = 4
  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="product-card group cursor-pointer relative"
      >
      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-luxury-gold text-luxury-black px-2 py-1 text-xs font-bold uppercase tracking-wide">
            New
          </span>
        )}
        {product.isSale && (
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 right-4 z-10 p-2 bg-luxury-black/50 backdrop-blur-sm rounded-full text-white hover:text-luxury-gold transition-colors duration-300 opacity-0 group-hover:opacity-100"
      >
        <Heart size={16} />
      </motion.button>

      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="luxury-button px-6 py-2 text-sm flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`${
                i < Math.floor(product.rating)
                  ? 'text-luxury-gold fill-current'
                  : 'text-gray-600'
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        <h3 className="font-poppins font-semibold text-white mb-3 group-hover:text-luxury-gold transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-luxury-gold font-bold text-lg">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
      </motion.div>
    </Link>
  )

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="p-3 bg-charcoal border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="p-3 bg-charcoal border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-luxury-gold w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex"
          style={{ width: `${(products.length / itemsPerView) * 100}%` }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / products.length}%` }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link href="/catalog">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="luxury-button px-8 py-3 text-lg"
          >
            View All Products
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default ProductCarousel
