'use client'
import React, { useEffect, useState } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Checkbox,
	Chip,
	Input,
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
import { customInput } from '@/styles/customConfNextui'

function IngredientsModal({
	isOpen,
	onClose,
	ingredients,
	selectedKeys,
	onSelectionChange,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalHeader>Gérer les Ingrédients</ModalHeader>
			<ModalBody>
				<div className="grid grid-cols-3 gap-4">
					{ingredients.map(ingredient => (
						<div key={ingredient.id}>
							<Checkbox
								checked={selectedKeys.includes(ingredient.id.toString())}
								onChange={() => onSelectionChange(ingredient.id)}
							>
								{ingredient.name}
							</Checkbox>
						</div>
					))}
				</div>
			</ModalBody>
			<ModalFooter>
				<Button auto flat color="error" onClick={onClose}>
					Fermer
				</Button>
				<Button auto onClick={onClose}>
					Enregistrer
				</Button>
			</ModalFooter>
		</Modal>
	)
}

function InputIngredientsDish({
	selectedKeys,
	lastDishClicked,
	ingredientsFromStore,
	onSelectionChange,
	openIngredientsUpdate,
}) {
	return (
		<div
			className={'flex flex-col gap-1 [&>*]:!transition-none [&>*]:!duration-0'}
		>
			<h2>Ingrédients</h2>
			<p>
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

			{/*<Autocomplete*/}
			{/*	shouldCloseOnBlur={false}*/}
			{/*	inputValue={inputValue}*/}
			{/*	classNames={{*/}
			{/*		base: ['!p-0', '[&>*]:!p-0'],*/}
			{/*		listboxWrapper: ['!m-0', '!p-0', 'max-h-[450px]', '[&>*]:!p-0'],*/}
			{/*		selectorButton: 'text-gray-700',*/}
			{/*	}}*/}
			{/*	defaultItems={ingredientsFromStore}*/}
			{/*	onInputChange={onInputChange}*/}
			{/*	onSelectionChange={onSelectionChange}*/}
			{/*	inputProps={{*/}
			{/*		classNames: {*/}
			{/*			base: '!p-0',*/}
			{/*			label: 'text-gray-700',*/}
			{/*			input: [*/}
			{/*				'bg-transparent',*/}
			{/*				'text-gray-700/90 ',*/}
			{/*				'placeholder:text-gray-700/25',*/}
			{/*			],*/}
			{/*			innerWrapper: 'bg-transparent',*/}
			{/*			inputWrapper: [*/}
			{/*				'shadow-none',*/}
			{/*				'border',*/}
			{/*				'border-cyan-900/25',*/}
			{/*				'bg-gray-50',*/}
			{/*				'hover:bg-gray-100',*/}
			{/*				'group-data-[focused=true]:bg-gray-200',*/}
			{/*				'!cursor-text',*/}
			{/*			],*/}
			{/*		},*/}
			{/*	}}*/}
			{/*	listboxProps={{*/}
			{/*		hideSelectedIcon: true,*/}
			{/*		itemClasses: {*/}
			{/*			base: [*/}
			{/*				'[&>*]:!transition-none',*/}
			{/*				'[&>*]:!duration-0',*/}
			{/*				'rounded-none',*/}
			{/*				'text-gray-900',*/}
			{/*				'data-[hover=true]:text-white',*/}
			{/*				'data-[hover=true]:transition-none',*/}
			{/*				'data-[hover=true]:duration-0',*/}
			{/*				'data-[hover=true]:bg-sky-950',*/}
			{/*			],*/}
			{/*		},*/}
			{/*	}}*/}
			{/*	aria-label="Select an employee"*/}
			{/*	placeholder="Enter employee name"*/}
			{/*	popoverProps={{*/}
			{/*		triggerType: 'dialog',*/}
			{/*		offset: 10,*/}
			{/*		classNames: {*/}
			{/*			base: [*/}
			{/*				'[&>*]:!transition-none',*/}
			{/*				'[&>*]:!duration-0',*/}
			{/*				'rounded',*/}
			{/*				'border',*/}
			{/*				'!p-0',*/}
			{/*				'm-0',*/}
			{/*				'border-cyan-900/25',*/}
			{/*				'bg-gray-50',*/}
			{/*			],*/}
			{/*			content: 'border border-cyan-900/25 bg-gray-50 rounded !m-0 !p-0',*/}
			{/*		},*/}
			{/*	}}*/}
			{/*	radius={'sm'}*/}
			{/*	size={'sm'}*/}
			{/*	variant={'bordered'}*/}
			{/*>*/}
			{/*	/!* make it depend of selected keys ( rerender the list on change of selected Keys ) *!/*/}
			{/*	{lastDishClicked.ingredients.map(item => (*/}
			{/*		<AutocompleteItem key={item.id} textValue={item.name}>*/}
			{/*			<Checkbox*/}
			{/*				className={'custom-checkbox'}*/}
			{/*				isSelected={isIngredientSelected(item.id)}*/}
			{/*				onChange={() => onSelectionChange(item.id)}*/}
			{/*				classNames={{*/}
			{/*					wrapper: 'custom-icon',*/}
			{/*					base: 'custom-box',*/}
			{/*				}}*/}
			{/*				radius={'sm'}*/}
			{/*			/>*/}
			{/*			<label>{item.name}</label>*/}
			{/*		</AutocompleteItem>*/}
			{/*	))}*/}
			{/*</Autocomplete>*/}
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

		setSelectedKeys(prev => {
			const ingredientStr = ingredientId.toString()
			if (prev.includes(ingredientStr)) {
				return prev.filter(k => k !== ingredientStr)
			} else {
				return [...prev, ingredientStr]
			}
		})
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
													<div className={'col-span-6 flex flex-col gap-3'}>
														<InputNameDish />
														<InputDescriptionDish />
														<InputDropzoneImageDish />
													</div>
													<div className={'col-span-6 flex flex-col gap-3'}>
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
													</div>
												</>
											) : (
												<>
													<div className={'col-span-12 flex flex-col gap-3'}>
														<div className={'grid grid-cols-3 gap-4'}>
															{ingredientsFromStore.map(ingredient => (
																<div key={ingredient.id}>
																	<Checkbox
																		checked={selectedKeys.includes(
																			ingredient.id.toString()
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
												</>
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
