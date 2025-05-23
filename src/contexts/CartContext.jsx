
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCart, addToCart, updateCartItemQuantity, removeFromCart, clearCart } from '@/services/cartService';
import { toast } from 'sonner';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Fetch cart when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const cartData = await getCart(currentUser.uid);
          setCart(cartData);
        } catch (error) {
          console.error('Error fetching cart:', error);
          toast.error('Failed to load your cart');
        } finally {
          setLoading(false);
        }
      } else {
        // Clear cart when logged out
        setCart({ items: [], total: 0 });
      }
    };

    fetchCart();
  }, [currentUser]);

  const addItem = async (item) => {
    if (!currentUser) {
      toast.error('Please sign in to add items to your cart');
      return;
    }

    setLoading(true);
    try {
      const updatedCart = await addToCart(currentUser.uid, item);
      setCart(updatedCart);
      toast.success(`${item.name} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (itemId, selectedSize, selectedColor, quantity) => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const updatedCart = await updateCartItemQuantity(
        currentUser.uid, 
        itemId, 
        selectedSize, 
        selectedColor, 
        quantity
      );
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId, selectedSize, selectedColor) => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const updatedCart = await removeFromCart(
        currentUser.uid, 
        itemId, 
        selectedSize, 
        selectedColor
      );
      setCart(updatedCart);
      toast('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  const emptyCart = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const emptyCartData = await clearCart(currentUser.uid);
      setCart(emptyCartData);
      toast('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    cartItems: cart.items,
    cartTotal: cart.total,
    cartItemCount: cart.items.length,
    loading,
    addItem,
    updateItemQuantity,
    removeItem,
    emptyCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
