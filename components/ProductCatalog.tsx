'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  Heart, 
  ShoppingBag, 
  Search,
  SlidersHorizontal
} from 'lucide-react'

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
  colors: string[]
  sizes: string[]
}

interface ProductCatalogProps {
  category?: string
  searchQuery?: string
}

const ProductCatalog = ({ category, searchQuery }: ProductCatalogProps) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Diamond Tennis Bracelet Elite',
      price: 3299,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 234,
      category: 'Jewelry',
      brand: 'Flyfe Elite',
      isSale: true,
      discount: 18,
      colors: ['Gold', 'White Gold', 'Rose Gold'],
      sizes: ['Small', 'Medium', 'Large']
    },
    {
      id: 2,
      name: 'Swiss Chronograph Watch',
      price: 5899,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
      rating: 5.0,
      reviews: 89,
      category: 'Watches',
      brand: 'Flyfe Premium',
      isNew: true,
      colors: ['Black', 'Silver', 'Gold'],
      sizes: ['40mm', '42mm', '44mm']
    },
    {
      id: 3,
      name: 'Italian Leather Briefcase',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 156,
      category: 'Accessories',
      brand: 'Flyfe',
      colors: ['Black', 'Brown', 'Cognac'],
      sizes: ['Standard']
    },
    {
      id: 4,
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
      colors: ['White', 'Cream', 'Black'],
      sizes: ['One Size']
    },
    {
      id: 5,
      name: 'Gold Chain Necklace',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 178,
      category: 'Jewelry',
      brand: 'Flyfe Elite',
      isNew: true,
      colors: ['Gold', 'Rose Gold'],
      sizes: ['16"', '18"', '20"']
    },
    {
      id: 6,
      name: 'Designer Silk Scarf',
      price: 399,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 94,
      category: 'Accessories',
      brand: 'Flyfe',
      colors: ['Navy', 'Burgundy', 'Emerald'],
      sizes: ['90cm x 90cm']
    }
  ])

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const brands = Array.from(new Set(products.map(p => p.brand)))
  const colors = Array.from(new Set(products.flatMap(p => p.colors)))
  const categories = Array.from(new Set(products.map(p => p.category)))

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand))
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(color => selectedColors.includes(color)))
    }

    // Filter by rating
    if (selectedRating) {
      filtered = filtered.filter(p => p.rating >= selectedRating)
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Keep original order for featured
        break
    }

    setFilteredProducts(filtered)
  }, [category, searchQuery, sortBy, priceRange, selectedBrands, selectedColors, selectedRating, products])

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`product-card group relative ${
        viewMode === 'list' ? 'flex gap-6 p-6' : 'flex-col'
      }`}
    >
      <Link href={`/products/${product.id}`}>
        {/* Product Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-luxury-gold text-luxury-black px-3 py-1 text-xs font-bold uppercase tracking-wide">
              New
            </span>
          )}
          {product.isSale && product.discount && (
            <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wide">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="absolute top-4 right-4 z-10 p-2 bg-luxury-black/70 backdrop-blur-sm rounded-full text-white hover:text-luxury-gold hover:bg-luxury-gold/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Heart size={16} />
        </motion.button>

        {/* Product Image */}
        <div className={`relative overflow-hidden ${
          viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'
        }`}>
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
            className="absolute inset-0 bg-luxury-black/50 flex items-center justify-center transition-opacity duration-300"
          >
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="luxury-button px-6 py-3 flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Quick Add
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-luxury-gold text-xs font-poppins font-medium tracking-wider uppercase">
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
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-luxury-gold fill-current'
                    : 'text-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-2">
              ({product.reviews})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-poppins font-semibold text-white mb-4 group-hover:text-luxury-gold transition-colors duration-300 text-lg leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Colors */}
          <div className="flex gap-2 mb-4">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-luxury-gold font-bold text-xl">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-2">
            {category ? `${category} Collection` : 'All Products'}
          </h1>
          <p className="text-gray-300 font-poppins">
            {filteredProducts.length} luxury items found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex bg-charcoal border border-dark-gray rounded-none overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-luxury-gold text-luxury-black'
                  : 'text-gray-300 hover:text-luxury-gold'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-luxury-gold text-luxury-black'
                  : 'text-gray-300 hover:text-luxury-gold'
              }`}
            >
              <List size={16} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-charcoal border border-dark-gray text-white px-4 py-3 rounded-none focus:border-luxury-gold focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-charcoal border border-dark-gray text-white px-4 py-3 rounded-none hover:border-luxury-gold transition-colors duration-300"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-80 flex-shrink-0 bg-charcoal border border-dark-gray p-6 rounded-none h-fit"
            >
              <h3 className="text-lg font-montserrat font-semibold text-luxury-gold mb-6">
                Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-poppins font-semibold text-white mb-3">Price Range</h4>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="flex-1 bg-luxury-black border border-dark-gray text-white px-3 py-2 rounded-none focus:border-luxury-gold focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                    className="flex-1 bg-luxury-black border border-dark-gray text-white px-3 py-2 rounded-none focus:border-luxury-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-poppins font-semibold text-white mb-3">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand])
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand))
                          }
                        }}
                        className="w-4 h-4 text-luxury-gold bg-luxury-black border-gray-600 rounded focus:ring-luxury-gold"
                      />
                      <span className="text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-poppins font-semibold text-white mb-3">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        if (selectedColors.includes(color)) {
                          setSelectedColors(selectedColors.filter(c => c !== color))
                        } else {
                          setSelectedColors([...selectedColors, color])
                        }
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                        selectedColors.includes(color)
                          ? 'border-luxury-gold scale-110'
                          : 'border-gray-600 hover:border-luxury-gold'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-poppins font-semibold text-white mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="w-4 h-4 text-luxury-gold bg-luxury-black border-gray-600 focus:ring-luxury-gold"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < rating ? 'text-luxury-gold fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-gray-300 ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, 10000])
                  setSelectedBrands([])
                  setSelectedColors([])
                  setSelectedRating(null)
                }}
                className="w-full text-center text-gray-400 hover:text-luxury-gold transition-colors duration-300 py-2 border border-gray-600 hover:border-luxury-gold"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="text-gray-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-montserrat font-semibold text-gray-400 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setPriceRange([0, 10000])
                  setSelectedBrands([])
                  setSelectedColors([])
                  setSelectedRating(null)
                }}
                className="luxury-button px-6 py-3"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
            }`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog
