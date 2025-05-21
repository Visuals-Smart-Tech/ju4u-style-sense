
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Women', path: '/catalog/women' },
    { name: 'Men', path: '/catalog/men' },
    { name: 'Accessories', path: '/catalog/accessories' },
    { name: 'Sale', path: '/catalog/sale' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold tracking-wide text-ju4u-black">
              JU<span className="text-ju4u-coral">4</span>U
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-ju4u-coral border-b-2 border-ju4u-coral font-medium"
                    : "text-ju4u-black hover:text-ju4u-coral transition-colors"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <NavLink to="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </NavLink>
            <NavLink to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-ju4u-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <NavLink to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-ju4u-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </NavLink>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-2 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-ju4u-coral font-medium py-2"
                      : "text-ju4u-black hover:text-ju4u-coral transition-colors py-2"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="flex items-center pt-2">
                <Button variant="ghost" size="sm" className="mr-4" aria-label="Search">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
                <NavLink to="/account" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" aria-label="Account">
                    <User className="h-5 w-5 mr-2" />
                    Account
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
