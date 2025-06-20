import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  Clock,
  Gift,
  Tag,
  Shield,
  CreditCard,
  Truck
} from 'lucide-react';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      serviceName: 'Premium Laundry Hub',
      location: 'Koramangala, Bangalore',
      service: 'Wash & Fold',
      quantity: 3,
      price: 25,
      unit: 'per kg',
      image: 'https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    },
    {
      id: 2,
      serviceName: 'Premium Laundry Hub',
      location: 'Koramangala, Bangalore',
      service: 'Dry Cleaning',
      quantity: 2,
      price: 150,
      unit: 'per piece',
      image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [pickupDetails, setPickupDetails] = useState({
    address: '123 Main Street, Koramangala',
    date: '',
    time: ''
  });

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const promoCodes = [
    { code: 'SUMMER75', discount: 25, description: '25% off on first order' },
    { code: 'SAVE100', discount: 100, description: '₹100 off on orders above ₹500' },
    { code: 'NEWUSER', discount: 30, description: '30% off for new users' }
  ];

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    if (promo) {
      setAppliedPromo(promoCode.toUpperCase());
      setPromoCode('');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo('');
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscount = () => {
    if (!appliedPromo) return 0;
    const promo = promoCodes.find(p => p.code === appliedPromo);
    if (!promo) return 0;
    
    const subtotal = getSubtotal();
    if (promo.code === 'SAVE100') {
      return subtotal >= 500 ? 100 : 0;
    }
    return Math.round(subtotal * (promo.discount / 100));
  };

  const getDeliveryFee = () => {
    return getSubtotal() >= 299 ? 0 : 49;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getDeliveryFee();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some laundry services to get started</p>
            <Link
              to="/services"
              className="inline-flex items-center bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pickup Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pickup Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={pickupDetails.address}
                      onChange={(e) => setPickupDetails({...pickupDetails, address: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pickup address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={pickupDetails.date}
                        onChange={(e) => setPickupDetails({...pickupDetails, date: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <select
                        value={pickupDetails.time}
                        onChange={(e) => setPickupDetails({...pickupDetails, time: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.service}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.service}</h4>
                      <p className="text-gray-600 text-sm">{item.serviceName}</p>
                      <p className="text-gray-500 text-sm">{item.location}</p>
                      <p className="text-blue-600 font-semibold">₹{item.price} {item.unit}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Codes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Promo Codes</h3>
              
              <div className="flex space-x-2 mb-4">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter promo code"
                  />
                </div>
                <button
                  onClick={applyPromoCode}
                  className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Gift className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-semibold">{appliedPromo} Applied!</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    You saved ₹{getDiscount()}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Available Offers:</p>
                {promoCodes.map((promo) => (
                  <div key={promo.code} className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <span className="font-semibold text-blue-600">{promo.code}</span> - {promo.description}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{getSubtotal()}</span>
                </div>
                
                {getDiscount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo})</span>
                    <span>-₹{getDiscount()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={`font-semibold ${getDeliveryFee() === 0 ? 'text-green-600' : ''}`}>
                    {getDeliveryFee() === 0 ? 'FREE' : `₹${getDeliveryFee()}`}
                  </span>
                </div>
                
                {getDeliveryFee() > 0 && (
                  <p className="text-xs text-gray-500">
                    Free delivery on orders above ₹299
                  </p>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{getTotal()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  Proceed to Checkout
                </button>
                <Link
                  to="/services"
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-center block"
                >
                  Add More Items
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span>100% Safe & Secure Payment</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Pickup & Delivery</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Multiple Payment Options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;