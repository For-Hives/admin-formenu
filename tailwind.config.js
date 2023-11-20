/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	safelist: [
		{
			pattern: /font-(kanit|playpen_sans)/,
		},
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			rotate: {
				15: '15deg',
				30: '30deg',
			},
			borderWidth: {
				3: '3px',
			},
			fontFamily: {
				kanit: 'var(--font-kanit)',
				playpen_sans: 'var(--font-playpen_sans)',
			},
		},
	},
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		nextui({
			themes: {
				dark: {
					colors: {
						primary: {
							50: '#f0f9ff',
							100: '#e0f2fe',
							200: '#bae6fd',
							300: '#7dd3fc',
							400: '#38bdf8',
							500: '#0ea5e9',
							600: '#0284c7',
							700: '#0369a1',
							800: '#075985',
							900: '#0c4a6e',
							DEFAULT: '#38bdf8',
							foreground: '#000000',
						},
						focus: '#38bdf8',
					},
				},
				light: {
					colors: {
						primary: {
							50: '#f0f9ff',
							100: '#e0f2fe',
							200: '#bae6fd',
							300: '#7dd3fc',
							400: '#38bdf8',
							500: '#0ea5e9',
							600: '#0284c7',
							700: '#0369a1',
							800: '#075985',
							900: '#0c4a6e',
							DEFAULT: '#082f49',
							foreground: '#fff',
						},
						focus: '#082f49',
					},
				},
			},
		}),
	],
}
