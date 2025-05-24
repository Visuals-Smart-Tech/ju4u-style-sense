import React, { useRef, useState, useEffect } from 'react';
import ProductCardEnhanced from './ProductCardEnhanced';
import { Button } from '@/components/ui/button';

// Sample featured products data
const featuredProducts = [
	{
		id: '1',
		name: 'Oversized Cotton Shirt',
		price: 89.99,
		images: [
			'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800',
			'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800',
		],
		category: 'women',
		description: 'A relaxed fit oversized cotton shirt perfect for everyday wear.',
		sizes: ['XS', 'S', 'M', 'L', 'XL'],
		colors: ['White', 'Black', 'Blue'],
		brand: 'JU4U Essentials',
		inStock: true,
		featured: true,
		new: true,
	},
	{
		id: '2',
		name: 'Classic Denim Jacket',
		price: 129.99,
		images: [
			'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070',
			'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070',
		],
		category: 'men',
		description: 'A timeless denim jacket that goes with everything in your wardrobe.',
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		colors: ['Blue', 'Black'],
		brand: 'JU4U Denim',
		inStock: true,
		featured: true,
	},
	{
		id: '3',
		name: 'Leather Crossbody Bag',
		price: 149.99,
		images: [
			'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057',
			'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2057',
		],
		category: 'accessories',
		description: 'A versatile leather crossbody bag with adjustable strap.',
		colors: ['Black', 'Brown', 'Tan'],
		brand: 'JU4U Accessories',
		inStock: true,
		featured: true,
		bestseller: true,
	},
	{
		id: '4',
		name: 'High-Waisted Trousers',
		price: 119.99,
		images: [
			'https://i.pinimg.com/originals/b2/8a/b6/b28ab664841c6dcf7005dc50849788cb.jpg',
			'https://i.pinimg.com/originals/b2/8a/b6/b28ab664841c6dcf7005dc50849788cb.jpg',
		],
		category: 'women',
		description: 'Elegant high-waisted trousers for a sophisticated look.',
		sizes: ['XS', 'S', 'M', 'L'],
		colors: ['Black', 'Navy', 'Beige'],
		brand: 'JU4U Collection',
		inStock: true,
		featured: true,
		discount: 15,
	},
];

const FeaturedProducts = ({ carousel = true, quickActions = true, showRatings = true, showBadges = true }) => {
	const [current, setCurrent] = useState(0);
	const [slideCount, setSlideCount] = useState(4);
	const sliderRef = useRef();

	// Responsive slide count
	useEffect(() => {
		const updateSlideCount = () => {
			if (window.innerWidth < 640) setSlideCount(1);
			else if (window.innerWidth < 1024) setSlideCount(2);
			else setSlideCount(Math.min(4, featuredProducts.length));
		};
		updateSlideCount();
		window.addEventListener('resize', updateSlideCount);
		return () => window.removeEventListener('resize', updateSlideCount);
	}, []);

	const maxIndex = Math.max(0, featuredProducts.length - slideCount);

	const handlePrev = () => setCurrent((prev) => Math.max(0, prev - 1));
	const handleNext = () => setCurrent((prev) => Math.min(maxIndex, prev + 1));

	if (carousel && featuredProducts.length <= slideCount) {
		return (
			<div className="flex flex-col items-center">
				<div className="flex flex-wrap justify-center gap-6 w-full">
					{featuredProducts.map((product) => (
						<div key={product.id} className="w-full max-w-xs flex-shrink-0">
							<ProductCardEnhanced product={product} showRatings={showRatings} showBadges={showBadges} quickActions={quickActions} />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (carousel) {
		return (
			<div className="relative">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-bold">Featured Products</h3>
					<div className="flex gap-2">
						<Button variant="outline" onClick={handlePrev} disabled={current === 0}>&lt;</Button>
						<Button variant="outline" onClick={handleNext} disabled={current === maxIndex}>&gt;</Button>
					</div>
				</div>
				<div className="overflow-hidden">
					<div
						ref={sliderRef}
						className="flex transition-transform duration-500 gap-6 md:gap-8 xl:gap-10"
						style={{ transform: `translateX(-${current * 100}%)` }}
					>
						{featuredProducts.map((product, idx) => (
							<div
								key={product.id}
								className="w-full max-w-xs flex-shrink-0"
								style={{ minWidth: '100%' }}
							>
								{idx === current && (
									<ProductCardEnhanced product={product} showRatings={showRatings} showBadges={showBadges} quickActions={quickActions} />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	// Fallback grid
	return (
		<div className="flex flex-wrap justify-center gap-6 md:gap-8 xl:gap-10">
			{featuredProducts.map((product) => (
				<div key={product.id} className="w-full max-w-xs flex-shrink-0">
					<ProductCardEnhanced product={product} showRatings={showRatings} showBadges={showBadges} quickActions={quickActions} />
				</div>
			))}
		</div>
	);
};

export default FeaturedProducts;
