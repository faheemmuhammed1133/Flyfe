'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Loader2, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cartService, CartSummary } from '../lib/services/cart';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import { formatPrice } from '../lib/utils';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCart = async () => {
    try {
      const cartData = await cartService.getCartSummary();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch your shopping cart.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchCart();
    }
  }, [isOpen]);

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItemLoading(itemId);
    try {
      await cartService.updateItemQuantity(itemId, quantity);
      await fetchCart(); // Refetch cart to get updated summary
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
      setItemLoading(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setItemLoading(itemId);
    try {
      await cartService.removeItem(itemId);
      await fetchCart(); // Refetch cart to get updated summary
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
      setItemLoading(null);
    }
  };

  const handleMoveToWishlist = async (itemId: string) => {
    setItemLoading(itemId);
    try {
      await cartService.moveToWishlist(itemId);
      await fetchCart(); // Refetch cart after moving item
      toast({
        title: 'Success',
        description: 'Item moved to wishlist.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to move item to wishlist.',
        variant: 'destructive',
      });
    } finally {
      setItemLoading(null);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md h-full bg-black text-gold flex flex-col shadow-2xl shadow-gold/20"
            variants={cartVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gold/20">
              <h2 className="text-2xl font-bellefair">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6 text-gold" />
              </Button>
            </div>

            {loading ? (
              <div className="flex-grow flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-gold animate-spin" />
              </div>
            ) : !cart || cart.items.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <ShoppingBag className="h-24 w-24 text-gold/50 mb-6" />
                <h3 className="text-xl font-bellefair mb-2">Your cart is empty</h3>
                <p className="text-gold/70 mb-6">Looks like you haven't added anything yet.</p>
                <Button onClick={onClose} variant="outline">Continue Shopping</Button>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                  <AnimatePresence>
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="flex items-start space-x-4 relative"
                      >
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden border border-gold/20 flex-shrink-0">
                          <Image
                            src={item.product.images[0]?.url || '/placeholder.png'}
                            alt={item.product.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <Link href={`/products/${item.product.id}`} passHref>
                            <a className="font-semibold hover:text-white transition-colors">{item.product.name}</a>
                          </Link>
                          <p className="text-sm text-gold/70">{item.variant?.name || ''}</p>
                          <p className="text-lg font-bold mt-1">{formatPrice(item.price)}</p>
                          <div className="flex items-center mt-3 space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={itemLoading === item.id}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={itemLoading === item.id}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex flex-col items-center space-y-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gold/70 hover:text-gold"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={itemLoading === item.id}
                            aria-label="Remove item"
                          >
                            {itemLoading === item.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-gold/70 hover:text-gold"
                            onClick={() => handleMoveToWishlist(item.id)}
                            disabled={itemLoading === item.id}
                            aria-label="Move to wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="p-6 border-t border-gold/20 space-y-4 bg-black/50">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-bold">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <p className="text-sm text-gold/70">Taxes and shipping calculated at checkout.</p>
                  <Button asChild size="lg" className="w-full bg-gold text-black hover:bg-gold/90 font-bold text-lg py-6">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
