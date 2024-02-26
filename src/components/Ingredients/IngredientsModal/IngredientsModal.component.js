'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from '@/components/IconsJSX/PlusIcon'
import { InputNameIngredientComponent } from '@/components/Ingredients/IngredientsModal/InputNameIngredient.component'
import { InputActivatedIngredientComponent } from '@/components/Ingredients/IngredientsModal/InputActivatedIngredient.component'
import { InputDateIngredientComponent } from '@/components/Ingredients/IngredientsModal/InputDateIngredient.component'
import { postIngredient } from '@/services/ingredients/postIngredient'
import { putIngredient } from '@/services/ingredients/putIngredient'
import { deleteIngredient } from '@/services/ingredients/deleteIngredient'
import { useMenusStore } from '@/stores/menu.store'
// import { postIngredient, putIngredient, deleteIngredient } from '@/services/ingredientService' // Remplacez ceci par vos fonctions de service réelles

const ingredientSchema = z.object({
	name: z.string().min(1, 'Le nom de l’ingrédient est requis'),
	activated: z.boolean(),
	available_date_start: z.string().optional(),
	available_date_end: z.string().optional(),
})

export function IngredientsModal({
	ingredientToEdit,
	session,
	onChangeIngredients,
}) {
	const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()
	const isAddMode = !ingredientToEdit

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(ingredientSchema),
		defaultValues: {
			name: '',
			activated: false,
			available_date_start: '',
			available_date_end: '',
		},
	})

	const sessionFromStore = useMenusStore(state => state.session)
	const setSession = useMenusStore(state => state.setSession)

	const onSubmit = data => {
		if (isAddMode) {
			postIngredient(data, sessionFromStore).then(res => {
				// Refresh your ingredients list or state here
				const newIngredient = { ...res.data.attributes, id: res.data.id }
				onChangeIngredients(newIngredient, false)
			})
		} else {
			putIngredient(ingredientToEdit.id, data, sessionFromStore).then(res => {
				// Refresh your ingredients list or state here
				const newIngredient = { ...res.data.attributes, id: res.data.id }
				onChangeIngredients(newIngredient, true)
			})
		}
		reset(
			{
				name: '',
				activated: false,
				available_date_start: '',
				available_date_end: '',
			},
			{ keepValues: false }
		)
		onClose()
	}

	const handleDelete = () => {
		if (!isAddMode && ingredientToEdit?.id) {
			deleteIngredient(ingredientToEdit.id)
				.then(() => {
					reset()
					close()
					// Refresh your ingredients list or state here
				})
				.catch(error => {
					console.error('There was an error deleting the ingredient', error)
				})
		}
	}

	useEffect(() => {
		setSession(session)
	}, [])

	return (
		<>
			<Button auto color="primary" endContent={<PlusIcon />} onClick={onOpen}>
				{`Ajout d'ingrédient`}
			</Button>

			<Modal
				onClose={onClose}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				classNames={{
					base: '!w-[70vw] max-w-[70vw]',
					header: 'border-b-[1px] border-[#f0f9ff]',
					footer: 'border-t-[1px] border-[#f0f9ff]',
				}}
			>
				<ModalContent>
					<ModalHeader>
						{isAddMode
							? 'Ajouter un nouvel ingrédient'
							: 'Modifier l’ingrédient'}
					</ModalHeader>
					<ModalBody>
						<div className={'grid h-full w-full grid-cols-12 gap-16 p-8'}>
							<div className={'col-span-7 flex flex-col gap-6'}>
								<InputNameIngredientComponent
									control={control}
									errors={errors}
									name={'name'}
									value={ingredientToEdit?.name}
								/>
								<InputActivatedIngredientComponent
									control={control}
									errors={errors}
									name={'activated'}
									value={ingredientToEdit?.activated}
									isAddMode={isAddMode}
								/>
							</div>
							<div className={'col-span-5 flex flex-col gap-6'}>
								<InputDateIngredientComponent
									control={control}
									errors={errors}
									name={'available_date_start'}
									value={ingredientToEdit?.available_date_start}
									title={"Date de début d'activation de l'ingrédient"}
								/>
								<InputDateIngredientComponent
									control={control}
									errors={errors}
									name={'available_date_end'}
									value={ingredientToEdit?.available_date_end}
									title={"Date de fin d'activation de l'ingrédient"}
								/>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button auto color="primary" onClick={handleSubmit(onSubmit)}>
							{isAddMode ? 'Ajouter' : 'Modifier'}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
