import apiClient from './client';

export interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  active: boolean;
}

export interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    username: string;
    email: string;
    role: string;
    token: string;
  };
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// Get current admin profile
export const getCurrentProfile = async (): Promise<{ success: boolean; data: AdminUser }> => {
  const response = await apiClient.get<{ success: boolean; data: AdminUser }>('/auth/me');
  return response.data;
};

// Update admin profile (username and email)
export const updateProfile = async (
  username?: string,
  email?: string
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>('/auth/update-profile', {
    username,
    email
  });
  return response.data;
};

// Change password
export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<ChangePasswordResponse> => {
  const response = await apiClient.put<ChangePasswordResponse>('/auth/change-password', {
    currentPassword,
    newPassword,
    confirmPassword
  });
  return response.data;
};
