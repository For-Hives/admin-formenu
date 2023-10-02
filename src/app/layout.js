import WrapSessionProvider from '@/app/components/WrapSessionProvider'
// import global css files
export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body>
				<WrapSessionProvider>
					<>{children}</>
				</WrapSessionProvider>
			</body>
		</html>
	)
}
