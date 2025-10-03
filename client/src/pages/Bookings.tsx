import React from 'react';
import { Link } from 'react-router-dom';
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
  const { data: bookings, loading } = useApi(() => bookingsAPI.getAll());

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
      {/* Header */}
      <section className="bg-gradient-primary py-16">
        <div className="container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-200">
            Manage and track your Umrah bookings
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
                          <span>View Details</span>
                        </Link>
                        {booking.status === 'pending' && (
                          <button className="btn-outline text-red-600 border-red-600 hover:bg-red-50 inline-flex items-center justify-center space-x-2">
                            <XCircle size={16} />
                            <span>Cancel</span>
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
    </div>
  );
};

export default Bookings;
