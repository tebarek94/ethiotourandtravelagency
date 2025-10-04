import React from 'react';
import { useTranslation } from 'react-i18next';

const BlogPost: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('blog.title')}</h1>
        <p className="text-gray-600">Blog post page coming soon...</p>
      </div>
    </div>
  );
};

export default BlogPost;