# Admin Dashboard Setup

## Overview
The admin dashboard provides comprehensive management capabilities for the Zad Travel Agency application. It includes user management, booking management, inquiry management, and analytics.

## Features

### Dashboard Statistics
- Total users, bookings, packages, and inquiries
- Revenue tracking (total and monthly)
- New users and bookings this month
- Booking status overview

### User Management
- View all users with pagination
- Update user roles (admin/user)
- Search and filter users
- User registration tracking

### Booking Management
- View all bookings with customer and package details
- Update booking status (pending, confirmed, cancelled, completed)
- Search and filter bookings
- Revenue tracking per booking

### Inquiry Management
- View all customer inquiries
- Update inquiry status (new, read, replied)
- Search and filter inquiries
- Contact information management

### Analytics (Future Enhancement)
- Booking trends over time
- Popular packages
- User registration trends
- Revenue reports

## Setup Instructions

### 1. Create Admin User
Run the admin user creation script:

```bash
cd backend
node scripts/create-admin.js
```

This will create an admin user with:
- Email: admin@zadtravel.com
- Password: admin123

### 2. Access Admin Dashboard
1. Login with the admin credentials
2. Navigate to the admin dashboard via the user menu (Settings icon)
3. Or directly access `/admin` route

### 3. API Endpoints

#### Dashboard Statistics
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

#### User Management
- `GET /api/admin/users` - Get all users (with pagination and filters)
- `PUT /api/admin/users/:id/role` - Update user role

#### Booking Management
- `GET /api/admin/bookings` - Get all bookings (with pagination and filters)
- `PUT /api/admin/bookings/:id/status` - Update booking status

#### Package Management
- `GET /api/admin/packages` - Get all packages (with pagination and filters)

#### Inquiry Management
- `GET /api/admin/inquiries` - Get all inquiries (with pagination and filters)
- `PUT /api/admin/inquiries/:id/status` - Update inquiry status

#### Analytics
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/revenue` - Get revenue reports

## Security

### Authentication
- All admin routes require valid JWT token
- Token must be included in Authorization header: `Bearer <token>`

### Authorization
- Only users with `role: 'admin'` can access admin routes
- Admin routes are protected by `requireAdmin` middleware

### Frontend Protection
- Admin dashboard is protected by `AdminRoute` component
- Non-admin users are redirected to home page
- Unauthenticated users are redirected to login page

## Usage

### Managing Users
1. Go to Users tab in admin dashboard
2. View user list with search and pagination
3. Change user roles using the dropdown in Actions column
4. Changes are saved immediately

### Managing Bookings
1. Go to Bookings tab in admin dashboard
2. View all bookings with customer and package details
3. Update booking status using the dropdown in Actions column
4. Status changes are saved immediately

### Managing Inquiries
1. Go to Inquiries tab in admin dashboard
2. View all customer inquiries
3. Update inquiry status to track response progress
4. Status changes are saved immediately

## Customization

### Adding New Admin Features
1. Add new controller methods in `AdminController.ts`
2. Add corresponding service methods in `AdminService.ts`
3. Add new routes in `admin.ts`
4. Update frontend `AdminDashboard.tsx` with new UI components
5. Add new API methods in `adminAPI` in `api.ts`

### Styling
The admin dashboard uses Tailwind CSS classes and can be customized by:
- Modifying the component styles in `AdminDashboard.tsx`
- Adding custom CSS classes
- Using the existing design system colors and spacing

## Troubleshooting

### Common Issues

1. **Cannot access admin dashboard**
   - Ensure you're logged in with an admin account
   - Check that the user role is set to 'admin' in the database
   - Verify JWT token is valid

2. **API calls failing**
   - Check that the backend server is running
   - Verify database connection
   - Check API endpoint URLs in `api.ts`

3. **Data not loading**
   - Check browser console for errors
   - Verify database has data in required tables
   - Check network tab for failed API requests

### Database Requirements
Ensure the following tables exist with proper data:
- `users` - with at least one admin user
- `bookings` - for booking management
- `packages` - for package management
- `inquiries` - for inquiry management

## Future Enhancements

1. **Advanced Analytics**
   - Charts and graphs using libraries like Chart.js or Recharts
   - Export functionality for reports
   - Date range filtering

2. **Bulk Operations**
   - Bulk status updates
   - Bulk user role changes
   - Export/import functionality

3. **Notifications**
   - Real-time notifications for new bookings/inquiries
   - Email notifications for status changes

4. **Audit Logs**
   - Track all admin actions
   - User activity logs
   - System change history
