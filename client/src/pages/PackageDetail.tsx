import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  Heart,
  Share2,
  ArrowLeft,
  Shield,
  Plane,
  Hotel,
  Car,
  Utensils,
  Wifi,
  Phone,
  Mail
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { packagesAPI } from '../services/api';
import { formatCurrency, getPackageDurationDisplay, getPackageTypeDisplayName } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const PackageDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const packageId = id ? parseInt(id) : 0;
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: packageData, loading, error } = useApi(
    () => packagesAPI.getById(packageId),
    [packageId]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-6">The package you're looking for doesn't exist.</p>
          <Link to="/packages" className="btn-primary">
            View All Packages
          </Link>
        </div>
      </div>
    );
  }

  const pkg = packageData;

  const handleBookNow = () => {
    if (!user) {
      toast.error('Please login to book this package');
      navigate('/login');
      return;
    }
    navigate(`/booking/${pkg.package_id}`);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.name,
        text: `Check out this amazing Umrah package: ${pkg.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const features = [
    { icon: Plane, title: 'Flight Tickets', description: 'Round-trip flights included' },
    { icon: Hotel, title: 'Hotel Near Haram', description: 'Premium accommodation' },
    { icon: Car, title: 'Ground Transport', description: 'Airport transfers & local transport' },
    { icon: Utensils, title: 'Meals', description: 'Daily breakfast included' },
    { icon: Wifi, title: 'WiFi', description: 'Complimentary internet access' },
    { icon: Shield, title: 'Travel Insurance', description: 'Comprehensive coverage' }
  ];

  const itinerary = [
    {
      day: 'Day 1',
      title: 'Departure from Ethiopia',
      description: 'Depart from Bole International Airport with our assistance team.'
    },
    {
      day: 'Day 2',
      title: 'Arrival in Saudi Arabia',
      description: 'Arrive in Jeddah/Riyadh and transfer to your hotel in Makkah.'
    },
    {
      day: 'Day 3-4',
      title: 'Umrah Performance',
      description: 'Perform Umrah with spiritual guidance and support.'
    },
    {
      day: 'Day 5-6',
      title: 'Madinah Visit',
      description: 'Travel to Madinah and visit the Prophet\'s Mosque.'
    },
    {
      day: 'Day 7',
      title: 'Return Journey',
      description: 'Depart from Saudi Arabia and return to Ethiopia.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-primary py-16 mt-16 lg:mt-20">
        <div className="container-custom text-white">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite 
                    ? 'bg-red-500/20 text-red-300' 
                    : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-white/10 text-gray-200 hover:bg-white/20 transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link to="/" className="hover:text-secondary-300 transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/packages" className="hover:text-secondary-300 transition-colors duration-200">
              Packages
            </Link>
            <span>/</span>
            <span className="text-secondary-300">{pkg.name}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-secondary-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {getPackageTypeDisplayName(pkg.type)}
                </span>
                <div className="flex items-center space-x-1">
                  <Star size={20} className="text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold">
                    {typeof pkg.rating === 'number' ? pkg.rating.toFixed(1) : '4.5'}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {pkg.name}
              </h1>
              
              <p className="text-xl text-gray-200 mb-6 max-w-3xl">
                {pkg.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>{getPackageDurationDisplay(pkg.duration_days, pkg.nights)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={20} />
                  <span>Makkah & Madinah</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>Group & Individual</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block ml-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-secondary-300">
                    {formatCurrency(pkg.price)}
                  </div>
                  <div className="text-gray-300">per person</div>
                </div>
                <button
                  onClick={handleBookNow}
                  className="btn-secondary w-full inline-flex items-center justify-center space-x-2"
                >
                  <Calendar size={20} />
                  <span>{t('packages.details.bookNow')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Package Overview</h2>
                <div className="prose prose-lg text-gray-600">
                  <p>
                    This comprehensive Umrah package is designed to provide you with a complete 
                    spiritual journey to the holy cities of Makkah and Madinah. Our carefully 
                    crafted itinerary ensures that you can focus on your worship while we handle 
                    all the logistics.
                  </p>
                  <p>
                    From visa processing to accommodation near the Haram, every detail has been 
                    planned to make your Umrah experience as smooth and meaningful as possible. 
                    Our experienced guides will be with you every step of the way to provide 
                    spiritual guidance and support.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon size={32} className="text-primary-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-600 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="card p-6 mb-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {formatCurrency(pkg.price)}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{getPackageDurationDisplay(pkg.duration_days, pkg.nights)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{getPackageTypeDisplayName(pkg.type)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="font-medium">
                        {typeof pkg.rating === 'number' ? pkg.rating.toFixed(1) : '4.5'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="btn-primary w-full inline-flex items-center justify-center space-x-2 mb-4"
                >
                  <Calendar size={20} />
                  <span>Book This Package</span>
                </button>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handleFavorite}
                    className={`btn-outline flex-1 inline-flex items-center justify-center space-x-2 ${
                      isFavorite ? 'border-red-500 text-red-600 hover:bg-red-50' : ''
                    }`}
                  >
                    <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
                    <span>{isFavorite ? 'Saved' : 'Save'}</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="btn-outline flex-1 inline-flex items-center justify-center space-x-2"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our travel experts are here to help you plan your perfect Umrah journey.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+251986111333"
                    className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Phone size={16} className="text-primary-600" />
                    </div>
                    <span>+251 986 111 333</span>
                  </a>
                  <a
                    href="mailto:umrah@zadtravelagency.com"
                    className="flex items-center space-x-3 text-primary-600 hover:text-primary-700 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Mail size={16} className="text-primary-600" />
                    </div>
                    <span>umrah@zadtravelagency.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Other Packages You Might Like
            </h2>
            <p className="text-xl text-gray-600">
              Explore more Umrah packages tailored to different needs and budgets
            </p>
          </div>
          
          <div className="text-center">
            <Link
              to="/packages"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Packages</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetail;
