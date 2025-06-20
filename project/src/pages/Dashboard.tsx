import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Clock, 
  Package, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  Edit3,
  Plus,
  Truck,
  CheckCircle,
  Star,
  Calendar
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [showAddAddress, setShowAddAddress] = useState(false);

  const user = {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    memberSince: 'March 2023',
    totalOrders: 15,
    totalSaved: 1250
  };

  const orders = [
    {
      id: 'LP001',
      service: 'Premium Laundry Hub',
      items: ['3kg Wash & Fold', '2 Dry Clean'],
      status: 'delivered',
      amount: 325,
      date: '2024-01-15',
      pickupDate: '2024-01-12',
      deliveryDate: '2024-01-15',
      rating: 5
    },
    {
      id: 'LP002',
      service: 'Express Clean Co.',
      items: ['5kg Wash & Fold', '1 Steam Iron'],
      status: 'in-progress',
      amount: 210,
      date: '2024-01-18',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-20'
    },
    {
      id: 'LP003',
      service: 'Royal Dry Cleaners',
      items: ['2 Suit Cleaning'],
      status: 'picked-up',
      amount: 400,
      date: '2024-01-20',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-22'
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Koramangala 5th Block',
      city: 'Bangalore',
      pincode: '560034',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Whitefield',
      city: 'Bangalore',
      pincode: '560066',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'picked-up': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-progress': return 'In Progress';
      case 'picked-up': return 'Picked Up';
      default: return status;
    }
  };

  const tabs = [
    { id: 'orders', name: 'My Orders', icon: Package },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-xs mt-1">Member since {user.memberSince}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{user.totalOrders}</div>
                  <div className="text-gray-600 text-sm">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{user.totalSaved}</div>
                  <div className="text-gray-600 text-sm">Money Saved</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                  <div className="flex space-x-2">
                    <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Orders</option>
                      <option>In Progress</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-gray-600">{order.service}</p>
                          <p className="text-gray-500 text-sm">
                            {order.items.join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">₹{order.amount}</div>
                          <div className="text-gray-500 text-sm">{order.date}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Pickup</div>
                            <div className="text-sm text-gray-500">{order.pickupDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">Delivery</div>
                            <div className="text-sm text-gray-500">{order.deliveryDate}</div>
                          </div>
                        </div>
                        {order.rating && (
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">Rating</div>
                              <div className="text-sm text-gray-500">{order.rating}/5</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between">
                        <button className="text-blue-600 font-semibold hover:text-blue-700">
                          View Details
                        </button>
                        {order.status === 'delivered' && !order.rating && (
                          <button className="bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                            Rate Order
                          </button>
                        )}
                        {order.status === 'in-progress' && (
                          <button className="border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                            Track Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center space-x-6 mb-8">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">LaundryPro Member</p>
                      <button className="text-blue-600 font-semibold hover:text-blue-700 mt-2">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={user.phone}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <button className="bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="font-semibold text-gray-900">{address.type}</span>
                          {address.isDefault && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-gray-700 mb-4">
                        <p>{address.address}</p>
                        <p>{address.city} - {address.pincode}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!address.isDefault && (
                          <button className="text-blue-600 font-semibold hover:text-blue-700 text-sm">
                            Set as Default
                          </button>
                        )}
                        <button className="text-red-600 font-semibold hover:text-red-700 text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                        <p className="text-gray-600 text-sm">Receive order updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                        <p className="text-gray-600 text-sm">Receive order updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                        <p className="text-gray-600 text-sm">Receive app notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="pt-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Account Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full text-left py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                          Change Password
                        </button>
                        <button className="w-full text-left py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                          Download My Data
                        </button>
                        <button className="w-full text-left py-3 px-4 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;