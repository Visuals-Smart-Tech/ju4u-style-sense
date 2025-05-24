import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        Have questions or need assistance? We're here to help.
      </p>
      <form className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-ju4u-coral focus:border-ju4u-coral sm:text-sm"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-ju4u-coral focus:border-ju4u-coral sm:text-sm"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-ju4u-coral focus:border-ju4u-coral sm:text-sm"
            placeholder="Your Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-ju4u-coral text-white py-2 px-4 rounded hover:bg-ju4u-coral-dark"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
