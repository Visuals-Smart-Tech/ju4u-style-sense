import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Use placeholder image if none provided (for demo purposes)
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300x400';
  
  // Get the second image for hover effect, or use the first one again
  const hoverImage = product.images && product.images.length > 1 
    ? product.images[1] 
    : mainImage;

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group product-card-hover rounded-lg overflow-hidden bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={isHovered ? hoverImage : mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md transition-opacity duration-300"
          onClick={toggleFavorite}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-ju4u-coral text-ju4u-coral' : 'text-gray-700'}`} />
        </button>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-ju4u-black bg-opacity-80 text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <p className="text-center text-sm font-medium">Quick Add</p>
        </div>
        
        {/* Labels for new/sale/etc */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.new && (
            <span className="bg-ju4u-black text-white px-2 py-1 text-xs font-medium">New</span>
          )}
          {product.discount && (
            <span className="bg-ju4u-coral text-white px-2 py-1 text-xs font-medium">
              -{product.discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-600 text-white px-2 py-1 text-xs font-medium">Out of Stock</span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-base truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        
        <div className="flex items-center space-x-2">
          {discountedPrice ? (
            <>
              <span className="font-medium">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
