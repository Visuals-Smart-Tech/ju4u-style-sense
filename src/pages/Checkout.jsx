
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Truck } from 'lucide-react'; // Import the required icon

const Checkout = () => {
  const [step, setStep] = useState('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: true
  });
  
  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  // Shipping method state
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Cart items (mock data)
  const cartItems = [
    {
      id: '1',
      name: 'Oversized Cotton Shirt',
      price: 89.99,
      images: ['https://images.unsplash.com/photo-1604176424472-9e9468137614?q=80&w=1974'],
      selectedSize: 'M',
      selectedColor: 'White',
      quantity: 1,
      brand: 'JU4U Essentials',
    },
    {
      id: '3',
      name: 'Leather Crossbody Bag',
      price: 149.99,
      images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057'],
      selectedColor: 'Black',
      quantity: 1,
      brand: 'JU4U Accessories',
    }
  ];
  
  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 14.99 : 4.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateShippingForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'
    ];
    
    for (const field of requiredFields) {
      if (!shippingInfo[field]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          variant: "destructive",
        });
        return false;
      }
    }
    
    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(shippingInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const validatePaymentForm = () => {
    // Basic validation for demo purposes
    if (!paymentInfo.cardNumber || !paymentInfo.nameOnCard || !paymentInfo.expiryDate || !paymentInfo.cvv) {
      toast({
        title: "Missing Payment Information",
        description: "Please fill in all payment details.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleContinueToPayment = (e) => {
    e.preventDefault();
    
    if (validateShippingForm()) {
      setStep('payment');
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate random order ID
      const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000).toString();
      setOrderId(newOrderId);
      
      setIsProcessing(false);
      setOrderComplete(true);
      
      toast({
        title: "Order Placed!",
        description: `Your order #${newOrderId} has been successfully placed.`,
      });
      
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Thank You For Your Order!</h1>
              <p className="text-gray-600 mt-2">
                Your order has been placed and is being processed.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-md p-6 mb-6">
              <div className="flex justify-between mb-3">
                <span className="font-semibold">Order Number:</span>
                <span>{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="border-b pb-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex">
                      <span className="text-gray-700">{item.quantity}x</span>
                      <span className="ml-2">{item.name}</span>
                      {item.selectedSize && <span className="ml-2 text-gray-500">Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span className="ml-2 text-gray-500">Color: {item.selectedColor}</span>}
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-3 font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Link to="/">
                <Button variant="outline" className="mr-4">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/order-tracking">
                <Button>
                  Track Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <div className="flex justify-center items-center mt-6">
            <div className={`flex items-center ${step === 'shipping' ? 'text-ju4u-coral' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'shipping' ? 'border-ju4u-coral' : 'border-gray-300'}`}>
                <span className="text-sm">1</span>
              </div>
              <span className="ml-2">Shipping</span>
            </div>
            <div className="w-12 h-0.5 mx-2 bg-gray-200"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-ju4u-coral' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'payment' ? 'border-ju4u-coral' : 'border-gray-300'}`}>
                <span className="text-sm">2</span>
              </div>
              <span className="ml-2">Payment</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping/Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {step === 'shipping' && (
                <form onSubmit={handleContinueToPayment}>
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName" className="mb-1 block">First Name*</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-1 block">Last Name*</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="email" className="mb-1 block">Email*</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-1 block">Phone*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address" className="mb-1 block">Address*</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="apartment" className="mb-1 block">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      value={shippingInfo.apartment}
                      onChange={handleShippingInfoChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city" className="mb-1 block">City*</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="mb-1 block">State/Province*</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="mb-1 block">ZIP/Postal Code*</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="country" className="mb-1 block">Country*</Label>
                    <select
                      id="country"
                      name="country"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      <Checkbox
                        id="saveInfo"
                        checked={shippingInfo.saveInfo}
                        onCheckedChange={(checked) => 
                          setShippingInfo(prev => ({ ...prev, saveInfo: checked === true }))
                        }
                      />
                      <label htmlFor="saveInfo" className="ml-2 text-sm">
                        Save this information for faster checkout next time
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center">
                          <RadioGroupItem id="standard" value="standard" className="mr-3" />
                          <div>
                            <Label htmlFor="standard" className="font-medium">Standard Shipping</Label>
                            <p className="text-sm text-gray-500">3-5 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$4.99</span>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center">
                          <RadioGroupItem id="express" value="express" className="mr-3" />
                          <div>
                            <Label htmlFor="express" className="font-medium">Express Shipping</Label>
                            <p className="text-sm text-gray-500">1-2 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$14.99</span>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="mt-8 text-right">
                    <Button type="submit">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}
              
              {step === 'payment' && (
                <form onSubmit={handlePlaceOrder}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                    <button
                      type="button"
                      className="text-sm text-ju4u-coral"
                      onClick={() => setStep('shipping')}
                    >
                      Edit Shipping
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="cardNumber" className="mb-1 block">Card Number*</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="nameOnCard" className="mb-1 block">Name on Card*</Label>
                    <Input
                      id="nameOnCard"
                      name="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="expiryDate" className="mb-1 block">Expiry Date*</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM / YY"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="mb-1 block">CVV*</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center">
                      <Checkbox
                        id="saveCard"
                        checked={paymentInfo.saveCard}
                        onCheckedChange={(checked) =>
                          setPaymentInfo(prev => ({ ...prev, saveCard: checked === true }))
                        }
                      />
                      <label htmlFor="saveCard" className="ml-2 text-sm">
                        Save this card for future purchases
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-right">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                        {item.selectedSize && <span className="ml-2">Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span className="ml-2">Color: {item.selectedColor}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
