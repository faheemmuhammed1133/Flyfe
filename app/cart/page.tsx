'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react'

export default function CartPage() {
  const { state, updateQuantity, removeItem, moveToWishlist, clearCart } = useCart()
  const router = useRouter()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleMoveToWishlist = (id: number) => {
    moveToWishlist(id)
    // Show success message (could be implemented with toast)
  }

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      clearCart()
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-premium-black">
        <Header />
        
        <main className="pt-20">
          {/* Empty Cart */}
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag className="text-gray-600 mx-auto mb-6" size={80} />
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
                  Your Cart is Empty
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Discover our premium collection and add your favorite items to your cart
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="premium-button px-8 py-3 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={18} />
                      Continue Shopping
                    </motion.button>
                  </Link>
                  
                  <Link href="/catalog">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 border border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-black transition-all duration-300 flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-premium-black">
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
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-premium-gold mb-2">
                  Shopping Cart
                </h1>
                <p className="text-gray-300">
                  {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
              
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-premium-gold hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft size={18} />
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Cart Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Cart Header Actions */}
                  <div className="flex items-center justify-between pb-4 border-b border-dark-gray">
                    <h2 className="text-xl font-poppins font-semibold text-white">
                      Cart Items
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center gap-2 text-sm"
                    >
                      <Trash2 size={16} />
                      Clear Cart
                    </button>
                  </div>

                  {/* Cart Items List */}
                  {state.items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-charcoal border border-dark-gray p-6 hover:border-premium-gold/30 transition-all duration-300"
                    >
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <Link href={`/products/${item.id}`}>
                          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden cursor-pointer group">
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
                            <div>
                              <Link href={`/products/${item.id}`}>
                                <h3 className="font-poppins font-semibold text-white hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                                  {item.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-400 mt-1">
                                {item.brand} • {item.category}
                              </p>
                              {(item.size || item.color) && (
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                  {item.size && <span>Size: {item.size}</span>}
                                  {item.color && <span>Color: {item.color}</span>}
                                </div>
                              )}
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                              title="Remove item"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-premium-gold font-bold text-lg">
                                ${item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-gray-500 line-through text-sm">
                                  ${item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              {/* Move to Wishlist */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMoveToWishlist(item.id)}
                                className="p-2 text-gray-400 hover:text-premium-gold transition-colors duration-300"
                                title="Move to wishlist"
                              >
                                <Heart size={16} />
                              </motion.button>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-dark-gray hover:bg-premium-gold hover:text-premium-black text-white transition-all duration-300"
                                >
                                  <Minus size={14} />
                                </motion.button>
                                
                                <span className="w-12 text-center font-medium text-white">
                                  {item.quantity}
                                </span>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-dark-gray hover:bg-premium-gold hover:text-premium-black text-white transition-all duration-300"
                                >
                                  <Plus size={14} />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-charcoal border border-dark-gray p-6 sticky top-24"
                >
                  <h2 className="text-xl font-poppins font-semibold text-white mb-6">
                    Order Summary
                  </h2>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({state.totalItems} items)</span>
                      <span>${state.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span>
                        {state.shipping === 0 ? (
                          <span className="text-green-500">FREE</span>
                        ) : (
                          `$${state.shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>${state.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-dark-gray pt-4">
                      <div className="flex justify-between text-lg font-bold text-premium-gold">
                        <span>Total</span>
                        <span>${state.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Progress */}
                  {state.shipping > 0 && (
                    <div className="mb-6 p-4 bg-premium-black border border-dark-gray">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="text-premium-gold" size={16} />
                        <span className="text-sm text-gray-300">
                          Add ${(500 - state.subtotal).toFixed(2)} more for free shipping
                        </span>
                      </div>
                      <div className="w-full bg-dark-gray h-2">
                        <div 
                          className="bg-premium-gold h-2 transition-all duration-300"
                          style={{ width: `${Math.min((state.subtotal / 500) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/checkout')}
                    className="w-full premium-button px-6 py-4 text-lg flex items-center justify-center gap-3 mb-4"
                  >
                    Secure Checkout
                    <ArrowRight size={20} />
                  </motion.button>

                  {/* Trust Indicators */}
                  <div className="space-y-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-green-500" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw size={16} className="text-blue-500" />
                      <span>30-day return policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-premium-gold" />
                      <span>Free shipping on orders over $500</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
