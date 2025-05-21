
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Story</h1>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-lg text-gray-600 mb-6">
            JU4U was created with a simple mission: to provide personalized fashion 
            that's tailored to your unique style and preferences.
          </p>
          <p className="text-lg text-gray-600">
            We believe that fashion should be as individual as you are. That's why we're
            committed to curating collections that speak to diverse tastes, body types,
            and occasions.
          </p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070"
            alt="JU4U Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="text-white p-8">
              <p className="text-xl font-semibold">Founded in 2024</p>
              <p className="opacity-80">From a small startup to a growing fashion community</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission */}
      <section className="mb-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-4">
            At JU4U, we envision a world where fashion is not just about following trends, but about expressing 
            your unique identity. We strive to create a platform where everyone can discover their 
            personal style and feel confident in their fashion choices.
          </p>
          <p className="text-gray-700">
            We're building a future where technology enhances the shopping experience, making it 
            more personalized, sustainable, and enjoyable for every customer.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to revolutionize online fashion retail by combining cutting-edge technology 
            with thoughtfully curated collections.
          </p>
          <p className="text-gray-700">
            We're dedicated to providing exceptional quality, personalized service, and an intuitive
            shopping experience that makes finding your perfect style both easy and exciting.
          </p>
        </div>
      </section>
      
      {/* What Sets Us Apart */}
      <section className="mb-20 bg-ju4u-gray p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">What Sets Us Apart</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-ju4u-black rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
            <p className="text-gray-600">
              Our AI-powered recommendation engine learns your preferences to suggest items 
              that match your unique style and taste.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-ju4u-coral rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Collections</h3>
            <p className="text-gray-600">
              Each piece is hand-selected by our fashion experts to ensure quality, 
              style, and versatility for every occasion.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-ju4u-black rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              We partner with reputable brands and manufacturers who share our commitment 
              to quality materials and ethical production.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-ju4u-coral rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <path d="M14 2v6h6"></path>
                <path d="m16 13-3.5 3.5-2-2L8 17"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability Focus</h3>
            <p className="text-gray-600">
              We're committed to reducing fashion's environmental footprint through 
              eco-friendly packaging and sustainable sourcing practices.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-ju4u-black rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 9 6 6"></path>
                <path d="m15 9-6 6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Hassle-Free Returns</h3>
            <p className="text-gray-600">
              Shop with confidence knowing that our 30-day return policy ensures 
              you'll love everything you purchase.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974"
                alt="CEO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Alex Morgan</h3>
            <p className="text-gray-600 mb-3">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              Fashion industry veteran with over 15 years of experience in retail and e-commerce.
            </p>
          </div>
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976"
                alt="Creative Director" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Sarah Chen</h3>
            <p className="text-gray-600 mb-3">Creative Director</p>
            <p className="text-gray-600 text-sm">
              Former fashion editor with an eye for emerging trends and unique styles.
            </p>
          </div>
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974"
                alt="CTO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Marcus Johnson</h3>
            <p className="text-gray-600 mb-3">Chief Technology Officer</p>
            <p className="text-gray-600 text-sm">
              Tech innovator specializing in AI and personalization algorithms.
            </p>
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="bg-ju4u-black text-white py-16 px-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Join the JU4U Community</h2>
        <p className="max-w-2xl mx-auto mb-8 opacity-90">
          Discover fashion that's truly meant for you. Sign up today and get 10% off your first purchase.
        </p>
        <Link to="/catalog">
          <Button className="bg-ju4u-coral hover:bg-[#ff5757] text-white py-6 px-8">
            Start Shopping
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
