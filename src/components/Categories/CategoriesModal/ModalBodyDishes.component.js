import { Checkbox } from '@nextui-org/react'

export function ModalBodyDishesComponent({
	dishesFromStore,
	isDisheselected,
	onSelectionChange,
}) {
	return (
		<div className={'col-span-12 flex flex-col gap-3'}>
			<div className={'grid grid-cols-3 gap-4'}>
				{dishesFromStore.map(dish => (
					<div key={dish.id}>
						<Checkbox
							isSelected={isDisheselected(dish.id)}
							onChange={() => onSelectionChange(dish.id)}
						>
							{dish.name}
						</Checkbox>
					</div>
				))}
			</div>
		</div>
	)
}
