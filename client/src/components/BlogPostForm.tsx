import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save, FileText, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { articlesAPI } from '../services/api';
import { Article } from '../types';
import toast from 'react-hot-toast';

interface BlogPostFormData {
  title: string;
  slug: string;
  content: string;
  author: string;
  image?: File;
  imageUrl?: string;
}

interface BlogPostFormProps {
  onClose: () => void;
  onSuccess: () => void;
  articleData?: Article;
  isEdit?: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ onClose, onSuccess, articleData, isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BlogPostFormData>({
    defaultValues: articleData || {
      title: '',
      slug: '',
      content: '',
      author: ''
    }
  });

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      setIsLoading(true);
      
      // Auto-generate slug if not provided
      if (!data.slug && data.title) {
        data.slug = generateSlug(data.title);
      }
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('slug', data.slug);
      formData.append('content', data.content);
      formData.append('author', data.author);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      
      if (isEdit && articleData) {
        // Update existing article
        const response = await articlesAPI.updateArticle(1, formData); // We'll need to pass the actual ID
        if (response.success) {
          toast.success('Blog post updated successfully!');
        }
      } else {
        // Create new article
        const response = await articlesAPI.createArticle(formData);
        if (response.success) {
          toast.success('Blog post created successfully!');
          reset();
          setSelectedImage(null);
          setImagePreview(null);
        }
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save blog post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
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
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter blog post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                /blog/
              </span>
              <input
                type="text"
                id="slug"
                {...register('slug', { 
                  required: 'Slug is required',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'Slug can only contain lowercase letters, numbers, and hyphens'
                  }
                })}
                className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.slug ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="url-friendly-slug"
                onChange={(e) => {
                  if (!isEdit) {
                    e.target.value = generateSlug(e.target.value);
                  }
                }}
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              This will be the URL for your blog post. Leave empty to auto-generate from title.
            </p>
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              id="author"
              {...register('author', { required: 'Author is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            {!imagePreview ? (
              /* Upload area */
              <div
                onClick={triggerFileInput}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Click to upload an image
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </button>
              </div>
            ) : (
              /* Image preview */
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="mt-2 text-sm text-gray-500">
                  {selectedImage?.name} ({(selectedImage?.size! / 1024 / 1024).toFixed(2)} MB)
                </div>
              </div>
            )}
            
            <p className="mt-2 text-sm text-gray-500">
              This image will be used as the featured image for your blog post.
            </p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              {...register('content', { 
                required: 'Content is required',
                minLength: { value: 10, message: 'Content must be at least 10 characters' }
              })}
              rows={12}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your blog post content here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              You can use Markdown formatting in your content.
            </p>
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
              <span>{isEdit ? 'Update Blog Post' : 'Create Blog Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
