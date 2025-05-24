import React from 'react';

const Inspiration = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Get Inspired</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Discover the latest trends, styling tips, and curated collections to elevate your wardrobe.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Example inspiration cards */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=400&auto=format&fit=crop"
            alt="Inspiration 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Trendsetting Styles</h2>
            <p className="text-gray-600 text-sm">
              Explore bold and modern looks that make a statement.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1635205383325-aa3e6fb5ba55?q=80&w=400&auto=format&fit=crop"
            alt="Inspiration 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Effortless Elegance</h2>
            <p className="text-gray-600 text-sm">
              Discover timeless pieces for every occasion.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=400&auto=format&fit=crop"
            alt="Inspiration 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Seasonal Must-Haves</h2>
            <p className="text-gray-600 text-sm">
              Stay ahead with our curated seasonal picks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;