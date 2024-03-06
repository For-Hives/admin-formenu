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
import { postCategory } from '@/services/categories/postCategory'
import { putCategory } from '@/services/categories/putCategory'
import { useMenusStore } from '@/stores/menu.store'
import { InputNameCategoryComponent } from '@/components/Categories/CategoriesModal/InputNameCategory.component'
import { InputOrderCategoryComponent } from '@/components/Categories/CategoriesModal/InputOrderCategory.component'
import { InputDepthCategoryComponent } from '@/components/Categories/CategoriesModal/InputDepthCategory.component'
import { DishesCategoryComponent } from '@/components/Categories/CategoriesModal/DishesCategory.component'
import { ModalBodyDishesComponent } from '@/components/Categories/CategoriesModal/ModalBodyDishes.component'
import { ModalFooterBackComponent } from '@/components/ModalFooterBack.component'
import { InputCategoryCategoryComponent } from '@/components/Categories/CategoriesModal/InputCategoryCategory.component'
import { InputMenuCategoryComponent } from '@/components/Categories/CategoriesModal/InputMenuCategory.component'

const categorieschema = z.object({
	name: z.string().min(1, 'Le nom de la categorie est requise'),
	order: z.string().min(0, "L'ordre de la categorie est requise"),
	depth: z.string().min(0, 'La profondeur de la categorie est requise'),
	menu: z.string().min(0, 'Le menu de la categorie est requise'),
	category: z.string().min(0, 'La categorie de la categorie est requise'),
})

export const CategoriesModal = forwardRef(
	({ session, onChangeCategories, dishes, menus, categories }, ref) => {
		const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

		const [selectedDishes, setSelectedDishes] = useState([])
		const [isDishesModalOpen, setIsDishesModalOpen] = useState(false)

		const [categoryToEdit, setCategoryToEdit] = useState(null)
		const [isAddMode, setIsAddMode] = useState(!categoryToEdit)

		const openDishesUpdate = () => {
			setIsDishesModalOpen(true)
		}
		const closeDishesUpdate = () => {
			setIsDishesModalOpen(false)
		}

		const isDishesSelected = dishId => {
			return selectedDishes.includes(dishId.toString())
		}

		const onSelectionChangeDish = dishId => {
			if (dishId == null) return

			const dishToAdd = dishes.find(
				item => item.id.toString() === dishId.toString()
			)

			const dishList = categoryToEdit?.dishes || []

			const isDishInCategory = dishList.some(
				item => item.id.toString() === dishId.toString()
			)

			if (!isDishInCategory) {
				// Create a new array with the added dish
				const newDishes = [...dishList, dishToAdd]

				// Deeply clone categoryToEdit and update its dishes
				const newCategoryToEdit = {
					...categoryToEdit,
					dishes: newDishes,
				}

				// Update the state with the new object
				setCategoryToEdit(newCategoryToEdit)
			} else {
				// Create a new array without the selected dish
				const newDishes = dishList.filter(
					item => item.id.toString() !== dishId.toString()
				)

				// Deeply clone categoryToEdit and update its dishes
				const newCategoryToEdit = {
					...categoryToEdit,
					dishes: newDishes,
				}

				// Update the state with the new object
				setCategoryToEdit(newCategoryToEdit)
			}
		}

		useImperativeHandle(ref, () => ({
			openModalWithCategory(category) {
				setCategoryToEdit(category)
				setValue('name', category.name.toString())
				setValue('order', category.order.toString())
				setValue('depth', category.depth.toString())
				setValue('menu', category.menu?.id.toString())
				setValue('category', category.category?.id.toString())
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
			resolver: zodResolver(categorieschema),
			defaultValues: {
				name: '',
				order: '',
				depth: '',
				menu: '',
				category: '',
			},
		})

		const sessionFromStore = useMenusStore(state => state.session)
		const setSession = useMenusStore(state => state.setSession)

		const onSubmit = data => {
			data = {
				...data,
				dishes: selectedDishes,
			}
			if (isAddMode || categoryToEdit?.id === undefined) {
				postCategory(data, sessionFromStore).then(res => {
					// Refresh your categories list or state here
					const newCategory = { ...res.data.attributes, id: res.data.id }
					onChangeCategories(newCategory, false)
				})
			} else {
				putCategory(categoryToEdit.id, data, sessionFromStore).then(res => {
					// Refresh your categories list or state here
					const newCategory = {
						...res.data.attributes,
						id: res.data.id,
						category: {
							...res.data.attributes.category?.data.attributes,
							id: res.data.attributes.category?.data.id,
						},
						menu: {
							...res.data.attributes.menu?.data.attributes,
							id: res.data.attributes.menu?.data.id,
						},
						dishes: res.data.attributes.dishes?.data.map(dish => {
							return {
								...dish.attributes,
								id: dish.id,
							}
						}),
					}

					onChangeCategories(newCategory, true)
				})
			}
			reset(
				{
					name: '',
					order: '',
					depth: '',
					menu: '',
					category: '',
				},
				{ keepValues: false }
			)
			setCategoryToEdit(null)
			setSelectedDishes([])
			onClose()
		}

		const openAdd = () => {
			setCategoryToEdit(null)
			onOpen()
		}

		useEffect(() => {
			setSession(session)
		}, [])

		useEffect(() => {
			if (categoryToEdit) {
				setIsAddMode(false)
			} else {
				setIsAddMode(true)
				reset(
					{
						name: '',
						order: '',
						depth: '',
						menu: '',
						category: '',
					},
					{ keepValues: false }
				)
			}
		}, [categoryToEdit])

		useEffect(() => {
			if (categoryToEdit?.length === 0) return
			setSelectedDishes(
				categoryToEdit?.dishes?.map(item => item.id.toString()) || []
			)
		}, [categoryToEdit])

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
					{`Ajout d'une catégorie`}
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
							{isAddMode || categoryToEdit?.id === undefined
								? 'Ajouter une nouvelle categorie'
								: 'Modifier la catégorie ' + categoryToEdit?.id}
						</ModalHeader>
						<ModalBody>
							{!isDishesModalOpen ? (
								<div className={'grid h-full w-full grid-cols-12 gap-16 p-8'}>
									<div className={'col-span-7 flex flex-col gap-6'}>
										<InputNameCategoryComponent
											control={control}
											errors={errors}
											name={'name'}
											value={categoryToEdit?.name}
										/>
										<InputOrderCategoryComponent
											control={control}
											errors={errors}
											name={'order'}
											value={categoryToEdit?.order}
										/>
										<InputDepthCategoryComponent
											control={control}
											errors={errors}
											name={'depth'}
											value={categoryToEdit?.depth}
										/>
									</div>
									<div className={'col-span-5 flex flex-col gap-6'}>
										<DishesCategoryComponent
											selectedDishes={selectedDishes}
											categoryToEdit={categoryToEdit}
											onSelectionChangeDish={onSelectionChangeDish}
											openDishesUpdate={openDishesUpdate}
										/>
										<InputCategoryCategoryComponent
											value={categoryToEdit?.category}
											control={control}
											errors={errors}
											name={'category'}
											categories={categories}
										/>
										<InputMenuCategoryComponent
											value={categoryToEdit?.menu}
											control={control}
											errors={errors}
											name={'menu'}
											menus={menus}
										/>
									</div>
								</div>
							) : (
								//********** Dishes Modal **********
								<ModalBodyDishesComponent
									isDisheselected={isDishesSelected}
									dishesFromStore={dishes}
									onSelectionChange={onSelectionChangeDish}
								/>
							)}
						</ModalBody>
						<ModalFooter>
							{/* ****************** FOOTER **********************/}
							{!isDishesModalOpen ? (
								<Button auto color="primary" onClick={handleSubmit(onSubmit)}>
									{isAddMode || categoryToEdit?.id === undefined
										? 'Ajouter'
										: 'Modifier'}
								</Button>
							) : (
								<ModalFooterBackComponent onPress={closeDishesUpdate} />
							)}
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
)

CategoriesModal.displayName = 'CategoriesModal'
