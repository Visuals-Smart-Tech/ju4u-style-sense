
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection references
const productsRef = collection(db, 'products');

// Get all products with optional filtering
export const getProducts = async ({ 
  category = null,
  priceMin = null,
  priceMax = null,
  sortBy = 'createdAt',
  sortDirection = 'desc',
  pageSize = 12,
  lastDoc = null
}) => {
  try {
    // Start building query
    let q = productsRef;
    
    // Apply filters if provided
    const filters = [];
    
    if (category) {
      filters.push(where('category', '==', category));
    }
    
    if (priceMin !== null) {
      filters.push(where('price', '>=', priceMin));
    }
    
    if (priceMax !== null) {
      filters.push(where('price', '<=', priceMax));
    }
    
    // Apply all filters and sorting
    q = query(
      productsRef,
      ...filters,
      orderBy(sortBy, sortDirection),
      limit(pageSize)
    );
    
    // Apply pagination if lastDoc provided
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    // Execute query
    const snapshot = await getDocs(q);
    
    // Get the last document for pagination
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
    // Map documents to data with ID
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return {
      products,
      lastVisible,
      hasMore: snapshot.docs.length === pageSize
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(productsRef, productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error('Product not found');
    }
    
    return {
      id: productSnap.id,
      ...productSnap.data()
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get featured products
export const getFeaturedProducts = async (count = 4) => {
  try {
    const q = query(
      productsRef,
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(count)
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

// Admin only: Create a new product
export const createProduct = async (productData) => {
  try {
    const product = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(productsRef, product);
    return {
      id: docRef.id,
      ...product
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Admin only: Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(productsRef, productId);
    const updateData = {
      ...productData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(productRef, updateData);
    
    return {
      id: productId,
      ...updateData
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Admin only: Delete a product
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(productsRef, productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
