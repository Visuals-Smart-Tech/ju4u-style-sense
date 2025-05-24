import React from 'react';

const Careers = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Careers</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Join our team and help us shape the future of fashion and e-commerce.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Example job postings */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Frontend Developer</h2>
            <p className="text-gray-600 text-sm mb-4">
              Build and optimize user interfaces for our e-commerce platform.
            </p>
            <button className="bg-ju4u-coral text-white py-2 px-4 rounded hover:bg-ju4u-coral-dark">
              Apply Now
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Marketing Specialist</h2>
            <p className="text-gray-600 text-sm mb-4">
              Develop and execute marketing strategies to grow our brand.
            </p>
            <button className="bg-ju4u-coral text-white py-2 px-4 rounded hover:bg-ju4u-coral-dark">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
