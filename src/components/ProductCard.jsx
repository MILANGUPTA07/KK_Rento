import { Link } from 'react-router-dom';
import { Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          {product.available ? (
            <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Available
            </span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <XCircle className="h-4 w-4 mr-1" />
              Rented
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-primary-500">
            <DollarSign className="h-5 w-5 mr-1" />
            <span className="text-2xl font-bold">{product.price}</span>
            <span className="text-gray-500 ml-1">/day</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">Min 1 day</span>
          </div>
        </div>
        
        <Link
          to={`/product/${product.id}`}
          className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            product.available
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.available ? 'View Details' : 'Not Available'}
        </Link>
      </div>
    </div>
  );
}