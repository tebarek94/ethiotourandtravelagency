import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }
  next();
};

// User validation rules
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin'),
  handleValidationErrors
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

export const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters'),
  handleValidationErrors
];

// Package validation rules
export const validatePackage = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Package name must be between 2 and 255 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('duration_days')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('nights')
    .isInt({ min: 0 })
    .withMessage('Nights must be a non-negative integer'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('type')
    .isIn(['umrah', 'hajj', 'tour', 'custom'])
    .withMessage('Type must be one of: umrah, hajj, tour, custom'),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  handleValidationErrors
];

// Booking validation rules
export const validateBooking = [
  body('package_id')
    .isInt({ min: 1 })
    .withMessage('Package ID must be a positive integer'),
  body('travel_date')
    .isISO8601()
    .withMessage('Travel date must be a valid date'),
  body('travelers')
    .isInt({ min: 1 })
    .withMessage('Number of travelers must be at least 1'),
  handleValidationErrors
];

// Flight validation rules
export const validateFlight = [
  body('booking_id')
    .isInt({ min: 1 })
    .withMessage('Booking ID must be a positive integer'),
  body('departure_city')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Departure city must be between 2 and 255 characters'),
  body('arrival_city')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Arrival city must be between 2 and 255 characters'),
  body('departure_time')
    .isISO8601()
    .withMessage('Departure time must be a valid date'),
  body('arrival_time')
    .isISO8601()
    .withMessage('Arrival time must be a valid date'),
  body('airline')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Airline must be between 2 and 255 characters'),
  body('flight_number')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Flight number must not exceed 20 characters'),
  handleValidationErrors
];

// Hotel validation rules
export const validateHotel = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Hotel name must be between 2 and 255 characters'),
  body('city')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('City must be between 2 and 255 characters'),
  body('star_rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Star rating must be between 1 and 5'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),
  handleValidationErrors
];

// Article validation rules
export const validateArticle = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Title must be between 2 and 255 characters'),
  body('slug')
    .trim()
    .isLength({ min: 2, max: 255 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  body('author')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Author must be between 2 and 255 characters'),
  handleValidationErrors
];

// Inquiry validation rules
export const validateInquiry = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  handleValidationErrors
];

// Booking Hotel validation rules
export const validateBookingHotel = [
  body('booking_id')
    .isInt({ min: 1 })
    .withMessage('Booking ID must be a positive integer'),
  body('hotel_id')
    .isInt({ min: 1 })
    .withMessage('Hotel ID must be a positive integer'),
  body('check_in')
    .isISO8601()
    .withMessage('Check-in date must be a valid date'),
  body('check_out')
    .isISO8601()
    .withMessage('Check-out date must be a valid date'),
  body('guests')
    .isInt({ min: 1 })
    .withMessage('Number of guests must be at least 1'),
  handleValidationErrors
];

// Transfer validation rules
export const validateTransfer = [
  body('booking_id')
    .isInt({ min: 1 })
    .withMessage('Booking ID must be a positive integer'),
  body('type')
    .isIn(['airport', 'hotel', 'ziyarat'])
    .withMessage('Transfer type must be airport, hotel, or ziyarat'),
  body('pickup_location')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Pickup location must be between 2 and 255 characters'),
  body('dropoff_location')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Dropoff location must be between 2 and 255 characters'),
  body('pickup_time')
    .isISO8601()
    .withMessage('Pickup time must be a valid date'),
  body('vehicle_type')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Vehicle type must be between 2 and 100 characters'),
  handleValidationErrors
];
