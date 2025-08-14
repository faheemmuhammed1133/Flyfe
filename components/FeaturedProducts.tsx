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
  isNew?: boolean
  isSale?: boolean
  discount?: number
}

const FeaturedProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Diamond Tennis Bracelet',
      price: 3299,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 45,
      category: 'Jewelry',
      isSale: true,
      discount: 18,
    },
    {
      id: 2,
      name: 'Swiss Automatic Watch',
      price: 4599,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 89,
      category: 'Watches',
      isNew: true,
    },
    {
      id: 3,
      name: 'Italian Leather Handbag',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 156,
      category: 'Accessories',
      isSale: true,
      discount: 19,
    },
    {
      id: 4,
      name: 'Pearl Drop Earrings',
      price: 899,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 67,
      category: 'Jewelry',
    },
    {
      id: 5,
      name: 'Designer Silk Scarf',
      price: 399,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 123,
      category: 'Accessories',
      isNew: true,
    },
    {
      id: 6,
      name: 'Gold Chain Necklace',
      price: 2199,
      originalPrice: 2599,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 78,
      category: 'Jewelry',
      isSale: true,
      discount: 15,
    },
  ]

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="product-card group relative cursor-pointer"
      >
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
          className="p-2 bg-premium-black/70 backdrop-blur-sm rounded-full text-white hover:text-premium-gold hover:bg-premium-gold/20 transition-all duration-300"
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
            className="premium-button px-6 py-3 flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </motion.button>
        </motion.div>

        {/* Gold Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-gold/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="text-premium-gold text-xs font-poppins font-medium tracking-wider uppercase mb-2 block"
        >
          {product.category}
        </motion.span>

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
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Product Name */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
          viewport={{ once: true }}
          className="font-poppins font-semibold text-white mb-4 group-hover:text-premium-gold transition-colors duration-300 text-lg leading-tight"
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
      </motion.div>
    </Link>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}

export default FeaturedProducts
