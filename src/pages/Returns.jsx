import React from 'react';

const Returns = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Returns & Refunds</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Learn about our hassle-free returns and refund policies.
      </p>
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Return Policy</h2>
          <p className="text-gray-600 text-sm">
            Items can be returned within 30 days of receipt for a full refund, provided they are unused and in their original packaging.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">How to Initiate a Return</h2>
          <p className="text-gray-600 text-sm">
            To start a return, log in to your account, go to "Order History," and select the item you wish to return.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Refund Process</h2>
          <p className="text-gray-600 text-sm">
            Refunds are processed within 5-7 business days after we receive your returned item.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Returns;
