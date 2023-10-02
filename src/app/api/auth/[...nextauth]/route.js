import NextAuth from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null
				}
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
						},
						body: JSON.stringify({
							identifier: credentials.email,
							password: credentials.password,
						}),
					}
				)
				const authenticated = await response.json()
				if (authenticated) {
					return {
						id: authenticated.user.id,
						name: authenticated.user.username,
						email: authenticated.user.email,
						jwt: authenticated.jwt,
					}
				}
				return null
			},
		}),
	],
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
		error: '/auth/error',
	},
	secret: `${process.env.NEXTAUTH_SECRET}`,
	debug: `${process.env.NODE_ENV}` !== 'production',
	callbacks: {
		async session({ session, token, user }) {
			session.jwt = token.jwt
			session.id = token.id
			return session
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			const isSignIn = !!user
			if (isSignIn && account.type === 'credentials') {
				token.id = user.id
				token.jwt = user.jwt
			}
			return token
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
