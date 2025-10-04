import React from 'react';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('navigation.register')}</h1>
        <p className="text-gray-600">Registration page coming soon...</p>
      </div>
    </div>
  );
};

export default Register;