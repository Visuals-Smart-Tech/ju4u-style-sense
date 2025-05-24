import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

// Sample new arrivals (in real app, fetch from API or context)
const newArrivals = [
  {
    id: '1',
    name: 'Oversized Cotton Shirt',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800',
    ],
    category: 'women',
    description: 'A relaxed fit oversized cotton shirt perfect for everyday wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Blue'],
    brand: 'JU4U Essentials',
    inStock: true,
    featured: true,
    new: true,
  },
  {
    id: '4',
    name: 'Minimalist Hoodie',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800',
    ],
    category: 'men',
    description: 'A soft, minimalist hoodie for effortless layering.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Olive'],
    brand: 'JU4U Street',
    inStock: true,
    featured: false,
    new: true,
  },
  {
    id: '5',
    name: 'Pleated Midi Skirt',
    price: 79.99,
    images: [
      'https://i.pinimg.com/originals/b2/8a/b6/b28ab664841c6dcf7005dc50849788cb.jpg',
      'https://i.pinimg.com/originals/b2/8a/b6/b28ab664841c6dcf7005dc50849788cb.jpg',
    ],
    category: 'women',
    description: 'A flowy pleated midi skirt for a chic, modern look.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blush', 'Navy'],
    brand: 'JU4U Modern',
    inStock: true,
    featured: false,
    new: true,
  },
  {
    id: '6',
    name: 'Tech Runner Sneakers',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1517260911205-8ee24c7b1d82?q=80&w=800',
      'https://images.unsplash.com/photo-1517260911205-8ee24c7b1d82?q=80&w=800',
    ],
    category: 'men',
    description: 'Performance sneakers for all-day comfort and style.',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Red'],
    brand: 'JU4U Active',
    inStock: true,
    featured: false,
    new: true,
  },
];

const NewArrivals = () => {
  return (
    <section className="container mx-auto py-16 px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ju4u-coral">New Arrivals</h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-700">
        Discover the latest additions to our collection. Fresh styles, trending looks, and exclusive drops—curated just for you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {newArrivals.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link to="/catalog" className="text-ju4u-coral underline hover:text-ju4u-coral/80 transition">Shop All Products</Link>
      </div>
    </section>
  );
};

export default NewArrivals;
