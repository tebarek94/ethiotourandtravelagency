// User Types
export interface User {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Package Types
export interface Package {
  package_id: number;
  name: string;
  description?: string;
  duration_days: number;
  nights: number;
  price: number;
  type: 'umrah' | 'hajj' | 'tour' | 'custom';
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  destination_id: number;
  name: string;
  type: 'city' | 'country' | 'landmark';
  description?: string;
  created_at: string;
}

// Booking Types
export interface Booking {
  booking_id: number;
  user_id: number;
  package_id: number;
  travel_date: string;
  travelers: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  created_at: string;
  updated_at: string;
  package_name?: string;
}

export interface CreateBookingRequest {
  package_id: number;
  travel_date: string;
  travelers: number;
}

// Article Types
export interface Article {
  article_id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  published_date: string;
  created_at: string;
  updated_at: string;
}

// Inquiry Types
export interface Inquiry {
  inquiry_id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export interface CreateInquiryRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Partner Types
export interface Partner {
  partner_id: number;
  name: string;
  type: 'airline' | 'hotel' | 'transport' | 'other';
  contact_info?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// UI Types
export interface PackageCardProps {
  package: Package;
  onBookNow: (packageId: number) => void;
}

export interface BookingFormData {
  package_id: number;
  travel_date: string;
  travelers: number;
  name: string;
  email: string;
  phone: string;
  special_requests?: string;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
