import React from 'react';

const Essentials = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Wardrobe Essentials</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Discover must-have wardrobe essentials that never go out of style.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Example essential cards */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=400&auto=format&fit=crop"
            alt="Essential 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Classic White Shirt</h2>
            <p className="text-gray-600 text-sm">
              A timeless piece that pairs with anything.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1635205383325-aa3e6fb5ba55?q=80&w=400&auto=format&fit=crop"
            alt="Essential 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Denim Jeans</h2>
            <p className="text-gray-600 text-sm">
              The perfect fit for casual and semi-formal looks.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=400&auto=format&fit=crop"
            alt="Essential 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Black Blazer</h2>
            <p className="text-gray-600 text-sm">
              Elevate your style with this versatile essential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essentials;
