import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;