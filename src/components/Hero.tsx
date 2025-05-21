
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] md:h-[85vh] bg-ju4u-gray overflow-hidden">
      <div className="container max-w-7xl mx-auto h-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8 py-12 md:py-0 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Elevate Your <span className="text-ju4u-coral">Style</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-8 max-w-lg animate-slide-up">
            Discover curated fashion that's just for you. Unique pieces that define your personal style and stand out from the crowd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link to="/catalog/women">
              <Button className="btn-primary w-full sm:w-auto">Shop Women</Button>
            </Link>
            <Link to="/catalog/men">
              <Button className="btn-outline w-full sm:w-auto">Shop Men</Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative h-[40vh] md:h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-ju4u-gray to-transparent md:hidden z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972')] bg-cover bg-center"></div>
          <div className="absolute bottom-0 right-0 left-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span className="h-2 w-8 rounded-full bg-ju4u-coral"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300"></span>
      </div>
    </section>
  );
};

export default Hero;
