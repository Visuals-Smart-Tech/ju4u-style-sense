
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share, ChevronRight, Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { toast } from '@/components/ui/sonner';

// Sample product data (same as catalog for demo purposes)
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1604176424472-9e9468137614?q=80&w=1974',
      'https://images.unsplash.com/photo-1604176424472-9e9468137614?q=80&w=1974'
    ],
    category: 'women',
    description: 'A relaxed fit oversized cotton shirt perfect for everyday wear. Made from premium 100% organic cotton for ultimate comfort and breathability. Features a classic collar, button-down front, and long sleeves with button cuffs. The oversized silhouette provides a fashionable, laid-back look that pairs perfectly with jeans, leggings, or tucked into skirts.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blue'],
    brand: 'JU4U Essentials',
    inStock: true,
    featured: true,
    new: true
  },
  {
    id: '2',
    name: 'Classic Denim Jacket',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070'
    ],
    category: 'men',
    description: 'A timeless denim jacket that goes with everything in your wardrobe. This versatile piece features a classic button-up front, chest pockets, and adjustable button cuffs. Made from premium denim with just the right amount of stretch for comfort. Perfect for layering in any season.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black'],
    brand: 'JU4U Denim',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057'
    ],
    category: 'accessories',
    description: 'A versatile leather crossbody bag with adjustable strap. Crafted from genuine leather with a smooth finish, this bag features a secure zip closure, interior pockets for organization, and an adjustable shoulder strap. The perfect size for your essentials, it seamlessly transitions from day to night.',
    colors: ['Black', 'Brown', 'Tan'],
    brand: 'JU4U Accessories',
    inStock: true,
    featured: true,
    bestseller: true
  },
  {
    id: '4',
    name: 'High-Waisted Trousers',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1548624313-0396965c11f3?q=80&w=2070',
      'https://images.unsplash.com/photo-1548624313-0396965c11f3?q=80&w=2070'
    ],
    category: 'women',
    description: 'Elegant high-waisted trousers for a sophisticated look. These tailored trousers feature a flattering high waist, side pockets, and a relaxed straight leg. Made from a premium blend with a hint of stretch for comfort and movement. Perfect for office wear or dressed up for special occasions.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Beige'],
    brand: 'JU4U Collection',
    inStock: true,
    discount: 15
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Find the product by id
    const foundProduct = allProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Reset state when product changes
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
      setActiveImage(0);
      
      // Find related products (same category)
      const related = allProducts
        .filter(p => p.id !== id && p.category === foundProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/catalog">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Validation
    let errorMessage = "";
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      errorMessage = "Please select a size";
    } else if (product.colors && product.colors.length > 0 && !selectedColor) {
      errorMessage = "Please select a color";
    }
    
    if (errorMessage) {
      toast(errorMessage, {
        description: "You need to make all selections before adding to cart",
      });
      return;
    }
    
    // Add to cart logic would go here
    toast.success("Added to cart!", {
      description: `${product.name} x ${quantity}`,
    });
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast.success("Added to wishlist!");
    } else {
      toast("Removed from wishlist");
    }
  };

  const handleShare = () => {
    // Share logic would go here
    toast("Share link copied to clipboard");
  };

  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-8 text-gray-500">
        <Link to="/" className="hover:text-ju4u-coral">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/catalog" className="hover:text-ju4u-coral">Shop</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to={`/catalog/${product.category}`} className="hover:text-ju4u-coral capitalize">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="truncate max-w-[200px]">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden bg-gray-50 rounded-lg">
            <img 
              src={product.images[activeImage]} 
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Image thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 flex-shrink-0 border-2 rounded ${
                    activeImage === idx ? 'border-ju4u-coral' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">{product.brand}</p>
            <div className="flex items-center">
              <button 
                onClick={toggleFavorite}
                className={`p-2 mr-2 rounded-full hover:bg-gray-100 ${isFavorited ? 'text-ju4u-coral' : 'text-gray-600'}`}
                aria-label="Add to wishlist"
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-ju4u-coral' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                aria-label="Share product"
              >
                <Share className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm ml-2 text-gray-600">4.0 (24 reviews)</span>
          </div>
          
          <div className="mb-6">
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">${discountedPrice.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="ml-2 bg-ju4u-coral text-white text-sm px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color: {selectedColor || 'Select a color'}</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color 
                        ? 'border-ju4u-coral bg-ju4u-coral/10' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Size: {selectedSize || 'Select a size'}</h3>
                <button className="text-sm text-ju4u-coral underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md ${
                      selectedSize === size 
                        ? 'border-ju4u-coral bg-ju4u-coral/10' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button 
                onClick={decreaseQuantity} 
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button 
                onClick={increaseQuantity} 
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={handleAddToCart} 
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-6"
              disabled={!product.inStock}
            >
              <ShoppingBag className="h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button 
              className="btn-outline flex-1 py-6"
              onClick={toggleFavorite}
            >
              {isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
          
          {/* Product Meta */}
          <div className="border-t border-gray-200 pt-4 text-sm space-y-2 text-gray-600">
            <p><span className="font-medium">SKU:</span> {product.id.padStart(8, '0')}</p>
            <p><span className="font-medium">Category:</span> <Link to={`/catalog/${product.category}`} className="hover:text-ju4u-coral capitalize">{product.category}</Link></p>
            <p><span className="font-medium">Tags:</span> Fashion, {product.category}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
          <div className="product-container">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
