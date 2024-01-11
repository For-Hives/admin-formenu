import { Textarea } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import React from 'react'

export function InputDescriptionDish() {
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
			<Textarea
				data-cy="description_dish"
				id="description_dish"
				name="description_dish"
				label="Description"
				placeholder="..."
				radius={'sm'}
				size={'sm'}
				variant={'bordered'}
				className={'w-full'}
				classNames={customInput}
				color={'primary'}
			/>
		</div>
	)
}
