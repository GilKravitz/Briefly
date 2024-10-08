import { FotgotPasswordData, LoginData, NewPasswordData, OtpData, RegisterData } from "@/types/User";
import { LoginResponse } from "@/types/ApiResponse";
import apiClient from "./apiClient";

const authClient = apiClient;
authClient.postForm;

// Register a new user
export const signUp = async (userData: RegisterData) => {
  const response = await apiClient.post(`/Authentication/register`, userData);
  return response.data;
};

// Login user
export const signIn = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post(`/Authentication/login`, credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

// Reset password
export const forgotPassword = async (credentials: FotgotPasswordData) => {
  const response = await apiClient.post(`/Authentication/forgot-password`, credentials);
  return response.data;
};

// Request OTP
export const checkOTP = async (otpData: OtpData) => {
  console.log("otpData:", otpData);
  const response = await apiClient.post(`/Authentication/otp`, otpData);
  return response.data;
};

export const setNewpassword = async (newPasswordData: NewPasswordData) => {
  const response = await apiClient.post(`/Authentication/new-password`, newPasswordData);
  return response.data;
};

export const setToken = (token: string) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
