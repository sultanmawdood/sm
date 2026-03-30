import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-black text-primary mb-4">404</h1>
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary text-lg mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Go Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" className="w-full sm:w-auto">
              Shop Now
            </Button>
          </Link>
        </div>
        
        <div className="mt-12">
          <svg
            className="w-64 h-64 mx-auto text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
