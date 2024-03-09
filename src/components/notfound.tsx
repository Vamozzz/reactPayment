import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-gray-600 mb-4">Oops! It seems you have entered the wrong URL.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
