import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { articlesAPI } from '../services/api';
import { formatDate } from '../utils/helpers';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, loading, error } = useApi(
    () => articlesAPI.getBySlug(slug!),
    [slug]
  );

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
      {/* Header */}
      <section className="bg-gradient-primary py-16">
        <div className="container-custom text-white">
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
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-lg">
            <div className="flex items-center space-x-2">
              <User size={20} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={20} />
              <span>{formatDate(article.published_date)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
              
              {/* Article Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to="/blog"
                    className="btn-outline inline-flex items-center space-x-2"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Blog</span>
                  </Link>
                  
                  <div className="flex items-center space-x-4">
                    <button className="btn-outline inline-flex items-center space-x-2">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    <button className="btn-outline inline-flex items-center space-x-2">
                      <Heart size={16} />
                      <span>Like</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
