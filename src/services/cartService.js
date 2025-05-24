import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// Get user's cart
export const getCart = async (userId) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);
  if (!cartSnap.exists()) {
    return { userId, items: [], lastUpdated: null };
  }
  return cartSnap.data();
};

// Add or merge item to cart
export const addItemToCart = async (userId, item) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);
  let cartData = { userId, items: [], lastUpdated: serverTimestamp() };
  if (cartSnap.exists()) {
    cartData = cartSnap.data();
  }
  // Merge logic: if same productId, size, color, increase quantity
  let found = false;
  const now = new Date();
  const newItems = cartData.items.map((i) => {
    if (
      i.productId === item.productId &&
      i.selectedSize === (item.selectedSize || null) &&
      i.selectedColor === (item.selectedColor || null)
    ) {
      found = true;
      return {
        ...i,
        quantity: (i.quantity || 1) + (item.quantity || 1),
        addedAt: now,
      };
    }
    return i;
  });
  if (!found) {
    newItems.push({
      ...item,
      quantity: item.quantity || 1,
      addedAt: now,
    });
  }
  await setDoc(cartRef, {
    userId,
    items: newItems,
    lastUpdated: serverTimestamp(),
  });
  return getCart(userId);
};

// Remove item from cart
export const removeItemFromCart = async (userId, productId, selectedSize = null, selectedColor = null) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);
  if (!cartSnap.exists()) return;
  const cartData = cartSnap.data();
  const newItems = cartData.items.filter(
    (i) =>
      !(
        i.productId === productId &&
        i.selectedSize === (selectedSize || null) &&
        i.selectedColor === (selectedColor || null)
      )
  );
  await updateDoc(cartRef, {
    items: newItems,
    lastUpdated: serverTimestamp(),
  });
  return getCart(userId);
};

// Update cart (replace items array)
export const updateCart = async (userId, items) => {
  const cartRef = doc(db, 'carts', userId);
  await setDoc(cartRef, {
    userId,
    items,
    lastUpdated: serverTimestamp(),
  });
  return getCart(userId);
};
