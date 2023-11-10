import '@/styles/globals.css'
import WrapSessionProvider from '@/providers/WrapSessionProvider'
import { StoreProvider } from '@/providers/StoreProvider'
import WrapNextUiProvider from '@/providers/WrapNextUiProvider'
import { Lato, Nunito } from 'next/font/google'

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	variable: '--font-lato',
	style: ['normal', 'italic'],
})

const nunito = Nunito({
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'800',
		'900',
		'1000',
	],
	subsets: ['latin'],
	variable: '--font-nunito',
	style: ['normal', 'italic'],
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
		<html lang="fr" className={`${lato.variable} ${nunito.variable}`}>
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
