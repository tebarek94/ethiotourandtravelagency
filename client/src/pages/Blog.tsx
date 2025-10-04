import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { articlesAPI } from '../services/api';
import { formatDate, truncateText } from '../utils/helpers';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const { data: articles, loading } = useApi(() => articlesAPI.getAll());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-primary py-16 mt-16 lg:mt-20">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles?.map((article) => (
                <article key={article.article_id} className="card-hover">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-t-xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <Calendar size={32} className="mx-auto mb-2" />
                      <div className="text-sm">
                        {formatDate(article.published_date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User size={16} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{formatDate(article.published_date)}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">
                      {truncateText(article.content, 120)}
                    </p>
                    
                    <Link
                      to={`/blog/${article.slug}`}
                      className="btn-outline w-full inline-flex items-center justify-center space-x-2"
                    >
                      <span>{t('blog.readMore')}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
