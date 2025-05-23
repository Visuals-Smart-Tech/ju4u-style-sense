
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db, auth } from '../firebase';

// Collection references
const usersRef = collection(db, 'users');

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(usersRef, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    return {
      id: userSnap.id,
      ...userSnap.data()
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Create or update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(usersRef, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create new user profile
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      // Update existing profile
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
    }
    
    return {
      id: userId,
      ...userData
    };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Add address to user profile
export const addUserAddress = async (userId, address) => {
  try {
    const userRef = doc(usersRef, userId);
    
    await updateDoc(userRef, {
      addresses: arrayUnion({
        id: Date.now().toString(), // Simple ID generation
        ...address
      }),
      updatedAt: serverTimestamp()
    });
    
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Error adding user address:', error);
    throw error;
  }
};

// Delete address from user profile
export const deleteUserAddress = async (userId, addressId) => {
  try {
    const userRef = doc(usersRef, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userSnap.data();
    const address = userData.addresses?.find(addr => addr.id === addressId);
    
    if (!address) {
      throw new Error('Address not found');
    }
    
    await updateDoc(userRef, {
      addresses: arrayRemove(address),
      updatedAt: serverTimestamp()
    });
    
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Error deleting user address:', error);
    throw error;
  }
};

// Add payment method to user profile
export const addPaymentMethod = async (userId, paymentMethod) => {
  try {
    const userRef = doc(usersRef, userId);
    
    await updateDoc(userRef, {
      paymentMethods: arrayUnion({
        id: Date.now().toString(),
        ...paymentMethod
      }),
      updatedAt: serverTimestamp()
    });
    
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};

// Delete payment method from user profile
export const deletePaymentMethod = async (userId, paymentMethodId) => {
  try {
    const userRef = doc(usersRef, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userSnap.data();
    const paymentMethod = userData.paymentMethods?.find(pm => pm.id === paymentMethodId);
    
    if (!paymentMethod) {
      throw new Error('Payment method not found');
    }
    
    await updateDoc(userRef, {
      paymentMethods: arrayRemove(paymentMethod),
      updatedAt: serverTimestamp()
    });
    
    return await getUserProfile(userId);
  } catch (error) {
    console.error('Error deleting payment method:', error);
    throw error;
  }
};

// Initialize user profile after signup
export const initializeUserProfile = async (user) => {
  try {
    const userRef = doc(usersRef, user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        addresses: [],
        paymentMethods: [],
        wishlist: []
      });
    }
    
    return await getUserProfile(user.uid);
  } catch (error) {
    console.error('Error initializing user profile:', error);
    throw error;
  }
};
