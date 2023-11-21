'use client'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { LoaderComponent } from '@/components/Loaders/Loader.component'

function Error({ error }) {
	const { session } = useSession()
	const router = useRouter()
	const [showed, setShowed] = useState(false)

	useEffect(() => {
		if (session) {
			signOut()
		}

		if (!showed) {
			toast('Une erreur est survenue !', {
				icon: '⚠️',
				type: 'error',
				toastId: 'toast-alert',
			})
			setShowed(true)
			router.push('/auth/signin')
		}
	}, [session, showed, router, error])

	return (
		<div className="relative flex min-h-screen bg-white">
			<LoaderComponent></LoaderComponent>
		</div>
	)
}

export default Error
