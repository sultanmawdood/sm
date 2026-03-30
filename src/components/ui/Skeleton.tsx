import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-light rounded-lg overflow-hidden mb-3">
        <div className="aspect-square bg-gray-300"></div>
      </div>
      <div className="px-2">
        <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-300"></div>
    </div>
  );
};
