import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Link helper to close menu when a link is clicked
  const navLink = (to, label) => (
    <Link 
      to={to} 
      onClick={() => setIsOpen(false)} 
      className="block px-4 py-2 text-white hover:bg-blue-50 hover:text-blue-600 rounded-lg"
    >
      {label}
    </Link>
  );

  return (
    <header className="w-full bg-blue-200 border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded font-bold">A</div>
          <h1 className="text-xl font-black tracking-tight uppercase">Ace<span className="text-blue-600">Stuffs</span></h1>
        </Link>

        {/* Hamburger Button (Only visible on mobile) */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-gray-100 p-4 space-y-1 shadow-lg">
          {navLink("/", "Home")}
          {navLink("/", "Tools")}
          {navLink("/", "Blog")}
          {navLink("/", "News")}
          {navLink("/", "Disclaimer")}
        </div>
      )}
    </header>
  );
};

export default Header;