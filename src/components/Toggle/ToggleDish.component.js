'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import ToggleComponent from '@/components/Toggle/Toggle.component'
import { toggleDishState } from '@/services/switchElementsActivation'
import { useMenusStore } from '@/stores/menu.store'

export default function ToggleDishComponent({ id, activated }) {
	// const setStore = useMenusStore(state => state.setMenu)
	// const menu = useMenusStore(state => state.menu)

	const { data: session } = useSession()
	const updateDish = async (id, checked) => {
		await toggleDishState(id, checked, session)
	}
	return (
		<ToggleComponent id={id} activated={!!activated} onUpdate={updateDish} />
	)
}
