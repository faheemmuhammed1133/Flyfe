import { apiClient, User, Address, PaginatedResponse } from '../api';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export class UsersService {
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/users/profile');
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    return apiClient.patch<User>('/users/profile', data);
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    return apiClient.patch<{ message: string }>('/users/password', data);
  }

  async uploadAvatar(formData: FormData): Promise<User> {
    // Note: apiClient needs to be adapted to handle multipart/form-data
    // This is a placeholder for the actual implementation
    const response = await fetch('/api/v1/users/avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('flyfe_token')}`,
      },
      body: formData,
    });
    return response.json();
  }

  // Address Management
  async getAddresses(): Promise<Address[]> {
    return apiClient.get<Address[]>('/users/addresses');
  }

  async addAddress(addressData: Omit<Address, 'id' | 'isDefault'>): Promise<Address> {
    return apiClient.post<Address>('/users/addresses', addressData);
  }

  async updateAddress(addressId: string, addressData: Partial<Omit<Address, 'id'>>): Promise<Address> {
    return apiClient.patch<Address>(`/users/addresses/${addressId}`, addressData);
  }

  async deleteAddress(addressId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/users/addresses/${addressId}`);
  }

  async setDefaultAddress(addressId: string): Promise<Address> {
    return apiClient.patch<Address>(`/users/addresses/${addressId}/default`);
  }
}

export const usersService = new UsersService();
