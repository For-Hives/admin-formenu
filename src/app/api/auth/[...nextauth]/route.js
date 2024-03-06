import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshAccessToken(token) {
	try {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh` // Your endpoint to refresh tokens
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				refreshToken: token.refreshToken, // Send the stored refresh token
			}),
		})

		const refreshedTokens = await response.json()

		if (!response.ok) {
			throw refreshedTokens
		}

		return {
			...token,
			accessToken: refreshedTokens.jwt, // New access token
			accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000, // New expiration time
			refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Sometimes a new refresh token is not returned, so fall back to old
		}
	} catch (error) {
		console.error('RefreshAccessTokenError', error)
		return {
			...token,
			error: 'RefreshAccessTokenError',
		}
	}
}

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@formenu.fr',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '************',
				},
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
			// On sign in
			const isSignIn = !!user
			if (isSignIn) {
				if (account.type === 'credentials') {
					// Credentials sign-in: Set custom fields
					token.id = user.id
					token.jwt = user.jwt // Assuming 'jwt' is the access token you want to keep
					// You might want to set the expiration time here as well if you have it
					// For example:
					token.accessTokenExpires = Date.now() + 3600 * 1000 // 1 hour from now
					// Don't forget to return the token!
					return token
				}
				// For other providers (e.g., Google, Facebook), you might want to set different token properties
			}

			// Token refresh logic for expired access tokens
			// Check if the access token has expired
			if (Date.now() > token.accessTokenExpires) {
				// Access token has expired, try to refresh it
				return refreshAccessToken(token)
			}

			// For an existing session where token hasn't expired
			return token
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
