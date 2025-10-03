export interface User {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  password_hash: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

export interface Package {
  package_id: number;
  name: string;
  description?: string;
  duration_days: number;
  nights: number;
  price: number;
  type: 'umrah' | 'hajj' | 'tour' | 'custom';
  rating: number;
  created_at: Date;
  updated_at: Date;
}

export interface Destination {
  destination_id: number;
  name: string;
  type: 'city' | 'country' | 'landmark';
  description?: string;
  created_at: Date;
}

export interface Booking {
  booking_id: number;
  user_id: number;
  package_id: number;
  travel_date: Date;
  travelers: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  created_at: Date;
  updated_at: Date;
}

export interface Flight {
  transport_id: number;
  booking_id: number;
  departure_city: string;
  arrival_city: string;
  departure_time: Date;
  arrival_time: Date;
  airline: string;
  flight_number?: string;
  created_at: Date;
}

export interface Hotel {
  hotel_id: number;
  name: string;
  city: string;
  star_rating: number;
  address?: string;
  created_at: Date;
}

export interface BookingHotel {
  booking_hotel_id: number;
  booking_id: number;
  hotel_id: number;
  nights: number;
  check_in_date: Date;
  check_out_date: Date;
  created_at: Date;
}

export interface Transfer {
  transfer_id: number;
  booking_id: number;
  from_location: string;
  to_location: string;
  transport_type: 'bus' | 'car' | 'van' | 'train';
  time: Date;
  created_at: Date;
}

export interface Article {
  article_id: number;
  title: string;
  slug: string;
  content: string;
  author: string;
  published_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Inquiry {
  inquiry_id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: Date;
}

export interface Partner {
  partner_id: number;
  name: string;
  type: 'airline' | 'hotel' | 'transport' | 'other';
  contact_info?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

// Request/Response types
export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface CreateUserData {
  name: string;
  email: string;
  phone?: string;
  password_hash: string;
  role?: 'admin' | 'user';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreatePackageRequest {
  name: string;
  description?: string;
  duration_days: number;
  nights: number;
  price: number;
  type: 'umrah' | 'hajj' | 'tour' | 'custom';
  rating?: number;
}

export interface CreateBookingRequest {
  package_id: number;
  travel_date: string;
  travelers: number;
}

export interface CreateFlightRequest {
  booking_id: number;
  departure_city: string;
  arrival_city: string;
  departure_time: string;
  arrival_time: string;
  airline: string;
  flight_number?: string;
}

export interface CreateHotelRequest {
  name: string;
  city: string;
  star_rating: number;
  address?: string;
}

export interface CreateBookingHotelRequest {
  booking_id: number;
  hotel_id: number;
  nights: number;
  check_in_date: string;
  check_out_date: string;
}

export interface CreateTransferRequest {
  booking_id: number;
  from_location: string;
  to_location: string;
  transport_type: 'bus' | 'car' | 'van' | 'train';
  time: string;
}

export interface CreateArticleRequest {
  title: string;
  slug: string;
  content: string;
  author: string;
}

export interface CreateInquiryRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface CreatePartnerRequest {
  name: string;
  type: 'airline' | 'hotel' | 'transport' | 'other';
  contact_info?: string;
  description?: string;
}

// JWT Payload
export interface JWTPayload {
  userId: number;
  email: string;
  role: 'admin' | 'user';
}

// Express Request with user
export interface AuthenticatedRequest extends Express.Request {
  user?: User;
}
