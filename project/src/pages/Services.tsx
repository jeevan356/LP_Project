import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Truck, 
  Award,
  Heart,
} from 'lucide-react';

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [] = useState(false);

  const cities = ['All Cities', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'];
  const serviceTypes = ['All Services', 'Wash & Fold', 'Dry Cleaning', 'Steam Iron', 'Shoe Cleaning'];

  const services = [
    {
      id: 1,
      name: 'Premium Laundry Hub',
      location: 'Koramangala, Bangalore',
      rating: 4.8,
      reviews: 2340,
      deliveryTime: '24 hours',
      services: ['Wash & Fold', 'Dry Cleaning', 'Steam Iron'],
      price: 99,
      image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      badge: 'Top Rated',
      express: true,
      verified: true,
      offer: '20% OFF First Order'
    },
    {
      id: 2,
      name: 'Express Clean Co.',
      location: 'Bandra, Mumbai',
      rating: 4.7,
      reviews: 1890,
      deliveryTime: '12 hours',
      services: ['Express Wash', 'Dry Cleaning', 'Alterations'],
      price: 129,
      image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      badge: 'Express',
      express: true,
      verified: true,
      offer: 'Free Pickup & Delivery'
    },
    {
      id: 3,
      name: 'Royal Dry Cleaners',
      location: 'Connaught Place, Delhi',
      rating: 4.9,
      reviews: 3200,
      deliveryTime: '48 hours',
      services: ['Premium Dry Cleaning', 'Suit Cleaning', 'Curtain Cleaning'],
      price: 199,
      image: 'https://images.pexels.com/photos/5591665/pexels-photo-5591665.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      badge: 'Premium',
      express: false,
      verified: true,
      offer: '₹100 OFF on orders above ₹500'
    },
    {
      id: 4,
      name: 'Quick Wash Station',
      location: 'Anna Nagar, Chennai',
      rating: 4.6,
      reviews: 1567,
      deliveryTime: '24 hours',
      services: ['Wash & Fold', 'Steam Iron', 'Shoe Cleaning'],
      price: 89,
      image: 'https://images.pexels.com/photos/5591667/pexels-photo-5591667.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      badge: 'Budget Friendly',
      express: false,
      verified: true,
      offer: 'Buy 2 Get 1 Free'
    },
    {
      id: 5,
      name: 'Eco Fresh Laundry',
      location: 'Jubilee Hills, Hyderabad',
      rating: 4.8,
      reviews: 2100,
      deliveryTime: '36 hours',
      services: ['Eco-Friendly Wash', 'Organic Dry Clean', 'Baby Clothes'],
      price: 149,
      image: 'https://images.pexels.com/photos/5591668/pexels-photo-5591668.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      badge: 'Eco-Friendly',
      express: false,
      verified: true,
      offer: '15% OFF on Eco Services'
    },
    {
      id: 6,
      name: 'Sparkle Clean Services',
      location: 'Viman Nagar, Pune',
      rating: 4.5,
      reviews: 987,
      deliveryTime: '24 hours',
      services: ['Premium Iron', 'Wash & Fold', 'Leather Cleaning'],
      price: 119,
      image: 'https://images.pexels.com/photos/5591669/pexels-photo-5591669.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      badge: 'New',
      express: true,
      verified: false,
      offer: '30% OFF Grand Opening'
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || selectedCity === 'All Cities' || 
                       service.location.includes(selectedCity);
    const matchesService = !selectedService || selectedService === 'All Services' ||
                          service.services.some(s => s.includes(selectedService));
    
    return matchesSearch && matchesCity && matchesService;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price - b.price;
      case 'delivery':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Laundry Services Near You
          </h1>
          <p className="text-xl text-gray-600">
            Choose from {services.length} verified laundry partners in your city
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="delivery">Sort by Delivery Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedServices.length} of {services.length} results
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                {service.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    service.badge === 'Top Rated' ? 'bg-gold text-white' :
                    service.badge === 'Express' ? 'bg-green-500 text-white' :
                    service.badge === 'Premium' ? 'bg-purple-500 text-white' :
                    service.badge === 'Budget Friendly' ? 'bg-blue-500 text-white' :
                    service.badge === 'Eco-Friendly' ? 'bg-green-600 text-white' :
                    'bg-orange-500 text-white'
                  }`}>
                    {service.badge}
                  </span>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {service.location}
                    </div>
                  </div>
                  {service.verified && (
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Verified
                    </div>
                  )}
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{service.rating}</span>
                    <span className="ml-1 text-gray-600 text-sm">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.deliveryTime}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {service.services.map((serviceType, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {serviceType}
                      </span>
                    ))}
                  </div>
                </div>

                {service.offer && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-green-700 font-semibold text-sm">🎉 {service.offer}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">₹{service.price}</span>
                    <span className="text-gray-600 ml-1">starting from</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {service.express && (
                      <div className="flex items-center bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        <Truck className="w-3 h-3 mr-1" />
                        Express
                      </div>
                    )}
                    <Link
                      to={`/service/${service.id}`}
                      className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedServices.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('');
                setSelectedService('');
              }}
              className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {sortedServices.length > 0 && (
          <div className="text-center py-12">
            <button className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
              Load More Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;