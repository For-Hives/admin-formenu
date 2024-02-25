import { Input, Switch } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import { Controller } from 'react-hook-form'

export function InputNameIngredientComponent({ control, errors, name, value }) {
	// Initialize directly with props, no need for separate state if just passing through
	// Removed useState hooks for nameInput and valueInput
	const [isSelected, setIsSelected] = React.useState(true)

	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est le nom de votre ingrédient ?
				</h2>
			</div>
			<div>
				<Controller
					name={name ?? ''}
					control={control}
					defaultValue={value ?? ''} // Use Controller's defaultValue for initial form value
					render={({ field }) => (
						// <Input
						// 	{...field}
						// 	data-cy={name}
						// 	id={name}
						// 	type="text"
						// 	size="sm"
						// 	placeholder="Nom de l'ingrédient..."
						// 	radius="sm"
						// 	variant="bordered"
						// 	color="primary"
						// 	isInvalid={!!errors[name]}
						// 	errorMessage={errors[name]?.message}
						// 	classNames={customInput}
						// />
						<div className="flex flex-col gap-2">
							<Switch isSelected={isSelected} onValueChange={setIsSelected}>
								Airplane mode
							</Switch>
							<p className="text-small text-default-500">
								Selected: {isSelected ? 'true' : 'false'}
							</p>
						</div>
					)}
				/>
			</div>
		</div>
	)
}
