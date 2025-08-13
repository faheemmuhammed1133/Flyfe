'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react'
import ShoppingCart from './ShoppingCart'
import UserAuth from './UserAuth'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { state } = useCart()
  const { state: wishlistState } = useWishlist()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Luxury', href: '/luxury' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Sale', href: '/sale' },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-luxury-black/95 backdrop-blur-md border-b border-luxury-gold/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/" className="flex items-center">
              <motion.h1 
                className="text-2xl md:text-3xl font-montserrat font-black text-luxury-gold tracking-wider"
                whileHover={{ 
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' 
                }}
                transition={{ duration: 0.3 }}
              >
                FLYFE
              </motion.h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative text-white hover:text-luxury-gold transition-colors duration-300 font-poppins font-medium tracking-wide group"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/wishlist')}
              className="p-2 text-white hover:text-luxury-gold transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistState.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {wishlistState.totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* User Account */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthOpen(true)}
              className="p-2 text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Account"
            >
              <User size={20} />
            </motion.button>

            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {state.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {state.totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-luxury-gold transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-luxury-black/98 backdrop-blur-md border-t border-luxury-gold/20"
          >
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white hover:text-luxury-gold transition-colors duration-300 font-poppins font-medium text-lg py-2"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* User Authentication Modal */}
      <UserAuth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      

    </motion.header>
  )
}

export default Header
