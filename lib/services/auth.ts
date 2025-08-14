import { apiClient, User } from '../api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock authentication for development
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.email && credentials.password) {
        const mockResponse: AuthResponse = {
          user: {
            id: '1',
            email: credentials.email,
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            role: 'CUSTOMER' as const,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          token: 'mock-jwt-token-' + Date.now()
        };
        apiClient.setToken(mockResponse.token);
        return mockResponse;
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    apiClient.setToken(response.token);
    return response;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    // Mock authentication for development
    if (process.env.NODE_ENV === 'development') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockResponse: AuthResponse = {
        user: {
          id: '1',
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone || '',
          role: 'CUSTOMER' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        token: 'mock-jwt-token-' + Date.now()
      };
      apiClient.setToken(mockResponse.token);
      return mockResponse;
    }
    
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    apiClient.setToken(response.token);
    return response;
  }

  async getProfile(): Promise<User> {
    return apiClient.get<User>('/auth/profile');
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/refresh');
    apiClient.setToken(response.token);
    return response;
  }

  logout(): void {
    apiClient.clearToken();
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    return apiClient.post('/auth/reset-password', { token, password });
  }
}

export const authService = new AuthService();
