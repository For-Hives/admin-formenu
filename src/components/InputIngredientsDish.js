import React from 'react'
import { Button, Chip } from '@nextui-org/react'

export function InputIngredientsDish({
	selectedKeys,
	lastDishClicked,
	onSelectionChange,
	openIngredientsUpdate,
}) {
	return (
		<div
			className={'flex flex-col gap-3 [&>*]:!transition-none [&>*]:!duration-0'}
		>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>Ingrédients</h2>
				<p className={'text-sm italic'}>
					Mets les ingrédients qui composes tes plats ici, ils permettrons aux
					clients de chercher, et retrouver facilement les plats en questions.
				</p>
			</div>
			<div className={'flex w-full flex-wrap gap-2'}>
				{selectedKeys.map(key => {
					const ingredient = lastDishClicked.ingredients.find(
						item => item.id.toString() === key
					)
					return (
						<Chip
							key={key}
							onClose={() => onSelectionChange(key)}
							variant="flat"
						>
							{ingredient?.name}
						</Chip>
					)
				})}
			</div>
			<div className={'flex w-full justify-start'}>
				<Button
					onClick={openIngredientsUpdate}
					color={'primary'}
					className={'no-underline'}
					startContent={<i className={`fi fi-sr-file-edit icon`}></i>}
				>
					Modifier les Ingrédients
				</Button>
			</div>
		</div>
	)
}
