import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import EmptyState from '../components/ui/EmptyState';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-primary">
        <EmptyState
          icon={
            <svg className="w-24 h-24 sm:w-32 sm:h-32 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          }
          title="Your Cart is Empty"
          description="Looks like you haven't added anything to your cart yet. Start shopping to find your perfect gear!"
          actionLabel="Shop Now"
          actionLink="/shop"
        />
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white dark:bg-primary">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-12">
        <div className="flex justify-between items-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white">Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-secondary dark:text-gray-300 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 sm:space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-light dark:bg-secondary rounded-lg p-4 sm:p-6 transition-all hover:shadow-md">
                  <div className="flex gap-4 sm:gap-6">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white dark:bg-primary rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-4">
                          <Link 
                            to={`/product/${item.id}`} 
                            className="text-primary dark:text-white font-semibold hover:text-secondary transition-colors text-base sm:text-lg block truncate"
                          >
                            {item.name}
                          </Link>
                          <p className="text-secondary dark:text-gray-300 text-xs sm:text-sm mt-1">{item.category}</p>
                        </div>
                        <p className="text-primary dark:text-white font-semibold text-base sm:text-lg whitespace-nowrap">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-primary dark:text-white font-semibold text-sm sm:text-base min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-primary dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-secondary dark:text-gray-300 hover:text-red-600 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-3 text-right">
                        <p className="text-sm text-secondary dark:text-gray-300">Subtotal</p>
                        <p className="text-lg font-bold text-primary dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-light dark:bg-secondary rounded-lg p-6 sticky top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-primary dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-primary dark:text-white">
                  <span className="text-sm sm:text-base">Subtotal</span>
                  <span className="font-medium text-sm sm:text-base">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary dark:text-white">
                  <span className="text-sm sm:text-base">Shipping</span>
                  <span className="font-medium text-sm sm:text-base">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-secondary dark:text-gray-300">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-primary dark:text-white">
                  <span className="text-sm sm:text-base">Estimated Tax</span>
                  <span className="font-medium text-sm sm:text-base">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
                  <div className="flex justify-between text-primary dark:text-white">
                    <span className="font-bold text-base sm:text-lg">Total</span>
                    <span className="font-bold text-lg sm:text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button variant="primary" className="w-full mb-3 py-4">
                Checkout
              </Button>

              <Link to="/shop">
                <Button variant="secondary" className="w-full py-4">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600 space-y-3">
                <div className="flex items-center text-secondary dark:text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure checkout
                </div>
                <div className="flex items-center text-secondary dark:text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free returns within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
