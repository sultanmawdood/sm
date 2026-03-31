import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#0a0a0a] shadow-sm">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <svg className="w-16 h-16 text-black dark:text-white transition-transform group-hover:scale-110 duration-300" viewBox="0 0 69 32" fill="currentColor">
                <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-.64 2.56.16 4.4 1.04 2.4 3.6 2.4 2.72 0 7.6-2.24L68.56 4z"></path>
              </svg>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/" className="relative text-[15px] font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop" className="relative text-[15px] font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors group">
              New & Featured
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop?category=Footwear" className="relative text-[15px] font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors group">
              Shoes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop?category=Tops" className="relative text-[15px] font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors group">
              Clothing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop?category=Accessories" className="relative text-[15px] font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors group">
              Accessories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-5">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-44 lg:w-52 px-5 py-2.5 pl-11 bg-gray-100 dark:bg-gray-900 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-white transition-all duration-300 focus:w-56 lg:focus:w-64"
                />
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-colors group-focus-within:text-black dark:group-focus-within:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50 animate-fadeIn">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">
                <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/cart" className="relative group hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">
              <svg className="w-6 h-6 text-gray-900 dark:text-white transition-transform group-hover:scale-110" fill={wishlist.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">
              <svg className="w-6 h-6 text-gray-900 dark:text-white transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-gray-900 animate-slideDown">
          <div className="px-6 py-6 space-y-1">
            <Link to="/" className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
              New & Featured
            </Link>
            <Link to="/shop?category=Footwear" className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
              Shoes
            </Link>
            <Link to="/shop?category=Tops" className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
              Clothing
            </Link>
            <Link to="/shop?category=Accessories" className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
              Accessories
            </Link>
            <div className="border-t border-gray-100 dark:border-gray-900 my-2"></div>
            <Link to="/auth" className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
              {isAuthenticated ? 'Account' : 'Sign In'}
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-all"
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
