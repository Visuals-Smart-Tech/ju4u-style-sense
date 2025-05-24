import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState(product || {
    name: '', price: '', images: [''], category: '', description: '', sizes: [], colors: [], brand: '', inStock: true, featured: false, discount: 0
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (name, value) => {
    setForm(f => ({ ...f, [name]: value.split(',').map(v => v.trim()) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast({ title: 'Name and price are required', variant: 'destructive' });
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" />
      <Input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" />
      <Input name="images" value={form.images.join(',')} onChange={e => handleArrayChange('images', e.target.value)} placeholder="Image URLs (comma separated)" />
      <Input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
      <Input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <Input name="sizes" value={form.sizes.join(',')} onChange={e => handleArrayChange('sizes', e.target.value)} placeholder="Sizes (comma separated)" />
      <Input name="colors" value={form.colors.join(',')} onChange={e => handleArrayChange('colors', e.target.value)} placeholder="Colors (comma separated)" />
      <Input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
      <label className="flex items-center gap-2"><input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} /> In Stock</label>
      <label className="flex items-center gap-2"><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> Featured</label>
      <Input name="discount" value={form.discount} onChange={handleChange} placeholder="Discount %" type="number" />
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch products
  useEffect(() => {
    getDocs(collection(db, 'products')).then(snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    getDocs(collection(db, 'orders')).then(snap => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [showForm]);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };
  const handleEdit = (product) => {
    setEditing(product);
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(p => p.id !== id));
    toast({ title: 'Product deleted', variant: 'success' });
  };
  const handleSave = async (form) => {
    if (editing) {
      await updateDoc(doc(db, 'products', editing.id), { ...form, updatedAt: serverTimestamp() });
      toast({ title: 'Product updated', variant: 'success' });
    } else {
      await addDoc(collection(db, 'products'), { ...form, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      toast({ title: 'Product added', variant: 'success' });
    }
    setShowForm(false);
    setEditing(null);
    // Refresh products
    getDocs(collection(db, 'products')).then(snap => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-ju4u-coral">Admin Dashboard</h1>
      <div className="mb-8 flex gap-4">
        <Button onClick={handleAdd}>Add Product</Button>
      </div>
      {showForm && (
        <Card className="mb-8 p-6">
          <ProductForm product={editing} onSave={handleSave} onCancel={() => setShowForm(false)} />
        </Card>
      )}
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {products.map(product => (
          <Card key={product.id} className="p-4 flex flex-col gap-2">
            <div className="font-bold text-lg">{product.name}</div>
            <div className="text-gray-600">{product.brand}</div>
            <div className="text-gray-600">${product.price}</div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => handleEdit(product)}>Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.userId}</td>
                <td className="px-4 py-2">${order.total || 'N/A'}</td>
                <td className="px-4 py-2">{order.createdAt?.toDate?.().toLocaleString?.() || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
