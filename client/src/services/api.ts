import axios, { AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ApiResponse, 
  Package, 
  Destination, 
  Booking, 
  CreateBookingRequest,
  Article,
  Inquiry,
  CreateInquiryRequest,
  Partner,
  User
} from '../types';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Packages API
export const packagesAPI = {
  getAll: async (): Promise<ApiResponse<Package[]>> => {
    const response: AxiosResponse<ApiResponse<Package[]>> = await api.get('/packages');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Package>> => {
    const response: AxiosResponse<ApiResponse<Package>> = await api.get(`/packages/${id}`);
    return response.data;
  },

  getByType: async (type: string): Promise<ApiResponse<Package[]>> => {
    const response: AxiosResponse<ApiResponse<Package[]>> = await api.get(`/packages?type=${type}`);
    return response.data;
  },
};

// Destinations API
export const destinationsAPI = {
  getAll: async (): Promise<ApiResponse<Destination[]>> => {
    const response: AxiosResponse<ApiResponse<Destination[]>> = await api.get('/destinations');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Destination>> => {
    const response: AxiosResponse<ApiResponse<Destination>> = await api.get(`/destinations/${id}`);
    return response.data;
  },

  getByType: async (type: string): Promise<ApiResponse<Destination[]>> => {
    const response: AxiosResponse<ApiResponse<Destination[]>> = await api.get(`/destinations/type/${type}`);
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  create: async (bookingData: CreateBookingRequest): Promise<ApiResponse<Booking>> => {
    const response: AxiosResponse<ApiResponse<Booking>> = await api.post('/bookings', bookingData);
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<Booking[]>> => {
    const response: AxiosResponse<ApiResponse<Booking[]>> = await api.get('/bookings');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Booking>> => {
    const response: AxiosResponse<ApiResponse<Booking>> = await api.get(`/bookings/${id}`);
    return response.data;
  },

  update: async (id: number, data: Partial<Booking>): Promise<ApiResponse<Booking>> => {
    const response: AxiosResponse<ApiResponse<Booking>> = await api.put(`/bookings/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response: AxiosResponse<ApiResponse<void>> = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

// Articles API
export const articlesAPI = {
  getAll: async (): Promise<ApiResponse<Article[]>> => {
    const response: AxiosResponse<ApiResponse<Article[]>> = await api.get('/articles');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Article>> => {
    const response: AxiosResponse<ApiResponse<Article>> = await api.get(`/articles/id/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string): Promise<ApiResponse<Article>> => {
    const response: AxiosResponse<ApiResponse<Article>> = await api.get(`/articles/slug/${slug}`);
    return response.data;
  },
};

// Inquiries API
export const inquiriesAPI = {
  create: async (inquiryData: CreateInquiryRequest): Promise<ApiResponse<Inquiry>> => {
    const response: AxiosResponse<ApiResponse<Inquiry>> = await api.post('/inquiries', inquiryData);
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<Inquiry[]>> => {
    const response: AxiosResponse<ApiResponse<Inquiry[]>> = await api.get('/inquiries');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Inquiry>> => {
    const response: AxiosResponse<ApiResponse<Inquiry>> = await api.get(`/inquiries/${id}`);
    return response.data;
  },
};

// Partners API
export const partnersAPI = {
  getAll: async (): Promise<ApiResponse<Partner[]>> => {
    const response: AxiosResponse<ApiResponse<Partner[]>> = await api.get('/partners');
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Partner>> => {
    const response: AxiosResponse<ApiResponse<Partner>> = await api.get(`/partners/${id}`);
    return response.data;
  },

  getByType: async (type: string): Promise<ApiResponse<Partner[]>> => {
    const response: AxiosResponse<ApiResponse<Partner[]>> = await api.get(`/partners/type/${type}`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response: AxiosResponse<ApiResponse<User>> = await api.put('/users/profile', data);
    return response.data;
  },
};

export default api;
