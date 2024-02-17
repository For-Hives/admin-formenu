import { Controller } from 'react-hook-form'
import { Input } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'

export function InputCategoryDishComponent({ control, errors, name, value }) {
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est la catégorie de votre plat ? ( entrée / plat / dessert ... ?
					)
				</h2>
				<p className={'text-sm italic'}>
					Ici vous pouvez choisir la catégorie de votre plat. Vous la
					retrouverez dans la carte directement ici !
				</p>
			</div>
			{/*<div>*/}
			{/*	<Controller*/}
			{/*		name={name ?? ''}*/}
			{/*		control={control}*/}
			{/*		defaultValue={value ?? ''} // Use Controller's defaultValue to set initial value*/}
			{/*		render={({ field }) => (*/}
			{/*			<Input*/}
			{/*				{...field}*/}
			{/*				data-cy={name}*/}
			{/*				id={name}*/}
			{/*				name={name}*/}
			{/*				type="number"*/}
			{/*				size="sm"*/}
			{/*				placeholder="Prix du plat..."*/}
			{/*				radius="sm"*/}
			{/*				variant="bordered"*/}
			{/*				color="primary"*/}
			{/*				classNames={customInput}*/}
			{/*				isInvalid={!!errors[name]}*/}
			{/*				errorMessage={errors[name]?.message}*/}
			{/*			/>*/}
			{/*		)}*/}
			{/*	/>*/}
			{/*</div>*/}
		</div>
	)
}
