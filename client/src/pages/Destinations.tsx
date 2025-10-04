import React from 'react';
import { useTranslation } from 'react-i18next';

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('destinations.title')}</h1>
        <p className="text-gray-600">{t('destinations.subtitle')}</p>
      </div>
    </div>
  );
};

export default Destinations;