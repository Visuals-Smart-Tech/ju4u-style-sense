
import { 
  doc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Get user's wishlist
export const getWishlist = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return [];
    }
    
    const userData = userSnap.data();
    return userData.wishlist || [];
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add item to wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      wishlist: arrayUnion(productId),
      updatedAt: serverTimestamp()
    });
    
    return await getWishlist(userId);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (userId, productId) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      wishlist: arrayRemove(productId),
      updatedAt: serverTimestamp()
    });
    
    return await getWishlist(userId);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Check if item is in wishlist
export const isInWishlist = async (userId, productId) => {
  try {
    const wishlist = await getWishlist(userId);
    return wishlist.includes(productId);
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};
