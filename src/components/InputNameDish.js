'use client'
import { Input } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'
import { Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'

export function InputNameDish({ control, errors, name = '', value = '' }) {
	const [nameInput, setNameInput] = useState(name ?? '')
	const [valueInput, setValueInput] = useState(value ?? '')

	useEffect(() => {
		setNameInput(name)
	}, [nameInput, name])

	useEffect(() => {
		setValueInput(value)
	}, [valueInput, value])

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
					name={nameInput}
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							data-cy={nameInput}
							id={nameInput}
							name={nameInput}
							type="text"
							size={'sm'}
							defaultValue={valueInput}
							placeholder="Nom du plat..."
							radius={'sm'}
							variant={'bordered'}
							color={'primary'}
							isInvalid={!!errors[nameInput]}
							errorMessage={errors[nameInput]?.message}
							classNames={customInput}
						/>
					)}
				/>
			</div>
		</div>
	)
}
