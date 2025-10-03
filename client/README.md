# Zad Travel Agency - Frontend

A modern React TypeScript frontend for the Zad Travel Agency website, built with Tailwind CSS and connected to the backend API.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Authentication**: Complete login/register system with JWT
- **Package Management**: Browse and book Umrah packages
- **Booking System**: Complete booking flow with form validation
- **Blog System**: Articles and travel guides
- **Contact System**: Inquiry forms and contact information
- **User Dashboard**: Profile management and booking history
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   └── Layout/        # Header, Footer, Layout
│   ├── contexts/          # React contexts (Auth)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # App entry point
│   └── index.css          # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Backend API running on port 5000

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Pages & Features

### Public Pages
- **Home**: Hero section, packages showcase, Umrah guide
- **About**: Company information, team, mission
- **Packages**: Browse and filter Umrah packages
- **Package Detail**: Detailed package information and booking
- **Destinations**: Explore travel destinations
- **Blog**: Articles and travel guides
- **Blog Post**: Individual article pages
- **Contact**: Contact form and information
- **Login/Register**: Authentication pages

### Protected Pages (User Dashboard)
- **Profile**: User account management
- **Bookings**: View and manage bookings
- **Booking Form**: Complete booking process

## 🎨 Design System

### Colors
- **Primary**: Blue shades (#0ea5e9 to #0c4a6e)
- **Secondary**: Yellow shades (#eab308 to #713f12)
- **Accent**: Purple shades (#d946ef to #701a75)

### Typography
- **Primary Font**: Inter (system fonts)
- **Arabic Font**: Amiri
- **Amharic Font**: Noto Sans Ethiopic

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Hover effects and shadows
- **Forms**: Consistent styling with validation
- **Navigation**: Responsive header with mobile menu

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the client directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### API Integration
The frontend connects to the backend API through:
- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT tokens stored in localStorage
- **Error Handling**: Centralized error handling with toast notifications

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Deploy the `build` folder
3. Set environment variables in your hosting platform

## 🔐 Authentication Flow

1. **Registration**: User creates account with email/password
2. **Login**: User authenticates and receives JWT token
3. **Protected Routes**: Token required for user dashboard
4. **Token Storage**: JWT stored in localStorage
5. **Auto-logout**: Token expiration handling

## 📊 State Management

- **Auth Context**: User authentication state
- **API Hooks**: Custom hooks for data fetching
- **Form State**: React Hook Form for form management
- **Local Storage**: Persistent user data

## 🎯 Key Features

### Package Booking System
- Browse packages with filtering
- Detailed package information
- Complete booking form with validation
- Booking confirmation and management

### User Dashboard
- Profile management
- Booking history
- Account settings

### Content Management
- Blog articles
- Travel guides
- Contact inquiries

## 🛡️ Security Features

- **Input Validation**: Client-side validation with react-hook-form
- **XSS Protection**: Sanitized content rendering
- **CSRF Protection**: Token-based authentication
- **Secure Storage**: JWT tokens in localStorage

## 📈 Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized images and icons
- **Bundle Analysis**: Optimized bundle size
- **Caching**: API response caching

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: support@zadtravelagency.com
- Phone: +251 986 111 333

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for Zad Travel Agency**
