import { Input } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import React from 'react'

export function InputPriceDish() {
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est le prix de votre plat ?
				</h2>
				<p className={'text-sm italic'}>
					Ici vous indiquez le prix du plat en question, laissez vide si vous
					voulez juste l’incorporer dans un menu !
				</p>
			</div>
			<div>
				<Input
					data-cy="price_dish"
					id="price_dish"
					name="price_dish"
					type="number"
					size={'sm'}
					label="Prix du plat..."
					radius={'sm'}
					variant={'bordered'}
					color={'primary'}
					// isInvalid={!!errors.password}
					// errorMessage={errors.password?.message}
					// autoComplete="current-password"
					classNames={customInput}
				/>
				{/*{...register('password', {*/}
				{/*	required: true,*/}
				{/*})}*/}
			</div>
		</div>
	)
}
