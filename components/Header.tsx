'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react'
import ShoppingCart from './ShoppingCart'
import UserAuth from './UserAuth'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { state: authState, logout } = useAuth()
  const { state } = useCart()
  const { state: wishlistState } = useWishlist()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserMenu])

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Premium', href: '/premium' },
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
          ? 'bg-premium-black/95 backdrop-blur-md border-b border-premium-gold/20' 
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
                className="text-2xl md:text-3xl font-montserrat font-black text-premium-gold tracking-wider"
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
                  className="relative text-white hover:text-premium-gold transition-colors duration-300 font-poppins font-medium tracking-wide group"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-premium-gold group-hover:w-full transition-all duration-300"
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
              className="p-2 text-white hover:text-premium-gold transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/wishlist')}
              className="p-2 text-white hover:text-premium-gold transition-colors duration-300 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistState.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-premium-gold text-premium-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {wishlistState.totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* User Account */}
            {authState.isAuthenticated ? (
              <div className="relative user-menu-container">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 text-white hover:text-premium-gold transition-colors duration-300 flex items-center gap-2"
                  aria-label="User Menu"
                >
                  <div className="w-8 h-8 bg-premium-gold rounded-full flex items-center justify-center">
                    <span className="text-premium-black font-semibold text-sm">
                      {authState.user?.firstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-premium-black border border-gray-800 rounded-lg shadow-xl z-50"
                    >
                      <div className="p-3 border-b border-gray-800">
                        <p className="text-white font-medium">
                          {authState.user?.firstName} {authState.user?.lastName}
                        </p>
                        <p className="text-gray-400 text-sm">{authState.user?.email}</p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            router.push('/profile')
                          }}
                          className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            router.push('/orders')
                          }}
                          className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors"
                        >
                          My Orders
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false)
                            logout()
                          }}
                          className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthOpen(true)}
                className="p-2 text-white hover:text-premium-gold transition-colors duration-300"
                aria-label="Sign In"
              >
                <User size={20} />
              </motion.button>
            )}

            {/* Shopping Cart */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-premium-gold transition-colors duration-300"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {state.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-premium-gold text-premium-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
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
              className="lg:hidden p-2 text-white hover:text-premium-gold transition-colors duration-300"
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
            className="lg:hidden bg-premium-black/98 backdrop-blur-md border-t border-premium-gold/20"
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
                      className="block text-white hover:text-premium-gold transition-colors duration-300 font-poppins font-medium text-lg py-2"
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
