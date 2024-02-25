'use client'

import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Modal,
	Input,
	Button,
	useModal,
	ModalHeader,
	ModalContent,
	ModalFooter,
	ModalBody,
	useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from '@/components/IconsJSX/PlusIcon'
import { InputNameDishComponent } from '@/components/Dish/ModalDish/InputNameDish.component'
import { InputDescriptionDishComponent } from '@/components/Dish/ModalDish/InputDescriptionDish.component'
import { InputDropzoneImageDishComponent } from '@/components/Dish/ModalDish/InputDropzoneImageDish.component'
import { customInput } from '@/styles/customConfNextui'
import { InputNameIngredientComponent } from '@/components/Ingredients/IngredientsModal/InputNameIngredient.component'
import { InputActivatedIngredientComponent } from '@/components/Ingredients/IngredientsModal/InputActivatedIngredient.component'
import { InputDateIngredientComponent } from '@/components/Ingredients/IngredientsModal/InputDateIngredient.component'
// import { postIngredient, putIngredient, deleteIngredient } from '@/services/ingredientService' // Remplacez ceci par vos fonctions de service réelles

const ingredientSchema = z.object({
	name: z.string().min(1, 'Le nom de l’ingrédient est requis'),
	activated: z.boolean(),
	available_date_start: z.string().optional(),
	available_date_end: z.string().optional(),
})

export function IngredientsModal({ ingredientToEdit }) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

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
			activated: true,
			available_date_start: '',
			available_date_end: '',
		},
	})

	const [value, setValue] = useState(ingredientToEdit)

	// Set form default values when in edit mode
	useEffect(() => {
		if (!isAddMode) {
			Object.keys(ingredientToEdit).forEach(key => {
				setValue(key, ingredientToEdit[key])
			})
		}
	}, [ingredientToEdit, isAddMode, setValue])

	const onSubmit = data => {
		const submitFunction = isAddMode ? postIngredient : putIngredient
		submitFunction(data)
			.then(() => {
				reset()
				close()
				// Refresh your ingredients list or state here
			})
			.catch(error => {
				console.error('There was an error submitting the form', error)
			})
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

	return (
		<>
			<Button
				auto
				color="primary"
				endContent={<PlusIcon />}
				onClick={() => {
					console.log('onOpen')
					onOpen()
				}}
			>
				{`Ajout d'ingrédient`}
			</Button>

			<Modal
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
					{onClose => (
						<>
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
											name={'ingredientName'}
											value={ingredientToEdit?.name}
										/>
										<InputActivatedIngredientComponent
											control={control}
											errors={errors}
											name={'ingredientActivated'}
											value={ingredientToEdit?.activated}
											isAddMode={isAddMode}
										/>
									</div>
									<div className={'col-span-5 flex flex-col gap-6'}>
										<InputDateIngredientComponent
											control={control}
											errors={errors}
											name={'ingredientAvailableDateStart'}
											value={ingredientToEdit?.available_date_start}
											title={"Date de début d'activation de l'ingrédient"}
										/>
										<InputDateIngredientComponent
											control={control}
											errors={errors}
											name={'ingredientAvailableDateEnd'}
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
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
