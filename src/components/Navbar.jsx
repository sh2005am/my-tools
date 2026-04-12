import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    /* hidden md:flex means: Hide on mobile, show as flex on medium screens+ */
    <nav className="hidden md:flex bg-slate-900 border-b border-gray-200 py-2">
      <div className="max-w-7xl mx-auto px-4 flex gap-8 text-sm font-medium text-white">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link to="/" className="hover:text-blue-600 transition-colors">Tools</Link>
        <Link to="/" className="hover:text-blue-600 transition-colors">Blog</Link>
        <Link to="/" className="hover:text-blue-600 transition-colors">News</Link>
        <Link to="/" className="hover:text-blue-600 transition-colors">desclaimer</Link>
      </div>
    </nav>
  );
};

export default Navbar;