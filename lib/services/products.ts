import { apiClient, Product, PaginatedResponse } from '../api';

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  search?: string;
  tags?: string[];
}

export interface ProductSortOptions {
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductQueryParams extends ProductFilters, ProductSortOptions {
  page?: number;
  limit?: number;
}

export class ProductsService {
  async getProducts(params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<PaginatedResponse<Product>>(endpoint);
  }

  async getProduct(slug: string): Promise<Product> {
    return apiClient.get<Product>(`/products/${slug}`);
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({ 
      isFeatured: true, 
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    return response.data;
  }

  async getNewProducts(limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({ 
      isNew: true, 
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    return response.data;
  }

  async getSaleProducts(limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({ 
      onSale: true, 
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    return response.data;
  }

  async getProductsByCategory(categorySlug: string, params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...params, category: categorySlug });
  }

  async getProductsByBrand(brandSlug: string, params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...params, brand: brandSlug });
  }

  async searchProducts(query: string, params: Omit<ProductQueryParams, 'search'> = {}): Promise<PaginatedResponse<Product>> {
    return this.getProducts({ ...params, search: query });
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`/products/${productId}/related?limit=${limit}`);
    return response;
  }

  async checkStock(productId: string): Promise<{ inStock: boolean; quantity: number }> {
    return apiClient.get<{ inStock: boolean; quantity: number }>(`/products/${productId}/stock`);
  }

  // Admin methods (require admin authentication)
  async createProduct(productData: Partial<Product>): Promise<Product> {
    return apiClient.post<Product>('/products', productData);
  }

  async updateProduct(productId: string, productData: Partial<Product>): Promise<Product> {
    return apiClient.patch<Product>(`/products/${productId}`, productData);
  }

  async deleteProduct(productId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/products/${productId}`);
  }
}

export const productsService = new ProductsService();
