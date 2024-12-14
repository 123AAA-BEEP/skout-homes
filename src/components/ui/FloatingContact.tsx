'use client';

import { useState, useEffect } from 'react';

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Version */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg md:hidden z-50">
        <button 
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold"
          onClick={() => window.location.href = '/find-realtor'}
        >
          Connect with an Agent
        </button>
      </div>

      {/* Desktop Version */}
      {isVisible && (
        <div className="fixed bottom-8 right-8 hidden md:block z-50">
          <button 
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = '/find-realtor'}
          >
            Get Started
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingContact; 