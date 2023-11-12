import '@/styles/globals.css'

import WrapSessionProvider from '@/providers/WrapSessionProvider'
import { StoreProvider } from '@/providers/StoreProvider'
import WrapNextUiProvider from '@/providers/WrapNextUiProvider'
import { Kanit, Playpen_Sans } from 'next/font/google'

const kanit = Kanit({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	variable: '--font-kanit',
	style: ['normal', 'italic'],
})

const playpen_sans = Playpen_Sans({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-playpen_sans',
	style: ['normal'],
})

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
}

export default function RootLayout({ children }) {
	return (
		<html lang="fr" className={`${kanit.variable} ${playpen_sans.variable}`}>
			<body className={'flex min-h-screen w-full flex-col text-slate-950'}>
				<WrapNextUiProvider>
					<WrapSessionProvider>
						<StoreProvider>{children}</StoreProvider>
					</WrapSessionProvider>
				</WrapNextUiProvider>
			</body>
		</html>
	)
}
