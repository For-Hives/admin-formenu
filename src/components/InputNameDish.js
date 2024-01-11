import { Input } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import React from 'react'

export function InputNameDish() {
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
				<Input
					data-cy="name_dish"
					id="name_dish"
					name="name_dish"
					type="text"
					size={'sm'}
					label="Nom du plat..."
					radius={'sm'}
					variant={'bordered'}
					color={'primary'}
					// isInvalid={!!errors.password}
					// errorMessage={errors.password?.message}
					autoComplete="current-password"
					classNames={customInput}
				/>
				{/*{...register('password', {*/}
				{/*	required: true,*/}
				{/*})}*/}
			</div>
		</div>
	)
}
