'use client'
// auth/signout/page.js
import { LoaderComponent } from '@/components/Loaders/Loader.component'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

function Signout() {
	useEffect(() => {
		signOut({ callbackUrl: '/auth/signin', redirect: true })
	}, [])

	// Display a loader while the sign-out process is in progress
	return <LoaderComponent />
}

export default Signout
