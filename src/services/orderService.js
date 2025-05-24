import { db, serverTimestamp } from '@/firebase';
import { collection, doc, getDoc, getDocs, setDoc, query, where, orderBy } from 'firebase/firestore';

export async function createOrder(userId, orderData) {
  const orderId = orderData.orderId || doc(collection(db, 'orders')).id;
  const ref = doc(db, 'orders', orderId);
  await setDoc(ref, { ...orderData, userId, createdAt: serverTimestamp() });
  return orderId;
}

export async function getOrdersByUser(userId) {
  const q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getOrderStatusTimeline(orderId) {
  const ref = doc(db, 'orders', orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return [];
  return snap.data().statusTimeline || [];
}
