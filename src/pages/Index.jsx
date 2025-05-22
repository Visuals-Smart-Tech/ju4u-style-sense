
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <main className="font-rubik">
      <Hero />
      
      {/* Categories Section with improved design */}
      <section className="section-padding bg-ju4u-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-ju4u-coral font-medium uppercase tracking-wider text-sm block mb-2">Browse</span>
              <h2 className="text-3xl md:text-4xl font-bold">Shop By Category</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link to="/catalog/women" className="relative overflow-hidden group rounded-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=1974" 
                  alt="Women's Fashion"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="w-full">
                  <h3 className="text-white font-semibold text-lg">Women</h3>
                  <div className="w-8 h-0.5 bg-ju4u-coral mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </Link>
            
            <Link to="/catalog/men" className="relative overflow-hidden group rounded-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516575869513-3f418f8902ca?q=80&w=1972" 
                  alt="Men's Fashion"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="w-full">
                  <h3 className="text-white font-semibold text-lg">Men</h3>
                  <div className="w-8 h-0.5 bg-ju4u-coral mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </Link>
            
            <Link to="/catalog/accessories" className="relative overflow-hidden group rounded-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=1974" 
                  alt="Accessories"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="w-full">
                  <h3 className="text-white font-semibold text-lg">Accessories</h3>
                  <div className="w-8 h-0.5 bg-ju4u-coral mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </Link>
            
            <Link to="/catalog/sale" className="relative overflow-hidden group rounded-lg">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2015" 
                  alt="Sale"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                <div className="w-full">
                  <h3 className="text-white font-semibold text-lg">Sale</h3>
                  <div className="w-8 h-0.5 bg-ju4u-coral mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      {/* Brand Promise Section with improved design */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 group">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-ju4u-gray rounded-full mb-4 group-hover:bg-ju4u-coral/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ju4u-coral">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Style</h3>
              <p className="text-gray-600">Handpicked collections tailored just for your personal style and preferences.</p>
            </div>
            
            <div className="text-center p-6 group">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-ju4u-gray rounded-full mb-4 group-hover:bg-ju4u-coral/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ju4u-coral">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                  <path d="M12 12v9"></path>
                  <path d="m8 17 4 4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free express shipping on orders over $100 and easy returns.</p>
            </div>
            
            <div className="text-center p-6 group">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-ju4u-gray rounded-full mb-4 group-hover:bg-ju4u-coral/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ju4u-coral">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Encrypted transactions and buyer protection on all purchases.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Banner with improved design */}
      <section className="py-16 bg-ju4u-black text-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <span className="text-ju4u-coral font-medium uppercase tracking-wider mb-2 block">Just Landed</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">New Season Arrivals</h2>
              <p className="text-gray-300 mb-8 max-w-md">
                Check out our latest collection of seasonal styles. Refresh your wardrobe with our contemporary essentials.
              </p>
              <Link to="/catalog/new">
                <Button className="bg-ju4u-coral hover:bg-[#ff5757] group">
                  Shop New Arrivals
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 transform md:translate-x-6">
              <img 
                src="https://images.unsplash.com/photo-1596993100471-c3905dbd31b6?q=80&w=1974" 
                alt="New Season Collection"
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              {/* Decorative element */}
              <div className="hidden md:block absolute -bottom-4 -left-4 w-24 h-24 border-2 border-ju4u-coral/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Feed Section with improved design */}
      <section className="py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-ju4u-coral font-medium uppercase tracking-wider text-sm block mb-2">Social</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Follow Our Style</h2>
            <p className="text-gray-600">@JU4U_fashion on Instagram</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <div className="aspect-square overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920" 
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920" 
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1920" 
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1920" 
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1920" 
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1920" 
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-ju4u-black hover:text-ju4u-coral transition-colors gap-1 font-medium">
              Follow Us on Instagram
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
