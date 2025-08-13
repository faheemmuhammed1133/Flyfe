'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, User, Mail, Lock, Phone, CheckCircle } from 'lucide-react'

interface UserAuthProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

const UserAuth = ({ isOpen, onClose, initialMode = 'login' }: UserAuthProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    onClose()
    
    // Handle authentication logic here
    console.log('Auth submission:', { mode, formData })
  }

  const LoginForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="luxury-input w-full pl-10"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="luxury-input w-full pl-10 pr-10"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="text-luxury-gold bg-luxury-black border-gray-600 rounded focus:ring-luxury-gold"
          />
          <span className="text-sm text-gray-300">Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => setMode('forgot')}
          className="text-sm text-luxury-gold hover:text-gold-light transition-colors duration-300"
        >
          Forgot password?
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full luxury-button px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
          />
        ) : (
          <>
            <User size={18} />
            Sign In
          </>
        )}
      </motion.button>

      <div className="text-center">
        <span className="text-gray-400">Don't have an account? </span>
        <button
          type="button"
          onClick={() => setMode('register')}
          className="text-luxury-gold hover:text-gold-light transition-colors duration-300 font-medium"
        >
          Create Account
        </button>
      </div>
    </motion.form>
  )

  const RegisterForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="luxury-input w-full"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="luxury-input w-full"
            placeholder="Last name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="luxury-input w-full pl-10"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="luxury-input w-full pl-10"
            placeholder="Enter your phone"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="luxury-input w-full pl-10 pr-10"
            placeholder="Create password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="luxury-input w-full pl-10"
            placeholder="Confirm password"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="text-luxury-gold bg-luxury-black border-gray-600 rounded focus:ring-luxury-gold mt-1"
            required
          />
          <span className="text-sm text-gray-300 leading-relaxed">
            I agree to the{' '}
            <a href="/terms" className="text-luxury-gold hover:text-gold-light">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-luxury-gold hover:text-gold-light">
              Privacy Policy
            </a>
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
            className="text-luxury-gold bg-luxury-black border-gray-600 rounded focus:ring-luxury-gold"
          />
          <span className="text-sm text-gray-300">
            Subscribe to our newsletter for exclusive offers
          </span>
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading || !formData.agreeToTerms}
        className="w-full luxury-button px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
          />
        ) : (
          <>
            <CheckCircle size={18} />
            Create Account
          </>
        )}
      </motion.button>

      <div className="text-center">
        <span className="text-gray-400">Already have an account? </span>
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-luxury-gold hover:text-gold-light transition-colors duration-300 font-medium"
        >
          Sign In
        </button>
      </div>
    </motion.form>
  )

  const ForgotPasswordForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <p className="text-gray-300 leading-relaxed">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="luxury-input w-full pl-10"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full luxury-button px-6 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
          />
        ) : (
          <>
            <Mail size={18} />
            Send Reset Link
          </>
        )}
      </motion.button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-luxury-gold hover:text-gold-light transition-colors duration-300 font-medium"
        >
          Back to Sign In
        </button>
      </div>
    </motion.form>
  )

  const getTitle = () => {
    switch (mode) {
      case 'register': return 'Create Account'
      case 'forgot': return 'Reset Password'
      default: return 'Welcome Back'
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case 'register': return 'Join the Flyfe luxury community'
      case 'forgot': return 'We\'ll help you get back in'
      default: return 'Sign in to your luxury account'
    }
  }

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-luxury-black border border-luxury-gold/20 rounded-none w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-gray">
                <div>
                  <h2 className="text-2xl font-montserrat font-bold text-luxury-gold">
                    {getTitle()}
                  </h2>
                  <p className="text-gray-400 font-poppins text-sm mt-1">
                    {getSubtitle()}
                  </p>
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

              {/* Form Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {mode === 'login' && <LoginForm key="login" />}
                  {mode === 'register' && <RegisterForm key="register" />}
                  {mode === 'forgot' && <ForgotPasswordForm key="forgot" />}
                </AnimatePresence>
              </div>

              {/* Social Login Options */}
              {mode !== 'forgot' && (
                <div className="p-6 pt-0">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-dark-gray" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-luxury-black text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-none bg-charcoal text-sm font-medium text-gray-300 hover:bg-dark-gray hover:border-luxury-gold transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="ml-2">Google</span>
                    </button>

                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-none bg-charcoal text-sm font-medium text-gray-300 hover:bg-dark-gray hover:border-luxury-gold transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="ml-2">Facebook</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UserAuth
