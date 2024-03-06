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
import { postDishes } from '@/services/dish/postDish'
import { putDishes } from '@/services/dish/putDish'
import { useMenusStore } from '@/stores/menu.store'
import { ModalHeaderContentComponent } from '@/components/Dish/Base/ModalDish/ModalHeaderContent.component'
import { ModalBodyMainContentComponent } from '@/components/Dish/Base/ModalDish/ModalBodyMainContent.component'
import { ModalBodyIngredientsComponent } from '@/components/Dish/Base/ModalDish/ModalBodyIngredients.component'
import { ModalBodyAllergensComponent } from '@/components/Dish/Base/ModalDish/ModalBodyAllergens.component'
import { ModalFooterMainContentComponent } from '@/components/Dish/Base/ModalDish/ModalFooterMainContent.component'
import { ModalFooterBackComponent } from '@/components/ModalFooterBack.component'

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

export const DishesModal = forwardRef(
	(
		{
			session,
			onChangeDishes,
			ingredients,
			typeDishes,
			diets,
			allergens,
			categories,
		},
		ref
	) => {
		const lastDishClicked = useMenusStore(state => state.lastDishClicked)
		const sessionFromStore = useMenusStore(state => state.session)
		const setSession = useMenusStore(state => state.setSession)

		// initials values
		// use the category params : categoryId & filter on the menu object , then set the new dish with the correct category ( and set it in the correct way in the store)
		const initialIngredients = useMenusStore(state => state.ingredients)
		const initialCategories = useMenusStore(state => state.categories)
		const initialTypeDishes = useMenusStore(state => state.typeDishes)
		const initialAllergens = useMenusStore(state => state.allergens)
		const initialDiets = useMenusStore(state => state.diets)

		// States
		const ingredientsFromStore = useMenusStore(state => state.ingredients)
		const categoriesFromStore = useMenusStore(state => state.categories)
		const allergensFromStore = useMenusStore(state => state.allergens)
		const typeDishesFromStore = useMenusStore(state => state.typeDishes)
		const dietsFromStore = useMenusStore(state => state.diets)

		// Setters
		const setIngredients = useMenusStore(state => state.setIngredients)
		const setCategories = useMenusStore(state => state.setCategories)
		const setAllergens = useMenusStore(state => state.setAllergens)
		const setTypeDishes = useMenusStore(state => state.setTypeDishes)
		const setDiets = useMenusStore(state => state.setDiets)
		const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)

		const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

		const [isAddMode, setIsAddMode] = useState(true)

		useImperativeHandle(ref, () => ({
			openModalWithDish(dish) {
				const newDish = JSON.parse(JSON.stringify(dish))
				setLastDishClicked(newDish)

				setIsAddMode(false)

				setValue('name', newDish.name)
				setValue('description', newDish.description)
				setValue('price', newDish.price)
				setValue('category', newDish.category)
				setValue('type', newDish.type)

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
				name_dish: lastDishClicked.name || '',
				description_dish: lastDishClicked.description || '',
				price_dish: lastDishClicked.price || '',
				category_dish: lastDishClicked.category || '',
				type_dish: lastDishClicked.type || '',
			},
		})

		// State to store the selected keys (IDs) and input value
		const [selectedIngredients, setSelectedIngredients] = useState([])
		const [inputValue, setInputValue] = useState('')

		const [isIngredientsUpdateOpen, setIsIngredientsUpdateOpen] =
			useState(false)
		const [isAllergensUpdateOpen, setIsAllergensUpdateOpen] = useState(false)
		const [uploadedImage, setUploadedImage] = useState(null)

		const openIngredientsUpdate = () => setIsIngredientsUpdateOpen(true)
		const closeIngredientsUpdate = () => setIsIngredientsUpdateOpen(false)

		const openAllergensUpdate = () => setIsAllergensUpdateOpen(true)
		const closeAllergensUpdate = () => setIsAllergensUpdateOpen(false)

		const isIngredientSelected = ingredientId => {
			return selectedIngredients.includes(ingredientId.toString())
		}

		const isAllergensSelected = allergensName => {
			return lastDishClicked[allergensName]
		}

		const isDietSelected = dietName => {
			return lastDishClicked[dietName]
		}

		const onClickAllergens = allergensName => {
			const newLastDishClicked = JSON.parse(JSON.stringify(lastDishClicked))
			newLastDishClicked[allergensName] = !lastDishClicked[allergensName]
			setLastDishClicked(newLastDishClicked)
		}

		const onClickDiet = dietName => {
			const newLastDishClicked = JSON.parse(JSON.stringify(lastDishClicked))
			newLastDishClicked[dietName] = !lastDishClicked[dietName]
			setLastDishClicked(newLastDishClicked)
		}

		// Handle selection change
		const onSelectionChangeIngredients = ingredientId => {
			if (ingredientId == null) return

			const ingredientToAdd = ingredients.find(
				item => item.id.toString() === ingredientId.toString()
			)

			// Ensure lastDishClicked.ingredients is initialized as an array if it's undefined
			const ingredientsList = lastDishClicked.ingredients || []

			const isIngredientInDish = ingredientsList.some(
				item => item.id.toString() === ingredientId.toString()
			)

			if (!isIngredientInDish) {
				// Create a new array with the added ingredient
				const newIngredients = [...ingredientsList, ingredientToAdd]

				// Deeply clone lastDishClicked and update its ingredients
				const newLastDishClicked = {
					...lastDishClicked,
					ingredients: newIngredients,
				}

				// Update the state with the new object
				setLastDishClicked(newLastDishClicked)
			} else {
				// Create a new array without the selected ingredient
				const newIngredients = ingredientsList.filter(
					item => item.id.toString() !== ingredientId.toString()
				)

				// Deeply clone lastDishClicked and update its ingredients
				const newLastDishClicked = {
					...lastDishClicked,
					ingredients: newIngredients,
				}

				// Update the state with the new object
				setLastDishClicked(newLastDishClicked)
			}
		}

		// Handle input change
		const onInputChange = value => {
			setInputValue(value)
		}

		// Handle form submission
		const onSubmit = data => {
			// Update lastDishClicked directly since its reference is not used elsewhere before the update
			let updatedLastDishClicked = {
				...lastDishClicked,
				name: data.name_dish,
				description: data.description_dish,
				price: parseFloat(data.price_dish),
				category: categoriesFromStore.find(
					category => category.id.toString() === data.category_dish.toString()
				),
				type_dish: typeDishesFromStore.find(
					typeDish => typeDish.id.toString() === data.type_dish.toString()
				),
				image: uploadedImage, // Assuming uploadedImage is already in the desired format
			}

			// if isAddMode is true, then we are adding a new dish
			if (isAddMode) {
				// Add the new dish to the database and the store
				postDishes(updatedLastDishClicked, sessionFromStore).then(res => {
					// copy updatedLastDishClicked onto res, fusion of both objects
					updatedLastDishClicked = {
						...res.data.attributes,
						...updatedLastDishClicked,
						id: res.data.id,
					}

					setLastDishClicked(updatedLastDishClicked)

					onChangeDishes(updatedLastDishClicked, false)

					onClose()
				})
			} else {
				// Update the dish in the database and the store
				putDishes(
					updatedLastDishClicked.id,
					updatedLastDishClicked,
					sessionFromStore
				).then(() => {
					setLastDishClicked(updatedLastDishClicked)
					onChangeDishes(updatedLastDishClicked, true)
					onClose()
				})
			}
		}

		/**
		 * Cancel & reset
		 */
		const resetAll = () => {
			setIngredients(initialIngredients)
			setCategories(initialCategories)
			setAllergens(initialAllergens)
			setDiets(initialDiets)
			setLastDishClicked({})
			setTypeDishes(initialTypeDishes)
			setUploadedImage(null)
			setSelectedIngredients([])
			setInputValue('')
			setIsIngredientsUpdateOpen(false)
			setIsAllergensUpdateOpen(false)
			reset(
				{
					name_dish: '',
					description_dish: '',
					price_dish: '',
					category_dish: '',
					type_dish: '',
				},
				{ keepValues: false }
			)
		}

		useEffect(() => {
			if (Object.keys(ingredientsFromStore).length === 0) {
				setIngredients(ingredients)
			}
		}, [ingredientsFromStore])

		useEffect(() => {
			if (Object.keys(allergensFromStore).length === 0) {
				setAllergens(allergens)
			}
		}, [allergensFromStore])

		useEffect(() => {
			if (Object.keys(dietsFromStore).length === 0) {
				setDiets(diets)
			}
		}, [dietsFromStore])

		useEffect(() => {
			if (
				Object.keys(categoriesFromStore).length === 0 &&
				categories !== undefined
			) {
				setCategories(categories)
			}
		}, [categoriesFromStore])

		useEffect(() => {
			if (
				Object.keys(typeDishesFromStore).length === 0 &&
				typeDishes !== undefined
			) {
				setTypeDishes(typeDishes)
			}
		}, [typeDishesFromStore])

		useEffect(() => {
			if (Object.keys(lastDishClicked).length === 0) return
			setSelectedIngredients(
				lastDishClicked?.ingredients?.map(item => item.id.toString()) || []
			)
		}, [lastDishClicked])

		useEffect(() => {
			// When lastDishClicked updates, reset the form with new default values
			if (lastDishClicked && !isAddMode) {
				reset({
					name_dish: lastDishClicked.name,
					description_dish: lastDishClicked.description,
					price_dish: lastDishClicked.price?.toString(),
					category_dish: lastDishClicked.category?.id?.toString(),
					type_dish: lastDishClicked.type_dish?.id?.toString(),
				})
			}
		}, [lastDishClicked, reset])

		useEffect(() => {
			setSession(session)
		}, [])

		const openAdd = () => {
			setLastDishClicked({})
			resetAll()
			setIsAddMode(true)
			onOpen()
		}

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
						<ModalHeader className="flex justify-between gap-1 pr-14">
							<ModalHeaderContentComponent
								allergensUpdateOpen={isAllergensUpdateOpen}
								ingredientsUpdateOpen={isIngredientsUpdateOpen}
								lastDishClicked={isAddMode ? {} : lastDishClicked}
								isAddMode={isAddMode}
							/>
						</ModalHeader>
						<ModalBody>
							<div className={'grid h-full w-full grid-cols-12 gap-16 p-8'}>
								{!isAllergensUpdateOpen ? (
									<>
										{!isIngredientsUpdateOpen ? (
											<ModalBodyMainContentComponent
												control={control}
												errors={errors}
												ingredientsFromStore={ingredientsFromStore}
												ingredientSelected={isIngredientSelected}
												onInputChange={onInputChange}
												inputValue={inputValue}
												closeIngredientsUpdate={closeIngredientsUpdate}
												session={sessionFromStore}
												uploadedImage={uploadedImage}
												setUploadedImage={setUploadedImage}
												categoriesFromStore={categoriesFromStore}
												typeDishesFromStore={typeDishesFromStore}
												selectedKeys={selectedIngredients}
												lastDishClicked={lastDishClicked}
												onSelectionChange={onSelectionChangeIngredients}
												openIngredientsUpdate={openIngredientsUpdate}
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
										<ModalFooterBackComponent onPress={closeAllergensUpdate} />
									)
								}
							</div>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
)

DishesModal.displayName = 'DishesModal'
