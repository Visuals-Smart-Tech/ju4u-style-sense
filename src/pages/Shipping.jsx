import React from 'react';

const Shipping = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Shipping Information</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Learn more about our shipping policies and options.
      </p>
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Domestic Shipping</h2>
          <p className="text-gray-600 text-sm">
            We offer free shipping on all domestic orders over $50. Standard shipping takes 3-5 business days.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">International Shipping</h2>
          <p className="text-gray-600 text-sm">
            International shipping is available to select countries. Delivery times and fees vary by location.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Expedited Shipping</h2>
          <p className="text-gray-600 text-sm">
            Need your order faster? Choose expedited shipping at checkout for delivery within 1-2 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
