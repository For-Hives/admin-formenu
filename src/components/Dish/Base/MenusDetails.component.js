'use client'
import { useEffect, useState } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Button,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { DishDetailsComponent } from '@/components/Dish/Base/DishDetails.component'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModalHeaderContentComponent } from '@/components/Dish/Base/ModalDish/ModalHeaderContent.component'
import { ModalBodyMainContentComponent } from '@/components/Dish/Base/ModalDish/ModalBodyMainContent.component'
import { ModalBodyIngredientsComponent } from '@/components/Dish/Base/ModalDish/ModalBodyIngredients.component'
import { ModalBodyAllergensComponent } from '@/components/Dish/Base/ModalDish/ModalBodyAllergens.component'
import { ModalFooterMainContentComponent } from '@/components/Dish/Base/ModalDish/ModalFooterMainContent.component'
import { ModalFooterBackComponent } from '@/components/ModalFooterBack.component'
import { postDishes } from '@/services/dish/postDish'
import { putDishes } from '@/services/dish/putDish'
import { deleteDish } from '@/services/dish/deleteDish'
import Image from 'next/image'

const formSchema = z.object({
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
	// selectedKeys: z.array(z.string()).optional(),
	// image: z.any().optional(),
})

/**
 * @param {Object} menu - The menu object containing the menu details.
 * @return {JSX.Element} - The JSX element representing the menu details.
 */
export default function MenusDetails({
	menu,
	ingredients,
	allergens,
	diets,
	session,
	categories,
	categoryId,
	typeDishes,
}) {
	const lastDishClicked = useMenusStore(state => state.lastDishClicked)
	const sessionFromStore = useMenusStore(state => state.session)
	const setSession = useMenusStore(state => state.setSession)

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name_dish: lastDishClicked?.name || '', // Ensure lastDishClicked is defined
			description_dish: lastDishClicked?.description || '',
			price_dish: lastDishClicked?.price?.toString() || '',
			category_dish: lastDishClicked?.category?.id?.toString() || '',
			type_dish: lastDishClicked?.type_dish?.id?.toString() || '',
			// Set default values for other fields if necessary
		},
	})
	const [isAddMode, setIsAddMode] = useState(false)

	// initials values
	// use the category params : categoryId & filter on the menu object , then set the new dish with the correct category ( and set it in the correct way in the store)
	const initialIngredients = useMenusStore(state => state.ingredients)
	const initialCategories = useMenusStore(state => state.categories)
	const initialTypeDishes = useMenusStore(state => state.typeDishes)
	const initialAllergens = useMenusStore(state => state.allergens)
	const initialDiets = useMenusStore(state => state.diets)
	const initialMenu = useMenusStore(state => state.menu)
	const initialLastDishClicked = useMenusStore(state => state.lastDishClicked)
	const initialSelectedKeys = []
	const initialInputValue = ''
	const initialIsIngredientsUpdateOpen = false

	// States
	const ingredientsFromStore = useMenusStore(state => state.ingredients)
	const categoriesFromStore = useMenusStore(state => state.categories)
	const allergensFromStore = useMenusStore(state => state.allergens)
	const typeDishesFromStore = useMenusStore(state => state.typeDishes)
	const dietsFromStore = useMenusStore(state => state.diets)
	const menuFromStore = useMenusStore(state => state.menu)
	// Setters
	const setIngredients = useMenusStore(state => state.setIngredients)
	const setCategories = useMenusStore(state => state.setCategories)
	const setAllergens = useMenusStore(state => state.setAllergens)
	const setTypeDishes = useMenusStore(state => state.setTypeDishes)
	const setDiets = useMenusStore(state => state.setDiets)
	const setStore = useMenusStore(state => state.setMenu)
	const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)
	// Modal disclosure
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

	// State to store the selected keys (IDs) and input value
	const [selectedIngredients, setSelectedIngredients] = useState([])
	const [inputValue, setInputValue] = useState('')

	const [isIngredientsUpdateOpen, setIsIngredientsUpdateOpen] = useState(false)
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

				// Efficiently update menuFromStore without deep cloning
				const updatedMenuFromStore = { ...menuFromStore }
				updatedMenuFromStore.categories = updatedMenuFromStore.categories.map(
					category => {
						if (category.id === updatedLastDishClicked.category.id) {
							return {
								...category,
								dishes: [...category.dishes, updatedLastDishClicked],
							}
						} else {
							return category
						}
					}
				)

				setStore(updatedMenuFromStore)
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

				// Efficiently update menuFromStore without deep cloning
				const updatedMenuFromStore = { ...menuFromStore }
				updatedMenuFromStore.categories = updatedMenuFromStore.categories.map(
					category => ({
						...category,
						dishes: category.dishes.map(dish => {
							if (dish.id === updatedLastDishClicked.id) {
								return updatedLastDishClicked
							}
							return dish
						}),
					})
				)

				// deep copy of the updatedMenuFromStore
				const copy = JSON.parse(JSON.stringify(updatedMenuFromStore))
				setStore(copy)
				onClose()
			})
		}
	}

	const onClickAddDish = () => {
		setIsAddMode(true)
		resetAll()
		setLastDishClicked({})
		onOpen()
	}

	/**
	 * Cancel & reset
	 */
	const resetAll = () => {
		setIngredients(initialIngredients)
		setCategories(initialCategories)
		setAllergens(initialAllergens)
		setDiets(initialDiets)
		setStore(initialMenu)
		setLastDishClicked(initialLastDishClicked)
		setTypeDishes(initialTypeDishes)
		setUploadedImage(null)
		setSelectedIngredients(initialSelectedKeys)
		setInputValue(initialInputValue)
		setIsIngredientsUpdateOpen(initialIsIngredientsUpdateOpen)
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

	const onOpendelete = id => {
		deleteDish(id, sessionFromStore).then(() => {
			const updatedMenuFromStore = { ...menuFromStore }
			updatedMenuFromStore.categories = updatedMenuFromStore.categories.map(
				category => ({
					...category,
					dishes: category.dishes.filter(dish => dish.id !== id),
				})
			)

			// deep copy of the updatedMenuFromStore
			const copy = JSON.parse(JSON.stringify(updatedMenuFromStore))
			setStore(copy)
		})
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
									<ModalHeader className="flex justify-between gap-1 pr-14">
										<ModalHeaderContentComponent
											allergensUpdateOpen={isAllergensUpdateOpen}
											ingredientsUpdateOpen={isIngredientsUpdateOpen}
											lastDishClicked={lastDishClicked}
											isAddMode={isAddMode}
										/>
									</ModalHeader>
									<ModalBody>
										<div
											className={'grid h-full w-full grid-cols-12 gap-16 p-8'}
										>
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
											className={
												'flex h-full w-full items-center justify-between'
											}
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

					<div className={'absolute right-0 top-0 m-8'}>
						<Link
							type={'button'}
							onClick={() => {
								onClickAddDish()
							}}
							className={
								'relative flex h-[60px] w-[60px] cursor-pointer items-center justify-center overflow-hidden'
							}
						>
							<Image
								src="/icons/add.svg"
								alt="icon add"
								width={40}
								height={40}
								className={
									'absolute top-1/2 h-[40px] w-[40px] -translate-x-1/2 ' +
									'left-1/2 -translate-y-1/2 transform transition-all hover:brightness-110 hover:saturate-150'
								}
							/>
						</Link>
					</div>
					{/* Title for the classic page */}
					<h2>
						→{' '}
						<span className={'font-playpen_sans font-black italic'}>
							&quot;{menu.title}&quot;
						</span>
					</h2>

					{/* Description of dishes */}
					<div className={'flex w-full flex-col gap-8'}>
						{menuFromStore?.categories?.map(
							category =>
								category?.dishes &&
								category?.dishes.map(dish => (
									<div
										key={`category${category.id}dish${dish.id}`}
										className={'h-full w-full'}
									>
										<DishDetailsComponent
											dish={dish}
											menuId={menuFromStore?.id}
											onOpenModalEdit={onOpen}
											setLastDishClicked={setLastDishClicked}
											setIsAddMode={setIsAddMode}
											onOpendelete={onOpendelete}
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
