import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, adminLogout } = useApp();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-gray-900">KK Rento</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              } transition-colors duration-200 font-medium`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${
                isActive('/products') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
              } transition-colors duration-200 font-medium`}
            >
              Products
            </Link>
            {isAdmin ? (
              <>
                <Link
                  to="/admin"
                  className={`${
                    isActive('/admin') ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'
                  } transition-colors duration-200 font-medium`}
                >
                  Admin
                </Link>
                <button
                  onClick={adminLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive('/') ? 'text-primary-500' : 'text-gray-700'
                } font-medium py-2`}
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive('/products') ? 'text-primary-500' : 'text-gray-700'
                } font-medium py-2`}
              >
                Products
              </Link>
              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${
                      isActive('/admin') ? 'text-primary-500' : 'text-gray-700'
                    } font-medium py-2`}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      adminLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-500 py-2 text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-1 text-gray-700 py-2"
                >
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}