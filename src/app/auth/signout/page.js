import { LoaderComponent } from '@/components/Loaders/Loader.component'

import { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function Signout() {
	const { data: session, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		// If the user is logged in, proceed to sign them out
		if (status === 'authenticated') {
			signOut({ redirect: false }).then(() => {
				// Redirect the user to the signin page after signing out
				router.push('/auth/signin')
			})
		} else {
			// If the user is not logged in, redirect immediately
			router.push('/auth/signin')
		}
	}, [session, router, status])

	// Display a loader while the sign-out process is in progress
	return <LoaderComponent />
}

export default Signout
