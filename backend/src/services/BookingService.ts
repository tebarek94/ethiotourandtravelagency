import { BookingModel } from '../models/Booking';
import { FlightModel } from '../models/Flight';
import { HotelModel, BookingHotelModel } from '../models/Hotel';
import { TransferModel } from '../models/Transfer';
import { PackageModel } from '../models/Package';
import { 
  CreateBookingRequest, 
  CreateFlightRequest, 
  CreateHotelRequest, 
  CreateBookingHotelRequest, 
  CreateTransferRequest,
  Booking,
  Flight,
  Hotel,
  BookingHotel,
  Transfer
} from '../types';
import { createError } from '../middlewares/errorHandler';

export class BookingService {
  static async createBooking(bookingData: CreateBookingRequest, userId: number): Promise<Booking> {
    // Verify package exists
    const packageData = await PackageModel.findById(bookingData.package_id);
    if (!packageData) {
      throw createError('Package not found', 404);
    }

    // Calculate total price
    const totalPrice = packageData.price * bookingData.travelers;

    const booking = await BookingModel.create({
      ...bookingData,
      user_id: userId,
      total_price: totalPrice
    });

    return booking;
  }

  static async getAllBookings(userId?: number): Promise<Booking[]> {
    if (userId) {
      return BookingModel.findByUserId(userId);
    }
    return BookingModel.findAll();
  }

  static async getBookingById(id: number, userId?: number): Promise<any> {
    const booking = await BookingModel.getBookingWithDetails(id);
    if (!booking) {
      throw createError('Booking not found', 404);
    }

    // Check if user can access this booking
    if (userId && booking.user_id !== userId) {
      throw createError('Access denied', 403);
    }

    return booking;
  }

  static async updateBooking(id: number, updateData: Partial<Booking>, userId?: number): Promise<Booking> {
    const existingBooking = await BookingModel.findById(id);
    if (!existingBooking) {
      throw createError('Booking not found', 404);
    }

    // Check if user can update this booking
    if (userId && existingBooking.user_id !== userId) {
      throw createError('Access denied', 403);
    }

    const updatedBooking = await BookingModel.update(id, updateData);
    if (!updatedBooking) {
      throw createError('Failed to update booking', 500);
    }

    return updatedBooking;
  }

  static async deleteBooking(id: number, userId?: number): Promise<void> {
    const existingBooking = await BookingModel.findById(id);
    if (!existingBooking) {
      throw createError('Booking not found', 404);
    }

    // Check if user can delete this booking
    if (userId && existingBooking.user_id !== userId) {
      throw createError('Access denied', 403);
    }

    const deleted = await BookingModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete booking', 500);
    }
  }
}

export class FlightService {
  static async createFlight(flightData: CreateFlightRequest): Promise<Flight> {
    // Verify booking exists
    const booking = await BookingModel.findById(flightData.booking_id);
    if (!booking) {
      throw createError('Booking not found', 404);
    }

    return FlightModel.create(flightData);
  }

  static async getFlightsByBooking(bookingId: number): Promise<Flight[]> {
    return FlightModel.findByBookingId(bookingId);
  }

  static async updateFlight(id: number, updateData: Partial<Flight>): Promise<Flight> {
    const existingFlight = await FlightModel.findById(id);
    if (!existingFlight) {
      throw createError('Flight not found', 404);
    }

    const updatedFlight = await FlightModel.update(id, updateData);
    if (!updatedFlight) {
      throw createError('Failed to update flight', 500);
    }

    return updatedFlight;
  }

  static async deleteFlight(id: number): Promise<void> {
    const existingFlight = await FlightModel.findById(id);
    if (!existingFlight) {
      throw createError('Flight not found', 404);
    }

    const deleted = await FlightModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete flight', 500);
    }
  }
}

export class HotelService {
  static async createHotel(hotelData: CreateHotelRequest): Promise<Hotel> {
    return HotelModel.create(hotelData);
  }

  static async getAllHotels(): Promise<Hotel[]> {
    return HotelModel.findAll();
  }

  static async getHotelById(id: number): Promise<Hotel> {
    const hotel = await HotelModel.findById(id);
    if (!hotel) {
      throw createError('Hotel not found', 404);
    }
    return hotel;
  }

  static async updateHotel(id: number, updateData: Partial<Hotel>): Promise<Hotel> {
    const existingHotel = await HotelModel.findById(id);
    if (!existingHotel) {
      throw createError('Hotel not found', 404);
    }

    const updatedHotel = await HotelModel.update(id, updateData);
    if (!updatedHotel) {
      throw createError('Failed to update hotel', 500);
    }

    return updatedHotel;
  }

  static async deleteHotel(id: number): Promise<void> {
    const existingHotel = await HotelModel.findById(id);
    if (!existingHotel) {
      throw createError('Hotel not found', 404);
    }

    const deleted = await HotelModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete hotel', 500);
    }
  }

  static async createBookingHotel(bookingHotelData: CreateBookingHotelRequest): Promise<BookingHotel> {
    // Verify booking exists
    const booking = await BookingModel.findById(bookingHotelData.booking_id);
    if (!booking) {
      throw createError('Booking not found', 404);
    }

    // Verify hotel exists
    const hotel = await HotelModel.findById(bookingHotelData.hotel_id);
    if (!hotel) {
      throw createError('Hotel not found', 404);
    }

    return BookingHotelModel.create(bookingHotelData);
  }

  static async getBookingHotels(bookingId: number): Promise<any[]> {
    return BookingHotelModel.findByBookingId(bookingId);
  }

  static async updateBookingHotel(id: number, updateData: Partial<BookingHotel>): Promise<BookingHotel> {
    const existingBookingHotel = await BookingHotelModel.findById(id);
    if (!existingBookingHotel) {
      throw createError('Booking hotel not found', 404);
    }

    const updatedBookingHotel = await BookingHotelModel.update(id, updateData);
    if (!updatedBookingHotel) {
      throw createError('Failed to update booking hotel', 500);
    }

    return updatedBookingHotel;
  }

  static async deleteBookingHotel(id: number): Promise<void> {
    const existingBookingHotel = await BookingHotelModel.findById(id);
    if (!existingBookingHotel) {
      throw createError('Booking hotel not found', 404);
    }

    const deleted = await BookingHotelModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete booking hotel', 500);
    }
  }
}

export class TransferService {
  static async createTransfer(transferData: CreateTransferRequest): Promise<Transfer> {
    // Verify booking exists
    const booking = await BookingModel.findById(transferData.booking_id);
    if (!booking) {
      throw createError('Booking not found', 404);
    }

    return TransferModel.create(transferData);
  }

  static async getTransfersByBooking(bookingId: number): Promise<Transfer[]> {
    return TransferModel.findByBookingId(bookingId);
  }

  static async updateTransfer(id: number, updateData: Partial<Transfer>): Promise<Transfer> {
    const existingTransfer = await TransferModel.findById(id);
    if (!existingTransfer) {
      throw createError('Transfer not found', 404);
    }

    const updatedTransfer = await TransferModel.update(id, updateData);
    if (!updatedTransfer) {
      throw createError('Failed to update transfer', 500);
    }

    return updatedTransfer;
  }

  static async deleteTransfer(id: number): Promise<void> {
    const existingTransfer = await TransferModel.findById(id);
    if (!existingTransfer) {
      throw createError('Transfer not found', 404);
    }

    const deleted = await TransferModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete transfer', 500);
    }
  }
}
