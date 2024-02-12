'use client'
import { useEffect, useState } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import { DishDetails } from '@/components/DishDetails'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModalHeaderContent } from '@/components/ModalDish/ModalHeaderContent'
import { ModalBodyMainContent } from '@/components/ModalDish/ModalBodyMainContent'
import { ModalBodyIngredients } from '@/components/ModalDish/ModalBodyIngredients'
import { ModalBodyAllergens } from '@/components/ModalDish/ModalBodyAllergens'
import { ModalFooterMainContent } from '@/components/ModalDish/ModalFooterMainContent'
import { ModalFooterBackIngredients } from '@/components/ModalDish/ModalFooterBackIngredients'
import { ModalFooterBackAllergens } from '@/components/ModalDish/ModalFooterBackAllergens'

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
}) {
	const lastDishClicked = useMenusStore(state => state.lastDishClicked)

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
			price_dish: lastDishClicked?.price?.toString() || '', // Convert price to string if it's not
			// Set default values for other fields if necessary
		},
	})
	// initials values
	const initialIngredients = useMenusStore(state => state.ingredients)
	const initialAllergens = useMenusStore(state => state.allergens)
	const initialDiets = useMenusStore(state => state.diets)
	const initialMenu = useMenusStore(state => state.menu)
	const initialLastDishClicked = useMenusStore(state => state.lastDishClicked)
	const initialSelectedKeys = []
	const initialInputValue = ''
	const initialIsIngredientsUpdateOpen = false

	// States
	const ingredientsFromStore = useMenusStore(state => state.ingredients)
	const allergensFromStore = useMenusStore(state => state.allergens)
	const dietsFromStore = useMenusStore(state => state.diets)
	const menuFromStore = useMenusStore(state => state.menu)
	// Setters
	const setIngredients = useMenusStore(state => state.setIngredients)
	const setAllergens = useMenusStore(state => state.setAllergens)
	const setDiets = useMenusStore(state => state.setDiets)
	const setStore = useMenusStore(state => state.setMenu)
	const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)
	// Modal disclosure
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	// State to store the selected keys (IDs) and input value
	const [selectedKeys, setSelectedKeys] = useState([])
	const [inputValue, setInputValue] = useState('')
	const [isIngredientsUpdateOpen, setIsIngredientsUpdateOpen] = useState(false)
	const [isAllergensUpdateOpen, setIsAllergensUpdateOpen] = useState(false)
	const [uploadedImage, setUploadedImage] = useState(null)

	const openIngredientsUpdate = () => setIsIngredientsUpdateOpen(true)
	const closeIngredientsUpdate = () => setIsIngredientsUpdateOpen(false)

	const openAllergensUpdate = () => setIsAllergensUpdateOpen(true)
	const closeAllergensUpdate = () => setIsAllergensUpdateOpen(false)

	const isIngredientSelected = ingredientId => {
		return selectedKeys.includes(ingredientId.toString())
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
		setAllergens(initialAllergens)
		setDiets(initialDiets)
		setStore(initialMenu)
		setLastDishClicked(initialLastDishClicked)
		setUploadedImage(initialLastDishClicked.image)
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
		if (Object.keys(lastDishClicked).length === 0) return
		setSelectedKeys(lastDishClicked.ingredients.map(item => item.id.toString()))
		setUploadedImage(lastDishClicked.image)
	}, [lastDishClicked])

	useEffect(() => {
		// When lastDishClicked updates, reset the form with new default values
		if (lastDishClicked) {
			reset({
				name_dish: lastDishClicked.name,
				description_dish: lastDishClicked.description,
				price_dish: lastDishClicked.price?.toString(), // Again, ensure price is a string
				// todo Reset other fields if necessary
			})
		}
	}, [lastDishClicked, reset])

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
										<ModalHeaderContent
											allergensUpdateOpen={isAllergensUpdateOpen}
											ingredientsUpdateOpen={isIngredientsUpdateOpen}
											lastDishClicked={lastDishClicked}
										/>
									</ModalHeader>
									<ModalBody>
										<div
											className={'grid h-full w-full grid-cols-12 gap-16 p-8'}
										>
											{!isAllergensUpdateOpen ? (
												<>
													{!isIngredientsUpdateOpen ? (
														<ModalBodyMainContent
															lastDishClicked={lastDishClicked}
															control={control}
															errors={errors}
															ingredientsFromStore={ingredientsFromStore}
															selectedKeys={selectedKeys}
															ingredientSelected={isIngredientSelected}
															onSelectionChange={onSelectionChange}
															onInputChange={onInputChange}
															inputValue={inputValue}
															openIngredientsUpdate={openIngredientsUpdate}
															closeIngredientsUpdate={closeIngredientsUpdate}
															session={session}
															uploadedImage={uploadedImage}
															setUploadedImage={setUploadedImage}
														/>
													) : (
														<ModalBodyIngredients
															isIngredientSelected={isIngredientSelected}
															ingredientsFromStore={ingredientsFromStore}
															onSelectionChange={onSelectionChange}
														/>
													)}
												</>
											) : (
												// ************** ALLERGENS **************
												<ModalBodyAllergens
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
											{!isAllergensUpdateOpen ? (
												!isIngredientsUpdateOpen ? (
													<ModalFooterMainContent
														handleSubmit={handleSubmit}
														onClose={onClose}
														resetAll={resetAll}
														dietsFromStore={dietsFromStore}
														isDietSelected={isDietSelected}
														onClickDiet={onClickDiet}
														openAllergensUpdate={openAllergensUpdate}
													/>
												) : (
													<ModalFooterBackIngredients
														onPress={closeIngredientsUpdate}
													/>
												)
											) : (
												<ModalFooterBackAllergens
													onPress={closeAllergensUpdate}
												/>
											)}
										</div>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>

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
