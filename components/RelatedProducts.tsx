'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'

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
}

interface RelatedProductsProps {
  currentProductId: number
  category: string
  title?: string
}

const RelatedProducts = ({ currentProductId, category, title = "Related Products" }: RelatedProductsProps) => {
  // Mock related products data - in real app, this would come from API
  const relatedProducts: Product[] = [
    {
      id: 101,
      name: 'Premium Gold Bracelet',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 89,
      category: 'Jewelry',
      brand: 'Flyfe',
      isSale: true,
      discount: 19,
    },
    {
      id: 102,
      name: 'Diamond Tennis Necklace',
      price: 2899,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 156,
      category: 'Jewelry',
      brand: 'Flyfe',
      isNew: true,
    },
    {
      id: 103,
      name: 'Pearl Drop Earrings',
      price: 899,
      originalPrice: 1099,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 67,
      category: 'Jewelry',
      brand: 'Flyfe',
      isSale: true,
      discount: 18,
    },
    {
      id: 104,
      name: 'Vintage Gold Ring',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 234,
      category: 'Jewelry',
      brand: 'Flyfe',
    },
  ].filter(product => product.id !== currentProductId)

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="product-card group relative bg-charcoal"
    >
      <Link href={`/products/${product.id}`}>
        {/* Product Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
              className="bg-premium-gold text-premium-black px-3 py-1 text-xs font-bold uppercase tracking-wide"
            >
              New
            </motion.span>
          )}
          {product.isSale && product.discount && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
              className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide"
            >
              -{product.discount}%
            </motion.span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Add to wishlist logic
            }}
            className="p-2 bg-premium-black/70 backdrop-blur-sm rounded-full text-white hover:text-premium-gold hover:bg-premium-gold/20 transition-all duration-300"
            aria-label="Add to wishlist"
          >
            <Heart size={16} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              // Quick view logic
            }}
            className="p-2 bg-premium-black/70 backdrop-blur-sm rounded-full text-white hover:text-premium-gold hover:bg-premium-gold/20 transition-all duration-300"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </motion.button>
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
              className="premium-button px-6 py-3 flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Quick Add
            </motion.button>
          </motion.div>

          {/* Gold Shimmer Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-gold/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Brand & Category */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-2"
          >
            <span className="text-premium-gold text-xs font-poppins font-medium tracking-wider uppercase">
              {product.brand}
            </span>
            <span className="text-gray-500 text-xs uppercase">
              {product.category}
            </span>
          </motion.div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-premium-gold fill-current'
                    : 'text-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-2">
              ({product.reviews})
            </span>
          </div>

          {/* Product Name */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
            viewport={{ once: true }}
            className="font-poppins font-semibold text-white mb-4 group-hover:text-premium-gold transition-colors duration-300 text-lg leading-tight line-clamp-2"
          >
            {product.name}
          </motion.h3>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="text-premium-gold font-bold text-xl">
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

  return (
    <section className="py-16 bg-premium-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-premium-gold mb-4">
            {title}
          </h2>
          <p className="text-gray-300 font-poppins max-w-2xl mx-auto">
            Discover more premium pieces that complement your style and elevate your collection
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href={`/categories/${category.toLowerCase()}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="premium-button px-8 py-3"
            >
              View All {category}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default RelatedProducts
