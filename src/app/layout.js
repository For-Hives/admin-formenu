import '@/styles/globals.css'
import WrapSessionProvider from '@/providers/WrapSessionProvider'
import { StoreProvider } from '@/providers/StoreProvider'
import WrapNextUiProvider from '@/providers/WrapNextUiProvider'

export const metadata = {
	title: 'Administration - ForMenu',
	description: "L'administration de ForMenu",
	metadataBase: new URL('https://formenu.fr/admin'),
	alternates: {
		canonical: '/',
		languages: {
			'fr-FR': 'https://formenu.fr/admin',
			'en-US': 'https://formenu.net/admin',
		},
	},
	links: [
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com',
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			crossOrigin: true,
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
		},
	],
}

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body
				className={
					'flex min-h-screen w-full flex-col bg-slate-50 text-slate-950'
				}
			>
				<WrapNextUiProvider>
					<WrapSessionProvider>
						<StoreProvider>{children}</StoreProvider>
					</WrapSessionProvider>
				</WrapNextUiProvider>
			</body>
		</html>
	)
}
