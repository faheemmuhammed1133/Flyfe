'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from '@/components/ProductDetail'
import ProductSpecifications from '@/components/ProductSpecifications'
import ProductReviews from '@/components/ProductReviews'
import RelatedProducts from '@/components/RelatedProducts'
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations'

interface Product {
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
  materials: string[]
  careInstructions: string[]
  warranty: string
  shipping: {
    standard: string
    express: string
    international: string
  }
}

export default function ProductPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock product data - in real app, this would come from API
  const mockProduct: Product = {
    id: productId,
    name: 'Diamond Tennis Bracelet Elite',
    price: 3299,
    originalPrice: 3999,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop'
    ],
    rating: 4.9,
    reviews: 234,
    description: 'Exquisite diamond tennis bracelet crafted with precision and elegance. Each diamond is hand-selected for exceptional clarity and brilliance, set in 18k gold for a timeless luxury piece that will be treasured for generations. This masterpiece represents the pinnacle of fine jewelry craftsmanship.',
    features: [
      'Hand-selected VS1 clarity diamonds',
      '18k solid gold construction',
      'Secure box clasp with safety latch',
      'Professional certification included',
      'Lifetime craftsmanship warranty',
      'Complimentary sizing service',
      'Luxury gift packaging included'
    ],
    specifications: {
      'Metal Type': '18k Yellow Gold',
      'Diamond Quality': 'VS1 Clarity, G-H Color',
      'Total Carat Weight': '2.5 carats',
      'Length': '7 inches (adjustable)',
      'Width': '4mm',
      'Clasp Type': 'Box clasp with safety',
      'Certification': 'GIA Certified',
      'Origin': 'Handcrafted in Italy'
    },
    category: 'Jewelry',
    brand: 'Flyfe Elite',
    inStock: 12,
    isSale: true,
    discount: 18,
    materials: [
      '18k Yellow Gold',
      'Natural Diamonds',
      'Rhodium Plating'
    ],
    careInstructions: [
      'Clean with soft jewelry cloth after each wear',
      'Store in provided luxury jewelry box',
      'Avoid contact with perfumes and lotions',
      'Professional cleaning recommended annually',
      'Remove before swimming or exercising',
      'Handle with care to maintain diamond settings'
    ],
    warranty: 'Lifetime craftsmanship warranty covering manufacturing defects. Free professional cleaning and inspection service for the first year. Diamond replacement guarantee for stones over 0.25 carats.',
    shipping: {
      standard: 'Free standard shipping (5-7 business days) with signature confirmation and full insurance coverage.',
      express: 'Express shipping (2-3 business days) available for $25. Includes priority handling and expedited processing.',
      international: 'International shipping available to select countries (7-14 business days). Duties and taxes may apply at destination.'
    }
  }

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProduct(mockProduct)
      setIsLoading(false)
    }

    fetchProduct()
  }, [productId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-2 border-luxury-gold border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-luxury-gold font-poppins text-lg">Loading luxury experience...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-montserrat font-bold text-luxury-gold mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-300 font-poppins mb-8">
            The luxury item you're looking for doesn't exist or has been moved.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="luxury-button px-8 py-3 inline-block"
          >
            Return to Collection
          </motion.a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-6"
        >
          <div className="flex items-center gap-2 text-sm text-gray-400 font-poppins">
            <a href="/" className="hover:text-luxury-gold transition-colors duration-300">
              Home
            </a>
            <span>/</span>
            <a 
              href={`/categories/${product.category.toLowerCase()}`}
              className="hover:text-luxury-gold transition-colors duration-300"
            >
              {product.category}
            </a>
            <span>/</span>
            <span className="text-luxury-gold">{product.name}</span>
          </div>
        </motion.nav>

        {/* Product Detail Section */}
        <ProductDetail product={product} />

        {/* Product Specifications */}
        <ProductSpecifications
          specifications={product.specifications}
          features={product.features}
          materials={product.materials}
          careInstructions={product.careInstructions}
          warranty={product.warranty}
          shipping={product.shipping}
        />

        {/* Product Reviews */}
        <ProductReviews
          productId={product.id}
          averageRating={product.rating}
          totalReviews={product.reviews}
        />

        {/* Related Products */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
          title="You May Also Like"
        />

        {/* Personalized Recommendations */}
        <PersonalizedRecommendations
          userId="demo-user"
          currentProductId={product.id}
          maxItems={6}
        />
      </main>

      <Footer />
    </div>
  )
}
