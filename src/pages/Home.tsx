import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import Button from '../components/Button';
import Newsletter from '../components/Newsletter';
import MembershipSignup from '../components/MembershipSignup';
import { useProducts } from '../hooks/useProducts';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import ErrorBoundary from '../components/ui/ErrorBoundary';

const Home: React.FC = () => {
  const { products, isLoading, error } = useProducts();
  const featuredProducts = products.slice(0, 8);

  if (error) {
    return <ErrorBoundary message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-64px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-light">
        <img
          src="https://i.pinimg.com/736x/fe/0c/60/fe0c600fb30d3f975de4d3f3d73106d1.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 text-white leading-tight">
            JUST DO IT
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl mb-8 font-light">
            Move the world forward with premium sports gear
          </p>
          <Link to="/shop">
            <Button variant="primary" className="text-base sm:text-lg px-8 py-4">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>



      {/* Categories */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Featured</h2>
            <Link to="/shop" className="text-primary hover:text-secondary transition-colors text-sm sm:text-base font-medium">
              View All
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Membership Banner */}
      <section className="py-16 sm:py-20 bg-light">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-4">
              BECOME A KINGSPORTS MEMBER
            </h2>
            <p className="text-secondary text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Sign up for free. Join the community and get access to exclusive products, special offers, and member-only events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="primary" className="w-full sm:w-auto px-8">
                  Join Us
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="secondary" className="w-full sm:w-auto px-8">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Signup */}
      <MembershipSignup />

      {/* Benefits */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">Why Shop With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-primary text-lg font-bold mb-2">Free Shipping</h3>
              <p className="text-secondary text-sm">On orders over $100</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-primary text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-secondary text-sm">2-5 business days</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-primary text-lg font-bold mb-2">Secure Payment</h3>
              <p className="text-secondary text-sm">100% protected transactions</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-primary text-lg font-bold mb-2">Easy Returns</h3>
              <p className="text-secondary text-sm">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-light">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-12 text-center">What Athletes Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary mb-4 text-sm sm:text-base">
                "Best running shoes I've ever owned. The cushioning is perfect for long distances and my feet feel great even after 20+ miles."
              </p>
              <p className="text-primary font-bold">Sarah M.</p>
              <p className="text-secondary text-sm">Marathon Runner</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary mb-4 text-sm sm:text-base">
                "The quality is outstanding. These training clothes are durable, comfortable, and look amazing. Worth every penny!"
              </p>
              <p className="text-primary font-bold">Michael T.</p>
              <p className="text-secondary text-sm">Fitness Coach</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary mb-4 text-sm sm:text-base">
                "Fast shipping, excellent customer service, and the products exceeded my expectations. I'm a customer for life!"
              </p>
              <p className="text-primary font-bold">Jessica L.</p>
              <p className="text-secondary text-sm">Yoga Instructor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
