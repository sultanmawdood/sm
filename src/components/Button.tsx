import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  type = 'button',
  ...rest
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-dark-hover border border-primary',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
    accent: 'bg-accent text-primary hover:bg-opacity-90 border border-accent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
