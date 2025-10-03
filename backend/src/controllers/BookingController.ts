import { Request, Response, NextFunction } from 'express';
import { 
  BookingService, 
  FlightService, 
  HotelService, 
  TransferService 
} from '../services/BookingService';
import { AuthenticatedRequest } from '../types';

export class BookingController {
  static async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as AuthenticatedRequest).user?.user_id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const booking = await BookingService.createBooking(req.body, userId);
      
      res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        data: booking
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as AuthenticatedRequest).user?.user_id;
      const userRole = (req as AuthenticatedRequest).user?.role;
      
      // Admin can see all bookings, users can only see their own
      const bookings = await BookingService.getAllBookings(
        userRole === 'admin' ? undefined : userId
      );
      
      res.json({
        success: true,
        message: 'Bookings retrieved successfully',
        data: bookings
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBookingById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingId = parseInt(req.params.id);
      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID'
        });
        return;
      }

      const userId = (req as AuthenticatedRequest).user?.user_id;
      const userRole = (req as AuthenticatedRequest).user?.role;
      
      const booking = await BookingService.getBookingById(
        bookingId, 
        userRole === 'admin' ? undefined : userId
      );
      
      res.json({
        success: true,
        message: 'Booking retrieved successfully',
        data: booking
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingId = parseInt(req.params.id);
      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID'
        });
        return;
      }

      const userId = (req as AuthenticatedRequest).user?.user_id;
      const userRole = (req as AuthenticatedRequest).user?.role;
      
      const updatedBooking = await BookingService.updateBooking(
        bookingId, 
        req.body,
        userRole === 'admin' ? undefined : userId
      );
      
      res.json({
        success: true,
        message: 'Booking updated successfully',
        data: updatedBooking
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingId = parseInt(req.params.id);
      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID'
        });
        return;
      }

      const userId = (req as AuthenticatedRequest).user?.user_id;
      const userRole = (req as AuthenticatedRequest).user?.role;
      
      await BookingService.deleteBooking(
        bookingId,
        userRole === 'admin' ? undefined : userId
      );
      
      res.json({
        success: true,
        message: 'Booking deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export class FlightController {
  static async createFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const flight = await FlightService.createFlight(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Flight created successfully',
        data: flight
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFlightsByBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingId = parseInt(req.params.bookingId);
      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID'
        });
        return;
      }

      const flights = await FlightService.getFlightsByBooking(bookingId);
      
      res.json({
        success: true,
        message: 'Flights retrieved successfully',
        data: flights
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      if (isNaN(flightId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid flight ID'
        });
        return;
      }

      const updatedFlight = await FlightService.updateFlight(flightId, req.body);
      
      res.json({
        success: true,
        message: 'Flight updated successfully',
        data: updatedFlight
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFlight(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const flightId = parseInt(req.params.id);
      if (isNaN(flightId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid flight ID'
        });
        return;
      }

      await FlightService.deleteFlight(flightId);
      
      res.json({
        success: true,
        message: 'Flight deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export class HotelController {
  static async createHotel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hotel = await HotelService.createHotel(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Hotel created successfully',
        data: hotel
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllHotels(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hotels = await HotelService.getAllHotels();
      
      res.json({
        success: true,
        message: 'Hotels retrieved successfully',
        data: hotels
      });
    } catch (error) {
      next(error);
    }
  }

  static async getHotelById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hotelId = parseInt(req.params.id);
      if (isNaN(hotelId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid hotel ID'
        });
        return;
      }

      const hotel = await HotelService.getHotelById(hotelId);
      
      res.json({
        success: true,
        message: 'Hotel retrieved successfully',
        data: hotel
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateHotel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hotelId = parseInt(req.params.id);
      if (isNaN(hotelId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid hotel ID'
        });
        return;
      }

      const updatedHotel = await HotelService.updateHotel(hotelId, req.body);
      
      res.json({
        success: true,
        message: 'Hotel updated successfully',
        data: updatedHotel
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteHotel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const hotelId = parseInt(req.params.id);
      if (isNaN(hotelId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid hotel ID'
        });
        return;
      }

      await HotelService.deleteHotel(hotelId);
      
      res.json({
        success: true,
        message: 'Hotel deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async createBookingHotel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingHotel = await HotelService.createBookingHotel(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Hotel added to booking successfully',
        data: bookingHotel
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBookingHotels(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingId = parseInt(req.params.bookingId);
      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID'
        });
        return;
      }

      const bookingHotels = await HotelService.getBookingHotels(bookingId);
      
      res.json({
        success: true,
        message: 'Booking hotels retrieved successfully',
        data: bookingHotels
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBookingHotel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingHotelId = parseInt(req.params.id);
      if (isNaN(bookingHotelId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking hotel ID'
        });
        return;
      }

      const updatedBookingHotel = await HotelService.updateBookingHotel(bookingHotelId, req.body);
      
      res.json({
        success: true,
        message: 'Booking hotel updated successfully',
        data: updatedBookingHotel
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookingHotel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingHotelId = parseInt(req.params.id);
      if (isNaN(bookingHotelId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking hotel ID'
        });
        return;
      }

      await HotelService.deleteBookingHotel(bookingHotelId);
      
      res.json({
        success: true,
        message: 'Booking hotel deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export class TransferController {
  static async createTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const transfer = await TransferService.createTransfer(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Transfer created successfully',
        data: transfer
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTransfersByBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookingId = parseInt(req.params.bookingId);
      if (isNaN(bookingId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid booking ID'
        });
        return;
      }

      const transfers = await TransferService.getTransfersByBooking(bookingId);
      
      res.json({
        success: true,
        message: 'Transfers retrieved successfully',
        data: transfers
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const transferId = parseInt(req.params.id);
      if (isNaN(transferId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid transfer ID'
        });
        return;
      }

      const updatedTransfer = await TransferService.updateTransfer(transferId, req.body);
      
      res.json({
        success: true,
        message: 'Transfer updated successfully',
        data: updatedTransfer
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTransfer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const transferId = parseInt(req.params.id);
      if (isNaN(transferId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid transfer ID'
        });
        return;
      }

      await TransferService.deleteTransfer(transferId);
      
      res.json({
        success: true,
        message: 'Transfer deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}
