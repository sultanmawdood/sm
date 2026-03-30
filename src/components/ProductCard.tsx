import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-3 h-3 ${index < Math.floor(rating) ? 'text-accent' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const isNew = product.id > 15;
  const isOnSale = product.price < 50;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-light rounded-lg overflow-hidden mb-3 relative transition-all duration-300 group-hover:shadow-lg">
        <div className="relative overflow-hidden aspect-square bg-white">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {isNew && (
              <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {isOnSale && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              onClick={handleWishlist}
              className={`bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg ${
                isInWishlist(product.id) ? 'text-red-500' : 'text-primary hover:text-red-500'
              }`}
              aria-label="Add to wishlist"
            >
              <svg className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-white text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-primary hover:text-white shadow-lg"
              aria-label="Add to cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-2">
        <p className="text-accent text-xs sm:text-sm font-medium mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="text-primary font-medium text-sm sm:text-base mb-1 group-hover:text-secondary transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-secondary">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary font-semibold text-base sm:text-lg">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
