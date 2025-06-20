import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', count: 24 },
    { id: 'orders', name: 'Orders & Booking', count: 8 },
    { id: 'pricing', name: 'Pricing & Payment', count: 6 },
    { id: 'delivery', name: 'Pickup & Delivery', count: 5 },
    { id: 'quality', name: 'Quality & Care', count: 5 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'You can place an order through our website or mobile app. Simply select your location, choose your services, pick a time slot, and confirm your booking. We\'ll send you a confirmation with all the details.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'Can I cancel or reschedule my order?',
      answer: 'Yes, you can cancel or reschedule your order up to 2 hours before the scheduled pickup time. You can do this through your account dashboard or by calling our customer support.'
    },
    {
      id: 3,
      category: 'orders',
      question: 'What if I\'m not available during pickup/delivery?',
      answer: 'If you\'re not available, our delivery partner will try to contact you. You can also leave specific instructions or arrange for someone else to hand over/receive your clothes.'
    },
    {
      id: 4,
      category: 'pricing',
      question: 'How is pricing calculated?',
      answer: 'Our pricing is transparent and based on the type of service and quantity. Wash & Fold is charged per kg, while Dry Cleaning and Steam Iron are charged per piece. You can see the exact pricing before confirming your order.'
    },
    {
      id: 5,
      category: 'pricing',
      question: 'Are there any hidden charges?',
      answer: 'No, we believe in transparent pricing. The price you see during booking is the final price. Pickup and delivery are completely free of charge.'
    },
    {
      id: 6,
      category: 'pricing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. You can also pay cash on delivery.'
    },
    {
      id: 7,
      category: 'delivery',
      question: 'What are your pickup and delivery timings?',
      answer: 'We offer flexible pickup and delivery slots from 7:00 AM to 10:00 PM, Monday to Sunday. You can choose a 2-hour slot that works best for you.'
    },
    {
      id: 8,
      category: 'delivery',
      question: 'How long does it take to process my order?',
      answer: 'Standard orders are delivered within 24-48 hours. We also offer express service (12-24 hours) for urgent requirements at a slight additional cost.'
    },
    {
      id: 9,
      category: 'delivery',
      question: 'Do you provide pickup and delivery bags?',
      answer: 'Yes, our delivery partners carry eco-friendly bags for collecting and delivering your clothes. You don\'t need to arrange anything from your side.'
    },
    {
      id: 10,
      category: 'quality',
      question: 'What if my clothes get damaged?',
      answer: 'We take full responsibility for any damage caused during our service. All orders are insured, and we provide 100% compensation for any proven damage.'
    },
    {
      id: 11,
      category: 'quality',
      question: 'Do you handle delicate fabrics?',
      answer: 'Yes, we have specialized processes for delicate fabrics like silk, wool, cashmere, and designer garments. We follow care label instructions and use appropriate cleaning methods.'
    },
    {
      id: 12,
      category: 'quality',
      question: 'What detergents and chemicals do you use?',
      answer: 'We use premium, eco-friendly detergents and cleaning agents that are gentle on fabrics and safe for skin. We also offer hypoallergenic cleaning options for sensitive skin.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our laundry services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Questions
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search FAQs..."
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Still need help?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-2">
                  <a
                    href="/contact"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact Support</span>
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center justify-center space-x-1 py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Call</span>
                    </a>
                    <a
                      href="mailto:support@laundrypro.com"
                      className="flex items-center justify-center space-x-1 py-2 px-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredFaqs.length} of {faqs.length} questions
                  {selectedCategory !== 'all' && (
                    <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
                  )}
                </p>
              </div>

              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search or browse through different categories
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View All Questions
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        {openItems.includes(faq.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get instant help from our support team
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Speak directly with our experts
                </p>
                <a
                  href="tel:+919876543210"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors block"
                >
                  Call Now
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Send us your questions anytime
                </p>
                <a
                  href="mailto:support@laundrypro.com"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-purple-700 transition-colors block"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;