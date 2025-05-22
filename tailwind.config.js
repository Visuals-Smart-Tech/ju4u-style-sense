
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// JU4U colors updated according to design guidelines
				ju4u: {
					black: '#111111',  // Charcoal Black for primary text/background
					coral: '#FF6B6B',  // Coral Red (updated to match design doc)
					white: '#FFFFFF',  // Pure White for primary page background
					gray: '#F7F7F7',   // Soft Gray for secondary backgrounds
					green: '#2ECC71',  // Emerald Green for positive states
					red: '#E63946',    // Cherry Red for error states
				}
			},
			fontFamily: {
				// Primary fonts per design guidelines
				rubik: ['Rubik', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				comfortaa: ['Comfortaa', 'sans-serif'],
				josefin: ['"Josefin Sans"', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				expandLogo: {
					'0%': { width: '0', maxWidth: '0', opacity: '0' },
					'100%': { width: 'auto', maxWidth: '100%', opacity: '1' }
				},
				fadeInSlide: {
					'0%': { transform: 'translateX(-10px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				// New animations for microinteractions
				pulse: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-468px 0' },
					'100%': { backgroundPosition: '468px 0' }
				},
				floatUp: {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
					'100%': { transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.4s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-in-out',
				'scale-in': 'scaleIn 0.3s ease-in-out',
				'expand-logo': 'expandLogo 0.3s ease-in-out forwards',
				'fade-in-slide': 'fadeInSlide 0.3s ease-in-out forwards',
				// New animations
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 1.5s infinite linear',
				'float': 'floatUp 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
