import { Textarea } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import { Controller } from 'react-hook-form'

export function InputDescriptionDish({ control, errors, name, value }) {
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quelle est la description de votre plat ?
				</h2>
				<p className={'text-sm italic'}>
					Elle vous permettra de savoir à quoi correspond votre plat, donner des
					explications complémentaires, ou bien même l’histoire du plat ! Vous
					pourrez afficher toutes les informations complémentaires ici.
				</p>
			</div>
			<Controller
				name={name ?? ''}
				control={control}
				defaultValue={value ?? ''} // Use Controller's defaultValue for initial value
				render={({ field }) => (
					<Textarea
						{...field}
						data-cy={name}
						id={name}
						placeholder="Description du plat..."
						radius="sm"
						size="sm"
						variant="bordered"
						className={'w-full'}
						classNames={customInput}
						color="primary"
						isInvalid={!!errors[name]}
						errorMessage={errors[name]?.message}
					/>
				)}
			/>
		</div>
	)
}
