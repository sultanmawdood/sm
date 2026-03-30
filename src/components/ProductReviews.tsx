import React, { useState } from 'react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: 'Alex Johnson',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely love these! Perfect fit and great quality. Highly recommend.',
    verified: true,
  },
  {
    id: 2,
    author: 'Maria Garcia',
    rating: 4,
    date: '2024-01-10',
    comment: 'Great product, runs slightly small so order a size up.',
    verified: true,
  },
  {
    id: 3,
    author: 'David Lee',
    rating: 5,
    date: '2024-01-05',
    comment: 'Best purchase I\'ve made this year. The quality is outstanding!',
    verified: true,
  },
];

const ProductReviews: React.FC = () => {
  const [reviews] = useState<Review[]>(mockReviews);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-accent' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">Reviews ({reviews.length})</h3>
        <div className="flex items-center gap-2">
          {renderStars(Math.round(Number(avgRating)))}
          <span className="text-primary font-medium">{avgRating}</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-primary">{review.author}</p>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-secondary">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p className="text-secondary">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
