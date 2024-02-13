import Image from 'next/image'
import ToggleDishComponent from '@/components/Toggle/ToggleDish.component'
import { Link } from '@nextui-org/react'
import ToggleIngredientComponent from '@/components/Toggle/ToggleIngredient.component'
import React from 'react'

/**
 * Renders the details of a dish.
 * @param {object} dish - The dish object containing the dish details.
 * @param {number} menuId - The ID of the menu.
 * @param {function} onOpen - The function to be called when the link is clicked.
 * @returns {JSX.Element} The rendered dish details component.
 */
export function DishDetailsComponent({
	dish,
	menuId,
	onOpen,
	setLastDishClicked,
	setIsAddMode,
}) {
	return (
		<div
			key={dish.id}
			className="group relative grid w-full grid-cols-12 items-center gap-8 rounded-lg bg-white p-8 px-16 shadow-md hover:shadow-xl"
		>
			<Image
				src="/icons/food-tray.svg"
				alt={dish.name}
				width={80}
				height={80}
				className="col-span-1"
			/>
			<div className="col-span-7 flex h-full flex-col">
				<h2 className={'font-bold'}>
					{' '}
					{dish.name} - {dish.id}
				</h2>
				<p className={'font-light'}>{dish.description}</p>
			</div>
			<div className="col-span-2 flex h-full flex-col items-center justify-center">
				<div className={'flex gap-3'}>
					<Image
						src="/icons/calendar_menu.svg"
						alt="icone calendrier"
						width={25}
						height={25}
					/>
					<span className={'text-sm'}>01 Février - 24 Avril</span>
				</div>
			</div>

			<div className="col-span-2 flex h-full items-center justify-end">
				<ToggleDishComponent id={dish.id} activated={dish.activated} />
			</div>

			<div className="absolute right-0 top-0 z-10 p-[10px]">
				<Link
					type={'button'}
					onClick={() => {
						onOpen()
						setLastDishClicked(dish)
						setIsAddMode(false)
					}}
					className={
						'relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden'
					}
				>
					<Image
						src="/icons/change.svg"
						alt="icone crayon"
						width={40}
						height={40}
						className={
							'absolute left-[100px] top-1/2 h-[40px] w-[40px] -translate-x-1/2 ' +
							'-translate-y-1/2 transform transition-all hover:brightness-110 hover:saturate-150 group-hover:left-1/2'
						}
					/>
				</Link>
			</div>
		</div>
	)
}
