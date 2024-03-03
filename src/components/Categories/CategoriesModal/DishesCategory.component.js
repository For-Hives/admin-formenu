import React from 'react'
import { Button, Chip } from '@nextui-org/react'

export function DishesCategoryComponent({
	selectedDishes,
	categoryToEdit,
	onSelectionChangeDish,
	openDishesUpdate,
}) {
	return (
		<div
			className={'flex flex-col gap-3 [&>*]:!transition-none [&>*]:!duration-0'}
		>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>Plats</h2>
				<p className={'text-sm italic'}>
					Sélectionnez les plats à associer à cette catégorie. Cela permettra
					aux clients de naviguer et de trouver facilement les plats
					correspondants.
				</p>
			</div>
			<div className={'flex w-full flex-wrap gap-2'}>
				{selectedDishes.length === 0 && (
					<p className={'text-sm italic'}>
						{' '}
						{`Aucun plat n'est sélectionné pour le moment.`}
					</p>
				)}
				{selectedDishes.map(key => {
					const dish = categoryToEdit.dishes?.find(
						item => item.id.toString() === key
					)
					return (
						<Chip
							key={key}
							onClose={() => onSelectionChangeDish(key)}
							variant="flat"
						>
							{dish?.name}
						</Chip>
					)
				})}
			</div>
			<div className={'flex w-full justify-start'}>
				<Button
					onClick={() => {
						console.log('openDishesUpdate')
						openDishesUpdate()
					}}
					color={'primary'}
					className={'no-underline'}
					startContent={<i className={`fi fi-sr-file-edit icon`}></i>}
				>
					Modifier les plats
				</Button>
			</div>
		</div>
	)
}
