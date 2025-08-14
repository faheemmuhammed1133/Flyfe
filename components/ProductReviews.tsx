'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Filter, ChevronDown } from 'lucide-react'

interface Review {
  id: number
  userId: string
  userName: string
  userAvatar: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
  size?: string
  color?: string
}

interface ProductReviewsProps {
  productId: number
  averageRating: number
  totalReviews: number
}

const ProductReviews = ({ productId, averageRating, totalReviews }: ProductReviewsProps) => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userId: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      title: 'Absolutely stunning piece!',
      content: 'This jewelry piece exceeded all my expectations. The craftsmanship is impeccable, and the gold finish is absolutely gorgeous. I\'ve received countless compliments wearing it. The packaging was also luxurious - truly a premium experience from start to finish.',
      date: '2024-01-15',
      verified: true,
      helpful: 24,
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=300&fit=crop'
      ],
      size: 'Medium',
      color: 'Gold'
    },
    {
      id: 2,
      userId: '2',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      title: 'Great quality, fast shipping',
      content: 'Very happy with this purchase. The quality is exactly as described and the shipping was incredibly fast. The only minor issue is that it\'s slightly smaller than I expected, but still beautiful.',
      date: '2024-01-12',
      verified: true,
      helpful: 18,
      size: 'Large',
      color: 'Gold'
    },
    {
      id: 3,
      userId: '3',
      userName: 'Emma Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      title: 'Perfect for special occasions',
      content: 'I bought this for my anniversary and it was perfect. The elegance and sophistication of this piece is unmatched. My partner was absolutely thrilled. Worth every penny!',
      date: '2024-01-10',
      verified: true,
      helpful: 31,
      color: 'Gold'
    },
    {
      id: 4,
      userId: '4',
      userName: 'David Kim',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      title: 'Premium at its finest',
      content: 'The attention to detail is remarkable. You can tell this is a premium product from the moment you open the box. The weight and feel of the piece speaks to its quality.',
      date: '2024-01-08',
      verified: true,
      helpful: 15,
      size: 'Medium'
    }
  ])

  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful'>('newest')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 78 },
    { stars: 4, count: 32, percentage: 16 },
    { stars: 3, count: 8, percentage: 4 },
    { stars: 2, count: 3, percentage: 1.5 },
    { stars: 1, count: 1, percentage: 0.5 },
  ]

  const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-charcoal border border-dark-gray p-6 rounded-none"
    >
      {/* Review Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={review.userAvatar}
            alt={review.userName}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-poppins font-semibold text-white">
              {review.userName}
            </h4>
            {review.verified && (
              <span className="bg-premium-gold/20 text-premium-gold px-2 py-0.5 text-xs font-medium rounded-full">
                Verified Purchase
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < review.rating
                      ? 'text-premium-gold fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>

          {/* Purchase Details */}
          {(review.size || review.color) && (
            <div className="flex gap-4 text-xs text-gray-400 mb-3">
              {review.size && <span>Size: {review.size}</span>}
              {review.color && <span>Color: {review.color}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <h5 className="font-poppins font-semibold text-white mb-2">
          {review.title}
        </h5>
        <p className="text-gray-300 leading-relaxed">
          {review.content}
        </p>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-3 mb-4 overflow-x-auto">
          {review.images.map((image, imgIndex) => (
            <div
              key={imgIndex}
              className="relative w-20 h-20 flex-shrink-0 rounded-none overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src={image}
                alt={`Review image ${imgIndex + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-gray">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-400 hover:text-premium-gold transition-colors duration-300">
            <ThumbsUp size={16} />
            <span className="text-sm">Helpful ({review.helpful})</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-premium-gold transition-colors duration-300">
            <MessageCircle size={16} />
            <span className="text-sm">Reply</span>
          </button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section className="py-16 bg-premium-black">
      <div className="container mx-auto px-4">
        {/* Reviews Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-montserrat font-bold text-white mb-6">
                Customer Reviews
              </h2>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="text-5xl font-bold text-premium-gold">
                  {averageRating.toFixed(1)}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(averageRating)
                            ? 'text-premium-gold fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">
                    Based on {totalReviews} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-gray-300">{item.stars}</span>
                    <Star size={12} className="text-premium-gold fill-current" />
                  </div>
                  <div className="flex-1 bg-dark-gray rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="bg-premium-gold h-full rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-300 hover:text-premium-gold transition-colors duration-300"
          >
            <Filter size={16} />
            Filters
            <ChevronDown 
              size={16} 
              className={`transform transition-transform duration-300 ${
                showFilters ? 'rotate-180' : ''
              }`}
            />
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-charcoal border border-dark-gray text-white px-4 py-2 rounded-none focus:border-premium-gold focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-charcoal border border-dark-gray p-6 mb-8 rounded-none overflow-hidden"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                        className={`flex items-center gap-1 px-3 py-2 border transition-all duration-300 ${
                          filterRating === rating
                            ? 'border-premium-gold bg-premium-gold text-premium-black'
                            : 'border-gray-600 text-gray-300 hover:border-premium-gold'
                        }`}
                      >
                        <span>{rating}</span>
                        <Star size={12} className="fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="premium-button px-8 py-3"
          >
            Load More Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductReviews
