import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import StockBadge from '../components/StockBadge';
import TrustBadges from '../components/TrustBadges';
import { useProduct, useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import Breadcrumb from '../components/Breadcrumb';
import ImageZoom from '../components/ImageZoom';
import ProductReviews from '../components/ProductReviews';

const Product: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  
  const { product, isLoading, error } = useProduct(Number(id));
  const { products } = useProducts();
  
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !product) {
    return <ErrorBoundary message={error || 'Product not found'} onRetry={() => window.location.reload()} />;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const inWishlist = isInWishlist(product?.id || 0);

  const handleWishlistToggle = () => {
    if (product) {
      if (inWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-12">
        <Breadcrumb items={[
          { label: 'Shop', path: '/shop' },
          { label: product?.category || '', path: `/shop?category=${product?.category}` },
          { label: product?.name || '' }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          {/* Product Image */}
          <ImageZoom src={product.image} alt={product.name} />

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4">{product.name}</h1>
            
            <p className="text-secondary dark:text-gray-300 text-base sm:text-lg mb-4">{product.category}</p>

            <div className="mb-6">
              <StockBadge inStock={true} quantity={Math.floor(Math.random() * 20) + 1} />
            </div>

            <div className="text-3xl sm:text-4xl font-medium text-primary dark:text-white mb-8">${product.price.toFixed(2)}</div>

            <p className="text-primary dark:text-white text-base sm:text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <TrustBadges />

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-primary dark:text-white font-medium text-base sm:text-lg">Select Size</h3>
                <button className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white text-sm">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 sm:py-4 rounded-lg border-2 font-medium transition-all text-sm sm:text-base ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 dark:border-gray-600 text-primary dark:text-white hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-primary dark:text-white font-medium mb-4 text-base sm:text-lg">Quantity</h3>
              <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 sm:px-6 py-3 text-primary dark:text-white hover:bg-light dark:hover:bg-secondary transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-6 sm:px-8 py-3 text-primary dark:text-white font-medium text-base sm:text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 sm:px-6 py-3 text-primary dark:text-white hover:bg-light dark:hover:bg-secondary transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 mb-8">
              <Button onClick={handleAddToCart} variant="primary" className="w-full py-4 text-base sm:text-lg">
                Add to Cart
              </Button>
              <Button 
                onClick={handleWishlistToggle}
                variant="secondary" 
                className="w-full py-4 text-base sm:text-lg flex items-center justify-center gap-2"
              >
                <svg className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} fill={inWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-6">
              <div>
                <h4 className="text-primary dark:text-white font-medium mb-3 text-base sm:text-lg">Delivery & Returns</h4>
                <p className="text-secondary dark:text-gray-300 text-sm sm:text-base">Free standard delivery on orders over $100</p>
                <p className="text-secondary dark:text-gray-300 text-sm sm:text-base mt-2">Free 30-day returns</p>
              </div>
              
              <div>
                <h4 className="text-primary dark:text-white font-medium mb-3 text-base sm:text-lg">Product Information</h4>
                <ul className="space-y-2 text-secondary dark:text-gray-300 text-sm sm:text-base">
                  <li>• Premium quality materials</li>
                  <li>• Moisture-wicking technology</li>
                  <li>• Durable construction</li>
                  <li>• Machine washable</li>
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <ProductReviews />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-white mb-6 sm:mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
