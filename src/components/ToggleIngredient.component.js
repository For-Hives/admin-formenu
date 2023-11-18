'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useMenusStore } from '@/stores/menu.store'
import { getMenu } from '@/services/getMenu'

export default function ToggleIngredientComponent({ id, activated, menuId }) {
	const { data: session } = useSession()
	const setStore = useMenusStore(state => state.setMenu)

	return (
		<label className="relative inline-flex cursor-pointer items-center">
			<input
				name="activated"
				type="checkbox"
				id={id}
				checked={activated}
				onChange={e =>
					toggleMenuState(
						e.target.id,
						e.target.checked,
						session,
						menuId,
						setStore
					)
				}
				className="peer sr-only"
			/>
			<div
				className="peer h-[28px] w-[100px] rounded bg-gray-200 after:absolute after:left-[4px]
										after:top-[4px] after:h-[20px] after:w-[20px] after:rounded after:border after:border-gray-300
										after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-[72px]
										peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600
										dark:bg-gray-700 dark:peer-focus:ring-blue-800"
			></div>
		</label>
	)
}

async function toggleMenuState(id, activated, session, menuId, setStore) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients/${id}`,
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
	const newMenu = await getMenu(menuId, session)
	setStore(newMenu)
}
