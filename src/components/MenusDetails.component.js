'use client'
import { useMenusStore } from '@/stores/menu.store'
import Image from 'next/image'
import ToggleDishComponent from '@/components/ToggleDish.component'
import ToggleIngredientComponent from '@/components/ToggleIngredient.component'
import React, { useEffect } from 'react'

export default function MenusDetails({ Menu }) {
	const setStore = useMenusStore(state => state.setMenus)
	const menuFromStore = useMenusStore(state => state.menus)

	useEffect(() => {
		setStore(Menu)
	}, [Menu])

	useEffect(() => {
		console.log(menuFromStore)
	}, [menuFromStore])

	return (
		<>
			<h2>
				Vous modifiez le menu : {menuFromStore.id} {menuFromStore.title}
			</h2>
			{menuFromStore &&
				menuFromStore.categories?.map(category => {
					category.dishes.map(dish => {
						{
							dishDetails(dish)
						}
					})
				})}
		</>
	)
}

function dishDetails(dish) {
	return (
		<div
			key={dish.id}
			className="relative flex w-full flex-col items-center gap-2 rounded-lg bg-white p-6 shadow-xl"
		>
			<div className="grid w-full grid-cols-9 items-center gap-8">
				<Image
					src="/icons/menu_icon_carte.svg"
					alt={dish.name}
					width={80}
					height={80}
					className="col-span-1"
				/>
				<div className="col-span-4 flex flex-col">
					<h2>
						{dish.name} - {dish.id}
					</h2>
					<span>{dish.description}</span>
				</div>

				<div className="col-span-2">
					<ToggleDishComponent id={dish.id} activated={dish.activated} />
				</div>
			</div>
			<div className="flex w-4/5 flex-col gap-2">
				<h3 className="pb-2">Ingrédients</h3>
				{dish.ingredients.map(ingredient => {
					return (
						<div
							key={ingredient.id}
							className="flex w-full flex-row items-center justify-between bg-amber-300"
						>
							<span>
								{ingredient.name} - {ingredient.id}
							</span>
							<ToggleIngredientComponent
								id={ingredient.id}
								activated={ingredient.activated}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}
