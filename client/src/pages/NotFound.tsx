import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('errors.pageNotFound')}</h1>
        <p className="text-gray-600 mb-6">{t('errors.pageNotFoundMessage')}</p>
        <Link to="/" className="btn-primary">
          {t('errors.goHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;