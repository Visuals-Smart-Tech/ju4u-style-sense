import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Your privacy is important to us. Learn how we handle your data.
      </p>
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
          <p className="text-gray-600 text-sm">
            We collect personal data to provide better services. This includes your name, email, and purchase history.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Data Usage</h2>
          <p className="text-gray-600 text-sm">
            Your data is used to improve your shopping experience, process orders, and send updates.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Data Protection</h2>
          <p className="text-gray-600 text-sm">
            We implement strict security measures to protect your data from unauthorized access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
