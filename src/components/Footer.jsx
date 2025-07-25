import { ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">RentEasy</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for furniture and appliance rentals. 
              Quality products, affordable prices, and excellent service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-primary-500" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-primary-500" />
                <span>contact@renteasy.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-primary-500" />
                <span>123 Business Street, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="/products?category=air-conditioners" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Air Conditioners</a></li>
              <li><a href="/products?category=furniture" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Furniture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Appliances</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-500 transition-colors duration-200">Electronics</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 RentEasy. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}