'use client'
import React, { useEffect, useState } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Autocomplete,
	AutocompleteItem,
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

/**
 * @param {Object} menu - The menu object containing the menu details.
 * @return {JSX.Element} - The JSX element representing the menu details.
 */
export default function MenusDetails({ menu }) {
	const menuFromStore = useMenusStore(state => state.menu)
	const lastDishClicked = useMenusStore(state => state.lastDishClicked)
	const setStore = useMenusStore(state => state.setMenu)
	const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	// State to store the selected keys (IDs) and input value
	const [selectedKeys, setSelectedKeys] = useState([])
	const [inputValue, setInputValue] = useState('')

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
											{/* column 1 */}
											<div className={'col-span-6 flex flex-col gap-3'}>
												<InputNameDish />
												<InputDescriptionDish />
												<InputDropzoneImageDish />
											</div>
											{/*fixme here*/}
											<div className={'col-span-6 flex flex-col gap-3'}>
												<div
													className={
														'flex flex-col gap-1 [&>*]:!transition-none [&>*]:!duration-0'
													}
												>
													<h2>Ingrédients</h2>
													<p>
														Mets les ingrédients qui composes tes plats ici, ils
														permettrons aux clients de chercher, et retrouver
														facilement les plats en questions.
													</p>
													<div className={'flex gap-2'}>
														{selectedKeys.map(key => {
															const ingredient =
																lastDishClicked.ingredients.find(
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

													<Autocomplete
														shouldCloseOnBlur={true}
														inputValue={inputValue}
														classNames={{
															base: ['!p-0', '[&>*]:!p-0'],
															listboxWrapper: [
																'!m-0',
																'!p-0',
																'max-h-[450px]',
																'[&>*]:!p-0',
															],
															selectorButton: 'text-gray-700',
														}}
														defaultItems={lastDishClicked.ingredients}
														onInputChange={onInputChange}
														onSelectionChange={onSelectionChange}
														inputProps={{
															classNames: {
																base: '!p-0',
																label: 'text-gray-700',
																input: [
																	'bg-transparent',
																	'text-gray-700/90 ',
																	'placeholder:text-gray-700/25',
																],
																innerWrapper: 'bg-transparent',
																inputWrapper: [
																	'shadow-none',
																	'border',
																	'border-cyan-900/25',
																	'bg-gray-50',
																	'hover:bg-gray-100',
																	'group-data-[focused=true]:bg-gray-200',
																	'!cursor-text',
																],
															},
														}}
														listboxProps={{
															hideSelectedIcon: true,
															itemClasses: {
																base: [
																	'[&>*]:!transition-none',
																	'[&>*]:!duration-0',
																	'rounded-none',
																	'text-gray-900',
																	'data-[hover=true]:text-white',
																	'data-[hover=true]:transition-none',
																	'data-[hover=true]:duration-0',
																	'data-[hover=true]:bg-sky-950',
																],
															},
														}}
														aria-label="Select an employee"
														placeholder="Enter employee name"
														popoverProps={{
															offset: 10,
															classNames: {
																base: [
																	'[&>*]:!transition-none',
																	'[&>*]:!duration-0',
																	'rounded',
																	'border',
																	'!p-0',
																	'm-0',
																	'border-cyan-900/25',
																	'bg-gray-50',
																],

																content:
																	'border border-cyan-900/25 bg-gray-50 rounded !m-0 !p-0',
															},
														}}
														radius={'sm'}
														size={'sm'}
														variant={'bordered'}
													>
														{/* make it depend of selected keys ( rerender the list on change of selected Keys ) */}
														{lastDishClicked.ingredients.map(item => (
															<AutocompleteItem
																key={item.id}
																textValue={item.name}
															>
																<Checkbox
																	className={'custom-checkbox'}
																	isSelected={isIngredientSelected(item.id)}
																	onChange={() => onSelectionChange(item.id)}
																	classNames={{
																		wrapper: 'custom-icon',
																		base: 'custom-box',
																	}}
																	radius={'sm'}
																/>
																<label>{item.name}</label>
															</AutocompleteItem>
														))}
													</Autocomplete>
												</div>
											</div>
										</div>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="flat" onPress={onClose}>
											Close
										</Button>
										<Button color="primary" onPress={onClose}>
											Sign in
										</Button>
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
