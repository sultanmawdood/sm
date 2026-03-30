import React, { useState } from 'react';
import { showToast } from '../utils/toast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thanks for subscribing!', 'success');
      setEmail('');
    }
  };

  return (
    <section className="bg-primary py-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            STAY IN THE LOOP
          </h2>
          <p className="text-white/80 mb-8">
            Get exclusive access to new products, special offers, and athlete stories.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
