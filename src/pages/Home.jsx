import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Shield, Truck, CreditCard, Clock, Star } from 'lucide-react';

export default function Home() {
  const { products } = useApp();
  const featuredProducts = products.slice(0, 3);

  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products are thoroughly tested and maintained'
    },
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery and pickup within city limits'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Safe and secure online payment options'
    },
    {
      icon: Clock,
      title: 'Flexible Duration',
      description: 'Rent for as long as you need, minimum 1 day'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent service! The AC was delivered on time and worked perfectly.'
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Great quality furniture at affordable prices. Highly recommended!'
    },
    {
      name: 'Anita Patel',
      rating: 5,
      comment: 'Easy booking process and professional delivery team.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Rent Quality
                <span className="text-accent-500"> Furniture </span>
                & Appliances
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Get the items you need without the commitment. 
                From air conditioners to furniture, we have everything for your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn-secondary inline-flex items-center justify-center">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#features"
                  className="btn-outline inline-flex items-center justify-center border-white text-white hover:bg-white hover:text-primary-500"
                >
                  Learn More
                </a>
              </div>
            </div>
            
            <div className="relative animate-bounce-gentle">
              <img
                src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern furniture"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Products Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RentEasy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make renting easy, affordable, and convenient for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular rental items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products" className="btn-primary inline-flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Browse our collection and find the perfect items for your needs
          </p>
          <Link to="/products" className="btn-secondary inline-flex items-center text-lg px-8 py-4">
            Start Browsing
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}