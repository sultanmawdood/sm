import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16" viewBox="0 0 69 32" fill="#111">
              <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-.64 2.56.16 4.4 1.04 2.4 3.6 2.4 2.72 0 7.6-2.24L68.56 4z"></path>
            </svg>
          </Link>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center">
            <Link to="/" className="text-primary hover:text-secondary transition-colors font-medium text-base">
              Home
            </Link>
            <Link to="/shop" className="text-primary hover:text-secondary transition-colors font-medium text-base">
              New & Featured
            </Link>
            <Link to="/shop?category=Footwear" className="text-primary hover:text-secondary transition-colors font-medium text-base">
              Shoes
            </Link>
            <Link to="/shop?category=Tops" className="text-primary hover:text-secondary transition-colors font-medium text-base">
              Clothing
            </Link>
            <Link to="/shop?category=Accessories" className="text-primary hover:text-secondary transition-colors font-medium text-base">
              Accessories
            </Link>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden sm:flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-light transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:block text-primary hover:text-secondary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            <Link to="/cart" className="relative group">
              <svg className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-primary hover:text-secondary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className="block py-2 text-primary hover:text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="block py-2 text-primary hover:text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
              New & Featured
            </Link>
            <Link to="/shop?category=Footwear" className="block py-2 text-primary hover:text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
              Shoes
            </Link>
            <Link to="/shop?category=Tops" className="block py-2 text-primary hover:text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
              Clothing
            </Link>
            <Link to="/shop?category=Accessories" className="block py-2 text-primary hover:text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
              Accessories
            </Link>
            <Link to="/auth" className="block py-2 text-primary hover:text-secondary font-medium" onClick={() => setIsMenuOpen(false)}>
              {isAuthenticated ? 'Account' : 'Sign In'}
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-primary hover:text-secondary font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
