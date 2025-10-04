import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  return {
    language: i18n.language,
    isRTL,
    direction,
    changeLanguage: i18n.changeLanguage
  };
};
