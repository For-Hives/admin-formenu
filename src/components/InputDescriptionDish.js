import { Textarea } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import React from 'react'
import { Controller } from 'react-hook-form'

export function InputDescriptionDish({
	control,
	errors,
	name = '',
	value = '',
}) {
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
				name={name}
				control={control}
				render={({ field }) => (
					<Textarea
						{...field}
						data-cy={name}
						id={name}
						name={name}
						placeholder="Description du plat..."
						radius={'sm'}
						size={'sm'}
						defaultValue={value}
						variant={'bordered'}
						className={'w-full'}
						classNames={customInput}
						color={'primary'}
						isInvalid={!!errors[name]}
						errorMessage={errors[name]?.message}
					/>
				)}
			/>
		</div>
	)
}
