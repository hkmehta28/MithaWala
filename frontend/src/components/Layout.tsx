import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { searchQuery, setSearchQuery } = useSearch();
  const { cartCount } = useCart();
  const navigate = useNavigate();



  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">


      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-8">
              {/* Search Bar */}
              <div className="flex-grow max-w-md hidden md:flex">
                  <input 
                    type="text" 
                    placeholder="Search here..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-2 border-gray-200 border-r-0 rounded-l-md px-4 py-2 focus:outline-none text-sm bg-gray-50" 
                  />
                  <button className="bg-primary text-white px-5 py-2 rounded-r-md hover:bg-red-700 transition">
                      🔍
                  </button>
              </div>

              {/* Logo (Centered visually if possible, or left) */}
              <div className="text-center">
                  <Link to="/" className="inline-block">
                      <img src="/logo.png" alt="MithaWala" className="h-16 md:h-20" />
                  </Link>
              </div>

              {/* Icons / Auth */}
              <div className="flex items-center gap-6 text-gray-700">
                  {isAuthenticated ? (
                      <>
                        <span className="text-sm font-semibold hidden md:inline">Hi, {user?.name}</span>
                        {isAdmin && <Link to="/admin" className="hover:text-primary">Admin</Link>}
                        <button onClick={handleLogout} className="hover:text-primary text-sm font-bold">Logout</button>
                      </>
                  ) : (
                      <Link to="/login" className="hover:text-primary flex items-center gap-1">
                          👤 <span className="text-sm font-bold">Login</span>
                      </Link>
                  )}
                  <Link to="/cart" className="relative cursor-pointer hover:text-primary">
                      🛍️ <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
                  </Link>
              </div>
          </div>

          {/* Navigation Bar (Yellow) */}
          <div className="bg-secondary py-3">
              <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
                  <div className="flex gap-8 text-sm font-bold text-gray-800 whitespace-nowrap uppercase tracking-wide">
                      <Link to="/" className="hover:text-white transition">Home</Link>
                      <Link to="/" className="hover:text-white transition">Sweets</Link>
                      <Link to="/" className="hover:text-white transition">Ready to Eat</Link>
                      <Link to="/" className="hover:text-white transition">Refreshments</Link>
                  </div>
              </div>
          </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h4 className="font-bold text-lg mb-4">About Us</h4>
                <p className="text-gray-400 text-sm">Delivering happiness since 1937. Authentic taste of India.</p>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                    <li>Track Order</li>
                    <li>Store Locator</li>
                    <li>Contact Us</li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-lg mb-4">Policies</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                    <li>Privacy Policy</li>
                    <li>Shipping Policy</li>
                    <li>Terms of Use</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-lg mb-4">Connect</h4>
                <div className="flex gap-4">
                    <span>🔵 FB</span>
                    <span>📷 IG</span>
                    <span>🐦 TW</span>
                </div>
            </div>
        </div>
        <div className="text-center mt-12 text-gray-600 text-sm border-t border-gray-800 pt-8">
            &copy; 2023 Sweet Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
