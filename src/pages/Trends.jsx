import React from 'react';

const Trends = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Latest Trends</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Stay updated with the latest fashion trends and styles curated just for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Example trend cards */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=400&auto=format&fit=crop"
            alt="Trend 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Bold Colors</h2>
            <p className="text-gray-600 text-sm">
              Bright and vibrant colors are making a statement this season.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1635205383325-aa3e6fb5ba55?q=80&w=400&auto=format&fit=crop"
            alt="Trend 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Sustainable Fashion</h2>
            <p className="text-gray-600 text-sm">
              Eco-friendly materials and ethical practices are in focus.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=400&auto=format&fit=crop"
            alt="Trend 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Retro Revival</h2>
            <p className="text-gray-600 text-sm">
              Nostalgic styles from the past are making a comeback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
