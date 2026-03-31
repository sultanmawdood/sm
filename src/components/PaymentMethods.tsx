import React from 'react';

const PaymentMethods: React.FC = () => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Visa */}
      <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center h-10 w-16">
        <img 
          src="https://i.pinimg.com/1200x/0f/86/07/0f86075d899c9069b235c23b792d70ef.jpg" 
          alt="Visa" 
          className="h-6 w-auto"
        />
      </div>
      
      {/* Mastercard */}
      <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center h-10 w-16">
        <img 
          src="https://i.pinimg.com/1200x/36/7c/26/367c26d9ba9b9043c9bb4b5a17ab4d2f.jpg" 
          alt="Mastercard" 
          className="h-6 w-auto"
        />
      </div>
      
      {/* PayPal */}
      <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center h-10 w-16">
        <img 
          src="https://i.pinimg.com/1200x/0f/86/07/0f86075d899c9069b235c23b792d70ef.jpg" 
          alt="Visa" 
          className="h-6 w-auto"
        />
      </div>
      
      {/* Apple Pay */}
      <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center h-10 w-16">
        <img 
          src="https://i.pinimg.com/736x/7c/81/52/7c8152cb8959cd0155c5f8d6cc3c7cd6.jpg" 
          alt="Visa" 
          className="h-6 w-auto"
        />
      </div>
      
      {/* Google Pay */}
      <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center h-10 w-16">
        <img 
          src="https://i.pinimg.com/736x/8d/ec/e1/8dece15cc40aaf66ed47f6591b639d06.jpg" 
          alt="Visa" 
          className="h-6 w-auto"
        />
      </div>
    </div>
  );
};

export default PaymentMethods;
