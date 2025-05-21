
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample featured products data
const featuredProducts: Product[] = [
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
    featured: true,
    discount: 15
  }
];

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title = "Featured Products",
  subtitle = "Handpicked for your unique style"
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-gray-600 max-w-lg mx-auto">{subtitle}</p>
        </div>
        
        <div className="product-container">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button className="btn-outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
