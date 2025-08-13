'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Heart, ShoppingBag, Trash2, Star, Share2, Eye } from 'lucide-react'

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
  isNew?: boolean
  isSale?: boolean
  discount?: number
  dateAdded: string
}

interface WishlistProps {
  isOpen: boolean
  onClose: () => void
}

const Wishlist = ({ isOpen, onClose }: WishlistProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'Diamond Tennis Bracelet Elite',
      price: 3299,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      rating: 4.9,
      reviews: 234,
      category: 'Jewelry',
      brand: 'Flyfe Elite',
      inStock: true,
      isSale: true,
      discount: 18,
      dateAdded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Swiss Chronograph Watch',
      price: 5899,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
      rating: 5.0,
      reviews: 89,
      category: 'Watches',
      brand: 'Flyfe Premium',
      inStock: true,
      isNew: true,
      dateAdded: '2024-01-12'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      price: 899,
      originalPrice: 1099,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 67,
      category: 'Jewelry',
      brand: 'Flyfe',
      inStock: false,
      isSale: true,
      discount: 18,
      dateAdded: '2024-01-10'
    }
  ])

  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high'>('newest')

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    if (item.inStock) {
      // Add to cart logic here
      console.log('Added to cart:', item)
      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(item.id)
    }
  }

  const shareItem = (item: WishlistItem) => {
    // Share functionality
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this luxury item from Flyfe: ${item.name}`,
        url: `/products/${item.id}`
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/products/${item.id}`)
    }
  }

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      default: // newest
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  const WishlistItemCard = ({ item, index }: { item: WishlistItem; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-charcoal border border-dark-gray rounded-none overflow-hidden group"
    >
      <div className="relative">
        {/* Product Image */}
        <Link href={`/products/${item.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="flex gap-2"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    // Quick view logic
                  }}
                  className="p-2 bg-luxury-black/70 hover:bg-luxury-gold hover:text-luxury-black text-white rounded-full transition-all duration-300"
                  title="Quick view"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    shareItem(item)
                  }}
                  className="p-2 bg-luxury-black/70 hover:bg-luxury-gold hover:text-luxury-black text-white rounded-full transition-all duration-300"
                  title="Share"
                >
                  <Share2 size={16} />
                </button>
              </motion.div>
            </div>
          </div>
        </Link>

        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isNew && (
            <span className="bg-luxury-gold text-luxury-black px-2 py-1 text-xs font-bold uppercase tracking-wide">
              New
            </span>
          )}
          {item.isSale && item.discount && (
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
              -{item.discount}%
            </span>
          )}
          {!item.inStock && (
            <span className="bg-gray-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wide">
              Out of Stock
            </span>
          )}
        </div>

        {/* Remove Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => removeFromWishlist(item.id)}
          className="absolute top-3 right-3 p-2 bg-luxury-black/70 hover:bg-red-600 text-white rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          title="Remove from wishlist"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-luxury-gold text-xs font-poppins font-medium tracking-wider uppercase">
            {item.brand}
          </span>
          <span className="text-gray-500 text-xs uppercase">
            {item.category}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={`${
                i < Math.floor(item.rating)
                  ? 'text-luxury-gold fill-current'
                  : 'text-gray-600'
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">
            ({item.reviews})
          </span>
        </div>

        {/* Product Name */}
        <Link href={`/products/${item.id}`}>
          <h3 className="font-poppins font-semibold text-white mb-3 hover:text-luxury-gold transition-colors duration-300 line-clamp-2 leading-tight">
            {item.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-luxury-gold font-bold text-lg">
            ${item.price.toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              ${item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(item)}
            disabled={!item.inStock}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              item.inStock
                ? 'luxury-button'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={14} />
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>

        {/* Date Added */}
        <p className="text-xs text-gray-500 mt-3">
          Added {new Date(item.dateAdded).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm z-50"
          />

          {/* Wishlist Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-luxury-black border-l border-luxury-gold/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-gray">
              <div className="flex items-center gap-3">
                <Heart className="text-luxury-gold fill-current" size={24} />
                <div>
                  <h2 className="text-xl font-montserrat font-bold text-white">
                    My Wishlist
                  </h2>
                  <p className="text-sm text-gray-400">
                    {wishlistItems.length} luxury items saved
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
              >
                <X size={20} />
              </motion.button>
            </div>

            {wishlistItems.length === 0 ? (
              /* Empty Wishlist */
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <Heart className="text-gray-600 mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-montserrat font-semibold text-gray-400 mb-2">
                    Your wishlist is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Save your favorite luxury items to your wishlist
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="luxury-button px-6 py-3"
                  >
                    Explore Collection
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                {/* Sort Controls */}
                <div className="p-6 border-b border-dark-gray">
                  <div className="flex items-center justify-between">
                    <h3 className="font-poppins font-medium text-gray-300">
                      Sort by:
                    </h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-charcoal border border-dark-gray text-white px-3 py-2 rounded-none focus:border-luxury-gold focus:outline-none"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Wishlist Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {sortedItems.map((item, index) => (
                        <WishlistItemCard key={item.id} item={item} index={index} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-dark-gray p-6">
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Add all in-stock items to cart
                        wishlistItems.filter(item => item.inStock).forEach(addToCart)
                      }}
                      className="flex-1 luxury-button px-6 py-3 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      Add All to Cart
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (confirm('Are you sure you want to clear your entire wishlist?')) {
                          setWishlistItems([])
                        }
                      }}
                      className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Clear All
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Wishlist
