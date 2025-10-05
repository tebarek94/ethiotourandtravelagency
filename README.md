# Ethitour Travel Agency Backend API

A production-ready backend API for a Travel & Umrah Agency website built with Node.js, Express, TypeScript, and MySQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control (admin/user)
- **User Management**: Complete CRUD operations for users
- **Package Management**: Travel packages with destinations
- **Booking System**: Complete booking management with flights, hotels, and transfers
- **Content Management**: Articles/blog system and customer inquiries
- **Partner Management**: Partner directory for airlines, hotels, and transport
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Security**: Helmet, CORS, password hashing with bcrypt
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL 8+
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors
- **Logging**: morgan
- **Environment**: dotenv

## 📁 Project Structure

```
zad-travel-agency-backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # HTTP request handlers
│   ├── services/        # Business logic
│   ├── models/          # Database queries
│   ├── routes/          # Express routes
│   ├── middlewares/     # Auth, validation, error handling
│   ├── types/           # TypeScript interfaces
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server startup
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```

## 🗄️ Database Schema

The API uses the following MySQL tables:

- **users**: User accounts with roles (admin/user)
- **packages**: Travel packages (Umrah, Hajj, Tours, Custom)
- **destinations**: Cities, countries, landmarks
- **package_destinations**: Many-to-many relationship
- **bookings**: Customer bookings
- **flights**: Flight details for bookings
- **hotels**: Hotel information
- **booking_hotels**: Hotel bookings
- **transfers**: Ground transportation
- **articles**: Blog/articles content
- **inquiries**: Customer inquiries
- **partners**: Business partners (airlines, hotels, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- MySQL 8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zad-travel-agency-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=your host
   DB_USER=name
   DB_PASS=your_password
   DB_NAME=databasename

   # JWT Configuration
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**
   - Create a MySQL database named `ethiotour_travel_agency`
   - The application will automatically create all tables on first run

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages/:id` - Update package (admin only)
- `DELETE /api/packages/:id` - Delete package (admin only)

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination by ID
- `POST /api/destinations` - Create destination (admin only)
- `PUT /api/destinations/:id` - Update destination (admin only)
- `DELETE /api/destinations/:id` - Delete destination (admin only)

### Bookings
- `GET /api/bookings` - Get bookings (user: own, admin: all)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking (user only)
- `PUT /api/bookings/:id` - Update booking (admin only)
- `DELETE /api/bookings/:id` - Delete booking

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/slug/:slug` - Get article by slug
- `GET /api/articles/id/:id` - Get article by ID
- `POST /api/articles` - Create article (admin only)
- `PUT /api/articles/:id` - Update article (admin only)
- `DELETE /api/articles/:id` - Delete article (admin only)

### Inquiries
- `POST /api/inquiries` - Submit inquiry
- `GET /api/inquiries` - Get all inquiries (admin only)
- `GET /api/inquiries/:id` - Get inquiry by ID (admin only)
- `PUT /api/inquiries/:id` - Update inquiry (admin only)
- `DELETE /api/inquiries/:id` - Delete inquiry (admin only)

### Partners
- `GET /api/partners` - Get all partners
- `GET /api/partners/:id` - Get partner by ID
- `POST /api/partners` - Create partner (admin only)
- `PUT /api/partners/:id` - Update partner (admin only)
- `DELETE /api/partners/:id` - Delete partner (admin only)

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles
- **admin**: Full access to all endpoints
- **user**: Limited access to own data and public endpoints

## 📝 Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // Validation errors if applicable
}
```


  
## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email support@ethitourtravelagency.com or create an issue in the repository.
