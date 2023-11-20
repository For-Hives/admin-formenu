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
					'w-[100px] relative inline-flex cursor-pointer items-center p-2 h-[30px] rounded'
				),
				thumb: cn(
					'rounded h-[20px] w-[20px] bg-white',
					//selected
					'group-data-[selected=true]:ml-[64px]'
					// pressed
					// 'group-data-[pressed=true]:h-[20px] w-[20px]',
					// 'group-data-[selected]:group-data-[pressed]:ml-4'
				),
			}}
			startContent={<p>activé</p>}
			endContent={<p>désactivé</p>}
		/>
		// <label className="relative inline-flex cursor-pointer items-center">
		// 	<input
		// 		name="activated"
		// 		type="checkbox"
		// 		id={id}
		// 		defaultChecked={activated}
		// 		onChange={e => toggleMenuState(e.target.id, e.target.checked, session)}
		// 		className="peer sr-only"
		// 	/>
		// 	<div
		// 		className="peer h-[28px] w-[100px] rounded bg-gray-200 after:absolute after:left-[4px]
		// 								after:top-[4px] after:h-[20px] after:w-[20px] after:rounded after:border after:border-gray-300
		// 								after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-[72px]
		// 								peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600
		// 								dark:bg-gray-700 dark:peer-focus:ring-blue-800"
		// 	></div>
		// </label>
	)
}

async function toggleMenuState(id, activated, session) {
	console.log('toggle menu state')
	// const res = await fetch(
	// 	`${process.env.NEXT_PUBLIC_API_URL}/api/menus/${id}`,
	// 	{
	// 		method: 'PUT',
	// 		headers: {
	// 			// 	token
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json',
	// 			Authorization: `Bearer ${session.jwt}`,
	// 		},
	// 		body: JSON.stringify({
	// 			data: {
	// 				activated: activated,
	// 			},
	// 		}),
	// 	}
	// )
	//
	// if (!res.ok) {
	// 	// This will activate the closest `error.js` Error Boundary
	// 	throw new Error('Failed to PUT data')
	// }
	// return res.json()
}
