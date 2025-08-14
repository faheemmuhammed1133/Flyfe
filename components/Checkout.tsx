'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  CreditCard, 
  Lock, 
  Truck, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  MapPin,
  User,
  Mail,
  Phone
} from 'lucide-react'

interface CheckoutItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CheckoutProps {
  items: CheckoutItem[]
  onClose: () => void
}

const Checkout = ({ items, onClose }: CheckoutProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Preferences
    shippingMethod: 'standard',
    giftWrap: false,
    newsletter: false
  })

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = formData.shippingMethod === 'express' ? 25 : subtotal > 500 ? 0 : 25
  const tax = subtotal * 0.08
  const giftWrapFee = formData.giftWrap ? 15 : 0
  const total = subtotal + shipping + tax + giftWrapFee

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: CheckCircle }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Process payment logic here
    console.log('Processing order:', { items, formData, total })
    // Redirect to success page or show success message
  }

  const ShippingStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
        Shipping Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="premium-input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="premium-input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="premium-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="premium-input w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="premium-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Apartment, suite, etc.
        </label>
        <input
          type="text"
          value={formData.apartment}
          onChange={(e) => handleInputChange('apartment', e.target.value)}
          className="premium-input w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="premium-input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            State *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className="premium-input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className="premium-input w-full"
            required
          />
        </div>
      </div>

      {/* Shipping Method */}
      <div>
        <h4 className="text-lg font-montserrat font-semibold text-white mb-4">
          Shipping Method
        </h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 border border-dark-gray hover:border-premium-gold transition-colors duration-300 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="standard"
              checked={formData.shippingMethod === 'standard'}
              onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
              className="text-premium-gold"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">Standard Shipping</span>
                <span className="text-premium-gold font-bold">
                  {subtotal > 500 ? 'Free' : '$25'}
                </span>
              </div>
              <p className="text-sm text-gray-400">5-7 business days</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 border border-dark-gray hover:border-premium-gold transition-colors duration-300 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="express"
              checked={formData.shippingMethod === 'express'}
              onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
              className="text-premium-gold"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">Express Shipping</span>
                <span className="text-premium-gold font-bold">$25</span>
              </div>
              <p className="text-sm text-gray-400">2-3 business days</p>
            </div>
          </label>
        </div>
      </div>

      {/* Gift Wrap Option */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="giftWrap"
          checked={formData.giftWrap}
          onChange={(e) => handleInputChange('giftWrap', e.target.checked)}
          className="text-premium-gold"
        />
        <label htmlFor="giftWrap" className="text-gray-300">
          Add premium gift wrapping (+$15)
        </label>
      </div>
    </motion.div>
  )

  const PaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
        Payment Information
      </h3>

      <div className="bg-charcoal border border-premium-gold/30 p-4 rounded-none">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="text-premium-gold" size={16} />
          <span className="text-sm text-premium-gold font-medium">
            Secure SSL Encrypted Payment
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Your payment information is encrypted and secure
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Card Number *
        </label>
        <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          placeholder="1234 5678 9012 3456"
          className="premium-input w-full"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Expiry Date *
          </label>
          <input
            type="text"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
            placeholder="MM/YY"
            className="premium-input w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CVV *
          </label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            placeholder="123"
            className="premium-input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Name on Card *
        </label>
        <input
          type="text"
          value={formData.cardName}
          onChange={(e) => handleInputChange('cardName', e.target.value)}
          className="premium-input w-full"
          required
        />
      </div>

      {/* Newsletter Signup */}
      <div className="flex items-center gap-3 pt-4 border-t border-dark-gray">
        <input
          type="checkbox"
          id="newsletter"
          checked={formData.newsletter}
          onChange={(e) => handleInputChange('newsletter', e.target.checked)}
          className="text-premium-gold"
        />
        <label htmlFor="newsletter" className="text-gray-300">
          Subscribe to our newsletter for exclusive offers
        </label>
      </div>
    </motion.div>
  )

  const ReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
        Order Review
      </h3>

      {/* Shipping Address */}
      <div className="bg-charcoal p-6 rounded-none">
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <MapPin size={16} className="text-premium-gold" />
          Shipping Address
        </h4>
        <p className="text-gray-300 leading-relaxed">
          {formData.firstName} {formData.lastName}<br />
          {formData.address}<br />
          {formData.apartment && `${formData.apartment}\n`}
          {formData.city}, {formData.state} {formData.zipCode}<br />
          {formData.country}
        </p>
      </div>

      {/* Payment Method */}
      <div className="bg-charcoal p-6 rounded-none">
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <CreditCard size={16} className="text-premium-gold" />
          Payment Method
        </h4>
        <p className="text-gray-300">
          **** **** **** {formData.cardNumber.slice(-4)}<br />
          {formData.cardName}
        </p>
      </div>

      {/* Order Items */}
      <div className="bg-charcoal p-6 rounded-none">
        <h4 className="font-semibold text-white mb-4">Order Items</h4>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-16 bg-dark-gray rounded-none overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-white">{item.name}</h5>
                {(item.size || item.color) && (
                  <p className="text-sm text-gray-400">
                    {item.size && `Size: ${item.size}`}
                    {item.size && item.color && ' • '}
                    {item.color && `Color: ${item.color}`}
                  </p>
                )}
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
              <div className="text-premium-gold font-bold">
                ${(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="fixed inset-0 bg-premium-black/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-400 hover:text-premium-gold transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              Back to Cart
            </button>
            <h1 className="text-2xl font-montserrat font-bold text-premium-gold">
              Secure Checkout
            </h1>
            <div className="flex items-center gap-2 text-premium-gold">
              <Lock size={16} />
              <span className="text-sm">SSL Secured</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-premium-gold border-premium-gold text-premium-black'
                        : 'border-gray-600 text-gray-400'
                    }`}>
                      <step.icon size={16} />
                    </div>
                    <span className={`ml-2 font-medium ${
                      currentStep >= step.id ? 'text-premium-gold' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-premium-gold' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="bg-premium-black border border-dark-gray p-8 rounded-none">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && <ShippingStep key="shipping" />}
                  {currentStep === 2 && <PaymentStep key="payment" />}
                  {currentStep === 3 && <ReviewStep key="review" />}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-dark-gray">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 hover:border-premium-gold hover:text-premium-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>

                  {currentStep < 3 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="premium-button px-8 py-3 flex items-center gap-2"
                    >
                      Continue
                      <ArrowRight size={16} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="premium-button px-8 py-3 flex items-center gap-2"
                    >
                      <Lock size={16} />
                      Complete Order
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-charcoal border border-dark-gray p-6 rounded-none sticky top-8">
                <h3 className="text-lg font-montserrat font-semibold text-white mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  {formData.giftWrap && (
                    <div className="flex justify-between text-gray-300">
                      <span>Gift Wrapping</span>
                      <span>$15</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-dark-gray">
                  <span>Total</span>
                  <span className="text-premium-gold">${total.toLocaleString()}</span>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-dark-gray space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield size={14} className="text-premium-gold" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-premium-gold" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Truck size={14} className="text-premium-gold" />
                    <span>Free shipping over $500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
