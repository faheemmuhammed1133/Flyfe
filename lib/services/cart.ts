import { apiClient, CartItem } from '../api';

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

export class CartService {
  async getCartSummary(): Promise<CartSummary> {
    return apiClient.get<CartSummary>('/cart');
  }

  async addToCart(data: AddToCartData): Promise<CartItem> {
    return apiClient.post<CartItem>('/cart/add', data);
  }

  async updateItemQuantity(itemId: string, quantity: number): Promise<CartItem> {
    return apiClient.patch<CartItem>(`/cart/items/${itemId}`, { quantity });
  }

  async removeItem(itemId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/cart/items/${itemId}`);
  }

  async clearCart(): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>('/cart/clear');
  }

  async moveToWishlist(itemId: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/cart/items/${itemId}/move-to-wishlist`);
  }

  async getCartItemCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/cart/count');
  }
}

export const cartService = new CartService();

