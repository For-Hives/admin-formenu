import { Checkbox } from '@nextui-org/react'

export function ModalBodyCategoriesComponent({
	categoriesFromStore,
	isCategorySelected,
	onSelectionChange,
}) {
	console.log('categoriesFromStore', categoriesFromStore)
	return (
		<div className={'col-span-12 flex flex-col gap-3'}>
			<div className={'grid grid-cols-3 gap-4'}>
				{categoriesFromStore &&
					categoriesFromStore.length > 0 &&
					categoriesFromStore?.map(category => (
						<div key={category.id}>
							<Checkbox
								isSelected={isCategorySelected(category.id)}
								onChange={() => onSelectionChange(category.id)}
							>
								{category.name}
							</Checkbox>
						</div>
					))}
			</div>
		</div>
	)
}
