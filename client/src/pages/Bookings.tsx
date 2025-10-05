import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Eye, 
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { bookingsAPI } from '../services/api';
import { formatCurrency, formatDate, getBookingStatusInfo } from '../utils/helpers';

const Bookings: React.FC = () => {
  const { t } = useTranslation();
  const [showCancelModal, setShowCancelModal] = useState<number | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const { data: bookings, loading, refetch } = useApi(() => bookingsAPI.getAll());

  const handleCancelBooking = async (bookingId: number) => {
    setCancelling(true);
    try {
      await bookingsAPI.cancel(bookingId);
      setShowCancelModal(null);
      refetch(); // Refresh the bookings list
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {t('bookings.title')}
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            {t('bookings.subtitle')}
          </p>
        </div>
      </section>

      {/* Bookings List */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const statusInfo = getBookingStatusInfo(booking.status);
                return (
                  <div key={booking.booking_id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {booking.package_name || 'Umrah Package'}
                            </h3>
                            <p className="text-gray-600">
                              Booking ID: #{booking.booking_id}
                            </p>
                          </div>
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
                            {getStatusIcon(booking.status)}
                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Travel Date: {formatDate(booking.travel_date)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              Makkah & Madinah
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-primary-600">
                            {formatCurrency(booking.total_price)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Booked on {formatDate(booking.created_at)}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/bookings/${booking.booking_id}`}
                          className="btn-outline inline-flex items-center justify-center space-x-2"
                        >
                          <Eye size={16} />
                          <span>{t('bookings.actions.view')}</span>
                        </Link>
                        {booking.status === 'pending' && (
                          <button 
                            onClick={() => setShowCancelModal(booking.booking_id)}
                            className="btn-outline text-red-600 border-red-600 hover:bg-red-50 inline-flex items-center justify-center space-x-2"
                          >
                            <XCircle size={16} />
                            <span>{t('bookings.actions.cancel')}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't made any bookings yet. Start your spiritual journey today.
              </p>
              <Link
                to="/packages"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Browse Packages</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
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
                onClick={() => setShowCancelModal(null)}
                className="flex-1 btn-outline"
                disabled={cancelling}
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancelBooking(showCancelModal)}
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

export default Bookings;
