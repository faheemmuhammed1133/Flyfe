'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: number
  name: string
  description: string
  image: string
  href: string
  productCount: number
}

const CategoryGrid = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Luxury Watches',
      description: 'Timeless elegance for the discerning collector',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      href: '/categories/watches',
      productCount: 156,
    },
    {
      id: 2,
      name: 'Designer Jewelry',
      description: 'Exquisite pieces that define sophistication',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
      href: '/categories/jewelry',
      productCount: 243,
    },
    {
      id: 3,
      name: 'Premium Fashion',
      description: 'Couture collections from world-renowned designers',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
      href: '/categories/fashion',
      productCount: 389,
    },
    {
      id: 4,
      name: 'Luxury Accessories',
      description: 'The perfect finishing touches for any ensemble',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
      href: '/categories/accessories',
      productCount: 198,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden bg-charcoal rounded-none cursor-pointer"
        >
          <Link href={category.href}>
            {/* Background Image */}
            <div className="relative h-80 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Gold Accent Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 h-1 bg-luxury-gold"
              />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center justify-between mb-4">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-luxury-gold text-sm font-poppins font-medium tracking-wider uppercase"
                >
                  {category.productCount} Products
                </motion.span>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-luxury-gold"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-3 group-hover:text-luxury-gold transition-colors duration-300"
              >
                {category.name}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="text-gray-300 font-poppins leading-relaxed"
              >
                {category.description}
              </motion.p>

              {/* Hover Effect Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 opacity-0 group-hover:opacity-100"
              >
                <span className="inline-flex items-center gap-2 text-luxury-gold font-poppins font-medium tracking-wide uppercase text-sm">
                  Explore Collection
                  <ArrowRight size={16} />
                </span>
              </motion.div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default CategoryGrid
