'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  size?: string
  color?: string
  inStock: number
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Diamond Tennis Bracelet Elite',
      price: 3299,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      quantity: 1,
      size: 'Medium',
      color: 'Gold',
      inStock: 12,
    },
    {
      id: 2,
      name: 'Swiss Chronograph Watch',
      price: 5899,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop',
      quantity: 1,
      inStock: 5,
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }

    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.inStock) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    // Move to wishlist logic
    removeItem(id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 25
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const CartItem = ({ item, index }: { item: CartItem; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex gap-4 p-4 border-b border-dark-gray last:border-b-0"
    >
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-charcoal rounded-none overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.id}`}
          className="block font-poppins font-semibold text-white hover:text-luxury-gold transition-colors duration-300 mb-1 truncate"
        >
          {item.name}
        </Link>

        {/* Variants */}
        {(item.size || item.color) && (
          <div className="flex gap-3 text-xs text-gray-400 mb-2">
            {item.size && <span>Size: {item.size}</span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-luxury-gold font-bold">
            ${item.price.toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              ${item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-600 rounded-none">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 py-1 font-semibold min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.inStock}
              className="p-1 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => moveToWishlist(item.id)}
              className="p-1 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
              title="Move to wishlist"
            >
              <Heart size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => removeItem(item.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-300"
              title="Remove item"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>
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

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-luxury-black border-l border-luxury-gold/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-gray">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-luxury-gold" size={24} />
                <h2 className="text-xl font-montserrat font-bold text-white">
                  Shopping Cart
                </h2>
                <span className="bg-luxury-gold text-luxury-black px-2 py-1 rounded-full text-xs font-bold">
                  {cartItems.length}
                </span>
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

            {cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <ShoppingBag className="text-gray-600 mx-auto mb-4" size={48} />
                  <h3 className="text-lg font-montserrat font-semibold text-gray-400 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Discover our luxury collection and add items to your cart
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="luxury-button px-6 py-3"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <CartItem key={item.id} item={item} index={index} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-dark-gray p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-luxury-gold">Free</span>
                      ) : (
                        `$${shipping}`
                      )}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-dark-gray">
                    <span>Total</span>
                    <span className="text-luxury-gold">${total.toLocaleString()}</span>
                  </div>

                  {/* Free Shipping Notice */}
                  {shipping > 0 && (
                    <div className="text-center text-sm text-gray-400">
                      Add ${(500 - subtotal).toLocaleString()} more for free shipping
                    </div>
                  )}

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose()
                      router.push('/checkout')
                    }}
                    className="w-full luxury-button px-6 py-4 text-lg flex items-center justify-center gap-3"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </motion.button>

                  {/* Continue Shopping */}
                  <button
                    onClick={onClose}
                    className="w-full text-center text-gray-400 hover:text-luxury-gold transition-colors duration-300 py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ShoppingCart
