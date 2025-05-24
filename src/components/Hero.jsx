import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const slides = [
	{
		image:
			'https://plus.unsplash.com/premium_photo-1682095757120-c9abb908ed60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		headline: 'Unleash Your Style',
		subheadline:
			'Curated fashion, just for you. Discover unique pieces and bold looks that set you apart.',
		cta1: { label: 'Shop Now', to: '/catalog' },
		cta2: { label: 'Discover New Arrivals', to: '/new-arrivals' },
		marketing: 'New Season Drop',
	},
	{
		image: 'https://images.unsplash.com/photo-1635205383325-aa3e6fb5ba55?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		headline: 'Elevate Every Moment',
		subheadline:
			'From casual to couture, find the perfect fit for every occasion. Style that speaks for you.',
		cta1: { label: 'Explore Collection', to: '/catalog/women' },
		cta2: { label: 'Get Inspired', to: '/inspiration' },
		marketing: 'Effortless Elegance',
	},
	{
		image: 'https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		headline: 'Bold. Modern. You.',
		subheadline:
			'Step into the spotlight with statement pieces and trendsetting designs. Dare to be different.',
		cta1: { label: 'Shop Statement', to: '/catalog/men' },
		cta2: { label: 'See Trends', to: '/trends' },
		marketing: 'Stand Out This Season',
	},
	{
		image: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		headline: 'Refresh Your Wardrobe',
		subheadline:
			'New arrivals dropping weekly. Upgrade your look with the freshest styles and exclusive drops.',
		cta1: { label: 'New In', to: '/new-arrivals' },
		cta2: { label: 'Take the Style Quiz', to: '/quiz' },
		marketing: 'Limited Edition',
	},
	{
		image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		headline: 'Confidence in Every Step',
		subheadline:
			'Walk tall in styles that empower. From street to chic, find your signature look and own the moment.',
		cta1: { label: 'Shop Footwear', to: '/catalog/footwear' },
		cta2: { label: 'See Bestsellers', to: '/bestsellers' },
		marketing: 'Step Into Style',
	},
	{
		image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		headline: 'Effortless Layers',
		subheadline:
			'Mix, match, and layer with ease. Discover versatile essentials for every season and every story.',
		cta1: { label: 'Layer Up', to: '/catalog/outerwear' },
		cta2: { label: 'Shop Essentials', to: '/essentials' },
		marketing: 'Seasonal Must-Haves',
	},
];

const Hero = () => {
	const [current, setCurrent] = useState(0);
	const timeoutRef = useRef(null);

	useEffect(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setCurrent((prev) => (prev + 1) % slides.length);
		}, 5000);
		return () => clearTimeout(timeoutRef.current);
	}, [current]);

	return (
		<section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
			{/* Carousel Slides */}
			{slides.map((slide, idx) => (
				<div
					key={idx}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
					} pointer-events-none`}
				>
					{idx === 0 ? (
						<div
							className={`w-full h-full bg-[url('https://plus.unsplash.com/premium_photo-1682095757120-c9abb908ed60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center md:bg-[position:center_10%] lg:bg-[position:center_10%] transition-transform duration-1000 scale-100 ${
								idx === current ? 'animate-zoom-in' : ''
							}`}
						/>
					) : (
						<img
							src={slide.image}
							alt={slide.headline}
							className={`w-full h-full object-cover object-center
							${idx === 2 ? 'md:object-[center_60%] lg:object-[center_60%]' : idx === 4 ? 'md:object-[center_30%] lg:object-[center_30%]' : 'md:object-[center_10%] lg:object-[center_10%]'}
							transition-transform duration-1000 ${idx === current ? 'animate-zoom-in' : ''}`}
							draggable={false}
							loading="eager"
							style={{ position: 'absolute', inset: 0 }}
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
				</div>
			))}

			{/* Content */}
			<div className="relative z-20 flex flex-col items-center justify-center text-center px-4 md:px-0 w-full max-w-3xl mx-auto animate-fade-in">
				<span className="text-ju4u-coral font-semibold uppercase tracking-widest mb-4 text-sm md:text-base animate-fade-in">
					{slides[current].marketing}
				</span>
				<h1 className="font-rubik text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight text-white drop-shadow-xl animate-fade-in">
					{slides[current].headline.split(/(\s)/).map((word, i) =>
						word.toLowerCase() === 'style' ||
						word.toLowerCase() === 'you.' ||
						word.toLowerCase() === 'wardrobe' ? (
							<span key={i} className="text-ju4u-coral">
								{word}
							</span>
						) : (
							word
						)
					)}
				</h1>
				<p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl animate-slide-up">
					{slides[current].subheadline}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-center animate-slide-up">
					<Link to={slides[current].cta1.to}>
						<Button className="btn-primary w-full sm:w-auto text-lg px-8 py-3 shadow-lg">
							{slides[current].cta1.label}
						</Button>
					</Link>
					<Link to={slides[current].cta2.to}>
						<Button className="btn-outline w-full sm:w-auto text-lg px-8 py-3 text-white hover:bg-white/10">
							{slides[current].cta2.label}
						</Button>
					</Link>
				</div>
			</div>

			{/* Carousel Progress Dots */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
				{slides.map((_, idx) => (
					<span
						key={idx}
						className={`h-2 w-8 rounded-full transition-all duration-500 cursor-pointer ${
							idx === current ? 'bg-ju4u-coral' : 'bg-white/30'
						}`}
						aria-label={`Go to slide ${idx + 1}`}
						onClick={() => setCurrent(idx)}
						tabIndex={0}
						role="button"
						onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setCurrent(idx); }}
					/>
				))}
			</div>
			<style>{`
        @keyframes zoom-in {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-zoom-in {
          animation: zoom-in 2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
		</section>
	);
};

export default Hero;
