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
