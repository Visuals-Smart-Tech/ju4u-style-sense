import React from 'react';

const Cookies = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Cookie Policy</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Learn how we use cookies to enhance your browsing experience.
      </p>
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">What Are Cookies?</h2>
          <p className="text-gray-600 text-sm">
            Cookies are small text files stored on your device to improve website functionality and user experience.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">How We Use Cookies</h2>
          <p className="text-gray-600 text-sm">
            We use cookies to remember your preferences, analyze site traffic, and provide personalized content.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Managing Cookies</h2>
          <p className="text-gray-600 text-sm">
            You can manage or disable cookies through your browser settings. However, this may affect site functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
