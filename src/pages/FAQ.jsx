import React from 'react';

const FAQ = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Find answers to the most common questions about our platform.
      </p>
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">What is your return policy?</h2>
          <p className="text-gray-600 text-sm">
            We offer a 30-day return policy for all unused items in their original packaging.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">How can I track my order?</h2>
          <p className="text-gray-600 text-sm">
            You can track your order by logging into your account and visiting the "Order Tracking" section.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Do you offer international shipping?</h2>
          <p className="text-gray-600 text-sm">
            Yes, we ship to select countries. Shipping fees and times vary by location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
