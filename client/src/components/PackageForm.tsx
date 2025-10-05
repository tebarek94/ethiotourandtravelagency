import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save, Package as PackageIcon } from 'lucide-react';
import { packagesAPI } from '../services/api';
import { Package } from '../types';
import toast from 'react-hot-toast';

interface PackageFormData {
  name: string;
  description?: string;
  duration_days: number;
  nights: number;
  price: number;
  type: 'umrah' | 'hajj' | 'tour' | 'custom';
  rating?: number;
}

interface PackageFormProps {
  onClose: () => void;
  onSuccess: () => void;
  packageData?: Package;
  isEdit?: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ onClose, onSuccess, packageData, isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PackageFormData>({
    defaultValues: packageData || {
      name: '',
      description: '',
      duration_days: 1,
      nights: 0,
      price: 0,
      type: 'umrah',
      rating: 0
    }
  });

  const onSubmit = async (data: PackageFormData) => {
    try {
      setIsLoading(true);
      
      if (isEdit && packageData) {
        // Update existing package
        const response = await packagesAPI.updatePackage(1, data); // We'll need to pass the actual ID
        if (response.success) {
          toast.success('Package updated successfully!');
        }
      } else {
        // Create new package
        const response = await packagesAPI.createPackage(data);
        if (response.success) {
          toast.success('Package created successfully!');
          reset();
        }
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save package');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <PackageIcon className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {isEdit ? 'Edit Package' : 'Create New Package'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Package Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Package Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Package name is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter package name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter package description"
            />
          </div>

          {/* Duration and Nights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration_days" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days) *
              </label>
              <input
                type="number"
                id="duration_days"
                {...register('duration_days', { 
                  required: 'Duration is required',
                  min: { value: 1, message: 'Duration must be at least 1 day' }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.duration_days ? 'border-red-500' : 'border-gray-300'
                }`}
                min="1"
              />
              {errors.duration_days && (
                <p className="mt-1 text-sm text-red-600">{errors.duration_days.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nights" className="block text-sm font-medium text-gray-700 mb-2">
                Nights *
              </label>
              <input
                type="number"
                id="nights"
                {...register('nights', { 
                  required: 'Nights is required',
                  min: { value: 0, message: 'Nights cannot be negative' }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.nights ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
              />
              {errors.nights && (
                <p className="mt-1 text-sm text-red-600">{errors.nights.message}</p>
              )}
            </div>
          </div>

          {/* Price and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                id="rating"
                step="0.1"
                {...register('rating', { 
                  min: { value: 0, message: 'Rating must be at least 0' },
                  max: { value: 5, message: 'Rating must be at most 5' }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.rating ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                max="5"
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
              )}
            </div>
          </div>

          {/* Package Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Package Type *
            </label>
            <select
              id="type"
              {...register('type', { required: 'Package type is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="umrah">Umrah</option>
              <option value="hajj">Hajj</option>
              <option value="tour">Tour</option>
              <option value="custom">Custom</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isEdit ? 'Update Package' : 'Create Package'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageForm;
