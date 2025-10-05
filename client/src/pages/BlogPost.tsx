import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Clock,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { articlesAPI } from '../services/api';
import { formatDate } from '../utils/helpers';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: article, loading, error } = useApi(
    () => articlesAPI.getBySlug(slug || ''),
    [slug]
  );

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content.substring(0, 200) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="relative z-10 container-custom text-white">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm mb-6">
            <Link to="/" className="hover:text-secondary-300 transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-secondary-300 transition-colors duration-200">
              Blog
            </Link>
            <span>/</span>
            <span className="text-secondary-300">{article.title}</span>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-6 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-secondary-300" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-secondary-300" />
                <span>{formatDate(article.published_date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-secondary-300" />
                <span>5 min read</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Tag size={16} className="text-secondary-300" />
                <span className="text-sm">Travel Guide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag size={16} className="text-secondary-300" />
                <span className="text-sm">Umrah</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                {/* Featured Image */}
                {article.image_url && (
                  <div className="mb-8">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                
                <div className="text-gray-800 leading-relaxed">
                  {article.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{article.author}</p>
                        <p className="text-sm text-gray-600">Travel Writer</p>
                      </div>
                    </div>
                    <button
                      onClick={handleShare}
                      className="btn-outline inline-flex items-center space-x-2"
                    >
                      <Share2 size={16} />
                      <span>Share Article</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-xl text-gray-600">
              Continue your spiritual journey with more insights
            </p>
          </div>
          
          <div className="text-center">
            <Link
              to="/blog"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Articles</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;