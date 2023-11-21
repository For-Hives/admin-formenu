'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { cn, Switch } from '@nextui-org/react'

export default function ToggleMenuComponent({ id, activated }) {
	const [isSelected, setIsSelected] = React.useState(activated ?? true)
	const { data: session } = useSession()
	return (
		<Switch
			onChange={e => toggleMenuState(e.target.id, e.target.checked, session)}
			isSelected={isSelected}
			onValueChange={setIsSelected}
			size="sm"
			color="primary"
			classNames={{
				wrapper: cn(
					'w-[95px] relative inline-flex cursor-pointer items-center p-2 h-[30px] rounded'
				),
				thumb: cn(
					'rounded h-[20px] w-[20px] bg-white',
					'group-data-[selected=true]:ml-[59px]'
				),
			}}
			startContent={<p>&nbsp;&nbsp;&nbsp;activé</p>}
			endContent={<p>désactivé&nbsp;</p>}
		/>
	)
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
