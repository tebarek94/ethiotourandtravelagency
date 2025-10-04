import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'ar', name: t('language.arabic'), flag: '🇸🇦' },
    { code: 'am', name: t('language.amharic'), flag: '🇪🇹' },
    { code: 'om', name: t('language.oromo'), flag: '🇪🇹' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Update document direction for RTL languages
    if (languageCode === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = languageCode;
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
        <Globe size={18} className="text-gray-700" />
        <span className="text-xs font-medium text-gray-700 hidden lg:block">
          {t('language.select')}
        </span>
      </button>
      <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`block w-full text-left rtl:text-right px-4 py-2 text-sm ${
              i18n.language === lang.code
                ? 'bg-primary-50 text-primary-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
