'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useMenusStore } from '@/stores/menu.store'
import ToggleComponent from '@/components/Toggle/Toggle.component'
import { toggleIngredientState } from '@/services/switchElementsActivation'

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
