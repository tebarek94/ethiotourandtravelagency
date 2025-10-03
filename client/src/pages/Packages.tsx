import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: packages, loading } = useApi(() => packagesAPI.getAll());

  const packageTypes = [
    { value: 'all', label: 'All Packages' },
    { value: 'umrah', label: 'Umrah' },
    { value: 'hajj', label: 'Hajj' },
    { value: 'tour', label: 'Tour' },
    { value: 'custom', label: 'Custom' },
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
      {/* Header */}
      <section className="bg-gradient-primary py-16">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Umrah Packages
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Choose from our range of Umrah packages designed to meet different needs and budgets, 
            all ensuring a blessed and comfortable spiritual experience.
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
                placeholder="Search packages..."
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
                    Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
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
                    <span>Clear Filters</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding">
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
                  Showing {filteredPackages?.length || 0} of {packages?.length || 0} packages
                </p>
              </div>

              {/* Packages Grid */}
              {filteredPackages && filteredPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    No packages found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear Filters
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
            <span className="text-sm font-semibold">{pkg.rating.toFixed(1)}</span>
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
