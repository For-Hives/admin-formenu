'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import ToggleComponent from '@/components/Toggle/Toggle.component'
import { toggleDishState } from '@/services/switchElementsActivation'
import { useMenusStore } from '@/stores/menu.store'

export default function ToggleDishComponent({ id, activated }) {
	const setStore = useMenusStore(state => state.setMenu)
	const menu = useMenusStore(state => state.menu)

	const { data: session } = useSession()
	const updateDish = async (id, checked) => {
		let newMenu = JSON.parse(JSON.stringify(menu))
		newMenu.categories = newMenu.categories.map(category => {
			category.dishes = category.dishes.map(dish => {
				if (dish.id === id) {
					dish.activated = checked
				}
				return dish
			})
			return category
		})
		setStore(newMenu)
		await toggleDishState(id, checked, session)
	}
	return (
		<ToggleComponent id={id} activated={!!activated} onUpdate={updateDish} />
	)
}
