import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

// Sample cart items
const initialCartItems = [
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

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.15 : 0; // 15% discount when promo applied
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed from cart",
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const applyPromoCode = async () => {
    setIsApplyingPromo(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (promoCode === 'JU4U15') {
      setPromoApplied(true);
      toast({
        title: "Promo code applied!",
        description: "You got 15% off",
      });
    } else {
      toast({
        title: "Invalid promo code",
        variant: "destructive",
      });
      setPromoApplied(false);
    }
    
    setIsApplyingPromo(false);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-10 w-10 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/catalog">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b">Items in Your Cart</h2>
              
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="ml-4">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ', '}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="font-medium text-ju4u-coral hover:text-ju4u-coral/80"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            type="button"
                            className="font-medium text-ju4u-coral hover:text-ju4u-coral/80"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-ju4u-coral hover:text-ju4u-coral/80"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <Link
                  to="/catalog"
                  className="text-ju4u-coral hover:text-ju4u-coral/80 flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
              <h2 className="text-lg font-semibold mb-6 pb-4 border-b">Order Summary</h2>
              
              <div className="mb-4">
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
                  Promo Code
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                      type="text"
                      name="promoCode"
                      id="promoCode"
                      className="block w-full rounded-none rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-ju4u-coral focus:border-ju4u-coral sm:text-sm"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-ju4u-coral focus:outline-none focus:ring-1 focus:ring-ju4u-coral"
                    onClick={applyPromoCode}
                    disabled={isApplyingPromo}
                  >
                    {isApplyingPromo ? (
                      <>Applying...</>
                    ) : (
                      <>Apply</>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <p>Discount (15%)</p>
                    <p>- ${discount.toFixed(2)}</p>
                  </div>
                )}
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
              
              <div className="mt-6">
                <Button 
                  className="w-full justify-center"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
