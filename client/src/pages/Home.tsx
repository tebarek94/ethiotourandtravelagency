import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { data: packages, loading: packagesLoading } = useApi(() => packagesAPI.getAll());
  
  // Prayer times state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: '05:30',
    dhuhr: '12:45',
    asr: '16:15',
    maghrib: '19:00',
    isha: '20:30'
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate next prayer and countdown
  const getNextPrayer = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const currentTimeInMinutes = currentHour * 60 + currentMinute + currentSecond / 60;

    const prayers = [
      { name: 'Fajr', time: prayerTimes.fajr, minutes: 5 * 60 + 30 },
      { name: 'Dhuhr', time: prayerTimes.dhuhr, minutes: 12 * 60 + 45 },
      { name: 'Asr', time: prayerTimes.asr, minutes: 16 * 60 + 15 },
      { name: 'Maghrib', time: prayerTimes.maghrib, minutes: 19 * 60 + 0 },
      { name: 'Isha', time: prayerTimes.isha, minutes: 20 * 60 + 30 }
    ];

    // Find next prayer
    let nextPrayer = prayers.find(prayer => prayer.minutes > currentTimeInMinutes);
    
    // If no prayer found for today, use tomorrow's Fajr
    if (!nextPrayer) {
      nextPrayer = prayers[0];
      // Add 24 hours for next day
      const timeDiff = (24 * 60) + nextPrayer.minutes - currentTimeInMinutes;
      const hours = Math.floor(timeDiff / 60);
      const minutes = Math.floor(timeDiff % 60);
      
      return {
        name: nextPrayer.name,
        time: nextPrayer.time,
        countdown: `${hours}h ${minutes}m`
      };
    }

    const timeDiff = nextPrayer.minutes - currentTimeInMinutes;
    const hours = Math.floor(timeDiff / 60);
    const minutes = Math.floor(timeDiff % 60);

    return {
      name: nextPrayer.name,
      time: nextPrayer.time,
      countdown: `${hours}h ${minutes}m`
    };
  };

  const nextPrayer = getNextPrayer();

  // Format current time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  const stats = [
    { number: '1000+', label: t('home.stats.pilgrims'), icon: Users },
    { number: '15+', label: t('home.stats.packages'), icon: Calendar },
    { number: '98%', label: 'Satisfaction Rate', icon: Heart },
    { number: '24/7', label: 'Customer Support', icon: Clock },
  ];

  const features = [
    {
      icon: Shield,
      title: t('home.features.feature1.title'),
      description: t('home.features.feature1.description')
    },
    {
      icon: MapPin,
      title: t('home.features.feature2.title'),
      description: t('home.features.feature2.description')
    },
    {
      icon: Globe,
      title: t('home.features.feature3.title'),
      description: t('home.features.feature3.description')
    },
    {
      icon: Heart,
      title: t('home.features.feature4.title'),
      description: t('home.features.feature4.description')
    }
  ];

  const umrahSteps = [
    {
      step: '01',
      title: t('home.umrahGuide.steps.step1.title'),
      description: t('home.umrahGuide.steps.step1.description'),
      items: t('home.umrahGuide.steps.step1.items', { returnObjects: true }) as string[]
    },
    {
      step: '02',
      title: t('home.umrahGuide.steps.step2.title'),
      description: t('home.umrahGuide.steps.step2.description'),
      items: t('home.umrahGuide.steps.step2.items', { returnObjects: true }) as string[]
    },
    {
      step: '03',
      title: t('home.umrahGuide.steps.step3.title'),
      description: t('home.umrahGuide.steps.step3.description'),
      items: t('home.umrahGuide.steps.step3.items', { returnObjects: true }) as string[]
    },
    {
      step: '04',
      title: t('home.umrahGuide.steps.step4.title'),
      description: t('home.umrahGuide.steps.step4.description'),
      items: t('home.umrahGuide.steps.step4.items', { returnObjects: true }) as string[]
    },
    {
      step: '05',
      title: t('home.umrahGuide.steps.step5.title'),
      description: t('home.umrahGuide.steps.step5.description'),
      items: t('home.umrahGuide.steps.step5.items', { returnObjects: true }) as string[]
    },
    {
      step: '06',
      title: t('home.umrahGuide.steps.step6.title'),
      description: t('home.umrahGuide.steps.step6.description'),
      items: t('home.umrahGuide.steps.step6.items', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Figma Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16 lg:mt-20">
        {/* Beautiful Mosque Background Image */}
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
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-particle" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary-300/40 rounded-full animate-particle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-particle" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-secondary-300/30 rounded-full animate-particle" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-white/15 rounded-full animate-particle" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-secondary-300/35 rounded-full animate-particle" style={{animationDelay: '5s'}}></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 left-20 w-16 h-16 border border-white/10 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 border border-secondary-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-8 h-8 border border-white/15 rotate-12 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        </div>
        
        {/* Content - Figma Design Layout */}
        <div className="relative z-10 container-custom text-white py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Side - Main Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Golden Star */}
              <div className="w-16 h-16 text-secondary-300 animate-pulse drop-shadow-lg">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full filter drop-shadow-lg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-2xl">
                  <span className="block text-white">Begin Your</span>
                  <span className="block text-secondary-300 drop-shadow-lg">Sacred Journey</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-lg">
                  Experience the pilgrimage of a lifetime
                </p>
                <p className="text-lg text-secondary-300 font-medium drop-shadow-md">
                  "And proclaim to the people the Hajj" - Quran 22:27
                </p>
              </div>
            </div>
            
            {/* Right Side - Prayer Times Card */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-sm w-full">
                <div className="text-center mb-6">
                  <div className="text-sm text-neutral-600 font-medium">{formatDate(currentTime)}</div>
                  <div className="text-2xl font-bold text-neutral-900">{formatTime(currentTime)}</div>
                </div>
                
                <div className="bg-primary-100 rounded-xl p-4 mb-4">
                  <div className="text-sm text-primary-700 font-medium">Next Prayer {nextPrayer.name}</div>
                  <div className="text-lg font-bold text-primary-800">{nextPrayer.countdown}</div>
                </div>
                
                <div className="space-y-3">
                  <div className={`flex justify-between items-center ${nextPrayer.name === 'Fajr' ? 'bg-primary-50 rounded-lg p-2' : ''}`}>
                    <span className={nextPrayer.name === 'Fajr' ? 'text-primary-700 font-medium' : 'text-neutral-600'}>Fajr</span>
                    <span className={nextPrayer.name === 'Fajr' ? 'font-bold text-primary-800' : 'font-semibold text-neutral-900'}>05:30 AM</span>
                  </div>
                  <div className={`flex justify-between items-center ${nextPrayer.name === 'Dhuhr' ? 'bg-primary-50 rounded-lg p-2' : ''}`}>
                    <span className={nextPrayer.name === 'Dhuhr' ? 'text-primary-700 font-medium' : 'text-neutral-600'}>Dhuhr</span>
                    <span className={nextPrayer.name === 'Dhuhr' ? 'font-bold text-primary-800' : 'font-semibold text-neutral-900'}>12:45 PM</span>
                  </div>
                  <div className={`flex justify-between items-center ${nextPrayer.name === 'Asr' ? 'bg-primary-50 rounded-lg p-2' : ''}`}>
                    <span className={nextPrayer.name === 'Asr' ? 'text-primary-700 font-medium' : 'text-neutral-600'}>Asr</span>
                    <span className={nextPrayer.name === 'Asr' ? 'font-bold text-primary-800' : 'font-semibold text-neutral-900'}>04:15 PM</span>
                  </div>
                  <div className={`flex justify-between items-center ${nextPrayer.name === 'Maghrib' ? 'bg-primary-50 rounded-lg p-2' : ''}`}>
                    <span className={nextPrayer.name === 'Maghrib' ? 'text-primary-700 font-medium' : 'text-neutral-600'}>Maghrib</span>
                    <span className={nextPrayer.name === 'Maghrib' ? 'font-bold text-primary-800' : 'font-semibold text-neutral-900'}>07:00 PM</span>
                  </div>
                  <div className={`flex justify-between items-center ${nextPrayer.name === 'Isha' ? 'bg-primary-50 rounded-lg p-2' : ''}`}>
                    <span className={nextPrayer.name === 'Isha' ? 'text-primary-700 font-medium' : 'text-neutral-600'}>Isha</span>
                    <span className={nextPrayer.name === 'Isha' ? 'font-bold text-primary-800' : 'font-semibold text-neutral-900'}>08:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <Link
              to="/packages"
              className="bg-secondary-400 hover:bg-secondary-500 text-white font-semibold px-6 lg:px-8 py-3 lg:py-4 rounded-xl inline-flex items-center space-x-2 lg:space-x-3 shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              <span className="text-sm lg:text-base drop-shadow-sm">Explore Sacred Packages</span>
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Search Bar Component */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 z-30">
          <div className="container-custom py-4 lg:py-6">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch lg:items-center">
              {/* Destination */}
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">DESTINATION</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                    <option>Select city</option>
                    <option>Mecca</option>
                    <option>Medina</option>
                    <option>Jerusalem</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Departure Date */}
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">DEPARTURE DATE</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                    placeholder="mm/dd/yyyy"
                  />
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Travelers */}
              <div className="flex-1 w-full">
                <label className="block text-sm font-semibold text-neutral-700 mb-2">TRAVELERS</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white">
                    <option>Number</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4+</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Search Button */}
              <div className="w-full lg:w-auto flex items-end">
                <button className="w-full lg:w-auto bg-secondary-400 hover:bg-secondary-500 text-white font-semibold px-6 lg:px-8 py-3 rounded-xl inline-flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 transform hover:scale-105">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm lg:text-base">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Umrah Guide Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('home.umrahGuide.title')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {t('home.umrahGuide.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {umrahSteps.map((step, index) => (
              <div key={index} className="card p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-primary-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
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
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('home.packages.title')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {t('home.packages.subtitle')}
            </p>
          </div>
          
          {packagesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages?.slice(0, 3).map((pkg) => (
                <div key={pkg.package_id} className="card-hover group">
                  <div className="relative overflow-hidden">
                    <div className="h-56 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-t-2xl flex items-center justify-center relative">
                      <MapPin size={56} className="text-white/90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-neutral-800">
                          {typeof pkg.rating === 'number' ? pkg.rating.toFixed(1) : '4.5'}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold text-white bg-primary-600/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        {pkg.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-neutral-500 font-medium">
                        {getPackageDurationDisplay(pkg.duration_days, pkg.nights)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-3xl font-bold text-primary-600">
                        {formatCurrency(pkg.price)}
                      </div>
                      <div className="text-sm text-neutral-500 font-medium">
                        per person
                      </div>
                    </div>
                    
                    <Link
                      to={`/packages/${pkg.package_id}`}
                      className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                    >
                      <span>Explore More</span>
                      <ArrowRight size={18} />
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
              <span>{t('home.packages.viewAll')}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                  <feature.icon size={36} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom text-center text-white relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Begin Your Blessed Umrah Journey
          </h2>
          <p className="text-xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Visa, flights, Haram-near hotels, ground transport, and spiritual guidance— 
            crafted for a peaceful, focused worship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/packages"
              className="btn-secondary text-lg px-10 py-5 inline-flex items-center space-x-3 shadow-2xl"
            >
              <Calendar size={24} />
              <span>Book Umrah Now</span>
            </Link>
            <Link
              to="/packages"
              className="btn-outline text-lg px-10 py-5 border-2 border-white text-white hover:bg-white hover:text-primary-600 shadow-2xl"
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
