import { Input } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import React from 'react'
import { Controller } from 'react-hook-form'

export function InputNameDish({ control, errors, name }) {
	console.log(errors)
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est le nom de votre plat ?
				</h2>
				<p className={'text-sm italic'}>
					Ce sera cet élément qui sera vu de prime abord et qui sera afficher en
					premier, mettez ce que vous voulez !
				</p>
			</div>
			<div>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							data-cy={name}
							id={name}
							type="text"
							size={'sm'}
							placeholder="Nom du plat..."
							radius={'sm'}
							variant={'bordered'}
							color={'primary'}
							isInvalid={!!errors[name]}
							errorMessage={errors[name]?.message}
							autoComplete="current-password"
							classNames={customInput}
						/>
					)}
				/>
			</div>
		</div>
	)
}
