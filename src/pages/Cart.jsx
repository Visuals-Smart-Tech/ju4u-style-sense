import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { getCart, removeItemFromCart, updateCart } from '@/services/cartService';
import { getProductById } from '@/services/productService';

const Cart = () => {
	const { currentUser } = useAuth();
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(false);
	const [promoCode, setPromoCode] = useState('');
	const [promoApplied, setPromoApplied] = useState(false);
	const [discount, setDiscount] = useState(0);

	// Fetch cart from Firestore and product info for each item
	useEffect(() => {
		const fetchCartAndProducts = async () => {
			if (!currentUser) {
				setCartItems([]);
				return;
			}
			setLoading(true);
			try {
				// cartService usage example
				const cart = await getCart(currentUser.uid);
				// productService usage example
				const itemsWithProduct = await Promise.all(
					(cart.items || []).map(async item => {
						try {
							const product = await getProductById(item.productId);
							return { ...item, ...product };
						} catch {
							return item; // fallback if product not found
						}
					})
				);
				setCartItems(itemsWithProduct);
			} catch (error) {
				toast.error('Failed to load your cart');
			} finally {
				setLoading(false);
			}
		};
		fetchCartAndProducts();
	}, [currentUser]);

	// Calculate totals
	const subtotal = cartItems.reduce(
		(sum, item) => sum + (item.price || 0) * (item.quantity || 1),
		0
	);
	const shipping = subtotal > 100 ? 0 : 9.99;
	const total = subtotal + shipping - discount;

	const updateQuantity = async (
		productId,
		selectedSize,
		selectedColor,
		newQuantity
	) => {
		if (!currentUser) return;
		if (newQuantity < 1) return;
		setLoading(true);
		try {
			const updatedItems = cartItems.map(item =>
				item.productId === productId &&
				item.selectedSize === selectedSize &&
				item.selectedColor === selectedColor
					? { ...item, quantity: newQuantity }
					: item
			);
			// updateCart usage example
			await updateCart(currentUser.uid, updatedItems);
			setCartItems(updatedItems);
		} catch (error) {
			toast.error('Failed to update cart');
		} finally {
			setLoading(false);
		}
	};

	const removeItem = async (productId, selectedSize, selectedColor) => {
		if (!currentUser) return;
		setLoading(true);
		try {
			// removeItemFromCart usage example
			await removeItemFromCart(currentUser.uid, productId, selectedSize, selectedColor);
			setCartItems(prev => prev.filter(item =>
				!(item.productId === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
			));
			toast('Item removed from cart');
		} catch (error) {
			toast.error('Failed to remove item from cart');
		} finally {
			setLoading(false);
		}
	};

	const handlePromoCode = () => {
		if (promoCode.toLowerCase() === 'ju4u20') {
			setDiscount(subtotal * 0.2);
			setPromoApplied(true);
			toast.success('Promo code applied successfully!');
		} else {
			toast.error('Invalid promo code');
		}
	};

	const clearPromoCode = () => {
		setPromoApplied(false);
		setDiscount(0);
		setPromoCode('');
	};

	if (loading) {
		return (
			<div className="container max-w-7xl mx-auto px-4 py-8 text-center">
				<div className="text-lg">Loading your cart...</div>
			</div>
		);
	}

	return (
		<div className="container max-w-7xl mx-auto px-4 py-8">
			<h1 className="text-3xl md:text-4xl font-bold mb-8">
				Your Shopping Cart
			</h1>
			{cartItems.length === 0 ? (
				<div className="text-center py-16 border rounded-lg">
					<div className="mb-6 flex justify-center">
						<ShoppingBag className="h-16 w-16 text-gray-400" />
					</div>
					<h2 className="text-xl font-semibold mb-2">
						Your cart is empty
					</h2>
					<p className="text-gray-600 mb-8">
						Looks like you haven't added any products to your cart yet.
					</p>
					<Link to="/catalog">
						<Button>Continue Shopping</Button>
					</Link>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Cart Items */}
					<div className="lg:w-2/3">
						<div className="hidden md:flex font-medium text-gray-500 mb-4 pb-2 border-b">
							<div className="w-1/2">Product</div>
							<div className="w-1/4 text-center">Quantity</div>
							<div className="w-1/4 text-right">Total</div>
						</div>
						{cartItems.map(item => (
							<div
								key={item.productId + (item.selectedSize || '') + (item.selectedColor || '')}
								className="flex flex-col md:flex-row items-center py-6 border-b"
							>
								{/* Product Info */}
								<div className="w-full md:w-1/2 flex mb-4 md:mb-0">
									<div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
										<img
											src={item.images ? item.images[0] : ''}
											alt={item.name}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="ml-4 flex-1">
										<Link
											to={`/product/${item.productId}`}
											className="font-medium hover:text-ju4u-coral transition-colors"
										>
											{item.name}
										</Link>
										<p className="text-gray-500 text-sm mt-1">
											{item.brand}
										</p>
										<div className="text-sm text-gray-600 mt-1 space-y-1">
											{item.selectedSize && (
												<p>Size: {item.selectedSize}</p>
											)}
											{item.selectedColor && (
												<p>Color: {item.selectedColor}</p>
											)}
											<p>${item.price?.toFixed(2)}</p>
										</div>
										<button
											onClick={() => removeItem(item.productId, item.selectedSize, item.selectedColor)}
											className="text-gray-500 hover:text-ju4u-coral text-sm flex items-center mt-2 md:hidden"
										>
											<X className="h-3 w-3 mr-1" />
											Remove
										</button>
									</div>
								</div>
								{/* Quantity */}
								<div className="w-full md:w-1/4 flex justify-center my-4 md:my-0">
									<div className="flex items-center">
										<button
											onClick={() => updateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity - 1)}
											className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
											disabled={item.quantity <= 1}
										>
											<Minus className="h-3 w-3" />
										</button>
										<div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
											{item.quantity}
										</div>
										<button
											onClick={() => updateQuantity(item.productId, item.selectedSize, item.selectedColor, item.quantity + 1)}
											className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
										>
											<Plus className="h-3 w-3" />
										</button>
									</div>
								</div>
								{/* Total */}
								<div className="w-full md:w-1/4 flex items-center justify-between md:justify-end">
									<span className="text-gray-800 font-medium md:hidden">
										Total:
									</span>
									<span className="font-medium">
										${(item.price * item.quantity).toFixed(2)}
									</span>
									<button
										onClick={() => removeItem(item.productId, item.selectedSize, item.selectedColor)}
										className="text-gray-500 hover:text-ju4u-coral ml-4 hidden md:block"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							</div>
						))}

						{/* Actions */}
						<div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
							<Link
								to="/catalog"
								className="mb-4 sm:mb-0 text-ju4u-coral hover:underline"
							>
								Continue Shopping
							</Link>
							<Button
								variant="outline"
								onClick={() => setCartItems([])}
								className="text-gray-600"
							>
								Clear Cart
							</Button>
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:w-1/3">
						<div className="bg-gray-50 p-6 rounded-lg">
							<h2 className="text-xl font-bold mb-6">Order Summary</h2>

							<div className="space-y-3 pb-6 mb-6 border-b border-gray-200">
								<div className="flex justify-between">
									<span className="text-gray-600">Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-gray-600">Shipping</span>
									<span>
										{shipping === 0
											? 'FREE'
											: `$${shipping.toFixed(2)}`}
									</span>
								</div>
								{discount > 0 && (
									<div className="flex justify-between text-ju4u-coral">
										<div className="flex items-center">
											<span>Discount</span>
											<button
												onClick={clearPromoCode}
												className="ml-2 text-gray-400 hover:text-ju4u-coral"
											>
												<X className="h-3 w-3" />
											</button>
										</div>
										<span>-${discount.toFixed(2)}</span>
									</div>
								)}
							</div>

							<div className="flex justify-between font-bold text-lg mb-6">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>

							{/* Promo Code */}
							{!promoApplied && (
								<div className="mb-6">
									<div className="flex items-stretch">
										<input
											type="text"
											value={promoCode}
											onChange={e => setPromoCode(e.target.value)}
											placeholder="Promo code"
											className="flex-1 rounded-l-md border-r-0 focus-visible:ring-0"
										/>
										<button
											onClick={handlePromoCode}
											className="bg-ju4u-black text-white px-4 rounded-r-md"
										>
											Apply
										</button>
									</div>
									<p className="text-xs text-gray-500 mt-1">
										Try "JU4U20" for 20% off
									</p>
								</div>
							)}

							{/* Checkout Button */}
							<Link to="/checkout">
								<Button className="w-full flex items-center justify-center bg-ju4u-coral hover:bg-opacity-90 py-6">
									Proceed to Checkout
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>

							{/* Payment Methods */}
							<div className="mt-6 flex justify-center space-x-2">
								<div className="text-xs text-gray-500">We accept:</div>
								<div className="flex space-x-2">
									<div className="text-xs">Visa</div>
									<div className="text-xs">MasterCard</div>
									<div className="text-xs">PayPal</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
