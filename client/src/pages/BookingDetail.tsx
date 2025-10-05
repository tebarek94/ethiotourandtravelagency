import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Trash2,
  Edit,
  Phone,
  Mail
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { bookingsAPI } from '../services/api';
import { formatCurrency, formatDate, getBookingStatusInfo } from '../utils/helpers';

const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const { data: booking, loading, refetch } = useApi(() => 
    bookingsAPI.getById(parseInt(id || '0'))
  );

  const handleCancelBooking = async () => {
    if (!booking) return;
    
    setCancelling(true);
    try {
      await bookingsAPI.cancel(booking.booking_id);
      setShowCancelModal(false);
      refetch(); // Refresh the booking data
      // Show success message
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      // Show error message
    } finally {
      setCancelling(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'pending':
        return <Clock size={20} className="text-yellow-500" />;
      case 'cancelled':
        return <XCircle size={20} className="text-red-500" />;
      case 'completed':
        return <CheckCircle size={20} className="text-blue-500" />;
      default:
        return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist.</p>
          <Link to="/bookings" className="btn-primary">
            Back to Bookings
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getBookingStatusInfo(booking.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Kaaba Background */}
      <section className="relative py-16 mt-16 lg:mt-20 overflow-hidden">
        {/* Kaaba Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1704104501136-8f35402af395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwdmlkZW8lMjBmb290YWdlfGVufDF8fHx8MTc1OTYyODEwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
            }}
          ></div>
          
          {/* Enhanced Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/60 to-secondary-800/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          
          {/* Subtle Islamic Pattern Overlay */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-20 left-20 w-32 h-32 bg-secondary-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-secondary-400/25 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-secondary-300/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-secondary-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles with different animations */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-secondary-300/30 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-secondary-300/35 rounded-full animate-pulse" style={{animationDelay: '5s'}}></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 left-20 w-16 h-16 border border-white/10 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 border border-secondary-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-8 h-8 border border-white/15 rotate-12 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-custom text-white">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => navigate('/bookings')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
              Booking Details
            </h1>
          </div>
          <p className="text-xl text-white/90 drop-shadow-md">
            Booking ID: #{booking.booking_id}
          </p>
        </div>
      </section>

      {/* Booking Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Overview */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {booking.package_name || 'Umrah Package'}
                    </h2>
                    <p className="text-gray-600">
                      Complete pilgrimage package with accommodation and transportation
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${statusInfo.bgColor}`}>
                    {getStatusIcon(booking.status)}
                    <span className={`font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">Travel Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(booking.travel_date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">Travelers</p>
                        <p className="font-semibold text-gray-900">
                          {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">Destinations</p>
                        <p className="font-semibold text-gray-900">Makkah & Madinah</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={20} className="text-primary-600" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">7 Days / 6 Nights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traveler Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Traveler Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Primary Traveler</p>
                      <p className="font-semibold text-gray-900">
                        {booking.traveler_name || 'John Doe'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">
                        {booking.traveler_email || 'john@example.com'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">
                        {booking.traveler_phone || '+251 912 345 678'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Inclusions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Package Inclusions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">Round-trip flights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">Hotel accommodation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">Ground transportation</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">Visa processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">Travel insurance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-gray-700">24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Price</span>
                    <span className="font-semibold">{formatCurrency(booking.total_price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers</span>
                    <span className="font-semibold">{booking.travelers}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-primary-600">
                        {formatCurrency(booking.total_price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-outline inline-flex items-center justify-center space-x-2">
                    <Download size={16} />
                    <span>Download Invoice</span>
                  </button>
                  
                  {booking.status === 'pending' && (
                    <button 
                      onClick={() => setShowCancelModal(true)}
                      className="w-full btn-outline text-red-600 border-red-600 hover:bg-red-50 inline-flex items-center justify-center space-x-2"
                    >
                      <Trash2 size={16} />
                      <span>Cancel Booking</span>
                    </button>
                  )}
                  
                  <button className="w-full btn-outline inline-flex items-center justify-center space-x-2">
                    <Edit size={16} />
                    <span>Modify Booking</span>
                  </button>
                </div>
              </div>

              {/* Booking Timeline */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Booking Created</p>
                      <p className="text-xs text-gray-500">{formatDate(booking.created_at)}</p>
                    </div>
                  </div>
                  {booking.status === 'confirmed' && (
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
                        <p className="text-xs text-gray-500">Payment processed</p>
                      </div>
                    </div>
                  )}
                  {booking.status === 'cancelled' && (
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Booking Cancelled</p>
                        <p className="text-xs text-gray-500">Refund processed</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Cancel Booking</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone and you may be subject to cancellation fees.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 btn-outline"
                disabled={cancelling}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetail;
