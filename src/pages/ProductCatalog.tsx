
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Product, ProductCategory } from '@/types';
import { ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// Sample product data
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
    description: 'A relaxed fit oversized cotton shirt perfect for everyday wear.',
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
    description: 'A timeless denim jacket that goes with everything in your wardrobe.',
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
    description: 'A versatile leather crossbody bag with adjustable strap.',
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
    description: 'Elegant high-waisted trousers for a sophisticated look.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Beige'],
    brand: 'JU4U Collection',
    inStock: true,
    discount: 15
  },
  {
    id: '5',
    name: 'Cashmere Sweater',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964'
    ],
    category: 'women',
    description: 'Luxurious cashmere sweater for ultimate comfort and warmth.',
    sizes: ['S', 'M', 'L'],
    colors: ['Cream', 'Gray', 'Black'],
    brand: 'JU4U Luxury',
    inStock: true,
    new: true
  },
  {
    id: '6',
    name: 'Slim Fit Chinos',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1974'
    ],
    category: 'men',
    description: 'Classic slim fit chinos for a polished casual look.',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Olive'],
    brand: 'JU4U Men',
    inStock: true,
    discount: 20
  },
  {
    id: '7',
    name: 'Canvas Sneakers',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974'
    ],
    category: 'shoes',
    description: 'Comfortable canvas sneakers for everyday wear.',
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: ['White', 'Black', 'Red'],
    brand: 'JU4U Footwear',
    inStock: true
  },
  {
    id: '8',
    name: 'Gold Hoop Earrings',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1974',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1974'
    ],
    category: 'jewelry',
    description: 'Classic gold hoop earrings to elevate any outfit.',
    colors: ['Gold'],
    brand: 'JU4U Jewelry',
    inStock: true,
    featured: true
  }
];

const ProductCatalog = () => {
  // We're now using the updated ProductCategory type that includes 'all', 'new', and 'sale'
  const { category } = useParams<{ category?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 300],
    sizes: [] as string[],
    colors: [] as string[],
    brands: [] as string[],
    inStock: false,
    onSale: false
  });
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Get all unique options for filters
  const allSizes = Array.from(new Set(allProducts.flatMap(p => p.sizes || [])));
  const allColors = Array.from(new Set(allProducts.flatMap(p => p.colors || [])));
  const allBrands = Array.from(new Set(allProducts.map(p => p.brand)));

  useEffect(() => {
    // Filter products based on category
    let filtered = [...allProducts];
    
    if (category && category !== 'all') {
      if (category === 'sale') {
        filtered = allProducts.filter(p => p.discount && p.discount > 0);
      } else if (category === 'new') {
        filtered = allProducts.filter(p => p.new);
      } else {
        filtered = filtered.filter(p => p.category === category);
      }
    }
    
    // Apply filters
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    if (filters.onSale) {
      filtered = filtered.filter(p => p.discount && p.discount > 0);
    }
    
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes && filters.sizes.some(s => p.sizes!.includes(s)));
    }
    
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => p.colors && filters.colors.some(c => p.colors!.includes(c)));
    }
    
    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => filters.brands.includes(p.brand));
    }
    
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && 
      p.price <= filters.priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (a.new === b.new) ? 0 : a.new ? -1 : 1);
        break;
      case 'bestseller':
        filtered.sort((a, b) => (a.bestseller === b.bestseller) ? 0 : a.bestseller ? -1 : 1);
        break;
      default:
        break;
    }
    
    setProducts(filtered);
  }, [category, filters, sortBy]);

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 300],
      sizes: [],
      colors: [],
      brands: [],
      inStock: false,
      onSale: false
    });
  };
  
  const getCategoryTitle = () => {
    if (!category || category === 'all') return "All Products";
    if (category === 'sale') return "Sale Items";
    if (category === 'new') return "New Arrivals";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{getCategoryTitle()}</h1>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="bestseller">Bestsellers</option>
            </select>
          </div>
        </div>
        
        {/* Filter Sidebar - Desktop Always Visible, Mobile Conditional */}
        <aside className={`w-full md:w-64 md:flex-shrink-0 ${isFilterMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
                  Reset All
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsFilterMenuOpen(false)} 
                  className="md:hidden"
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center justify-between">
                Price Range
              </h3>
              <div className="px-1">
                <Slider
                  defaultValue={filters.priceRange}
                  min={0}
                  max={300}
                  step={5}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            {/* Size Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      filters.sizes.includes(size) 
                        ? 'bg-ju4u-black text-white border-ju4u-black' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {allColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      filters.colors.includes(color) 
                        ? 'bg-ju4u-black text-white border-ju4u-black' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Brands</h3>
              {allBrands.map(brand => (
                <div key={brand} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="mr-2"
                  />
                  <label htmlFor={brand} className="text-sm cursor-pointer">{brand}</label>
                </div>
              ))}
            </div>
            
            {/* Availability Filters */}
            <div className="mb-4">
              <h3 className="font-medium mb-3">Availability</h3>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={filters.inStock}
                  onChange={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
                  className="mr-2"
                />
                <label htmlFor="inStock" className="text-sm cursor-pointer">In Stock Only</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="onSale"
                  checked={filters.onSale}
                  onChange={() => setFilters(prev => ({ ...prev, onSale: !prev.onSale }))}
                  className="mr-2"
                />
                <label htmlFor="onSale" className="text-sm cursor-pointer">On Sale</label>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Product Grid and Sort Controls */}
        <div className="flex-1">
          {/* Desktop Sort Controls */}
          <div className="hidden md:flex justify-end mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-3 py-1.5"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestseller">Bestsellers</option>
              </select>
            </div>
          </div>
          
          {/* Products */}
          {products.length > 0 ? (
            <div className="product-container">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search for something else.</p>
              <Button onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
