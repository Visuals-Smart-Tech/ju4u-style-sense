
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  brand: string;
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist?: Product[];
  orders?: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type ProductCategory = 
  | 'women' 
  | 'men' 
  | 'accessories' 
  | 'shoes' 
  | 'bags' 
  | 'jewelry'
  | 'sale';
