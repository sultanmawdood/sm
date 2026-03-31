import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/shop?category=${category.name}`} className="group block">
      <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-light dark:bg-secondary">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
          <h3 className="text-white text-2xl sm:text-3xl font-bold">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
