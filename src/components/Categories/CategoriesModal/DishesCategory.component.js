import { Input } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import { Controller } from 'react-hook-form'

export function InputNameCategoryComponent({ control, errors, name, value }) {
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est le nom de votre categorie ?
				</h2>
			</div>
			<div>
				<Controller
					name={name ?? ''}
					control={control}
					defaultValue={value ?? ''} // Use Controller's defaultValue for initial form value
					render={({ field }) => (
						<Input
							{...field}
							data-cy={name}
							id={name}
							type="text"
							size="sm"
							placeholder="Nom de la categorie..."
							radius="sm"
							variant="bordered"
							color="primary"
							isInvalid={!!errors[name]}
							errorMessage={errors[name]?.message}
							classNames={customInput}
						/>
					)}
				/>
			</div>
		</div>
	)
}
