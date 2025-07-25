import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Phone, Mail, Download } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateEndDate = (startDate, days) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + days - 1);
    return end.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-secondary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We'll contact you soon to schedule delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Order ID</span>
                  <p className="font-semibold text-gray-900">#{order.id}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Order Date</span>
                  <p className="font-semibold text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Payment ID</span>
                  <p className="font-semibold text-gray-900">
                    {order.payment.paymentId}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <span className="inline-flex px-3 py-1 text-sm font-medium bg-accent-100 text-accent-700 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Information
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {order.product.name}
                  </h3>
                  <p className="text-gray-600">₹{order.product.price}/day</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-semibold text-gray-900">
                    {order.rental.days} {order.rental.days === 1 ? 'day' : 'days'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Start Date</span>
                  <p className="font-semibold text-gray-900">
                    {formatDate(order.rental.startDate)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">End Date</span>
                  <p className="font-semibold text-gray-900">
                    {calculateEndDate(order.rental.startDate, order.rental.days)}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.customer.name}</p>
                    <p className="text-gray-600">Customer</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.customer.phone}</p>
                    <p className="text-gray-600">Phone Number</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.customer.email}</p>
                    <p className="text-gray-600">Email Address</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.customer.address}</p>
                    <p className="text-gray-600">Delivery Address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{order.rental.totalPrice}</span>
                </div>
                <div className="flex justify-between text-secondary-600">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Paid</span>
                    <span className="text-primary-500">₹{order.rental.totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center text-secondary-700">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Payment Successful</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What's Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Confirmation Call</p>
                    <p className="text-sm text-gray-600">We'll call you within 2 hours to confirm your order</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Delivery Scheduled</p>
                    <p className="text-sm text-gray-600">We'll schedule delivery as per your preferred date</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Enjoy Your Rental</p>
                    <p className="text-sm text-gray-600">Use the product and we'll pick it up after rental period</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full btn-outline flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                Download Receipt
              </button>
              <Link to="/products" className="block w-full btn-primary text-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}