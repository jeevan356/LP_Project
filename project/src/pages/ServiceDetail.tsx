import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Shield, 
  Award, 
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  Minus,
  CheckCircle
} from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock data - in real app, fetch based on ID
  const service = {
    id: parseInt(id || '1'),
    name: 'Premium Laundry Hub',
    location: 'Koramangala, Bangalore',
    fullAddress: '123 Main Street, Koramangala 5th Block, Bangalore - 560034',
    rating: 4.8,
    reviews: 2340,
    deliveryTime: '24 hours',
    phone: '+91 98765 43210',
    description: 'Premium laundry services with eco-friendly cleaning solutions. We specialize in garment care with state-of-the-art equipment and experienced professionals.',
    images: [
      'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/5591665/pexels-photo-5591665.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/5591667/pexels-photo-5591667.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    ],
    badge: 'Top Rated',
    express: true,
    verified: true,
    offer: '20% OFF First Order',
    workingHours: 'Mon-Sun: 7:00 AM - 10:00 PM',
    features: [
      'Free Pickup & Delivery',
      'Eco-friendly cleaning',
      '24-hour express service',
      'Stain removal guarantee',
      'SMS & app notifications',
      'Insurance coverage'
    ],
    services: [
      { name: 'Wash & Fold', price: 25, unit: 'per kg', description: 'Regular washing and folding service' },
      { name: 'Dry Cleaning', price: 150, unit: 'per piece', description: 'Professional dry cleaning for delicate garments' },
      { name: 'Steam Iron', price: 15, unit: 'per piece', description: 'Professional steam ironing service' },
      { name: 'Stain Removal', price: 50, unit: 'per piece', description: 'Specialized stain removal treatment' },
      { name: 'Shoe Cleaning', price: 199, unit: 'per pair', description: 'Deep cleaning for all types of footwear' },
      { name: 'Curtain Cleaning', price: 300, unit: 'per panel', description: 'Gentle cleaning for home furnishings' }
    ]
  };

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent service! My clothes came back perfectly cleaned and folded. The pickup and delivery was right on time.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      helpful: 12
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      rating: 5,
      date: '1 week ago',
      comment: 'Very professional service. They handled my expensive suits with great care. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      helpful: 8
    },
    {
      id: 3,
      name: 'Anjali Patel',
      rating: 4,
      date: '2 weeks ago',
      comment: 'Good service overall. The only issue was a slight delay in delivery, but they compensated with a discount.',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      helpful: 5
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rating: 5,
      date: '3 weeks ago',
      comment: 'Amazing stain removal! They got out a wine stain that I thought was permanent.',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      helpful: 15
    }
  ];

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const updateQuantity = (serviceName: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceName]: Math.max(0, (prev[serviceName] || 0) + change)
    }));
  };

  const getTotalAmount = () => {
    return service.services.reduce((total, service) => {
      const quantity = quantities[service.name] || 0;
      return total + (service.price * quantity);
    }, 0);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link
              to="/services"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Services</span>
            </Link>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={service.images[selectedImage]}
                  alt={service.name}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === selectedImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 p-4 overflow-x-auto">
                {service.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === selectedImage ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{service.location}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{service.fullAddress}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {service.badge && (
                    <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {service.badge}
                    </span>
                  )}
                  {service.verified && (
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      <Award className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
                  <span className="text-2xl font-bold">{service.rating}</span>
                  <span className="text-gray-600 ml-2">({service.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Delivery in {service.deliveryTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{service.phone}</span>
                </div>
              </div>

              {service.offer && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
                  <p className="text-green-700 font-semibold">🎉 {service.offer}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-600">
                  <strong>Working Hours:</strong> {service.workingHours}
                </p>
              </div>
            </div>

            {/* Services & Pricing */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Services & Pricing</h3>
              <div className="space-y-4">
                {service.services.map((serviceItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{serviceItem.name}</h4>
                      <p className="text-gray-600 text-sm">{serviceItem.description}</p>
                      <p className="text-blue-600 font-semibold">₹{serviceItem.price} {serviceItem.unit}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(serviceItem.name, -1)}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-8 text-center">
                        {quantities[serviceItem.name] || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(serviceItem.name, 1)}
                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-gray-600 ml-1">({service.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <button className="text-blue-600 text-sm hover:text-blue-700">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {reviews.length > 2 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    {showAllReviews ? 'Show Less' : `View All ${reviews.length} Reviews`}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book Service</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {getTotalAmount() > 0 && (
                <div className="border-t pt-4 mb-6">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">₹{getTotalAmount()}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Link
                  to="/cart"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center block"
                >
                  Add to Cart
                </Link>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                  Call Now
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">100% Safe & Secure</span>
                </div>
                <p className="text-gray-600 text-sm">Your clothes are insured and handled with care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;