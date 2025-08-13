import { apiClient, WishlistItem, PaginatedResponse } from '../api';

export interface AddToWishlistData {
  productId: string;
}

export interface WishlistFilters {
  inStock?: boolean;
  onSale?: boolean;
}

export interface WishlistQueryParams extends WishlistFilters {
  page?: number;
  limit?: number;
}

export class WishlistService {
  async getWishlist(params: WishlistQueryParams = {}): Promise<PaginatedResponse<WishlistItem>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/wishlist${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<PaginatedResponse<WishlistItem>>(endpoint);
  }

  async addToWishlist(data: AddToWishlistData): Promise<WishlistItem> {
    return apiClient.post<WishlistItem>('/wishlist/add', data);
  }

  async removeFromWishlist(itemId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/wishlist/items/${itemId}`);
  }

  async clearWishlist(): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>('/wishlist/clear');
  }

  async moveToCart(itemId: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/wishlist/items/${itemId}/move-to-cart`);
  }

  async moveAllToCart(): Promise<{ message: string; movedCount: number }> {
    return apiClient.post<{ message: string; movedCount: number }>('/wishlist/move-all-to-cart');
  }

  async getWishlistCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/wishlist/count');
  }

  async isInWishlist(productId: string): Promise<{ inWishlist: boolean; itemId?: string }> {
    return apiClient.get<{ inWishlist: boolean; itemId?: string }>(`/wishlist/check/${productId}`);
  }

  async getInStockItems(): Promise<WishlistItem[]> {
    const response = await this.getWishlist({ inStock: true });
    return response.data;
  }

  async getOnSaleItems(): Promise<WishlistItem[]> {
    const response = await this.getWishlist({ onSale: true });
    return response.data;
  }

  // Helper methods for wishlist management
  calculateWishlistValue(items: WishlistItem[]): number {
    return items.reduce((total, item) => {
      const price = item.product.onSale && item.product.originalPrice 
        ? item.product.price 
        : item.product.originalPrice || item.product.price;
      return total + price;
    }, 0);
  }

  calculateSavings(items: WishlistItem[]): number {
    return items.reduce((savings, item) => {
      if (item.product.onSale && item.product.originalPrice) {
        return savings + (item.product.originalPrice - item.product.price);
      }
      return savings;
    }, 0);
  }

  getAvailableItems(items: WishlistItem[]): WishlistItem[] {
    return items.filter(item => item.product.stockQuantity > 0);
  }

  getUnavailableItems(items: WishlistItem[]): WishlistItem[] {
    return items.filter(item => item.product.stockQuantity === 0);
  }
}

export const wishlistService = new WishlistService();
