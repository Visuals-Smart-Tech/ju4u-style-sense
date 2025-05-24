import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Please read our terms and conditions carefully before using our services.
      </p>
      <div className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
          <p className="text-gray-600 text-sm">
            By accessing or using our platform, you agree to be bound by these terms and conditions.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">User Responsibilities</h2>
          <p className="text-gray-600 text-sm">
            Users are responsible for maintaining the confidentiality of their account information.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p className="text-gray-600 text-sm">
            We are not liable for any damages arising from the use of our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
