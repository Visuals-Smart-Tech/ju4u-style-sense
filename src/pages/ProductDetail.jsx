import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share, ChevronRight, Star, Minus, Plus, ShoppingBag, X } from 'lucide-react'; // Added X icon
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import FitAssistant from '@/components/FitAssistant';
import VirtualTryOn from '@/components/VirtualTryOn';
import { toast } from '@/components/ui/sonner';

// Product data (mock data for this specific product)
const productData = {
  id: '1',
  name: 'Oversized Cotton Shirt',
  price: 89.99,
  images: [
    'https://images.unsplash.com/photo-1604176424472-9e9468137614?q=80&w=1974',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972',
    'https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1974',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1776',
  ],
  category: 'women',
  description: `This versatile oversized cotton shirt combines comfort and style for any occasion. Made from premium 100% organic cotton with a relaxed fit silhouette.

Features:
• Premium brushed cotton fabric
• Relaxed, comfortable fit
• Strengthened seams for durability
• Sustainably sourced materials
• Machine washable`,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['White', 'Black', 'Blue', 'Beige'],
  brand: 'JU4U Essentials',
  inStock: true,
  featured: true,
  new: true,
  sku: 'JU4U-OS-001',
  fabric: '100% Organic Cotton',
  care: 'Machine wash cold, tumble dry low',
  rating: 4.8,
  reviewCount: 124,
  relatedProducts: [
    {
      id: '2',
      name: 'Classic Denim Jacket',
      price: 129.99,
      images: [
        'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070'
      ],
      category: 'women',
      brand: 'JU4U Denim',
      inStock: true,
    },
    {
      id: '3',
      name: 'Silk Blouse',
      price: 79.99,
      images: [
        'https://images.unsplash.com/photo-1589697547048-962940abc062?q=80&w=1974'
      ],
      category: 'women',
      brand: 'JU4U Essentials',
      inStock: true,
    },
    {
      id: '4',
      name: 'High-Waisted Trousers',
      price: 119.99,
      images: [
        'https://images.unsplash.com/photo-1548624313-0396965c11f3?q=80&w=2070'
      ],
      category: 'women',
      brand: 'JU4U Collection',
      inStock: true,
    }
  ]
};

// Reviews data
const reviewsData = [
  {
    id: 1,
    author: 'Sarah J.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'This shirt is exactly what I was looking for! The material is high quality and the fit is perfect. Will definitely be ordering in more colors.',
    verified: true,
  },
  {
    id: 2,
    author: 'Michael T.',
    rating: 4,
    date: '1 month ago',
    comment: 'Great shirt, very comfortable. I only wish it came in more colors. The sizing runs a little large, so I would recommend going down a size if you prefer a less oversized look.',
    verified: true,
  },
  {
    id: 3,
    author: 'Emma L.',
    rating: 5,
    date: '2 months ago',
    comment: 'Absolutely love this shirt! The fabric is so soft and it washes well. Perfect for casual days or can be dressed up easily.',
    verified: true,
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTryingOn, setIsTryingOn] = useState(false);
  
  // Find the actual product based on id (in a real app, you would fetch this)
  // For demo, we'll just use the sample product
  const product = productData;
  
  const handleAddToCart = () => {
    // Validate selections
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate adding to cart
    setIsAddingToCart(true);
    
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: "Added to cart!",
        description: `${product.name} (${selectedColor}, ${selectedSize}) × ${quantity}`
      });
    }, 1000);
  };
  
  const handleTryOn = () => {
    setIsTryingOn(true);
  };
  
  // For the AR try-on simulation
  const handleCameraAccess = () => {
    setTimeout(() => {
      setIsTryingOn(false);
      toast({
        title: "Camera access required",
        description: "Please allow camera access to use the AR try-on feature.",
        variant: "destructive",
      });
    }, 1500);
  };
  
  // Function to increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Function to decrease quantity
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  return (
    <div className="bg-white">
      {isTryingOn && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white p-4">
          <div className="text-center mb-8 max-w-md">
            <h3 className="text-xl font-semibold mb-2">AR Try-On</h3>
            <p className="mb-4">Point your camera at yourself to see how this item looks on you.</p>
            <Button onClick={handleCameraAccess} className="bg-ju4u-coral hover:bg-ju4u-coral/90">
              Enable Camera
            </Button>
          </div>
          
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => setIsTryingOn(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
    
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={`/catalog/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="relative rounded-lg overflow-hidden mb-4 border">
              <AspectRatio ratio={3/4} className="bg-gray-100">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </AspectRatio>
              
              {product.new && (
                <div className="absolute top-4 left-4 bg-ju4u-black text-white text-xs font-semibold px-2 py-1">
                  NEW
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`border rounded cursor-pointer overflow-hidden aspect-square 
                             ${activeImage === index ? 'ring-2 ring-ju4u-coral' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-3">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} · {product.reviewCount} reviews</span>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-xl md:text-2xl font-semibold">${product.price.toFixed(2)}</span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description.split('\n\n')[0]}</p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="size-select" className="font-medium">Size*</Label>
                <button className="text-sm text-ju4u-coral underline">Size Guide</button>
              </div>
              
              <RadioGroup 
                value={selectedSize} 
                onValueChange={setSelectedSize}
                className="grid grid-cols-5 gap-2"
                id="size-select"
              >
                {product.sizes.map(size => (
                  <div key={size} className="relative">
                    <RadioGroupItem 
                      value={size} 
                      id={`size-${size}`} 
                      className="peer sr-only" 
                    />
                    <Label 
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-center peer-data-[state=checked]:bg-ju4u-black peer-data-[state=checked]:text-white hover:bg-gray-50 peer-data-[state=checked]:hover:bg-ju4u-black"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <Label className="font-medium mb-2 block">Color*</Label>
              
              <RadioGroup 
                value={selectedColor} 
                onValueChange={setSelectedColor}
                className="flex gap-3"
              >
                {product.colors.map(color => (
                  <div key={color} className="relative">
                    <RadioGroupItem 
                      value={color} 
                      id={`color-${color}`} 
                      className="peer sr-only" 
                    />
                    <Label 
                      htmlFor={`color-${color}`}
                      className="flex flex-col items-center cursor-pointer peer-data-[state=checked]:text-ju4u-coral"
                    >
                      <div 
                        className={`h-8 w-8 rounded-full border p-1 peer-data-[state=checked]:border-ju4u-coral peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-ju4u-coral`}
                        style={{ backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                                 color.toLowerCase() === 'black' ? '#000000' : 
                                                 color.toLowerCase() === 'blue' ? '#3b82f6' : 
                                                 color.toLowerCase() === 'beige' ? '#e8d6c3' : 
                                                 color.toLowerCase() }}
                      >
                        {color.toLowerCase() === 'white' && (
                          <div className="h-full w-full rounded-full border border-gray-200"></div>
                        )}
                      </div>
                      <span className="mt-1 text-xs">{color}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <Label className="font-medium mb-2 block">Quantity</Label>
              
              <div className="flex h-11">
                <button
                  type="button"
                  className="w-11 border border-r-0 border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-50"
                  onClick={decreaseQuantity}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
                    <path d="M5 12h14"/>
                  </svg>
                </button>
                <div className="w-16 border-t border-b border-gray-300 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  type="button"
                  className="w-11 border border-l-0 border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-50"
                  onClick={increaseQuantity}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
                    <path d="M5 12h14"/>
                    <path d="M12 5v14"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button 
                className="flex-1 h-12 bg-ju4u-black hover:bg-black"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <span className="flex items-center">
                    <svg className="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-12 border-gray-300"
                onClick={handleTryOn}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 8.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.5"/>
                  <path d="M2 12h20"/>
                  <path d="M22 15.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.5"/>
                  <path d="M9.5 2v20"/>
                  <path d="M14.5 2v20"/>
                </svg>
                Try On AR
              </Button>
            </div>
            
            {/* Size Recommendation */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium mb-2">Fit Recommendation</h3>
              <p className="text-sm text-gray-600">Enter your measurements for a personalized size recommendation.</p>
              <Button variant="link" className="text-ju4u-coral p-0 h-auto mt-1 text-sm">Measure Now</Button>
            </div>
            
            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="border-t">
              <AccordionItem value="details">
                <AccordionTrigger className="py-4">Product Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm">
                    <p>{product.description.split('\n\n').slice(1).join('\n\n')}</p>
                    <div>
                      <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                      <p><span className="font-semibold">Fabric:</span> {product.fabric}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="care">
                <AccordionTrigger className="py-4">Care Instructions</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">{product.care}</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger className="py-4">Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm">
                    <p>Free standard shipping on all orders over $75. Delivery typically takes 3-5 business days.</p>
                    <p>Returns accepted within 30 days of delivery. Item must be unworn with original tags attached.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Tabs for reviews, etc. */}
        <div className="mb-16">
          <Tabs defaultValue="reviews">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ju4u-black data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base h-12"
              >
                Reviews ({reviewsData.length})
              </TabsTrigger>
              <TabsTrigger 
                value="fit" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ju4u-black data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base h-12"
              >
                Fit Guide
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="reviews" className="pt-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm">
                      {product.rating} out of 5 stars ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                {reviewsData.map(review => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span>{review.author.charAt(0)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          {review.verified && (
                            <span className="text-xs text-green-600">Verified Purchase</span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-800">{review.comment}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="text-xs h-8">Helpful</Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">Report</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="fit" className="pt-8">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Fit Guide</h3>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1623665804149-f0340a281cd5?q=80&w=1974" 
                      alt="Fit guide" 
                      className="rounded-lg mb-4"
                    />
                    <h4 className="font-medium mb-2">Regular Fit</h4>
                    <p className="text-sm text-gray-600">Our regular fit is designed to be comfortable with room for movement, without being too loose.</p>
                  </div>
                  
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1583744946564-b52d01e2da64?q=80&w=1974" 
                      alt="Fit guide" 
                      className="rounded-lg mb-4"
                    />
                    <h4 className="font-medium mb-2">Oversized Fit</h4>
                    <p className="text-sm text-gray-600">Our oversized fit is cut with extra room throughout for a relaxed, slouchy look.</p>
                  </div>
                </div>
                
                <div className="border p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Size Chart</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium py-2">Size</th>
                          <th className="text-left font-medium py-2">Chest (in)</th>
                          <th className="text-left font-medium py-2">Waist (in)</th>
                          <th className="text-left font-medium py-2">Hip (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">XS</td>
                          <td className="py-2">32-34</td>
                          <td className="py-2">26-28</td>
                          <td className="py-2">34-36</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">S</td>
                          <td className="py-2">34-36</td>
                          <td className="py-2">28-30</td>
                          <td className="py-2">36-38</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">M</td>
                          <td className="py-2">36-38</td>
                          <td className="py-2">30-32</td>
                          <td className="py-2">38-40</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">L</td>
                          <td className="py-2">38-40</td>
                          <td className="py-2">32-34</td>
                          <td className="py-2">40-42</td>
                        </tr>
                        <tr>
                          <td className="py-2">XL</td>
                          <td className="py-2">40-42</td>
                          <td className="py-2">34-36</td>
                          <td className="py-2">42-44</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.relatedProducts.map(item => (
              <Link 
                to={`/product/${item.id}`}
                key={item.id} 
                className="group product-card-hover"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <img 
                    src={item.images[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.brand}</p>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
