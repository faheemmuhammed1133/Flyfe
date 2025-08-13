'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useWishlist } from '@/contexts/WishlistContext'
import { useCart } from '@/contexts/CartContext'
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Star, 
  Share2, 
  Eye, 
  ArrowLeft, 
  ArrowRight,
  Filter,
  Grid3X3,
  List,
  SortAsc
} from 'lucide-react'

export default function WishlistPage() {
  const { state: wishlistState, removeItem, clearWishlist, moveToCart } = useWishlist()
  const { addItem: addToCart } = useCart()
  const router = useRouter()
  
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high' | 'name'>('newest')
  const [filterBy, setFilterBy] = useState<'all' | 'in-stock' | 'on-sale'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleAddToCart = (item: any) => {
    if (item.inStock) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        category: item.category,
        brand: item.brand,
        quantity: 1,
        inStock: item.inStock
      })
      // Optionally remove from wishlist after adding to cart
      // moveToCart(item.id)
    }
  }

  const handleShare = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this luxury item from Flyfe: ${item.name}`,
        url: `/products/${item.id}`
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${item.id}`)
    }
  }

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist()
    }
  }

  // Filter and sort items
  const filteredItems = wishlistState.items.filter(item => {
    switch (filterBy) {
      case 'in-stock':
        return item.inStock
      case 'on-sale':
        return item.isSale
      default:
        return true
    }
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default: // newest
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  if (wishlistState.items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-black">
        <Header />
        
        <main className="pt-20">
          {/* Empty Wishlist */}
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Heart className="text-gray-600 mx-auto mb-6" size={80} />
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
                  Your Wishlist is Empty
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Save your favorite luxury items to your wishlist and never lose track of what you love
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="luxury-button px-8 py-3 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Explore Collection
                    </motion.button>
                  </Link>
                  
                  <Link href="/catalog">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Browse Catalog
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-luxury-gold mb-2">
                  My Wishlist
                </h1>
                <p className="text-gray-300">
                  {wishlistState.totalItems} luxury {wishlistState.totalItems === 1 ? 'item' : 'items'} saved
                </p>
              </div>
              
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-luxury-gold hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft size={18} />
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Filters and Controls */}
        <section className="py-6 bg-charcoal/50 border-b border-dark-gray">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Left Controls */}
              <div className="flex items-center gap-4">
                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-gray-400" />
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as any)}
                    className="bg-luxury-black border border-dark-gray text-white px-3 py-2 rounded-none focus:border-luxury-gold focus:outline-none"
                  >
                    <option value="all">All Items</option>
                    <option value="in-stock">In Stock</option>
                    <option value="on-sale">On Sale</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <SortAsc size={18} className="text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-luxury-black border border-dark-gray text-white px-3 py-2 rounded-none focus:border-luxury-gold focus:outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-dark-gray rounded-none overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-luxury-gold text-luxury-black' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-luxury-gold text-luxury-black' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>

                {/* Clear Wishlist */}
                <button
                  onClick={handleClearWishlist}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Wishlist Items */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                : "space-y-6"
              }
            >
              {sortedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={viewMode === 'grid' 
                    ? "bg-charcoal border border-dark-gray overflow-hidden group hover:border-luxury-gold/30 transition-all duration-300"
                    : "bg-charcoal border border-dark-gray p-6 hover:border-luxury-gold/30 transition-all duration-300"
                  }
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      <div className="relative">
                        {/* Product Image */}
                        <Link href={`/products/${item.id}`}>
                          <div className="relative aspect-square overflow-hidden cursor-pointer">
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
                                    handleShare(item)
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
                          onClick={() => removeItem(item.id)}
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
                          <h3 className="font-poppins font-semibold text-white mb-3 hover:text-luxury-gold transition-colors duration-300 line-clamp-2 leading-tight cursor-pointer">
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
                            onClick={() => handleAddToCart(item)}
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
                    </>
                  ) : (
                    // List View
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link href={`/products/${item.id}`}>
                        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden cursor-pointer group">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-luxury-gold text-sm font-poppins font-medium tracking-wider uppercase">
                                {item.brand}
                              </span>
                              <span className="text-gray-500 text-sm uppercase">
                                {item.category}
                              </span>
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
                            </div>
                            
                            <Link href={`/products/${item.id}`}>
                              <h3 className="font-poppins font-semibold text-white text-lg mb-2 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                                {item.name}
                              </h3>
                            </Link>

                            <div className="flex items-center gap-1 mb-3">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${
                                    i < Math.floor(item.rating)
                                      ? 'text-luxury-gold fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-400 ml-2">
                                {item.rating} ({item.reviews} reviews)
                              </span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-luxury-gold font-bold text-xl">
                                ${item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-gray-500 line-through text-lg">
                                  ${item.originalPrice.toLocaleString()}
                                </span>
                              )}
                              {!item.inStock && (
                                <span className="bg-gray-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wide">
                                  Out of Stock
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-500">
                              Added to wishlist on {new Date(item.dateAdded).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleShare(item)}
                              className="p-2 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                              title="Share"
                            >
                              <Share2 size={18} />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAddToCart(item)}
                              disabled={!item.inStock}
                              className={`px-6 py-2 font-medium transition-all duration-300 flex items-center gap-2 ${
                                item.inStock
                                  ? 'luxury-button'
                                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <ShoppingBag size={16} />
                              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                              title="Remove from wishlist"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Bulk Actions */}
            {sortedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sortedItems.filter(item => item.inStock).forEach(item => handleAddToCart(item))
                  }}
                  className="luxury-button px-8 py-3 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add All Available to Cart
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearWishlist}
                  className="px-8 py-3 border border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Clear Entire Wishlist
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
