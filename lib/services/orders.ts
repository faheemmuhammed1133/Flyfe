import { apiClient, Order, Address, PaginatedResponse } from '../api';

export interface CreateOrderData {
  shippingAddressId: string;
  billingAddressId?: string;
  paymentMethodId?: string;
  notes?: string;
}

export interface OrderFilters {
  status?: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderQueryParams extends OrderFilters {
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'totalAmount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderSummary {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  statusCounts: {
    pending: number;
    confirmed: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
}

export class OrdersService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    return apiClient.post<Order>('/orders', data);
  }

  async getOrders(params: OrderQueryParams = {}): Promise<PaginatedResponse<Order>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<PaginatedResponse<Order>>(endpoint);
  }

  async getOrder(orderId: string): Promise<Order> {
    return apiClient.get<Order>(`/orders/${orderId}`);
  }

  async getOrderByNumber(orderNumber: string): Promise<Order> {
    return apiClient.get<Order>(`/orders/number/${orderNumber}`);
  }

  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    return apiClient.patch<Order>(`/orders/${orderId}/cancel`, { reason });
  }

  async getOrderSummary(): Promise<OrderSummary> {
    return apiClient.get<OrderSummary>('/orders/summary');
  }

  async trackOrder(orderNumber: string): Promise<{
    order: Order;
    trackingEvents: Array<{
      status: string;
      description: string;
      timestamp: string;
      location?: string;
    }>;
  }> {
    return apiClient.get(`/orders/track/${orderNumber}`);
  }

  async reorderItems(orderId: string): Promise<{ message: string; addedItems: number }> {
    return apiClient.post<{ message: string; addedItems: number }>(`/orders/${orderId}/reorder`);
  }

  // Helper methods for order management
  getOrderStatusColor(status: Order['status']): string {
    const statusColors = {
      PENDING: '#f59e0b',
      CONFIRMED: '#3b82f6',
      PROCESSING: '#8b5cf6',
      SHIPPED: '#06b6d4',
      DELIVERED: '#10b981',
      CANCELLED: '#ef4444',
    };
    return statusColors[status] || '#6b7280';
  }

  getOrderStatusText(status: Order['status']): string {
    const statusTexts = {
      PENDING: 'Pending',
      CONFIRMED: 'Confirmed',
      PROCESSING: 'Processing',
      SHIPPED: 'Shipped',
      DELIVERED: 'Delivered',
      CANCELLED: 'Cancelled',
    };
    return statusTexts[status] || status;
  }

  canCancelOrder(order: Order): boolean {
    return ['PENDING', 'CONFIRMED'].includes(order.status);
  }

  calculateOrderTotal(order: Order): number {
    return order.totalAmount + order.shippingAmount + order.taxAmount;
  }

  formatOrderNumber(orderNumber: string): string {
    return `#${orderNumber}`;
  }

  getEstimatedDeliveryDate(order: Order): Date | null {
    if (order.status === 'DELIVERED') return null;
    
    const createdDate = new Date(order.createdAt);
    const estimatedDays = order.status === 'SHIPPED' ? 3 : 7;
    
    const deliveryDate = new Date(createdDate);
    deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
    
    return deliveryDate;
  }
}

export const ordersService = new OrdersService();
