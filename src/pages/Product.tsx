import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useProduct, useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorBoundary from '../components/ui/ErrorBoundary';

const Product: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-12">
        <Link to="/shop" className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-6 sm:mb-8 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 sm:mb-20">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-light">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">{product.name}</h1>
            
            <p className="text-secondary text-base sm:text-lg mb-6">{product.category}</p>

            <div className="text-3xl sm:text-4xl font-medium text-primary mb-8">${product.price.toFixed(2)}</div>

            <p className="text-primary text-base sm:text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-primary font-medium text-base sm:text-lg">Select Size</h3>
                <button className="text-secondary hover:text-primary text-sm">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 sm:py-4 rounded-lg border-2 font-medium transition-all text-sm sm:text-base ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 text-primary hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-primary font-medium mb-4 text-base sm:text-lg">Quantity</h3>
              <div className="flex items-center border-2 border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 sm:px-6 py-3 text-primary hover:bg-light transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-6 sm:px-8 py-3 text-primary font-medium text-base sm:text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 sm:px-6 py-3 text-primary hover:bg-light transition-colors"
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
              <Button variant="secondary" className="w-full py-4 text-base sm:text-lg">
                Favorite
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8 space-y-6">
              <div>
                <h4 className="text-primary font-medium mb-3 text-base sm:text-lg">Delivery & Returns</h4>
                <p className="text-secondary text-sm sm:text-base">Free standard delivery on orders over $100</p>
                <p className="text-secondary text-sm sm:text-base mt-2">Free 30-day returns</p>
              </div>
              
              <div>
                <h4 className="text-primary font-medium mb-3 text-base sm:text-lg">Product Information</h4>
                <ul className="space-y-2 text-secondary text-sm sm:text-base">
                  <li>• Premium quality materials</li>
                  <li>• Moisture-wicking technology</li>
                  <li>• Durable construction</li>
                  <li>• Machine washable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">You Might Also Like</h2>
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
