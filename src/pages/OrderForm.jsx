import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Phone, MapPin, Calendar, DollarSign, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitOrder } = useApp();
  
  const { product, days, totalPrice } = location.state || {};
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    startDate: '',
    paymentMethod: 'razorpay'
  });

  const [loading, setLoading] = useState(false);

  if (!product) {
    navigate('/products');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const requiredFields = ['customerName', 'phone', 'email', 'address', 'city', 'pincode', 'startDate'];
    
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate pincode
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }

    // Validate start date
    const selectedDate = new Date(formData.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Start date cannot be in the past');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (formData.paymentMethod === 'razorpay') {
      return new Promise((resolve) => {
        // Simulate Razorpay payment
        const options = {
          key: 'rzp_test_demo', // Test key
          amount: totalPrice * 100, // Amount in paise
          currency: 'INR',
          name: 'RentEasy',
          description: `Rental of ${product.name}`,
          handler: function (response) {
            toast.success('Payment successful!');
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id || 'demo_payment_' + Date.now()
            });
          },
          prefill: {
            name: formData.customerName,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: '#3B82F6'
          }
        };

        // Simulate Razorpay modal
        setTimeout(() => {
          const confirmed = window.confirm(
            `Razorpay Payment Gateway\n\nAmount: ₹${totalPrice}\nProduct: ${product.name}\n\nClick OK to simulate successful payment`
          );
          
          if (confirmed) {
            options.handler({ razorpay_payment_id: 'demo_payment_' + Date.now() });
          } else {
            toast.error('Payment cancelled');
            resolve({ success: false });
          }
        }, 500);
      });
    }
    
    // For other payment methods, simulate success
    return { success: true, paymentId: 'demo_payment_' + Date.now() };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Process payment
      const paymentResult = await handlePayment();
      
      if (!paymentResult.success) {
        setLoading(false);
        return;
      }

      // Create order
      const orderData = {
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price
        },
        customer: {
          name: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.pincode}`
        },
        rental: {
          days: days,
          startDate: formData.startDate,
          totalPrice: totalPrice
        },
        payment: {
          method: formData.paymentMethod,
          paymentId: paymentResult.paymentId,
          status: 'completed'
        }
      };

      const order = submitOrder(orderData);
      
      toast.success('Order placed successfully!');
      navigate('/order/confirmation', { state: { order } });
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Order submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-500 text-white p-6">
            <h1 className="text-2xl font-bold">Complete Your Order</h1>
            <p className="text-primary-100 mt-2">
              Fill in your details to rent {product.name}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-primary-500" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="10-digit mobile number"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                    Delivery Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="input-field"
                        placeholder="Enter your complete address"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Enter city"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="6-digit pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rental Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary-500" />
                    Rental Details
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-primary-500" />
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={formData.paymentMethod === 'razorpay'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Razorpay (Recommended)</div>
                        <div className="text-sm text-gray-500">Secure online payment</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {loading ? 'Processing...' : `Pay ₹${totalPrice} & Place Order`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">₹{product.price}/day</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>{days} {days === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rate per day:</span>
                    <span>₹{product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-secondary-600">
                    <span>Delivery:</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-primary-500">₹{totalPrice}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  * Security deposit may be required upon delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}