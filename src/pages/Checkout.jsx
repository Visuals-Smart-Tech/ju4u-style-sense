import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ChevronRight, 
  X, 
  Calendar, 
  CreditCardIcon, 
  UserCheck, 
  ShoppingBag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

// Sample cart data (would typically come from context or state management)
const sampleCartItems = [
  {
    id: '1',
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1604176424472-9e9468137614?q=80&w=1974'],
    category: 'women',
    description: 'A relaxed fit oversized cotton shirt perfect for everyday wear.',
    brand: 'JU4U Essentials',
    inStock: true,
    quantity: 1,
    selectedSize: 'M',
    selectedColor: 'White'
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    price: 149.99,
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057'],
    category: 'accessories',
    description: 'A versatile leather crossbody bag with adjustable strap.',
    brand: 'JU4U Accessories',
    inStock: true,
    quantity: 1,
    selectedColor: 'Black'
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    email: '',
    saveInfo: false
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expDate: '',
    cvv: '',
    saveCard: false
  });
  
  // Calculate totals
  const subtotal = sampleCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax rate for demo
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    for (const [key, value] of Object.entries(shippingInfo)) {
      if (key === 'apartment' || key === 'saveInfo') continue;
      if (!value) {
        toast.error(`Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    // Proceed to payment step
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation for payment info
    for (const [key, value] of Object.entries(paymentInfo)) {
      if (key === 'saveCard') continue;
      if (!value) {
        toast.error(`Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId('JU4U-' + Math.floor(1000000 + Math.random() * 9000000));
      setCurrentStep('confirmation');
      window.scrollTo(0, 0);
      toast.success('Payment successful!');
    }, 2000);
  };

  const formatCardNumber = (value) => {
    if (!value) return value;
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    if (v.length <= 16) {
      // Group in sets of 4 digits
      return v.replace(/(\d{4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/, (_, p1, p2, p3, p4) => {
        let result = p1;
        if (p2) result += ' ' + p2;
        if (p3) result += ' ' + p3;
        if (p4) result += ' ' + p4;
        return result;
      });
    }
    return value;
  };

  const formatExpDate = (value) => {
    if (!value) return value;
    const v = value.replace(/\D/g, '');
    if (v.length <= 4) {
      return v.replace(/(\d{2})(\d{1,2})?/, (_, p1, p2) => {
        if (p2) return `${p1}/${p2}`;
        return p1;
      });
    }
    return value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setPaymentInfo({ ...paymentInfo, cardNumber: formattedValue });
  };

  const handleExpDateChange = (e) => {
    const formattedValue = formatExpDate(e.target.value);
    setPaymentInfo({ ...paymentInfo, expDate: formattedValue });
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'shipping', label: 'Shipping' },
      { id: 'payment', label: 'Payment' },
      { id: 'confirmation', label: 'Confirmation' }
    ];
    
    return (
      <div className="flex justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === step.id 
                  ? 'bg-ju4u-coral text-white' 
                  : steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}>
                {steps.findIndex(s => s.id === currentStep) > index ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="w-16 h-1 bg-gray-200 self-center mx-2">
                <div className={`h-full ${
                  steps.findIndex(s => s.id === currentStep) > index
                    ? 'bg-green-500'
                    : 'bg-gray-200'
                }`} 
                style={{ 
                  width: currentStep === step.id 
                    ? '50%' 
                    : steps.findIndex(s => s.id === currentStep) > index
                      ? '100%'
                      : '0%' 
                }}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Shipping form
  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={shippingInfo.email}
              onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              placeholder="example@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              placeholder="(555) 555-5555"
              required
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 mt-6">Shipping Address</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={shippingInfo.firstName}
              onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={shippingInfo.lastName}
              onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input
            type="text"
            id="address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
            Apartment, Suite, etc. (optional)
          </label>
          <input
            type="text"
            id="apartment"
            value={shippingInfo.apartment}
            onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              id="city"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
            <input
              type="text"
              id="state"
              value={shippingInfo.state}
              onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
            <input
              type="text"
              id="zipCode"
              value={shippingInfo.zipCode}
              onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            id="country"
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
        </div>
        
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="saveInfo"
            checked={shippingInfo.saveInfo}
            onChange={(e) => setShippingInfo({ ...shippingInfo, saveInfo: e.target.checked })}
            className="h-4 w-4 text-ju4u-coral focus:ring-ju4u-coral border-gray-300 rounded"
          />
          <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
            Save this information for next time
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-ju4u-coral hover:bg-ju4u-coral/90 flex items-center"
        >
          Continue to Payment
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </form>
  );

  // Payment form
  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment Information</h2>
          <div className="flex items-center text-xs text-gray-600">
            <Lock className="h-3 w-3 mr-1" />
            Secure Payment
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-gray-100 rounded px-3 py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
          </div>
          <div className="bg-gray-100 rounded px-3 py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          </div>
          <div className="bg-gray-100 rounded px-3 py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
          <div className="bg-gray-100 rounded px-3 py-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6" />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CreditCardIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
          <input
            type="text"
            id="cardName"
            value={paymentInfo.cardName}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
            placeholder="John Smith"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
            <div className="relative">
              <input
                type="text"
                id="expDate"
                value={paymentInfo.expDate}
                onChange={handleExpDateChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
                placeholder="MM/YY"
                maxLength={5}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">Security Code (CVV)</label>
            <input
              type="text"
              id="cvv"
              value={paymentInfo.cvv}
              onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-ju4u-coral focus:border-ju4u-coral"
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="saveCard"
            checked={paymentInfo.saveCard}
            onChange={(e) => setPaymentInfo({ ...paymentInfo, saveCard: e.target.checked })}
            className="h-4 w-4 text-ju4u-coral focus:ring-ju4u-coral border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
            Save card for future purchases
          </label>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
        
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="sameAsShipping"
            name="billingOption"
            className="h-4 w-4 text-ju4u-coral focus:ring-ju4u-coral border-gray-300"
            defaultChecked
          />
          <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-700">
            Same as shipping address
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="radio"
            id="differentBilling"
            name="billingOption"
            className="h-4 w-4 text-ju4u-coral focus:ring-ju4u-coral border-gray-300"
          />
          <label htmlFor="differentBilling" className="ml-2 block text-sm text-gray-700">
            Use different billing address
          </label>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button"
          variant="outline"
          className="flex items-center"
          onClick={() => setCurrentStep('shipping')}
        >
          <X className="mr-1 h-4 w-4" />
          Back to Shipping
        </Button>
        <Button 
          type="submit" 
          className="bg-ju4u-coral hover:bg-ju4u-coral/90 flex items-center"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>Processing...</>
          ) : (
            <>
              Complete Order
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );

  // Order confirmation
  const renderConfirmation = () => (
    <div className="text-center">
      <div className="bg-white p-8 rounded-lg shadow-sm border mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-semibold">{orderId}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <Button 
                variant="outline"
                className="text-xs"
                onClick={() => navigate(`/order-tracking`)}
              >
                Track Order
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-left border-t pt-4">
          <h3 className="font-semibold mb-2">Order Details</h3>
          
          <div className="space-y-4 mb-4">
            {sampleCartItems.map(item => (
              <div key={item.id} className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-3 flex flex-1 flex-col text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                    {item.selectedSize && item.selectedColor && ', '}
                    {item.selectedColor && `Color: ${item.selectedColor}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Shipping</p>
              <p>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold mt-2 pt-2 border-t">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Button 
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => navigate('/order-tracking')}
        >
          <Truck className="mr-2 h-4 w-4" />
          Track Your Order
        </Button>
        <Button 
          className="bg-ju4u-black hover:bg-black flex items-center justify-center"
          onClick={() => navigate('/')}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>
      
      {renderStepIndicator()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {currentStep === 'shipping' && renderShippingForm()}
          {currentStep === 'payment' && renderPaymentForm()}
          {currentStep === 'confirmation' && renderConfirmation()}
        </div>
        
        {/* Order summary */}
        {currentStep !== 'confirmation' && (
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b">Order Summary</h2>
              
              <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                {sampleCartItems.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-3 flex flex-1 flex-col">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ', '}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Shipping</p>
                  <p>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</p>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <p className="text-gray-600">Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
              
              {currentStep === 'payment' && (
                <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Payments are secure and encrypted</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
