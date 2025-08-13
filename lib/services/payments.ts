import { apiClient, Payment, PaginatedResponse } from '../api';

export interface CreatePaymentIntentData {
  orderId: string;
  amount: number;
  currency?: string;
}

export interface ConfirmPaymentData {
  paymentIntentId: string;
  paymentMethodId: string;
}

export interface PaymentQueryParams {
  page?: number;
  limit?: number;
  status?: 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  sortBy?: 'createdAt' | 'amount';
  sortOrder?: 'asc' | 'desc';
}

export class PaymentsService {
  async createPaymentIntent(data: CreatePaymentIntentData): Promise<{ clientSecret: string; paymentIntentId: string }> {
    return apiClient.post<{ clientSecret: string; paymentIntentId: string }>('/payments/create-intent', data);
  }

  async confirmPayment(data: ConfirmPaymentData): Promise<Payment> {
    return apiClient.post<Payment>('/payments/confirm', data);
  }

  async getPaymentHistory(params: PaymentQueryParams = {}): Promise<PaginatedResponse<Payment>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/payments${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<PaginatedResponse<Payment>>(endpoint);
  }

  async getPaymentDetails(paymentId: string): Promise<Payment> {
    return apiClient.get<Payment>(`/payments/${paymentId}`);
  }

  async requestRefund(paymentId: string, reason?: string): Promise<Payment> {
    return apiClient.post<Payment>(`/payments/${paymentId}/refund`, { reason });
  }

  // This would be a webhook handled by the backend, but a frontend utility might be useful
  getStripeJs() {
    // Dynamically load the Stripe.js script
    // Example: return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
}

export const paymentsService = new PaymentsService();
