import { Options } from '$fresh/plugins/twind.ts';

export default {
	selfURL: import.meta.url,
	theme: {
		container: {
			center: true,
		},
		screens: {
			'sm': '540px',
			// => @media (min-width: 640px) { ... }

			'md': '720px',
			// => @media (min-width: 768px) { ... }

			'lg': '960px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1140px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1320px',
			// => @media (min-width: 1536px) { ... }
		},

		extend: {
			colors: {
				primary: '#be123c',
				secondary: '#fcd34d',
				warning: '#d97706',
				amber: {
					50: '#fffbeb',
					100: '#fef3c7',
					200: '#fde68a',
					300: '#e0cec7',
					400: '#fcd34d',
					500: '#f59e0b',
					600: '#d97706',
					700: '#b45309',
					800: '#92400e',
					900: '#78350f',
				},
				emerald: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#10b981',
					600: '#059669',
					700: '#047857',
					800: '#065f46',
					900: '#064e3b',
				},
				orange: {
					50: '#fff7ed',
					100: '#ffedd5',
					200: '#fed7aa',
					300: '#fdba74',
					400: '#fb923c',
					500: '#f97316',
					600: '#ea580c',
					700: '#c2410c',
					800: '#9a3412',
					900: '#7c2d12',
				},
			},
			fontFamily: {
				poppins: ['Poppins'],
				sans: ['Inter', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				mono: ['ui-monospace', 'monospace'],
			},

			spacing: {
				'110': '110px',
				'120': '120px',
				'130': '130px',
				'140': '140px',
				'150': '150px',
				'160': '160px',
				'170': '170px',
				'180': '180px',
				'190': '190px',
				'200': '200px',
				'260': '260px',
				'300': '300px',
			},

			zIndex: {
				'-10': '-10',
				'-20': '-20',
				'-30': '-30',
				'-40': '-40',
			},

			transitionDelay: {
				'400': '400ms',
				'600': '600ms',
			},
		},
	},
} as Options;
