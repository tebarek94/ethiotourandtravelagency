import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  CheckCircle,
  Upload,
  Download,
  FileText,
  Image,
  X,
  Eye
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { packagesAPI, bookingsAPI } from '../services/api';
import { formatCurrency, getPackageDurationDisplay } from '../utils/helpers';
import { BookingFormData } from '../types';
import toast from 'react-hot-toast';

interface UploadedFile {
  id: string;
  file: File;
  type: 'passport' | 'visa' | 'photo';
  preview?: string;
}

const BookingForm: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [previewFileState, setPreviewFile] = useState<UploadedFile | null>(null);
  
  const passportRef = useRef<HTMLInputElement>(null);
  const visaRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const { data: packageData, loading: packageLoading } = useApi(
    () => packagesAPI.getById(parseInt(packageId!)),
    [packageId]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>();

  const travelers = watch('travelers', 1);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'visa' | 'photo') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t('booking.fileTypes'));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('booking.maxFileSize'));
      return;
    }

    const newFile: UploadedFile = {
      id: Date.now().toString(),
      file,
      type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    };

    // Remove existing file of same type
    setUploadedFiles(prev => prev.filter(f => f.type !== type));
    setUploadedFiles(prev => [...prev, newFile]);
    
    toast.success(t(`booking.${type}`) + ' ' + t('common.success'));
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const downloadFile = (file: UploadedFile) => {
    const url = file.preview || URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (!file.preview) {
      URL.revokeObjectURL(url);
    }
  };

  const handlePreviewFile = (file: UploadedFile) => {
    setPreviewFile(file);
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('package_id', packageId!);
      formData.append('travel_date', data.travel_date);
      formData.append('travelers', data.travelers.toString());
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.special_requests) {
        formData.append('special_requests', data.special_requests);
      }

      // Append files
      uploadedFiles.forEach((uploadedFile, index) => {
        formData.append(`files`, uploadedFile.file);
        formData.append(`file_types`, uploadedFile.type);
      });

      await bookingsAPI.create(formData);
      toast.success('Booking created successfully!');
      navigate('/packages');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (packageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-6">The package you're trying to book doesn't exist.</p>
          <button
            onClick={() => navigate('/packages')}
            className="btn-primary"
          >
            View Packages
          </button>
        </div>
      </div>
    );
  }

  const pkg = packageData;
  const totalPrice = pkg.price * travelers;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-primary py-16 mt-16 lg:mt-20">
        <div className="container-custom text-white">
          <div className="flex items-center space-x-2 text-sm mb-6">
            <button
              onClick={() => navigate('/packages')}
              className="hover:text-secondary-300 transition-colors duration-200"
            >
              Packages
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/packages/${pkg.package_id}`)}
              className="hover:text-secondary-300 transition-colors duration-200"
            >
              {pkg.name}
            </button>
            <span>/</span>
            <span className="text-secondary-300">Booking</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Umrah Journey
          </h1>
          <p className="text-xl text-gray-200">
            Complete your booking for the {pkg.name} package
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Booking Information
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Travel Date */}
                  <div>
                    <label htmlFor="travel_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={20} className="text-gray-400" />
                      </div>
                      <input
                        {...register('travel_date', {
                          required: 'Travel date is required',
                        })}
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className={`input-field pl-10 ${
                          errors.travel_date ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.travel_date && (
                      <p className="mt-1 text-sm text-red-600">{errors.travel_date.message}</p>
                    )}
                  </div>

                  {/* Number of Travelers */}
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Travelers *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users size={20} className="text-gray-400" />
                      </div>
                      <input
                        {...register('travelers', {
                          required: 'Number of travelers is required',
                          min: { value: 1, message: 'At least 1 traveler is required' },
                          max: { value: 10, message: 'Maximum 10 travelers per booking' },
                        })}
                        type="number"
                        min="1"
                        max="10"
                        className={`input-field pl-10 ${
                          errors.travelers ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                        }`}
                      />
                    </div>
                    {errors.travelers && (
                      <p className="mt-1 text-sm text-red-600">{errors.travelers.message}</p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={20} className="text-gray-400" />
                          </div>
                          <input
                            {...register('name', {
                              required: 'Name is required',
                              minLength: { value: 2, message: 'Name must be at least 2 characters' },
                            })}
                            type="text"
                            className={`input-field pl-10 ${
                              errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                            }`}
                            placeholder="Enter your full name"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={20} className="text-gray-400" />
                          </div>
                          <input
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email address',
                              },
                            })}
                            type="email"
                            className={`input-field pl-10 ${
                              errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                            }`}
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="mt-6">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={20} className="text-gray-400" />
                        </div>
                        <input
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^(\+251|0)?[79][0-9]{8}$/,
                              message: 'Please enter a valid Ethiopian phone number',
                            },
                          })}
                          type="tel"
                          className={`input-field pl-10 ${
                            errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                          }`}
                          placeholder="+251 9XX XXX XXX"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Special Requests */}
                    <div className="mt-6">
                      <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageSquare size={20} className="text-gray-400" />
                        </div>
                        <textarea
                          {...register('special_requests')}
                          rows={4}
                          className="input-field pl-10 resize-none"
                          placeholder="Any special requests or requirements for your Umrah journey..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Required Documents
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Please upload the following documents for visa processing. All files must be in JPG, PNG, or PDF format and under 5MB.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Passport Upload */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Passport Copy *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                          <input
                            ref={passportRef}
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileUpload(e, 'passport')}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => passportRef.current?.click()}
                            className="w-full flex flex-col items-center space-y-2 text-gray-600 hover:text-primary-600"
                          >
                            <Upload size={24} />
                            <span className="text-sm">Upload Passport</span>
                          </button>
                        </div>
                        {uploadedFiles.find(f => f.type === 'passport') && (
                          <div className="text-xs text-green-600 flex items-center space-x-1">
                            <CheckCircle size={12} />
                            <span>Passport uploaded</span>
                          </div>
                        )}
                      </div>

                      {/* Visa Upload */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Visa Copy *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                          <input
                            ref={visaRef}
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileUpload(e, 'visa')}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => visaRef.current?.click()}
                            className="w-full flex flex-col items-center space-y-2 text-gray-600 hover:text-primary-600"
                          >
                            <Upload size={24} />
                            <span className="text-sm">Upload Visa</span>
                          </button>
                        </div>
                        {uploadedFiles.find(f => f.type === 'visa') && (
                          <div className="text-xs text-green-600 flex items-center space-x-1">
                            <CheckCircle size={12} />
                            <span>Visa uploaded</span>
                          </div>
                        )}
                      </div>

                      {/* Photo Upload */}
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Passport Photo *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 transition-colors">
                          <input
                            ref={photoRef}
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, 'photo')}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => photoRef.current?.click()}
                            className="w-full flex flex-col items-center space-y-2 text-gray-600 hover:text-primary-600"
                          >
                            <Upload size={24} />
                            <span className="text-sm">Upload Photo</span>
                          </button>
                        </div>
                        {uploadedFiles.find(f => f.type === 'photo') && (
                          <div className="text-xs text-green-600 flex items-center space-x-1">
                            <CheckCircle size={12} />
                            <span>Photo uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files</h4>
                        <div className="space-y-2">
                          {uploadedFiles.map((file) => (
                            <div key={file.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center space-x-3">
                                {file.preview ? (
                                  <Image size={20} className="text-blue-500" />
                                ) : (
                                  <FileText size={20} className="text-gray-500" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {file.type.charAt(0).toUpperCase() + file.type.slice(1)} • 
                                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {file.preview && (
                                  <button
                                    type="button"
                                    onClick={() => handlePreviewFile(file)}
                                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                                  >
                                    <Eye size={16} />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => downloadFile(file)}
                                  className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                                >
                                  <Download size={16} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeFile(file.id)}
                                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="spinner"></div>
                      ) : (
                        <>
                          <CheckCircle size={20} />
                          <span>Confirm Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Booking Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                    <p className="text-sm text-gray-600">
                      {getPackageDurationDisplay(pkg.duration_days, pkg.nights)}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Price</span>
                    <span className="font-medium">{formatCurrency(pkg.price)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers</span>
                    <span className="font-medium">{travelers}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Price</span>
                      <span className="text-primary-600">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Visa processing included</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Hotels near Haram</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Ground transportation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Preview Modal */}
      {previewFileState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {previewFileState.file.name}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              {previewFileState.preview ? (
                <img
                  src={previewFileState.preview}
                  alt={previewFileState.file.name}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
              ) : (
                <div className="text-center py-12">
                  <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">PDF preview not available</p>
                  <button
                    onClick={() => downloadFile(previewFileState)}
                    className="mt-4 btn-primary inline-flex items-center space-x-2"
                  >
                    <Download size={16} />
                    <span>Download File</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
