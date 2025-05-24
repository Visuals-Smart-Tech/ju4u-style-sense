import React from 'react';

const Bestsellers = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Bestsellers</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Explore our most popular products loved by our customers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Example bestseller cards */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=400&auto=format&fit=crop"
            alt="Bestseller 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Product Name 1</h2>
            <p className="text-gray-600 text-sm">
              A brief description of the product goes here.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1635205383325-aa3e6fb5ba55?q=80&w=400&auto=format&fit=crop"
            alt="Bestseller 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Product Name 2</h2>
            <p className="text-gray-600 text-sm">
              A brief description of the product goes here.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=400&auto=format&fit=crop"
            alt="Bestseller 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Product Name 3</h2>
            <p className="text-gray-600 text-sm">
              A brief description of the product goes here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
