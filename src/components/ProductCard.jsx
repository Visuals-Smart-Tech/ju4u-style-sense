
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

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
      className="group product-card-hover bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={isHovered ? hoverImage : mainImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
        />
        
        {/* Favorite Button with improved animation */}
        <button 
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md transition-all duration-300 hover:scale-110 z-10"
          onClick={toggleFavorite}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 transition-colors duration-300 ${isFavorited ? 'fill-ju4u-coral text-ju4u-coral' : 'text-gray-700'}`} />
        </button>
        
        {/* Quick Add Button with improved animation */}
        <div className="absolute bottom-0 left-0 right-0 bg-ju4u-black bg-opacity-80 text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer">
          <ShoppingBag className="h-4 w-4" />
          <span className="text-sm font-medium">Quick Add</span>
        </div>
        
        {/* Labels for new/sale with improved styling */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.new && (
            <span className="bg-ju4u-black text-white px-2 py-1 text-xs font-medium tracking-wide">NEW</span>
          )}
          {product.discount && (
            <span className="bg-ju4u-coral text-white px-2 py-1 text-xs font-medium tracking-wide">
              {product.discount}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="bg-amber-500 text-white px-2 py-1 text-xs font-medium tracking-wide">BESTSELLER</span>
          )}
          {!product.inStock && (
            <span className="bg-gray-600 text-white px-2 py-1 text-xs font-medium tracking-wide">OUT OF STOCK</span>
          )}
        </div>
      </div>
      
      {/* Product info with improved typography */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{product.brand}</p>
            <h3 className="font-medium text-base truncate">{product.name}</h3>
          </div>
        </div>
        
        <div className="mt-2 flex items-center space-x-2">
          {discountedPrice ? (
            <>
              <span className="font-semibold">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Optional color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1">
            {product.colors.map((color, idx) => (
              <div 
                key={idx} 
                className="w-3 h-3 rounded-full border border-gray-300" 
                style={{ 
                  backgroundColor: 
                    color.toLowerCase() === 'white' ? '#fff' :
                    color.toLowerCase() === 'black' ? '#000' :
                    color.toLowerCase() === 'blue' ? '#3b82f6' :
                    color.toLowerCase() === 'red' ? '#ef4444' :
                    color.toLowerCase() === 'green' ? '#10b981' :
                    color.toLowerCase() === 'yellow' ? '#f59e0b' :
                    color.toLowerCase() === 'purple' ? '#8b5cf6' :
                    color.toLowerCase() === 'pink' ? '#ec4899' :
                    color.toLowerCase() === 'gray' ? '#6b7280' :
                    color.toLowerCase() === 'brown' ? '#92400e' :
                    color.toLowerCase() === 'tan' ? '#d6bcab' :
                    color
                }}
                title={color}
              ></div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
