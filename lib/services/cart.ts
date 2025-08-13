import { apiClient, CartItem, Product } from '../api';

// Re-exporting for use in components
export type { CartItem };

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  total: number;
  shipping: number;
  tax: number;
  discount: number;
  itemCount: number;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemData {
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export class CartService {
  async getCart(): Promise<CartSummary> {
    return apiClient.get<CartSummary>('/cart');
  }

  async addToCart(data: AddToCartData): Promise<CartItem> {
    return apiClient.post<CartItem>('/cart/add', data);
  }

  async updateCartItem(itemId: string, data: UpdateCartItemData): Promise<CartItem> {
    return apiClient.patch<CartItem>(`/cart/items/${itemId}`, data);
  }

  async removeFromCart(itemId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/cart/items/${itemId}`);
  }

  async clearCart(): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>('/cart/clear');
  }

  async moveToWishlist(itemId: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/cart/items/${itemId}/move-to-wishlist`);
  }

  async validateCart(): Promise<{
    valid: boolean;
    issues: Array<{
      itemId: string;
      issue: string;
      availableQuantity?: number;
    }>;
  }> {
    return apiClient.get('/cart/validate');
  }

  async getCartItemCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/cart/count');
  }

  // Helper methods for local cart management
  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      const price = item.product.originalPrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }

  calculateTax(subtotal: number, taxRate: number = 0.08): number {
    return subtotal * taxRate;
  }

  calculateShipping(subtotal: number, freeShippingThreshold: number = 100): number {
    return subtotal >= freeShippingThreshold ? 0 : 15;
  }

  calculateTotal(subtotal: number, tax: number, shipping: number): number {
    return subtotal + tax + shipping;
  }
}

export const cartService = new CartService();
