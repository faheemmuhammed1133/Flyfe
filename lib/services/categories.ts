import { apiClient, Category, PaginatedResponse } from '../api';

export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'sortOrder';
  sortOrder?: 'asc' | 'desc';
  includeChildren?: boolean;
  tree?: boolean; // to get the full category tree
}

export class CategoriesService {
  async getCategories(params: CategoryQueryParams = {}): Promise<PaginatedResponse<Category>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<PaginatedResponse<Category>>(endpoint);
  }

  async getCategory(slug: string): Promise<Category> {
    return apiClient.get<Category>(`/categories/${slug}`);
  }

  async getCategoryTree(): Promise<Category[]> {
    const response = await this.getCategories({ tree: true });
    return response.data;
  }

  async getFeaturedCategories(limit: number = 4): Promise<Category[]> {
    const response = await this.getCategories({ limit, sortBy: 'sortOrder', sortOrder: 'asc' });
    return response.data;
  }

  // Admin methods
  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    return apiClient.post<Category>('/categories', categoryData);
  }

  async updateCategory(categoryId: string, categoryData: Partial<Category>): Promise<Category> {
    return apiClient.patch<Category>(`/categories/${categoryId}`, categoryData);
  }

  async deleteCategory(categoryId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/categories/${categoryId}`);
  }
}

export const categoriesService = new CategoriesService();
