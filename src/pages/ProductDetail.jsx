import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, DollarSign, Calendar, CheckCircle, Star, Shield, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useApp();
  const [selectedDays, setSelectedDays] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * selectedDays;

  const handleRentNow = () => {
    if (!product.available) {
      toast.error('This product is currently not available');
      return;
    }
    
    navigate('/order', {
      state: {
        product,
        days: selectedDays,
        totalPrice
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-500 hover:text-primary-600 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center px-4 py-2 rounded-full ${
                    product.available ? 'bg-secondary-100 text-secondary-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    {product.available ? 'Available for Rent' : 'Currently Rented'}
                  </div>
                  <div className="flex items-center text-accent-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 font-semibold">4.8</span>
                    <span className="text-gray-500 ml-1">(24 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center text-primary-500 mb-2">
                      <DollarSign className="h-6 w-6 mr-1" />
                      <span className="text-3xl font-bold">{product.price}</span>
                      <span className="text-gray-500 ml-2">per day</span>
                    </div>
                    <p className="text-sm text-gray-500">Minimum rental period: 1 day</p>
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rental Duration
                  </label>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={selectedDays}
                      onChange={(e) => setSelectedDays(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input-field max-w-24"
                    />
                    <span className="text-gray-600">
                      {selectedDays === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total Price:
                    </span>
                    <span className="text-2xl font-bold text-primary-500">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    For {selectedDays} {selectedDays === 1 ? 'day' : 'days'}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleRentNow}
                  disabled={!product.available}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    product.available
                      ? 'btn-primary'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.available ? 'Rent Now' : 'Currently Not Available'}
                </button>
              </div>

              {/* Service Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 text-primary-500 mr-3" />
                  <span className="text-sm">Quality Guaranteed</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Truck className="h-5 w-5 text-primary-500 mr-3" />
                  <span className="text-sm">Free Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}