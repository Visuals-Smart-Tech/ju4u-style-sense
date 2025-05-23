
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteField, 
  serverTimestamp,
  arrayUnion,
  arrayRemove 
} from 'firebase/firestore';
import { db } from '../firebase';

// Get user's cart
export const getCart = async (userId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      return { items: [], total: 0 };
    }
    
    const cartData = cartSnap.data();
    
    // Calculate total price
    const total = cartData.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    return {
      ...cartData,
      total
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (userId, item) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      // Create new cart
      await setDoc(cartRef, {
        userId,
        items: [{ ...item, quantity: 1 }],
        updatedAt: serverTimestamp()
      });
    } else {
      // Update existing cart
      const cartData = cartSnap.data();
      const existingItemIndex = cartData.items.findIndex(i => 
        i.id === item.id && 
        i.selectedSize === item.selectedSize && 
        i.selectedColor === item.selectedColor
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        cartData.items[existingItemIndex].quantity += 1;
        await updateDoc(cartRef, {
          items: cartData.items,
          updatedAt: serverTimestamp()
        });
      } else {
        // New item, add to cart
        await updateDoc(cartRef, {
          items: [...cartData.items, { ...item, quantity: 1 }],
          updatedAt: serverTimestamp()
        });
      }
    }
    
    return await getCart(userId);
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update item quantity in cart
export const updateCartItemQuantity = async (userId, itemId, selectedSize, selectedColor, quantity) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      throw new Error('Cart not found');
    }
    
    const cartData = cartSnap.data();
    const newItems = cartData.items.map(item => {
      if (
        item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      ) {
        return { ...item, quantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    await updateDoc(cartRef, {
      items: newItems,
      updatedAt: serverTimestamp()
    });
    
    return await getCart(userId);
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (userId, itemId, selectedSize, selectedColor) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      throw new Error('Cart not found');
    }
    
    const cartData = cartSnap.data();
    const newItems = cartData.items.filter(item => 
      !(item.id === itemId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor)
    );
    
    await updateDoc(cartRef, {
      items: newItems,
      updatedAt: serverTimestamp()
    });
    
    return await getCart(userId);
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear cart
export const clearCart = async (userId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    
    if (cartSnap.exists()) {
      await updateDoc(cartRef, {
        items: [],
        updatedAt: serverTimestamp()
      });
    }
    
    return { items: [], total: 0 };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
