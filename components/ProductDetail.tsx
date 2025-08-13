'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Minus, 
  Plus, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface ProductDetailProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    images: string[]
    rating: number
    reviews: number
    description: string
    features: string[]
    specifications: { [key: string]: string }
    category: string
    brand: string
    inStock: number
    isNew?: boolean
    isSale?: boolean
    discount?: number
  }
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = ['Black', 'Gold', 'Silver', 'Rose Gold']

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.inStock, prev + change)))
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { productId: product.id, quantity, selectedSize })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="bg-luxury-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square overflow-hidden bg-charcoal rounded-none cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              
              {/* Product Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-luxury-gold text-luxury-black px-3 py-1 text-sm font-bold uppercase tracking-wide">
                    New
                  </span>
                )}
                {product.isSale && product.discount && (
                  <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wide">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-black/70 hover:bg-luxury-gold hover:text-luxury-black text-white rounded-full transition-all duration-300"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-luxury-black/70 hover:bg-luxury-gold hover:text-luxury-black text-white rounded-full transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 relative overflow-hidden bg-charcoal rounded-none border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-luxury-gold' : 'border-transparent hover:border-luxury-gold/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-luxury-gold text-sm font-poppins font-medium tracking-wider uppercase mb-2">
                {product.brand} • {product.category}
              </p>
              
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-luxury-gold fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-luxury-gold">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-invert max-w-none"
            >
              <p className="text-gray-300 leading-relaxed font-poppins">
                {product.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-montserrat font-semibold mb-4 text-luxury-gold">
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-montserrat font-semibold mb-4 text-luxury-gold">
                Size
              </h3>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border transition-all duration-300 font-poppins font-medium ${
                      selectedSize === size
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                        : 'border-gray-600 text-gray-300 hover:border-luxury-gold hover:text-luxury-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quantity & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              {/* Quantity */}
              <div>
                <h3 className="text-lg font-montserrat font-semibold mb-4 text-luxury-gold">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-600">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-6 py-3 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">
                    {product.inStock} in stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 luxury-button px-8 py-4 text-lg flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlist}
                  className={`p-4 border transition-all duration-300 ${
                    isWishlisted
                      ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                      : 'border-gray-600 text-gray-300 hover:border-luxury-gold hover:text-luxury-gold'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border border-gray-600 text-gray-300 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-800"
            >
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders over $500' },
                { icon: Shield, title: 'Secure Payment', desc: 'SSL encrypted' },
                { icon: RotateCcw, title: 'Easy Returns', desc: '30-day policy' },
              ].map((item, index) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                    <item.icon className="text-luxury-gold" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={800}
                height={800}
                className="object-contain max-h-[90vh]"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-luxury-black/70 hover:bg-luxury-gold hover:text-luxury-black text-white rounded-full transition-all duration-300"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetail
