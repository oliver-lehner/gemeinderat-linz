const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			rose: colors.rose,
			pink: colors.pink,
			purple: colors.purple,
			indigo: colors.indigo,
			blue: colors.blue,
			sky: colors.sky,
			cyan: colors.cyan,
			teal: colors.teal,
			emerald: colors.emerald,
			green: colors.emerald,
			lime: colors.lime,
			yellow: colors.yellow,
			amber: colors.amber,
			orange: colors.orange,
			red: colors.red,
			gray: colors.coolGray,
			white: colors.white,
			transparent: 'transparent',
			currentcolor: 'currentcolor'
		},
		minHeight: {
			0: '0',
			12: '3rem',
			full: '100%'
		},
		rotate: {
			'-180': '-180deg',
			'-90': '-90deg',
			'-45': '-45deg',
			0: '0',
			45: '45deg',
			90: '90deg',
			135: '135deg',
			180: '180deg',
			270: '270deg'
		}
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('tailwindcss-hyphens'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms')
	],
	variants: {
		extend: {
			visibility: ['group-focus']
		}
	}
};

module.exports = config;
