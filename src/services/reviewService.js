import { db, serverTimestamp } from '@/firebase';
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where } from 'firebase/firestore';

export async function getReviewsByProduct(productId) {
  const q = query(collection(db, 'reviews'), where('productId', '==', productId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createReview(userId, productId, reviewData) {
  const reviewId = doc(collection(db, 'reviews')).id;
  const ref = doc(db, 'reviews', reviewId);
  await setDoc(ref, { ...reviewData, userId, productId, createdAt: serverTimestamp() });
  return reviewId;
}

export async function deleteReview(userId, reviewId) {
  // You should check admin/owner before calling this
  const ref = doc(db, 'reviews', reviewId);
  await deleteDoc(ref);
}
