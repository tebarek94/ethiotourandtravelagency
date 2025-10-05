import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
          <div className="w-24 h-24 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
            <Search size={48} className="text-primary-600" />
          </div>
        </div>
        
        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('errors.pageNotFound')}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('errors.pageNotFoundMessage')}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="btn-primary w-full inline-flex items-center justify-center space-x-2 text-lg py-3"
          >
            <Home size={20} />
            <span>{t('errors.goHome')}</span>
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn-outline w-full inline-flex items-center justify-center space-x-2 text-lg py-3"
          >
            <ArrowLeft size={20} />
            <span>{t('errors.goBack')}</span>
          </button>
        </div>
        
        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;