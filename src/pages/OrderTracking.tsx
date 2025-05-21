
import React, { useState } from 'react';
import { Package, Check, Truck, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

// Sample order data
const sampleOrder = {
  id: 'JU4U-1234567',
  customer: {
    name: 'John Doe',
    email: 'john.doe@example.com'
  },
  items: [
    {
      id: '1',
      name: 'Oversized Cotton Shirt',
      price: 89.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1604176424472-9e9468137614?q=80&w=1974'
    },
    {
      id: '3',
      name: 'Leather Crossbody Bag',
      price: 149.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057'
    }
  ],
  status: 'shipped',
  timeline: [
    {
      status: 'ordered',
      date: '2023-05-15T14:24:00Z',
      message: 'Order confirmed'
    },
    {
      status: 'processing',
      date: '2023-05-16T09:15:00Z',
      message: 'Order processing'
    },
    {
      status: 'packed',
      date: '2023-05-17T11:30:00Z',
      message: 'Order packed'
    },
    {
      status: 'shipped',
      date: '2023-05-18T13:45:00Z',
      message: 'Shipped with Express Delivery'
    }
  ],
  shipping: {
    carrier: 'Express Delivery',
    trackingNumber: 'EXP123456789',
    estimatedDelivery: '2023-05-21'
  },
  total: 239.98,
  shipping_cost: 0,
  tax: 19.20
};

const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<typeof sampleOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (orderId.toLowerCase() === 'ju4u-1234567' || orderId.toLowerCase() === '1234567') {
        setOrder(sampleOrder);
        toast.success('Order found!');
      } else {
        setOrder(null);
        setError('No order found with the provided details. Please check your order ID and email address.');
        toast.error('Order not found');
      }
      setLoading(false);
    }, 1500);
  };
  
  const getStepStatus = (step: string) => {
    const statusIndex = {
      ordered: 0,
      processing: 1,
      packed: 2,
      shipped: 3,
      delivered: 4
    };
    
    if (!order) return 'upcoming';
    
    const currentStatusIndex = statusIndex[order.status as keyof typeof statusIndex];
    const stepIndex = statusIndex[step as keyof typeof statusIndex];
    
    if (stepIndex < currentStatusIndex) return 'completed';
    if (stepIndex === currentStatusIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Track Your Order</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your order number and email address to track the status of your order.
        </p>
      </div>
      
      {/* Order tracking form */}
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm border p-6 mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., JU4U-1234567"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="The email used for your order"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="w-full bg-ju4u-black hover:bg-black" 
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Track Order'}
            </Button>
          </div>
          
          {/* Testing instructions - can be removed in production */}
          <div className="text-xs text-gray-500 text-center mt-2">
            For demo purposes, use Order ID: JU4U-1234567 with any email
          </div>
        </form>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="max-w-3xl mx-auto mb-10 bg-red-50 border border-red-100 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Order Not Found</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-1 text-sm text-red-700">
                    If you need assistance, please contact our customer service at support@ju4u.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Order details */}
      {order && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Order header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Order #{order.id}</h2>
                  <p className="text-gray-600 text-sm">Placed for {order.customer.name}</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {order.status === 'ordered' && 'Order Confirmed'}
                    {order.status === 'processing' && 'Processing'}
                    {order.status === 'packed' && 'Packed'}
                    {order.status === 'shipped' && 'Shipped'}
                    {order.status === 'delivered' && 'Delivered'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Order timeline */}
            <div className="px-6 py-6 border-b">
              <h3 className="font-semibold mb-5">Order Progress</h3>
              <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                <div className="flex flex-col md:flex-row w-full">
                  {/* Order confirmed */}
                  <div className="flex-1 flex md:flex-col items-center mb-4 md:mb-0">
                    <div className={`rounded-full p-3 ${
                      getStepStatus('ordered') === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : getStepStatus('ordered') === 'current' 
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Check className="h-6 w-6" />
                    </div>
                    <div className="ml-3 md:ml-0 md:text-center md:mt-2">
                      <p className="font-medium text-sm">Order Confirmed</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.timeline[0].date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Horizontal line */}
                  <div className="hidden md:block w-full h-0.5 bg-gray-100 self-center flex-1"></div>
                  
                  {/* Processing */}
                  <div className="flex-1 flex md:flex-col items-center mb-4 md:mb-0">
                    <div className={`rounded-full p-3 ${
                      getStepStatus('processing') === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : getStepStatus('processing') === 'current' 
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="ml-3 md:ml-0 md:text-center md:mt-2">
                      <p className="font-medium text-sm">Processing</p>
                      <p className="text-xs text-gray-500">
                        {order.timeline.length > 1 && new Date(order.timeline[1].date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Horizontal line */}
                  <div className="hidden md:block w-full h-0.5 bg-gray-100 self-center flex-1"></div>
                  
                  {/* Packed */}
                  <div className="flex-1 flex md:flex-col items-center mb-4 md:mb-0">
                    <div className={`rounded-full p-3 ${
                      getStepStatus('packed') === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : getStepStatus('packed') === 'current' 
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="ml-3 md:ml-0 md:text-center md:mt-2">
                      <p className="font-medium text-sm">Packed</p>
                      <p className="text-xs text-gray-500">
                        {order.timeline.length > 2 && new Date(order.timeline[2].date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Horizontal line */}
                  <div className="hidden md:block w-full h-0.5 bg-gray-100 self-center flex-1"></div>
                  
                  {/* Shipped */}
                  <div className="flex-1 flex md:flex-col items-center mb-4 md:mb-0">
                    <div className={`rounded-full p-3 ${
                      getStepStatus('shipped') === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : getStepStatus('shipped') === 'current' 
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Truck className="h-6 w-6" />
                    </div>
                    <div className="ml-3 md:ml-0 md:text-center md:mt-2">
                      <p className="font-medium text-sm">Shipped</p>
                      <p className="text-xs text-gray-500">
                        {order.timeline.length > 3 && new Date(order.timeline[3].date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Horizontal line */}
                  <div className="hidden md:block w-full h-0.5 bg-gray-100 self-center flex-1"></div>
                  
                  {/* Delivered */}
                  <div className="flex-1 flex md:flex-col items-center">
                    <div className={`rounded-full p-3 ${
                      getStepStatus('delivered') === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : getStepStatus('delivered') === 'current' 
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Home className="h-6 w-6" />
                    </div>
                    <div className="ml-3 md:ml-0 md:text-center md:mt-2">
                      <p className="font-medium text-sm">Delivered</p>
                      <p className="text-xs text-gray-500">
                        {order.status === 'delivered' 
                          ? (order.timeline.length > 4 && new Date(order.timeline[4].date).toLocaleDateString())
                          : 'Estimated: ' + new Date(order.shipping.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Current status details */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Latest Update</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        {order.status === 'ordered' && 'Your order has been confirmed and is being prepared for processing.'}
                        {order.status === 'processing' && 'Your order is currently being processed and prepared for shipping.'}
                        {order.status === 'packed' && 'Your order has been packed and is waiting to be shipped.'}
                        {order.status === 'shipped' && `Your order has been shipped with ${order.shipping.carrier}. Tracking number: ${order.shipping.trackingNumber}`}
                        {order.status === 'delivered' && 'Your order has been delivered. Enjoy your purchase!'}
                      </p>
                    </div>
                    {order.status === 'shipped' && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          Track With Carrier
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order items */}
            <div className="px-6 py-6 border-b">
              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order summary */}
            <div className="px-6 py-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="flow-root">
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">
                      {order.shipping_cost > 0 ? `$${order.shipping_cost.toFixed(2)}` : 'Free'}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <p className="text-gray-600">Tax</p>
                    <p className="font-medium">${order.tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <p>Total</p>
                    <p>${(order.total + order.shipping_cost + order.tax).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
