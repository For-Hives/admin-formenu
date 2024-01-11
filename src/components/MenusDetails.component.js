'use client'
import React, { useEffect, useState } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Button,
	Checkbox,
	Chip,
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

function InputIngredientsDish({
	selectedKeys,
	lastDishClicked,
	onSelectionChange,
	openIngredientsUpdate,
}) {
	return (
		<div
			className={'flex flex-col gap-4 [&>*]:!transition-none [&>*]:!duration-0'}
		>
			<h2 className={'font-kanit text-lg font-medium'}>Ingrédients</h2>
			<p className={'text-sm italic'}>
				Mets les ingrédients qui composes tes plats ici, ils permettrons aux
				clients de chercher, et retrouver facilement les plats en questions.
			</p>
			<div className={'flex w-full flex-wrap gap-2'}>
				{selectedKeys.map(key => {
					const ingredient = lastDishClicked.ingredients.find(
						item => item.id.toString() === key
					)
					return (
						<Chip
							key={key}
							onClose={() => onSelectionChange(key)}
							variant="flat"
						>
							{ingredient?.name}
						</Chip>
					)
				})}
			</div>
			<Button onClick={openIngredientsUpdate}>Modifier les Ingrédients</Button>
		</div>
	)
}

/**
 * @param {Object} menu - The menu object containing the menu details.
 * @return {JSX.Element} - The JSX element representing the menu details.
 */
export default function MenusDetails({ menu, ingredients }) {
	const ingredientsFromStore = useMenusStore(state => state.ingredients)
	const menuFromStore = useMenusStore(state => state.menu)
	const lastDishClicked = useMenusStore(state => state.lastDishClicked)
	const setIngredients = useMenusStore(state => state.setIngredients)
	const setStore = useMenusStore(state => state.setMenu)
	const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)
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
														<InputNameDish />
														<InputDescriptionDish />
														<InputDropzoneImageDish />
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
														/>
														<InputPriceDish />
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
												{/*todo on close event*/}
												<Button color="danger" variant="flat" onPress={onClose}>
													Fermer
												</Button>
												<Button color="primary" onPress={onClose}>
													Enregistrer
												</Button>
											</>
										) : (
											<>
												<Button
													color="danger"
													variant="flat"
													onPress={closeIngredientsUpdate}
												>
													Revenir en arrière
												</Button>
												<Button
													color="primary"
													onPress={closeIngredientsUpdate}
												>
													Enregistrer les ingrédients
												</Button>
											</>
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
