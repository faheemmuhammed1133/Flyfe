'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cartService, CartSummary } from '@/lib/services/cart';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { CartItem } from '@/lib/api';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // To track which item is being updated
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const cartSummary = await cartService.getCartSummary();
      setSummary(cartSummary);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch your shopping cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      // If quantity is less than 1, treat it as a removal.
      handleRemoveItem(itemId);
      return;
    }
    setIsUpdating(itemId);
    try {
      const updatedSummary = await cartService.updateItemQuantity(itemId, quantity);
      setSummary(updatedSummary);
      toast({
        title: 'Success',
        description: 'Cart updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update item quantity.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(itemId);
    try {
      const updatedSummary = await cartService.removeItem(itemId);
      setSummary(updatedSummary);
      toast({
        title: 'Success',
        description: 'Item removed from cart.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md h-full bg-black text-gold flex flex-col shadow-2xl shadow-gold/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gold/20">
              <h2 className="text-2xl font-cinzel font-bold">Shopping Cart</h2>
              <button onClick={onClose} className="text-gold hover:text-white transition-colors">
                <X size={28} />
              </button>
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoveToWishlist(item.id)}
              className="p-1 text-gray-400 hover:text-luxury-gold transition-colors duration-300"
              title="Move to wishlist"
            >
              <Heart size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRemoveItem(item.id)}
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
                <p className="text-sm text-gray-400">
                  {state.items.length} items in your cart
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

            {state.items.length === 0 ? (
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
                <div className="flex-1 overflow-y-auto p-6">
                  <AnimatePresence>
                    {state.items.map((item, index) => (
                      <CartItem key={item.id} item={item} index={index} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Cart Summary */}
                <div className="border-t border-dark-gray p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="text-lg font-bold text-luxury-gold">
                    Total: ${state.total.toFixed(2)}
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>
                      {state.shipping === 0 ? (
                        <span className="text-luxury-gold">Free</span>
                      ) : (
                        `$${state.shipping}`
                      )}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>Subtotal: ${state.subtotal.toFixed(2)}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-dark-gray">
                    <span>Total</span>
                    <span className="text-luxury-gold">${state.total.toFixed(2)}</span>
                  </div>

                  {/* Free Shipping Notice */}
                  {state.shipping > 0 && (
                    <div className="text-center text-sm text-gray-400">
                      Add ${(500 - state.subtotal).toLocaleString()} more for free shipping
                    </div>
                  )}

                  {/* View Full Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose()
                      router.push('/cart')
                    }}
                    className="w-full mb-3 px-6 py-3 border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    View Full Cart
                  </motion.button>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onClose()
                      router.push('/checkout')
                    }}
                    className="w-full luxury-button px-6 py-4 text-lg flex items-center justify-center gap-3 mb-4"
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
