import React from 'react';

const NotFoundPage = () => {
  console.log("no routes found")
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">404 - Not Found</h1>
        <p className="mb-4 text-gray-600">Oops! It seems you have entered the wrong URL.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
