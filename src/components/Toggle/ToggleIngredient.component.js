'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useMenusStore } from '@/stores/menu.store'
import { getMenu } from '@/services/getMenu'
import ToggleComponent from '@/components/Toggle/Toggle.component'

export default function ToggleIngredientComponent({ id, activated, menuId }) {
	const { data: session } = useSession()
	// set store to update other same ingredients accross the page, not only the one we are updating
	const setStore = useMenusStore(state => state.setMenu)

	const updateIngredient = async (id, checked) => {
		await toggleIngredientState(id, checked, session, menuId, setStore)
	}

	return (
		<ToggleComponent
			id={id}
			activated={activated}
			onUpdate={updateIngredient}
		/>
	)
}

async function toggleIngredientState(id, activated, session, menuId, setStore) {
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
