import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ju4u-black text-white pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12 border-b border-gray-800">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="bg-gray-800 border-gray-700 focus:border-ju4u-coral"
            />
            <Button className="bg-ju4u-coral hover:bg-[#ff5757] whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="text-xl font-bold mb-4">JU<span className="text-ju4u-coral">4</span>U</h4>
            <p className="text-gray-400 mb-6">
              Fashion tailored for your unique style and personality.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-ju4u-coral" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ju4u-coral" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ju4u-coral" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/catalog/women" className="text-gray-400 hover:text-ju4u-coral">Women</Link></li>
              <li><Link to="/catalog/men" className="text-gray-400 hover:text-ju4u-coral">Men</Link></li>
              <li><Link to="/catalog/accessories" className="text-gray-400 hover:text-ju4u-coral">Accessories</Link></li>
              <li><Link to="/catalog/sale" className="text-gray-400 hover:text-ju4u-coral">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-ju4u-coral">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-ju4u-coral">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-ju4u-coral">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-ju4u-coral">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-ju4u-coral">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-ju4u-coral">Returns</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-ju4u-coral">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center sm:text-left sm:flex sm:justify-between sm:items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} JU4U. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500">
            <Link to="/terms" className="hover:text-ju4u-coral">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-ju4u-coral">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-ju4u-coral">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
