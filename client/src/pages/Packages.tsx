import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  MapPin, 
  Filter,
  Search,
  X
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { packagesAPI } from '../services/api';
import { formatCurrency, getPackageDurationDisplay, getPackageTypeDisplayName } from '../utils/helpers';
import { Package } from '../types';

const Packages: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: packages, loading } = useApi(() => packagesAPI.getAll());

  const packageTypes = [
    { value: 'all', label: t('packages.filter.all') },
    { value: 'umrah', label: t('packages.filter.umrah') },
    { value: 'hajj', label: t('packages.filter.hajj') },
    { value: 'tour', label: t('packages.filter.tour') },
    { value: 'custom', label: t('packages.filter.custom') },
  ];

  const filteredPackages = packages?.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || pkg.type === selectedType;
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setPriceRange([0, 500000]);
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
        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {t('packages.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            {t('packages.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('packages.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center space-x-2"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Package Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="input-field"
                  >
                    {packageTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('packages.filters.priceRange')}: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="btn-outline w-full flex items-center justify-center space-x-2"
                  >
                    <X size={16} />
                    <span>{t('packages.filters.clearFilters')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 pb-24">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-8">
                <p className="text-gray-600">
                  {t('packages.results.showing')} {filteredPackages?.length || 0} {t('packages.results.of')} {packages?.length || 0} {t('packages.results.packages')}
                </p>
              </div>

              {/* Packages Grid */}
              {filteredPackages && filteredPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  {filteredPackages.map((pkg) => (
                    <PackageCard key={pkg.package_id} package={pkg} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('packages.results.noPackagesFound')}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('packages.results.tryAdjusting')}
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    {t('packages.filters.clearFilters')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

interface PackageCardProps {
  package: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  return (
    <div className="card-hover">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-t-xl flex items-center justify-center">
          <MapPin size={48} className="text-white" />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">
              {typeof pkg.rating === 'number' ? pkg.rating.toFixed(1) : '4.5'}
            </span>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {getPackageTypeDisplayName(pkg.type)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {getPackageDurationDisplay(pkg.duration_days, pkg.nights)}
          </span>
          <span className="text-sm text-gray-500">
            1 traveler
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {pkg.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
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
        
        <div className="flex space-x-2">
          <Link
            to={`/packages/${pkg.package_id}`}
            className="btn-outline flex-1 text-center"
          >
            View Details
          </Link>
          <Link
            to={`/booking/${pkg.package_id}`}
            className="btn-primary flex-1 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Packages;
