// /hook/useAuth.js
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useAuth(shouldRedirect) {
	const { data: session } = useSession()
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		if (session?.error === 'RefreshAccessTokenError') {
			signOut({ callbackUrl: '/auth/signin', redirect: shouldRedirect })
		}

		if (session === null) {
			if (router.route !== '/auth/signin') {
				router.replace('/auth/signin')
			}
			setIsAuthenticated(false)
		} else if (session !== undefined) {
			const tokenExpired = Date.now() > session.expires * 1000
			if (tokenExpired) {
				signOut({ callbackUrl: '/auth/signin', redirect: shouldRedirect })
			} else {
				if (router.route === '/auth/signin') {
					router.replace('/')
				}
				setIsAuthenticated(true)
			}
		}
	}, [session])

	return isAuthenticated
}
