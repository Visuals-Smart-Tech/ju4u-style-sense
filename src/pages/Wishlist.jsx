import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/services/wishlistService';
import { getProductById } from '@/services/productService';

export default function Wishlist() {
  const { currentUser } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    async function fetchWishlist() {
      const productIds = await getWishlist(currentUser.uid);
      setWishlist(productIds);
      // Fetch product details for each wishlist item
      const prods = await Promise.all(productIds.map(id => getProductById(id)));
      setProducts(prods.filter(Boolean));
    }
    fetchWishlist();
  }, [currentUser]);

  const handleRemove = async (productId) => {
    if (!currentUser) return;
    await removeFromWishlist(currentUser.uid, productId);
    setWishlist(wishlist.filter(id => id !== productId));
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div>
      <h2>Your Wishlist</h2>
      {products.length === 0 ? <p>No items in wishlist.</p> : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} <button onClick={() => handleRemove(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
