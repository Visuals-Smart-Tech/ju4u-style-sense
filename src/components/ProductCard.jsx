
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product }) => {
  // Calculate discounted price if available
  const discountedPrice = product.discount ? 
    (product.price - (product.price * product.discount / 100)).toFixed(2) : 
    null;
  
  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.new && (
            <Badge className="bg-ju4u-black text-white">New</Badge>
          )}
          {product.discount && (
            <Badge className="bg-ju4u-coral text-white">-{product.discount}%</Badge>
          )}
          {product.bestseller && (
            <Badge className="bg-amber-500 text-white">Bestseller</Badge>
          )}
        </div>
      </div>
      
      <h3 className="font-medium text-sm">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.brand}</p>
      
      <div className="flex items-center mt-1">
        {discountedPrice ? (
          <>
            <p className="font-medium text-ju4u-coral">${discountedPrice}</p>
            <p className="text-gray-500 text-sm line-through ml-2">${product.price.toFixed(2)}</p>
          </>
        ) : (
          <p className="font-medium">${product.price.toFixed(2)}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
