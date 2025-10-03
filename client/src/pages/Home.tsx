import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Shield,
  Heart,
  Globe
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { packagesAPI } from '../services/api';
import { formatCurrency, getPackageDurationDisplay } from '../utils/helpers';

const Home: React.FC = () => {
  const { data: packages, loading: packagesLoading } = useApi(() => packagesAPI.getAll());

  const stats = [
    { number: '1000+', label: 'Umrah Travelers', icon: Users },
    { number: '15+', label: 'Umrah Packages', icon: Calendar },
    { number: '98%', label: 'Satisfaction Rate', icon: Heart },
    { number: '24/7', label: 'Customer Support', icon: Clock },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your journey is protected with comprehensive travel insurance and 24/7 support.'
    },
    {
      icon: MapPin,
      title: 'Hotels Near Haram',
      description: 'Stay in premium hotels within walking distance of the Holy Mosques.'
    },
    {
      icon: Globe,
      title: 'Expert Guidance',
      description: 'Experienced guides to help you perform Umrah with proper spiritual guidance.'
    },
    {
      icon: Heart,
      title: 'Spiritual Experience',
      description: 'Focus on worship with our carefully planned itineraries and spiritual support.'
    }
  ];

  const umrahSteps = [
    {
      step: '01',
      title: 'Pre-Departure Preparation',
      titleAmharic: 'የመነሻ ዝግጅት',
      titleArabic: 'التحضير قبل السفر',
      description: 'Complete documentation, visa processing, and travel preparation with our expert team.',
      items: [
        'Valid passport (minimum 6 months validity)',
        'Umrah visa (processed by EthioTour Travel Agency)',
        'Flight tickets and hotel confirmations',
        'Travel insurance and health requirements'
      ]
    },
    {
      step: '02',
      title: 'Departure from Ethiopia',
      titleAmharic: 'ከኢትዮጵያ መነሻ',
      titleArabic: 'المغادرة من إثيوبيا',
      description: 'Smooth departure from Bole International Airport with our dedicated assistance.',
      items: [
        'Airport assistance and check-in support',
        'Immigration procedures guidance',
        'Flight to Saudi Arabia (4-5 hours)',
        'Meet and greet services'
      ]
    },
    {
      step: '03',
      title: 'Arrival in Saudi Arabia',
      titleAmharic: 'በሳዑዲ ዓረቢያ መድረስ',
      titleArabic: 'الوصول إلى المملكة العربية السعودية',
      description: 'Seamless arrival and transfer to your hotel near the Holy Mosques.',
      items: [
        'Immigration and biometric registration',
        'Luggage collection assistance',
        'Transfer to hotel near Haram',
        'Welcome orientation and briefing'
      ]
    },
    {
      step: '04',
      title: 'Entering Ihram',
      titleAmharic: 'ወደ ኢሕራም መግቢያ',
      titleArabic: 'الدخول في الإحرام',
      description: 'Proper guidance for entering the sacred state of Ihram for Umrah.',
      items: [
        'Complete shower (Ghusl) and preparation',
        'Wearing Ihram clothing correctly',
        'Making the intention (Niyyah)',
        'Reciting Talbiyah and prayers'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-800">
          <div className="absolute inset-0 hero-pattern opacity-20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
              Your Spiritual Journey to the{' '}
              <span className="text-secondary-300">Holy Cities</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Complete Umrah packages with visa, flights, hotels near Haram, 
              ground transport, and spiritual guidance for a blessed journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/packages"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
              >
                <Calendar size={20} />
                <span>Book Umrah</span>
              </Link>
              <Link
                to="/about"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon size={24} className="text-secondary-300" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-secondary-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Umrah Guide Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Umrah Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step guidance for performing Umrah from Ethiopia to completion. 
              Available in English, Amharic, and Arabic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {umrahSteps.map((step, index) => (
              <div key={index} className="card p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="amharic-text">{step.titleAmharic}</div>
                      <div className="arabic-text">{step.titleArabic}</div>
                    </div>
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Umrah Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of Umrah packages designed to meet different needs and budgets, 
              all ensuring a blessed and comfortable spiritual experience.
            </p>
          </div>
          
          {packagesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages?.slice(0, 3).map((pkg) => (
                <div key={pkg.package_id} className="card-hover">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-t-xl flex items-center justify-center">
                      <MapPin size={48} className="text-white" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{pkg.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {pkg.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getPackageDurationDisplay(pkg.duration_days, pkg.nights)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-primary-600">
                        {formatCurrency(pkg.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        per person
                      </div>
                    </div>
                    
                    <Link
                      to={`/packages/${pkg.package_id}`}
                      className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                    >
                      <span>Explore More</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="btn-outline text-lg px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>View All Packages</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EthioTour Travel Agency?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe every pilgrim deserves a blessed and comfortable Umrah. 
              Founded in 2025, our mission is to provide authentic, affordable, 
              and spiritually enriching journeys.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Begin Your Blessed Umrah Journey
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Visa, flights, Haram-near hotels, ground transport, and spiritual guidance— 
            crafted for a peaceful, focused worship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>Book Umrah Now</span>
            </Link>
            <Link
              to="/packages"
              className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
