import { Checkbox } from '@nextui-org/react'

export function ModalBodyIngredients({
	ingredientsFromStore,
	isIngredientSelected,
	onSelectionChange,
}) {
	return (
		<div className={'col-span-12 flex flex-col gap-3'}>
			<div className={'grid grid-cols-3 gap-4'}>
				{ingredientsFromStore.map(ingredient => (
					<div key={ingredient.id}>
						<Checkbox
							isSelected={isIngredientSelected(ingredient.id)}
							onChange={() => onSelectionChange(ingredient.id)}
						>
							{ingredient.name}
						</Checkbox>
					</div>
				))}
			</div>
		</div>
	)
}