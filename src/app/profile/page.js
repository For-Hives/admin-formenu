import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	return (
		<div>
			{session && (
				<>
					<h1>Profile</h1>
					<p>Session: {JSON.stringify(session, null, 2)}</p>
				</>
			)}
		</div>
	)
}
