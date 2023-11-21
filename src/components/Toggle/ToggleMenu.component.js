'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import ToggleComponent from '@/components/Toggle/Toggle.component'

export default function ToggleMenuComponent({ id, activated }) {
	const { data: session } = useSession()
	const updateMenu = async (id, checked) => {
		await toggleMenuState(id, checked, session)
	}
	return <ToggleComponent id={id} activated={activated} onUpdate={updateMenu} />
}

async function toggleMenuState(id, activated, session) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/menus/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: {
					activated: activated,
				},
			}),
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to PUT data')
	}
	return res.json()
}
