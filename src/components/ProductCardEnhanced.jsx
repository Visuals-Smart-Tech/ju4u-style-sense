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

const ProductCardEnhanced = ({ product, showRatings = false, showBadges = false, quickActions = false }) => {
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
    <Card className="group relative overflow-hidden border-0 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
      {/* Product Image with Hover Effect */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[2/3] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        {showBadges && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.bestseller && (
              <Badge variant="secondary" className="bg-amber-500 text-white font-bold">Bestseller</Badge>
            )}
            {product.new && (
              <Badge variant="secondary" className="bg-ju4u-coral text-white font-bold">New</Badge>
            )}
            {product.discount > 0 && (
              <Badge variant="destructive" className="font-bold">{product.discount}% OFF</Badge>
            )}
          </div>
        )}
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleWishlistToggle();
          }}
          className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 border border-gray-200 hover:border-ju4u-coral"
        >
          <Heart 
            size={18}
            className={inWishlist ? 'fill-ju4u-coral text-ju4u-coral' : 'text-gray-600'}
          />
        </button>
        {/* Quick Actions on hover */}
        {quickActions && (
          <div className="absolute bottom-0 left-0 right-0 bg-ju4u-coral/90 text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-4 z-10">
            <Button size="sm" variant="ghost" className="flex items-center gap-1 font-bold hover:bg-white hover:text-ju4u-coral" onClick={(e) => { e.preventDefault(); handleAddToCart(); }}>
              <ShoppingBag size={16} /> Quick Add
            </Button>
            <Link to={`/product/${product.id}`} className="underline text-sm hover:text-white font-bold">View Details</Link>
          </div>
        )}
      </Link>
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1 text-base md:text-lg">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 font-medium">{product.brand}</p>
        {/* Price Display */}
        <div className="flex items-center">
          {salePrice ? (
            <>
              <span className="text-ju4u-coral font-bold">${salePrice}</span>
              <span className="ml-2 text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        {/* Ratings */}
        {showRatings && (
          <div className="flex items-center mt-2">
            <span className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.3 6.1,11.2 4.8,17.1 9.9,14.1 15,17.1 13.7,11.2 18.2,7.3 12.2,6.6"/></svg>
              ))}
            </span>
            <span className="text-xs text-gray-500 ml-2 font-medium">4.0 (24)</span>
          </div>
        )}
        {/* Quick Add to Cart (for mobile) */}
        {quickActions && (
          <Button 
            onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
            variant="ghost"
            className="w-full mt-3 border border-gray-200 hover:bg-ju4u-coral hover:text-white hover:border-transparent md:hidden font-bold"
          >
            <ShoppingBag className="mr-2" size={16} /> Add to Cart
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCardEnhanced;
