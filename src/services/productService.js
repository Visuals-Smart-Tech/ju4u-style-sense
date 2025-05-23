
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
  searchQuery = null,
  sortBy = 'createdAt',
  sortDirection = 'desc',
  pageSize = 12,
  lastDoc = null
}) => {
  try {
    // Start building query constraints
    const constraints = [];
    
    // Apply filters if provided
    if (category && category !== 'all' && category !== 'new' && category !== 'sale') {
      constraints.push(where('category', '==', category));
    }
    
    if (category === 'new') {
      constraints.push(where('new', '==', true));
    }
    
    if (category === 'sale') {
      constraints.push(where('discount', '>', 0));
    }
    
    if (priceMin !== null) {
      constraints.push(where('price', '>=', priceMin));
    }
    
    if (priceMax !== null) {
      constraints.push(where('price', '<=', priceMax));
    }
    
    // Apply sorting
    constraints.push(orderBy(sortBy, sortDirection));
    
    // Limit the number of results
    constraints.push(limit(pageSize));
    
    // Apply pagination if lastDoc provided
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
    
    // Execute query
    const q = query(productsRef, ...constraints);
    const snapshot = await getDocs(q);
    
    // Get the last document for pagination
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
    // Map documents to data with ID
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Apply client-side search if provided (for small datasets)
    // For production, consider using a dedicated search service
    if (searchQuery && searchQuery.trim() !== '') {
      const search = searchQuery.toLowerCase().trim();
      return {
        products: products.filter(product => 
          product.name.toLowerCase().includes(search) || 
          product.description.toLowerCase().includes(search) ||
          product.brand.toLowerCase().includes(search)
        ),
        lastVisible,
        hasMore: snapshot.docs.length === pageSize
      };
    }
    
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
    // Modified query to avoid requiring a composite index
    // First get products
    const q = query(
      productsRef,
      where('featured', '==', true),
      limit(count)
    );
    
    const snapshot = await getDocs(q);
    
    // Then sort them client-side
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by createdAt in descending order
    return products.sort((a, b) => {
      // Handle potential undefined createdAt values
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      
      // Convert Firebase timestamps to milliseconds for comparison
      const timeA = a.createdAt.seconds ? a.createdAt.seconds * 1000 : 0;
      const timeB = b.createdAt.seconds ? b.createdAt.seconds * 1000 : 0;
      
      return timeB - timeA; // descending order
    });
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
