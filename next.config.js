/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.andy-cinquin.fr',
			},
		],
	},
	i18n: {
		localeDetection: false,
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
		domains: [
			{
				domain: 'formenu.fr/admin',
				defaultLocale: 'fr',
				locales: ['fr'],
			},
			{
				domain: 'formenu.net/admin',
				defaultLocale: 'en',
				locales: ['en'],
			},
		],
	},
}

module.exports = nextConfig
