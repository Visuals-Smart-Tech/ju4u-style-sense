import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Mic, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  
  // Sample search suggestions
  const suggestions = [
    'Red dress',
    'Sneakers',
    'Blue jeans men',
    'Summer tops',
    'Black leather bag',
    'Sunglasses'
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    
    // Simulate voice recognition with a timeout
    setTimeout(() => {
      setSearchQuery('Red dresses in size M');
      setIsVoiceListening(false);
      setShowSuggestions(true);
    }, 2000);
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    if (searchQuery === '') {
      setIsSearchExpanded(false);
    }
    // Small delay to allow click on suggestions
    setTimeout(() => setShowSuggestions(false), 150);
  };

  // Close search suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigation structure with dropdowns
  const navigation = [
    {
      name: 'Women',
      path: '/catalog/women',
      dropdown: [
        { name: 'Tops', path: '/catalog/women?category=tops' },
        { name: 'Bottoms', path: '/catalog/women?category=bottoms' },
        { name: 'Dresses', path: '/catalog/women?category=dresses' },
        { name: 'Outerwear', path: '/catalog/women?category=outerwear' },
        { name: 'Activewear', path: '/catalog/women?category=activewear' },
      ]
    },
    {
      name: 'Men',
      path: '/catalog/men',
      dropdown: [
        { name: 'Shirts', path: '/catalog/men?category=shirts' },
        { name: 'Pants', path: '/catalog/men?category=pants' },
        { name: 'Suits', path: '/catalog/men?category=suits' },
        { name: 'Outerwear', path: '/catalog/men?category=outerwear' },
        { name: 'Activewear', path: '/catalog/men?category=activewear' },
      ]
    },
    {
      name: 'Accessories',
      path: '/catalog/accessories',
      dropdown: [
        { name: 'Bags', path: '/catalog/bags' },
        { name: 'Jewelry', path: '/catalog/jewelry' },
        { name: 'Belts', path: '/catalog/accessories?category=belts' },
        { name: 'Hats & Scarves', path: '/catalog/accessories?category=hats' },
        { name: 'Sunglasses', path: '/catalog/accessories?category=sunglasses' },
      ]
    },
    {
      name: 'Shoes',
      path: '/catalog/shoes',
      dropdown: [
        { name: 'Women\'s Shoes', path: '/catalog/shoes?gender=women' },
        { name: 'Men\'s Shoes', path: '/catalog/shoes?gender=men' },
        { name: 'Sneakers', path: '/catalog/shoes?type=sneakers' },
        { name: 'Boots', path: '/catalog/shoes?type=boots' },
        { name: 'Sandals', path: '/catalog/shoes?type=sandals' },
      ]
    },
    {
      name: 'Sale',
      path: '/catalog/sale',
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with animation */}
          <div className="flex items-center">
            <Link to="/" className="logo-container font-comfortaa text-xl font-bold tracking-wide text-ju4u-black">
              <span>JU</span>
              <span className="logo-text-hidden animate-fade-in-slide transition-all duration-500 ease-in-out">ST</span>
              <span className="text-ju4u-coral">4</span>
              <span className="logo-text-hidden animate-fade-in-slide transition-all duration-700 ease-in-out">YO</span>
              <span>U</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <div key={item.name} className="group relative py-4 px-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-2 ${
                      isActive
                        ? "text-ju4u-coral border-b-2 border-ju4u-coral font-medium"
                        : "text-ju4u-black hover:text-ju4u-coral transition-colors"
                    }`
                  }
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />}
                </NavLink>
                
                {item.dropdown && (
                  <div className="nav-dropdown">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="nav-dropdown-item"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Search and Icons */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <div ref={searchRef} className="relative">
              <div className="flex items-center bg-gray-50 rounded-full pr-2">
                <input 
                  type="text" 
                  className={`search-input bg-transparent py-1.5 pl-4 pr-8 rounded-full focus:outline-1 outline-ju4u-coral text-sm ${
                    isSearchExpanded ? 'w-48 sm:w-60' : 'w-32 sm:w-40'
                  }`}
                  placeholder="Just Search"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {isVoiceListening ? (
                    <Mic className="h-4 w-4 text-ju4u-coral voice-listening" />
                  ) : (
                    <button onClick={handleVoiceSearch} className="mr-1">
                      <Mic className="h-4 w-4 text-gray-500 hover:text-ju4u-coral" />
                    </button>
                  )}
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              {/* Search Suggestions */}
              {showSuggestions && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 py-1 z-50">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ju4u-coral"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <NavLink to="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </NavLink>
            <NavLink to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart" className="hover:text-white">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-ju4u-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <div className="relative" ref={searchRef}>
              {isSearchExpanded ? (
                <div className="flex items-center bg-gray-50 rounded-full">
                  <input 
                    type="text" 
                    className="w-full bg-transparent py-1.5 pl-4 pr-8 rounded-full focus:outline-none text-sm"
                    placeholder="Search products..."
                    onBlur={handleSearchBlur}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {isVoiceListening ? (
                    <Mic className="h-4 w-4 text-ju4u-coral voice-listening mr-3" />
                  ) : (
                    <button onClick={handleVoiceSearch} className="mr-3">
                      <Mic className="h-4 w-4 text-gray-500" />
                    </button>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchExpanded(true)} aria-label="Search">
                  <Search className="h-5 w-5" />
                </Button>
              )}
              
              {/* Mobile Search Suggestions */}
              {showSuggestions && (
                <div className="absolute top-full left-0 w-60 bg-white shadow-lg rounded-md mt-1 py-1 z-50">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-ju4u-coral"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
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
          <div className="md:hidden bg-white py-4 px-2 animate-slide-up max-h-[75vh] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name} className="py-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-md ${
                      isActive
                        ? "text-ju4u-coral bg-gray-50 font-medium"
                        : "text-ju4u-black hover:bg-gray-50 hover:text-ju4u-coral transition-colors"
                    }`
                  }
                  onClick={item.dropdown ? undefined : () => setIsMenuOpen(false)}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </span>
                </NavLink>
                
                {item.dropdown && (
                  <div className="pl-4 my-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-ju4u-coral rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 border-t pt-4">
              <NavLink 
                to="/account" 
                className="flex items-center py-2 px-3 text-gray-700 hover:bg-gray-50 hover:text-ju4u-coral rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-3" />
                My Account
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
