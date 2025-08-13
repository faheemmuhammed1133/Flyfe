import { apiClient, Review, PaginatedResponse } from '../api';

export interface CreateReviewData {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}

export interface UpdateReviewData {
  rating?: number;
  title?: string;
  comment?: string;
}

export interface ReviewQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductReviewSummary {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export class ReviewsService {
  async getProductReviews(productId: string, params: ReviewQueryParams = {}): Promise<ProductReviewSummary> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/reviews/product/${productId}${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<ProductReviewSummary>(endpoint);
  }

  async createReview(data: CreateReviewData): Promise<Review> {
    return apiClient.post<Review>('/reviews', data);
  }

  async updateReview(reviewId: string, data: UpdateReviewData): Promise<Review> {
    return apiClient.patch<Review>(`/reviews/${reviewId}`, data);
  }

  async deleteReview(reviewId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/reviews/${reviewId}`);
  }

  async getUserReviews(params: ReviewQueryParams = {}): Promise<PaginatedResponse<Review>> {
     const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/reviews/my-reviews${queryString ? `?${queryString}` : ''}`;

    return apiClient.get<PaginatedResponse<Review>>(endpoint);
  }
}

export const reviewsService = new ReviewsService();
