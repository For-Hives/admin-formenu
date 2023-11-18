'use client'
import { useMenusStore } from '@/stores/menu.store'
import Image from 'next/image'
import ToggleDishComponent from '@/components/ToggleDish.component'
import ToggleIngredientComponent from '@/components/ToggleIngredient.component'
import { useEffect, useState } from 'react'

export default function MenusDetails({ menu }) {
	const menuFromStore = useMenusStore(state => state.menu)
	const setStore = useMenusStore(state => state.setMenu)
	const [renderKey, setRenderKey] = useState(0)

	useEffect(() => {
		if (!menuFromStore || Object.keys(menuFromStore).length === 0) {
			setStore(menu)
		}
		setRenderKey(prevKey => prevKey + 1)
	}, [menu, setStore])

	// useEffect(() => {
	// 	setStore(menu)
	// }, [])

	return (
		<>
			<div key={renderKey}>
				{Object.keys(menuFromStore).length === 0 ? (
					<div>loading</div>
				) : (
					<>
						<h2>
							Vous modifiez le menu : {menuFromStore?.id} {menuFromStore?.title}
						</h2>
						<div className={'flex flex-col gap-8'}>
							{menuFromStore?.categories?.map(
								category =>
									category?.dishes &&
									category?.dishes.map(dish => (
										<div key={dish.id}>
											{renderKey}
											<DishDetails dish={dish} menuId={menuFromStore?.id} />
										</div>
									))
							)}
						</div>
					</>
				)}
			</div>
		</>
	)
}

export function DishDetails({ dish, menuId }) {
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
				<div className="col-span-6 flex flex-col">
					<h2>
						{dish.name} - {dish.id}
					</h2>
					<span>{dish.description}</span>
				</div>

				<div className="col-span-2 col-start-8">
					<ToggleDishComponent id={dish.id} activated={dish.activated} />
				</div>
			</div>
			<div className="flex w-4/5 flex-col">
				<h3 className="pb-2">Ingrédients</h3>
				<ul className="decoration flex w-full list-disc flex-col gap-2">
					{dish.ingredients.map(ingredient => {
						return (
							<li
								key={ingredient.id}
								className="flex w-full flex-row items-center justify-between"
							>
								<span>
									{ingredient.name} - {ingredient.id}
								</span>
								<ToggleIngredientComponent
									id={ingredient.id}
									activated={ingredient.activated}
									menuId={menuId}
								/>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
