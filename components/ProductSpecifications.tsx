'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Info, Award, Truck, Shield } from 'lucide-react'

interface ProductSpecificationsProps {
  specifications: { [key: string]: string }
  features: string[]
  materials: string[]
  careInstructions: string[]
  warranty: string
  shipping: {
    standard: string
    express: string
    international: string
  }
}

const ProductSpecifications = ({
  specifications,
  features,
  materials,
  careInstructions,
  warranty,
  shipping
}: ProductSpecificationsProps) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'care' | 'shipping'>('specs')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['specs']))

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const tabs = [
    { id: 'specs', label: 'Specifications', icon: Info },
    { id: 'features', label: 'Features', icon: Award },
    { id: 'care', label: 'Care Guide', icon: Shield },
    { id: 'shipping', label: 'Shipping', icon: Truck },
  ]

  const SpecificationRow = ({ label, value, index }: { label: string; value: string; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex justify-between items-center py-3 border-b border-dark-gray last:border-b-0"
    >
      <span className="text-gray-300 font-poppins">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </motion.div>
  )

  const FeatureItem = ({ feature, index }: { feature: string; index: number }) => (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-start gap-3 py-2"
    >
      <div className="w-2 h-2 bg-premium-gold rounded-full mt-2 flex-shrink-0" />
      <span className="text-gray-300 font-poppins leading-relaxed">{feature}</span>
    </motion.li>
  )

  return (
    <section className="py-16 bg-charcoal">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
            Product Details
          </h2>
          <p className="text-gray-300 font-poppins max-w-2xl mx-auto">
            Discover the meticulous craftsmanship and premium materials that make this piece exceptional
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center mb-8"
          >
            <div className="flex bg-premium-black border border-dark-gray rounded-none overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-poppins font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-premium-gold text-premium-black'
                      : 'text-gray-300 hover:text-premium-gold hover:bg-premium-gold/10'
                  }`}
                >
                  <tab.icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-premium-black border border-dark-gray p-8 rounded-none"
            >
              {activeTab === 'specs' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
                    Technical Specifications
                  </h3>
                  <div className="space-y-0">
                    {Object.entries(specifications).map(([key, value], index) => (
                      <SpecificationRow
                        key={key}
                        label={key}
                        value={value}
                        index={index}
                      />
                    ))}
                  </div>
                  
                  {materials.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-montserrat font-semibold text-premium-gold mb-4">
                        Materials
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {materials.map((material, index) => (
                          <motion.span
                            key={material}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-charcoal border border-premium-gold/30 text-premium-gold px-4 py-2 rounded-none text-sm font-medium"
                          >
                            {material}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
                    Key Features
                  </h3>
                  <ul className="space-y-0">
                    {features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} index={index} />
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'care' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
                    Care Instructions
                  </h3>
                  <ul className="space-y-0 mb-8">
                    {careInstructions.map((instruction, index) => (
                      <FeatureItem key={index} feature={instruction} index={index} />
                    ))}
                  </ul>
                  
                  <div className="bg-charcoal border border-premium-gold/30 p-6 rounded-none">
                    <h4 className="text-lg font-montserrat font-semibold text-premium-gold mb-3">
                      Warranty Information
                    </h4>
                    <p className="text-gray-300 font-poppins leading-relaxed">
                      {warranty}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-premium-gold mb-6">
                    Shipping Options
                  </h3>
                  
                  <div className="space-y-6">
                    {Object.entries(shipping).map(([type, info], index) => (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-charcoal border border-dark-gray rounded-none"
                      >
                        <div className="w-10 h-10 bg-premium-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Truck className="text-premium-gold" size={18} />
                        </div>
                        <div>
                          <h4 className="text-white font-poppins font-semibold mb-2 capitalize">
                            {type.replace(/([A-Z])/g, ' $1').trim()} Shipping
                          </h4>
                          <p className="text-gray-300 font-poppins text-sm leading-relaxed">
                            {info}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-premium-gold/10 border border-premium-gold/30 rounded-none">
                    <h4 className="text-premium-gold font-montserrat font-semibold mb-3">
                      Free Shipping Benefits
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-premium-gold rounded-full" />
                        Free standard shipping on orders over $500
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-premium-gold rounded-full" />
                        Complimentary gift wrapping for all orders
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-premium-gold rounded-full" />
                        Signature delivery with tracking included
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Collapsible Sections (Alternative Layout) */}
          <div className="mt-12 space-y-4">
            {[
              {
                id: 'authenticity',
                title: 'Authenticity Guarantee',
                content: 'Every Flyfe product comes with a certificate of authenticity. Our premium items are sourced directly from authorized dealers and undergo rigorous quality checks to ensure you receive only genuine, premium products.',
                icon: Shield
              },
              {
                id: 'returns',
                title: 'Returns & Exchanges',
                content: 'We offer a 30-day return policy for all unworn items in original packaging. Premium white-glove return service is available for high-value items. All returns are processed within 5-7 business days.',
                icon: Award
              }
            ].map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-premium-black border border-dark-gray rounded-none overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-charcoal/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="text-premium-gold" size={20} />
                    <h4 className="text-white font-montserrat font-semibold">
                      {section.title}
                    </h4>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-premium-gold transform transition-transform duration-300 ${
                      expandedSections.has(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSections.has(section.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-300 font-poppins leading-relaxed">
                        {section.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSpecifications
