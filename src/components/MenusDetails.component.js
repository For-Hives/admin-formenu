'use client'
import React, { useEffect, useState } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { DishDetails } from '@/components/DishDetails'
import { InputNameDish } from '@/components/InputNameDish'
import { InputDropzoneImageDish } from '@/components/InputDropzoneImageDish'
import { InputDescriptionDish } from '@/components/InputDescriptionDish'
import { InputPriceDish } from '@/components/InputPriceDish'
import { InputIngredientsDish } from '@/components/InputIngredientsDish'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
	name_dish: z.string().min(1, 'Dish name is required'),
	description_dish: z.string().min(1, 'Description is required'),
	price_dish: z
		.string()
		.optional()
		.regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
	selectedKeys: z.array(z.string()).optional(),
	image: z.any().optional(),
})

/**
 * @param {Object} menu - The menu object containing the menu details.
 * @return {JSX.Element} - The JSX element representing the menu details.
 */
export default function MenusDetails({ menu, ingredients }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
	})
	// initials values
	const initialIngredients = useMenusStore(state => state.ingredients)
	const initialMenu = useMenusStore(state => state.menu)
	const initialLastDishClicked = useMenusStore(state => state.lastDishClicked)
	const initialSelectedKeys = []
	const initialInputValue = ''
	const initialIsIngredientsUpdateOpen = false

	// States
	const ingredientsFromStore = useMenusStore(state => state.ingredients)
	const menuFromStore = useMenusStore(state => state.menu)
	const lastDishClicked = useMenusStore(state => state.lastDishClicked)
	// Setters
	const setIngredients = useMenusStore(state => state.setIngredients)
	const setStore = useMenusStore(state => state.setMenu)
	const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)
	// Modal disclosure
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	// State to store the selected keys (IDs) and input value
	const [selectedKeys, setSelectedKeys] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [isIngredientsUpdateOpen, setIsIngredientsUpdateOpen] = useState(false)

	const openIngredientsUpdate = () => setIsIngredientsUpdateOpen(true)
	const closeIngredientsUpdate = () => setIsIngredientsUpdateOpen(false)

	const isIngredientSelected = ingredientId => {
		return selectedKeys.includes(ingredientId.toString())
	}

	// Handle selection change
	const onSelectionChange = ingredientId => {
		if (ingredientId == null) return

		const ingredientToAdd = ingredients.find(
			item => item.id.toString() === ingredientId.toString()
		)

		const isIngredientInDish = lastDishClicked.ingredients.some(
			item => item.id.toString() === ingredientId.toString()
		)

		if (!isIngredientInDish) {
			// Create a new array with the added ingredient
			const newIngredients = [...lastDishClicked.ingredients, ingredientToAdd]

			// Deeply clone lastDishClicked and update its ingredients
			const newLastDishClicked = JSON.parse(JSON.stringify(lastDishClicked))
			newLastDishClicked.ingredients = newIngredients

			// Update the state with the new object
			setLastDishClicked(newLastDishClicked)
		} else {
			// Create a new array without the selected ingredient
			const newIngredients = lastDishClicked.ingredients.filter(
				item => item.id.toString() !== ingredientId.toString()
			)

			// Deeply clone lastDishClicked and update its ingredients
			const newLastDishClicked = JSON.parse(JSON.stringify(lastDishClicked))
			newLastDishClicked.ingredients = newIngredients

			// Update the state with the new object
			setLastDishClicked(newLastDishClicked)
		}
	}

	// Handle input change
	const onInputChange = value => {
		setInputValue(value)
	}

	useEffect(() => {
		if (menuFromStore.id !== menu.id) {
			setStore(menu)
		}
	}, [menu, menuFromStore, setStore])

	const resetAll = () => {
		setIngredients(initialIngredients)
		setStore(initialMenu)
		setLastDishClicked(initialLastDishClicked)
		setSelectedKeys(initialSelectedKeys)
		setInputValue(initialInputValue)
		setIsIngredientsUpdateOpen(initialIsIngredientsUpdateOpen)
	}

	useEffect(() => {
		if (Object.keys(ingredientsFromStore).length === 0) {
			setIngredients(ingredients)
		}
	}, [ingredientsFromStore])

	useEffect(() => {
		if (Object.keys(lastDishClicked).length === 0) return
		setSelectedKeys(lastDishClicked.ingredients.map(item => item.id.toString()))
	}, [lastDishClicked])

	return (
		<>
			{!menuFromStore ? (
				<div>loading</div>
			) : (
				<>
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
									<ModalHeader className="flex flex-col gap-1">
										Modification du plat
									</ModalHeader>
									<ModalBody>
										<div
											className={'grid h-full w-full grid-cols-12 gap-16 p-8'}
										>
											{!isIngredientsUpdateOpen ? (
												<>
													<div className={'col-span-6 flex flex-col gap-6'}>
														<InputNameDish
															control={control}
															errors={errors}
															name={'name_dish'}
														/>
														<InputDescriptionDish
															control={control}
															errors={errors}
															name={'description_dish'}
														/>
														<InputDropzoneImageDish
															control={control}
															errors={errors}
															name={'image_dish'}
														/>
													</div>
													<div className={'col-span-6 flex flex-col gap-6'}>
														<InputIngredientsDish
															ingredientsFromStore={ingredientsFromStore}
															selectedKeys={selectedKeys}
															lastDishClicked={lastDishClicked}
															isIngredientSelected={isIngredientSelected}
															onSelectionChange={onSelectionChange}
															onInputChange={onInputChange}
															inputValue={inputValue}
															openIngredientsUpdate={openIngredientsUpdate}
															closeIngredientsUpdate={closeIngredientsUpdate}
															control={control}
															errors={errors}
															name={'ingredients_dish'}
														/>
														<InputPriceDish
															control={control}
															errors={errors}
															name={'price_dish'}
														/>
													</div>
												</>
											) : (
												<div className={'col-span-12 flex flex-col gap-3'}>
													<div className={'grid grid-cols-3 gap-4'}>
														{ingredientsFromStore.map(ingredient => (
															<div key={ingredient.id}>
																<Checkbox
																	isSelected={isIngredientSelected(
																		ingredient.id
																	)}
																	onChange={() =>
																		onSelectionChange(ingredient.id)
																	}
																>
																	{ingredient.name}
																</Checkbox>
															</div>
														))}
													</div>
												</div>
											)}
										</div>
									</ModalBody>
									<ModalFooter>
										{!isIngredientsUpdateOpen ? (
											<>
												<Button
													color="danger"
													variant="flat"
													onPress={() => {
														// reset
														resetAll()
														// close
														onClose()
													}}
													className={'no-underline'}
													startContent={
														<i
															className={`fi fi-sr-arrow-left icon-button`}
														></i>
													}
												>
													Annuler & fermer
												</Button>
												<Button
													color="primary"
													onPress={() => {
														handleSubmit(data => console.log(data))()
													}}
													className={'no-underline'}
													startContent={
														<i className={`fi fi-sr-disk icon-button`}></i>
													}
												>
													Enregistrer & fermer
												</Button>
											</>
										) : (
											<Button
												color="primary"
												variant="flat"
												onPress={closeIngredientsUpdate}
												className={'no-underline'}
												startContent={
													<i className={`fi fi-sr-arrow-left icon-button`}></i>
												}
											>
												Revenir en arrière
											</Button>
										)}
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>

					<h2>
						→{' '}
						<span className={'font-playpen_sans font-black italic'}>
							&quot;{menu.title}&quot;
						</span>
					</h2>

					<div className={'flex w-full flex-col gap-8'}>
						{menuFromStore?.categories?.map(
							category =>
								category?.dishes &&
								category?.dishes.map(dish => (
									<div key={dish.id} className={'h-full w-full'}>
										<DishDetails
											dish={dish}
											menuId={menuFromStore?.id}
											onOpen={onOpen}
											setLastDishClicked={setLastDishClicked}
										/>
									</div>
								))
						)}
					</div>
				</>
			)}
		</>
	)
}
