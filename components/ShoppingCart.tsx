'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cartService, CartSummary } from '@/lib/services/cart';
import { useToast } from '@/hooks/use-toast';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (err) {
      setError('Failed to load your shopping cart. Please try again later.');
      toast({
        title: 'Error',
        description: 'Could not fetch your cart.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    try {
      await cartService.updateCartItem(itemId, { quantity });
      fetchCart(); // Re-fetch cart to get updated totals
      toast({ title: 'Cart updated', description: 'Item quantity has been changed.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update quantity.', variant: 'destructive' });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await cartService.removeFromCart(itemId);
      fetchCart(); // Re-fetch cart
      toast({ title: 'Item removed', description: 'The item has been removed from your cart.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to remove item.', variant: 'destructive' });
    }
  };

  const renderCartContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;
    }

    if (error) {
      return <div className="flex justify-center items-center h-full text-red-400 px-4 text-center">{error}</div>;
    }

    if (!cart || cart.items.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-full text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white">Your Cart is Empty</h3>
          <p className="text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
          <button
            onClick={onClose}
            className="mt-6 bg-gold text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
          >
            Start Shopping
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 bg-gray-900 p-3 rounded-lg">
              <Image
                src={item.product.images[0]?.url || '/placeholder.svg'}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="flex-grow">
                <Link href={`/products/${item.product.slug}`} passHref>
                  <span onClick={onClose} className="font-semibold text-white hover:text-gold transition-colors cursor-pointer">{item.product.name}</span>
                </Link>
                <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"><Minus size={16} /></button>
                  <span className="px-3 font-bold">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"><Plus size={16} /></button>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 hover:text-red-400">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 p-6 bg-black">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${cart.shipping.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>${cart.tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-2 mt-2"><span>Total</span><span>${cart.total.toFixed(2)}</span></div>
          </div>
          <Link href="/checkout" passHref>
            <button
              onClick={onClose}
              className="block w-full text-center mt-4 bg-gold text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-black text-white shadow-2xl flex flex-col border-l border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-gold">Shopping Cart</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </header>
            {renderCartContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cartService, CartSummary, CartItem } from '@/lib/services/cart';
import { useToast } from '@/components/ui/use-toast';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (err) {
      setError('Failed to load your shopping cart. Please try again later.');
      toast({
        title: 'Error',
        description: 'Could not fetch your cart.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await cartService.updateCartItem(itemId, { quantity });
      fetchCart(); // Re-fetch cart to get updated totals
      toast({ title: 'Cart updated', description: 'Item quantity has been changed.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update quantity.', variant: 'destructive' });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await cartService.removeFromCart(itemId);
      fetchCart(); // Re-fetch cart
      toast({ title: 'Item removed', description: 'The item has been removed from your cart.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to remove item.', variant: 'destructive' });
    }
  };

  const renderCartContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;
    }

    if (error) {
      return <div className="flex justify-center items-center h-full text-red-400 px-4 text-center">{error}</div>;
    }

    if (!cart || cart.items.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-full text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white">Your Cart is Empty</h3>
          <p className="text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
          <button
            onClick={onClose}
            className="mt-6 bg-gold text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
          >
            Start Shopping
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 bg-gray-900 p-3 rounded-lg">
              <Image
                src={item.product.images[0]?.url || '/placeholder.svg'}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="flex-grow">
                <Link href={`/products/${item.product.slug}`} passHref>
                  <a onClick={onClose} className="font-semibold text-white hover:text-gold transition-colors">{item.product.name}</a>
                </Link>
                <p className="text-gray-400 text-sm">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"><Minus size={16} /></button>
                  <span className="px-3 font-bold">{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600"><Plus size={16} /></button>
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 hover:text-red-400">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 p-6 bg-black">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>${cart.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${cart.shipping.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>${cart.tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-600 pt-2 mt-2"><span>Total</span><span>${cart.total.toFixed(2)}</span></div>
          </div>
          <Link href="/checkout" passHref>
            <a
              onClick={onClose}
              className="block w-full text-center mt-4 bg-gold text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            >
              Proceed to Checkout
            </a>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-black text-white shadow-2xl flex flex-col border-l border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-gold">Shopping Cart</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </header>
            {renderCartContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, Heart, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import type { CartItem } from '@/contexts/CartContext'

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const router = useRouter()
  const { state, updateQuantity, removeItem, moveToWishlist } = useCart()

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
  }

  const handleMoveToWishlist = (id: number) => {
    moveToWishlist(id)
  }

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
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 py-1 font-semibold min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              disabled={!item.inStock}
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
