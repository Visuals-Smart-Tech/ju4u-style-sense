
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { addToWishlist, removeFromWishlist, isInWishlist } from '@/services/wishlistService';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

const ProductCardEnhanced = ({ product }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const { currentUser } = useAuth();
  const { addItem } = useCart();
  
  // Check if product is in wishlist when user or product changes
  useEffect(() => {
    const checkWishlist = async () => {
      if (currentUser && product) {
        try {
          const result = await isInWishlist(currentUser.uid, product.id);
          setInWishlist(result);
        } catch (error) {
          console.error('Error checking wishlist:', error);
        }
      }
    };
    
    checkWishlist();
  }, [currentUser, product]);
  
  const handleWishlistToggle = async () => {
    if (!currentUser) {
      toast.error('Please sign in to save items to your wishlist');
      return;
    }
    
    try {
      if (inWishlist) {
        await removeFromWishlist(currentUser.uid, product.id);
        setInWishlist(false);
        toast('Removed from wishlist');
      } else {
        await addToWishlist(currentUser.uid, product.id);
        setInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };
  
  const handleAddToCart = () => {
    addItem(product);
  };
  
  // Calculate sale price if there's a discount
  const salePrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2)
    : null;

  return (
    <Card className="group relative overflow-hidden border-0 rounded-md shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image with Hover Effect */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[2/3] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.new && (
            <Badge variant="secondary" className="bg-ju4u-coral text-white">New</Badge>
          )}
          {product.discount > 0 && (
            <Badge variant="destructive">{product.discount}% OFF</Badge>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleWishlistToggle();
          }}
          className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart 
            size={18}
            className={inWishlist ? 'fill-ju4u-coral text-ju4u-coral' : 'text-gray-600'}
          />
        </button>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
        
        {/* Price Display */}
        <div className="flex items-center">
          {salePrice ? (
            <>
              <span className="text-ju4u-coral font-semibold">${salePrice}</span>
              <span className="ml-2 text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Quick Add to Cart */}
        <Button 
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          variant="ghost"
          className="w-full mt-3 border border-gray-200 hover:bg-ju4u-coral hover:text-white hover:border-transparent"
        >
          <ShoppingBag className="mr-2" size={16} />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCardEnhanced;
