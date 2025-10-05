import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import './i18n';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Destinations from './pages/Destinations';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import BookingDetail from './pages/BookingDetail';
import BookingForm from './pages/BookingForm';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/packages" element={<Layout><Packages /></Layout>} />
          <Route path="/packages/:id" element={<Layout><PackageDetail /></Layout>} />
          <Route path="/destinations" element={<Layout><Destinations /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/booking/:packageId" element={<Layout><BookingForm /></Layout>} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Layout><Profile /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings" 
            element={
              <ProtectedRoute>
                <Layout><Bookings /></Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings/:id" 
            element={
              <ProtectedRoute>
                <Layout><BookingDetail /></Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
