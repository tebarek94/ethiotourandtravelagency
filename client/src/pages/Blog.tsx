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
      {/* Hero Section with Kaaba Background */}
      <section className="relative py-16 mt-16 lg:mt-20 overflow-hidden">
        {/* Kaaba Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/kaaba-hero.jpg')`
            }}
          ></div>
          
          {/* Enhanced Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 via-primary-800/60 to-secondary-800/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          
          {/* Subtle Islamic Pattern Overlay */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-20 left-20 w-32 h-32 bg-secondary-300/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-secondary-400/25 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-secondary-300/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-secondary-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles with different animations */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-secondary-300/30 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-secondary-300/35 rounded-full animate-pulse" style={{animationDelay: '5s'}}></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 left-20 w-16 h-16 border border-white/10 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 right-20 w-12 h-12 border border-secondary-300/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-8 h-8 border border-white/15 rotate-12 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
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
                  <div className="h-48 rounded-t-xl overflow-hidden">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Calendar size={32} className="mx-auto mb-2" />
                          <div className="text-sm">
                            {formatDate(article.published_date)}
                          </div>
                        </div>
                      </div>
                    )}
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
