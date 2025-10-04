import { Router } from 'express';
import { 
  BookingController, 
  FlightController, 
  HotelController, 
  TransferController 
} from '../controllers/BookingController';
import { authMiddleware, adminMiddleware, userMiddleware } from '../middlewares/auth';
import { validateBooking, validateFlight, validateHotel, validateBookingHotel, validateTransfer } from '../middlewares/validation';
import { uploadDocuments } from '../middlewares/upload';

const router = Router();

// All booking routes require authentication
router.use(authMiddleware);

// Booking routes
// POST /api/bookings - Create booking (user) with file uploads
router.post('/', userMiddleware, uploadDocuments, BookingController.createBooking);

// GET /api/bookings - User's bookings (user), all bookings (admin)
router.get('/', BookingController.getAllBookings);

// GET /api/bookings/:id - Get booking details
router.get('/:id', BookingController.getBookingById);

// PUT /api/bookings/:id - Update booking (admin)
router.put('/:id', adminMiddleware, BookingController.updateBooking);

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', BookingController.deleteBooking);

// Document routes
// GET /api/bookings/:id/documents - Get booking documents
router.get('/:id/documents', BookingController.getBookingDocuments);

// GET /api/bookings/documents/:documentId/download - Download document
router.get('/documents/:documentId/download', BookingController.downloadDocument);

// Flight routes (admin only)
// POST /api/bookings/flights - Add flight to booking (admin)
router.post('/flights', adminMiddleware, validateFlight, FlightController.createFlight);

// GET /api/bookings/:bookingId/flights - Get flights for booking
router.get('/:bookingId/flights', FlightController.getFlightsByBooking);

// PUT /api/bookings/flights/:id - Update flight (admin)
router.put('/flights/:id', adminMiddleware, FlightController.updateFlight);

// DELETE /api/bookings/flights/:id - Delete flight (admin)
router.delete('/flights/:id', adminMiddleware, FlightController.deleteFlight);

// Hotel routes
// POST /api/bookings/hotels - Add hotel (admin)
router.post('/hotels', adminMiddleware, validateHotel, HotelController.createHotel);

// GET /api/bookings/hotels - List all hotels
router.get('/hotels', HotelController.getAllHotels);

// GET /api/bookings/hotels/:id - Get hotel by ID
router.get('/hotels/:id', HotelController.getHotelById);

// PUT /api/bookings/hotels/:id - Update hotel (admin)
router.put('/hotels/:id', adminMiddleware, HotelController.updateHotel);

// DELETE /api/bookings/hotels/:id - Delete hotel (admin)
router.delete('/hotels/:id', adminMiddleware, HotelController.deleteHotel);

// Booking-Hotel routes (admin only)
// POST /api/bookings/booking-hotels - Add hotel to booking (admin)
router.post('/booking-hotels', adminMiddleware, validateBookingHotel, HotelController.createBookingHotel);

// GET /api/bookings/:bookingId/booking-hotels - Get hotels for booking
router.get('/:bookingId/booking-hotels', HotelController.getBookingHotels);

// PUT /api/bookings/booking-hotels/:id - Update booking hotel (admin)
router.put('/booking-hotels/:id', adminMiddleware, HotelController.updateBookingHotel);

// DELETE /api/bookings/booking-hotels/:id - Delete booking hotel (admin)
router.delete('/booking-hotels/:id', adminMiddleware, HotelController.deleteBookingHotel);

// Transfer routes (admin only)
// POST /api/bookings/transfers - Add ground transfer (admin)
router.post('/transfers', adminMiddleware, validateTransfer, TransferController.createTransfer);

// GET /api/bookings/:bookingId/transfers - Get transfers for booking
router.get('/:bookingId/transfers', TransferController.getTransfersByBooking);

// PUT /api/bookings/transfers/:id - Update transfer (admin)
router.put('/transfers/:id', adminMiddleware, TransferController.updateTransfer);

// DELETE /api/bookings/transfers/:id - Delete transfer (admin)
router.delete('/transfers/:id', adminMiddleware, TransferController.deleteTransfer);

export default router;
