'use client'

import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useState,
} from 'react'
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
import { postDish } from '@/services/dish/postDish'
import { putDish } from '@/services/dish/putDish'
import { useMenusStore } from '@/stores/menu.store'
import { ModalHeaderContentComponent } from '@/components/Dish/Base/ModalDish/ModalHeaderContent.component'
import { ModalBodyMainContentComponent } from '@/components/Dish/Base/ModalDish/ModalBodyMainContent.component'
import { ModalBodyIngredientsComponent } from '@/components/Dish/Base/ModalDish/ModalBodyIngredients.component'
import { ModalBodyAllergensComponent } from '@/components/Dish/Base/ModalDish/ModalBodyAllergens.component'
import { ModalFooterMainContentComponent } from '@/components/Dish/Base/ModalDish/ModalFooterMainContent.component'
import { ModalFooterBackComponent } from '@/components/Dish/Base/ModalDish/ModalFooterBack.component'

const dishschema = z.object({
	name_dish: z
		.string({ required_error: 'Le nom du plat est requis.' })
		.min(1, 'Le nom du plat est requis.'),
	description_dish: z
		.string({ required_error: 'La description du plat est requise.' })
		.min(1, 'La description du plat est requise.'),
	price_dish: z
		.string({ required_error: 'Le prix du plat est requis.' })
		.regex(/^\d+(\.\d{1,2})?$/, 'Le prix est invalide.'),
	category_dish: z.string({
		required_error: 'La catégorie du plat est requise.',
	}),
	type_dish: z.string({ required_error: 'Le type du plat est requis.' }),
})

export const DishesModal = forwardRef(({ session, onChangeDishes }, ref) => {
	const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

	const [dishToEdit, setDishToEdit] = useState(null)
	const [isAddMode, setIsAddMode] = useState(!dishToEdit)

	useImperativeHandle(ref, () => ({
		openModalWithDish(dish) {
			setDishToEdit(dish)
			setValue('name', dish.name)
			onOpen()
		},
	}))

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: zodResolver(dishschema),
		defaultValues: {
			name_dish: '',
			description_dish: '',
			price_dish: '',
			category_dish: '',
			type_dish: '',
		},
	})

	const sessionFromStore = useMenusStore(state => state.session)
	const setSession = useMenusStore(state => state.setSession)

	const onSubmit = data => {
		if (isAddMode) {
			postDish(data, sessionFromStore).then(res => {
				// Refresh your dishes list or state here
				const newDish = { ...res.data.attributes, id: res.data.id }
				onChangeDishes(newDish, false)
			})
		} else {
			putDish(dishToEdit.id, data, sessionFromStore).then(res => {
				// Refresh your dishes list or state here
				const newDish = { ...res.data.attributes, id: res.data.id }
				onChangeDishes(newDish, true)
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

	const openAdd = () => {
		setDishToEdit(null)
		onOpen()
	}

	useEffect(() => {
		setSession(session)
	}, [])

	useEffect(() => {
		if (dishToEdit) {
			setIsAddMode(false)
		} else {
			setIsAddMode(true)
			reset(
				{
					name: '',
					activated: false,
					available_date_start: '',
					available_date_end: '',
				},
				{ keepValues: false }
			)
		}
	}, [dishToEdit])

	return (
		<>
			<Button
				auto
				color="primary"
				endContent={<PlusIcon />}
				onClick={() => {
					openAdd()
				}}
			>
				{`Ajout d'un plat`}
			</Button>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior="inside"
				classNames={{
					base: '!w-[90vw] max-w-[90vw]',
					header: 'border-b-[1px] border-[#f0f9ff]',
					footer: 'border-t-[1px] border-[#f0f9ff]',
				}}
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className="flex justify-between gap-1 pr-14">
								<ModalHeaderContentComponent
									allergensUpdateOpen={isAllergensUpdateOpen}
									ingredientsUpdateOpen={isIngredientsUpdateOpen}
									lastDishClicked={lastDishClicked}
									isAddMode={isAddMode}
								/>
							</ModalHeader>
							<ModalBody>
								<div className={'grid h-full w-full grid-cols-12 gap-16 p-8'}>
									{!isAllergensUpdateOpen ? (
										<>
											{!isIngredientsUpdateOpen ? (
												<ModalBodyMainContentComponent
													lastDishClicked={lastDishClicked}
													control={control}
													errors={errors}
													ingredientsFromStore={ingredientsFromStore}
													selectedKeys={selectedIngredients}
													ingredientSelected={isIngredientSelected}
													onSelectionChange={onSelectionChangeIngredients}
													onInputChange={onInputChange}
													inputValue={inputValue}
													openIngredientsUpdate={openIngredientsUpdate}
													closeIngredientsUpdate={closeIngredientsUpdate}
													session={sessionFromStore}
													uploadedImage={uploadedImage}
													setUploadedImage={setUploadedImage}
													categoryId={categoryId}
													categoriesFromStore={categoriesFromStore}
													typeDishesFromStore={typeDishesFromStore}
												/>
											) : (
												// ************** INGREDIENTS **************
												<ModalBodyIngredientsComponent
													isIngredientSelected={isIngredientSelected}
													ingredientsFromStore={ingredientsFromStore}
													onSelectionChange={onSelectionChangeIngredients}
												/>
											)}
										</>
									) : (
										// ************** ALLERGENS **************
										<ModalBodyAllergensComponent
											allergensFromStore={allergensFromStore}
											isAllergensSelected={isAllergensSelected}
											onClickAllergens={onClickAllergens}
										/>
									)}
								</div>
							</ModalBody>
							<ModalFooter>
								<div
									className={'flex h-full w-full items-center justify-between'}
								>
									{
										// ************** FOOTER **************
										!isAllergensUpdateOpen ? (
											!isIngredientsUpdateOpen ? (
												<ModalFooterMainContentComponent
													handleSubmit={handleSubmit}
													onSubmit={onSubmit}
													onClose={onClose}
													resetAll={resetAll}
													dietsFromStore={dietsFromStore}
													isDietSelected={isDietSelected}
													onClickDiet={onClickDiet}
													openAllergensUpdate={openAllergensUpdate}
												/>
											) : (
												<ModalFooterBackComponent
													onPress={closeIngredientsUpdate}
												/>
											)
										) : (
											<ModalFooterBackComponent
												onPress={closeAllergensUpdate}
											/>
										)
									}
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
})

DishesModal.displayName = 'DishesModal'
