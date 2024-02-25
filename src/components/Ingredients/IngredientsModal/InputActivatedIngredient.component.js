'use client'
import { Switch } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { useState } from 'react'

export function InputActivatedIngredientComponent({
	control,
	errors,
	name,
	value,
	isAddMode,
}) {
	// Initialize directly with props, no need for separate state if just passing through
	// Removed useState hooks for nameInput and valueInput
	const [isSelected, setIsSelected] = useState(!!value)

	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					{`L'ingrédient est il activé ?`}
				</h2>
			</div>
			<div>
				<Controller
					name={name ?? ''}
					control={control}
					defaultValue={value ?? ''} // Use Controller's defaultValue for initial form value
					render={({ field }) => (
						<div className="flex flex-col gap-2">
							<Switch
								{...field}
								isDisabled={isAddMode}
								data-cy={name}
								id={name}
								isSelected={isSelected}
								onValueChange={setIsSelected}
							>
								<p className="text-small text-default-500">
									Activé: {isSelected ? 'oui' : 'non'}
								</p>
							</Switch>
						</div>
					)}
				/>
			</div>
		</div>
	)
}
