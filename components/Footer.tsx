'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    'Shop': [
      { name: 'New Arrivals', href: '/new-arrivals' },
      { name: 'Best Sellers', href: '/best-sellers' },
      { name: 'Sale', href: '/sale' },
      { name: 'Gift Cards', href: '/gift-cards' },
    ],
    'Categories': [
      { name: 'Premium Watches', href: '/categories/watches' },
      { name: 'Designer Jewelry', href: '/categories/jewelry' },
      { name: 'Premium Fashion', href: '/categories/fashion' },
      { name: 'Accessories', href: '/categories/accessories' },
    ],
    'Customer Care': [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    'Company': [
      { name: 'About Flyfe', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ]

  const trustFeatures = [
    { icon: Shield, title: 'Secure Payment', description: 'SSL encrypted checkout' },
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $500' },
    { icon: CreditCard, title: 'Easy Returns', description: '30-day return policy' },
  ]

  return (
    <footer className="bg-premium-black border-t border-dark-gray">
      {/* Trust Features */}
      <div className="border-b border-dark-gray py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 text-center md:text-left"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-premium-gold/10 rounded-full flex items-center justify-center">
                  <feature.icon className="text-premium-gold" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-poppins font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="inline-block mb-6">
                  <h2 className="text-3xl font-montserrat font-black text-premium-gold tracking-wider">
                    FLYFE
                  </h2>
                </Link>
                
                <p className="text-gray-300 font-poppins leading-relaxed mb-6 max-w-sm">
                  Redefining premium e-commerce with curated collections of premium products 
                  for the discerning customer who demands excellence.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={16} className="text-premium-gold" />
                    <span className="text-sm">hello@flyfe.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone size={16} className="text-premium-gold" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={16} className="text-premium-gold" />
                    <span className="text-sm">New York, NY 10001</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-dark-gray hover:bg-premium-gold hover:text-premium-black text-gray-300 rounded-full flex items-center justify-center transition-all duration-300"
                      aria-label={social.name}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <div key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-premium-gold font-poppins font-semibold mb-6 text-lg">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: categoryIndex * 0.1 + linkIndex * 0.05 
                        }}
                        viewport={{ once: true }}
                      >
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-premium-gold transition-colors duration-300 font-poppins text-sm block py-1"
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-gray py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-6 text-sm text-gray-400"
            >
              <Link href="/privacy" className="hover:text-premium-gold transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-premium-gold transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-premium-gold transition-colors duration-300">
                Cookie Policy
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm text-gray-400 font-poppins"
            >
              © 2024 Flyfe. All rights reserved.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Gold Accent Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="h-1 bg-premium-gold"
      />
    </footer>
  )
}

export default Footer
