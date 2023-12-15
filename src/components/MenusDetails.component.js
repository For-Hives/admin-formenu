'use client'
import Image from 'next/image'
import ToggleDishComponent from '@/components/Toggle/ToggleDish.component'
import ToggleIngredientComponent from '@/components/Toggle/ToggleIngredient.component'
import React, { useEffect } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Autocomplete,
	AutocompleteItem,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Link,
	Textarea,
} from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'

/**
 * Retrieves and displays details of a menu. (main part) , and modal part ( todo : refactor & moove the modal part in a new component)
 *
 * @param {Object} menu - The menu object containing the menu details.
 * @return {JSX.Element} - The JSX element representing the menu details.
 */
export default function MenusDetails({ menu }) {
	const menuFromStore = useMenusStore(state => state.menu)
	const lastDishClicked = useMenusStore(state => state.lastDishClicked)
	const setStore = useMenusStore(state => state.setMenu)
	const setLastDishClicked = useMenusStore(state => state.setLastDishClicked)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	useEffect(() => {
		if (menuFromStore.id !== menu.id) {
			setStore(menu)
		}
	}, [menu, menuFromStore, setStore])

	useEffect(() => {
		if (lastDishClicked) {
			console.log('lastDishClicked', lastDishClicked.ingredients)
		}
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
											{/* column 1 */}
											<div className={'col-span-6 flex flex-col gap-3'}>
												<div className={'flex flex-col gap-3'}>
													<div className={'flex flex-col gap-1'}>
														<h2>Quel est le nom de votre plat ?</h2>
														<p>
															Ce sera cet élément qui sera vu de prime abord et
															qui sera afficher en premier, mettez ce que vous
															voulez !
														</p>
													</div>
													<div>
														<Input
															data-cy="name_dish"
															id="name_dish"
															name="name_dish"
															type="text"
															size={'sm'}
															label="name_dish"
															radius={'sm'}
															variant={'bordered'}
															color={'primary'}
															// isInvalid={!!errors.password}
															// errorMessage={errors.password?.message}
															autoComplete="current-password"
															classNames={customInput}
														/>
														{/*{...register('password', {*/}
														{/*	required: true,*/}
														{/*})}*/}
													</div>
												</div>
												<div className={'flex flex-col gap-3'}>
													<div className={'flex flex-col gap-1'}>
														<h2>Quelle est la description de votre plat ?</h2>
														<p>
															Elle vous permettra de savoir à quoi correspond
															votre plat, donner des explications
															complémentaires, ou bien même l’histoire du plat !
															Vous pourrez afficher toutes les informations
															complémentaires ici.
														</p>
													</div>
													<Textarea
														data-cy="description_dish"
														id="description_dish"
														name="description_dish"
														label="Description"
														placeholder="..."
														radius={'sm'}
														size={'sm'}
														variant={'bordered'}
														className={'w-full'}
														classNames={customInput}
														color={'primary'}
													/>
												</div>
												<div className={'flex flex-col gap-4'}>
													<div className={'flex flex-col gap-2'}>
														<h2>Image de présentation du plat</h2>
														<p>
															Vous pouvez présenter une image de votre plat,
															elle permettra à vos clients de se trouver plus
															simplement dans les choix qui lui sont proposés
														</p>
													</div>
													<div className="flex w-full items-center justify-center rounded-md border border-cyan-900/50 bg-cyan-900/10 p-4">
														<label
															htmlFor="dropzone-file"
															className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
														>
															<div className="flex flex-col items-center justify-center pb-6 pt-5">
																<svg
																	className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
																	aria-hidden="true"
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 20 16"
																>
																	<path
																		stroke="currentColor"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth="2"
																		d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
																	/>
																</svg>
																<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
																	<span className="font-semibold">
																		Click to upload
																	</span>{' '}
																	or drag and drop
																</p>
																<p className="text-xs text-gray-500 dark:text-gray-400">
																	PNG, JPG, WEBP up to 1MB
																</p>
															</div>
															<input
																id="dropzone-file"
																type="file"
																className="hidden"
															/>
														</label>
													</div>
												</div>
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

													<Autocomplete
														classNames={{
															base: '',
															listboxWrapper: 'max-h-[450px]',
															selectorButton: 'text-gray-700',
														}}
														defaultItems={lastDishClicked.ingredients}
														inputProps={{
															classNames: {
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
															hideSelectedIcon: false,
															itemClasses: {
																base: [
																	'[&>*]:!transition-none',
																	'[&>*]:!duration-0',
																	'rounded',
																	'text-gray-900',
																	'data-[hover=true]:text-white',
																	'data-[hover=true]:transition-none',
																	'data-[hover=true]:duration-0',
																	'data-[hover=true]:bg-sky-950',
																	'data-[selectable=true]:focus:bg-sky-900',
																	'data-[focus-visible=true]:ring-gray-500',
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
																	'p-0',
																	'm-0',
																	'border-cyan-900/25',
																	'bg-gray-50',
																],

																content:
																	'border border-cyan-900/25 bg-gray-50 rounded m-0 p-0',
															},
														}}
														radius={'sm'}
														size={'sm'}
														variant={'bordered'}
													>
														{item => (
															<AutocompleteItem
																key={item.id}
																textValue={item.name}
															>
																<div className="flex items-center justify-between">
																	<div className="flex items-center gap-2">
																		<div className="flex flex-col">
																			<span className="text-small">
																				{item.name}
																			</span>
																		</div>
																	</div>
																</div>
															</AutocompleteItem>
														)}
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

/**
 * Renders the details of a dish.
 * @param {object} dish - The dish object containing the dish details.
 * @param {number} menuId - The ID of the menu.
 * @param {function} onOpen - The function to be called when the link is clicked.
 * @returns {JSX.Element} The rendered dish details component.
 */
export function DishDetails({ dish, menuId, onOpen, setLastDishClicked }) {
	return (
		<div
			key={dish.id}
			className="group relative grid w-full grid-cols-12 items-center gap-8 rounded-lg bg-white p-8 px-16 shadow-md hover:shadow-xl"
		>
			<Image
				src="/icons/menu_icon_carte.svg"
				alt={dish.name}
				width={80}
				height={80}
				className="col-span-1"
			/>
			<div className="col-span-7 flex h-full flex-col">
				<h2 className={'font-bold'}>
					{' '}
					{dish.name} - {dish.id}
				</h2>
				<p className={'font-light'}>{dish.description}</p>
			</div>
			<div className="col-span-2 flex h-full flex-col items-center justify-center">
				<div className={'flex gap-3'}>
					<Image
						src="/icons/calendar_menu.svg"
						alt="icone calendrier"
						width={25}
						height={25}
					/>
					<span className={'text-sm'}>01 Février - 24 Avril</span>
				</div>
			</div>

			<div className="col-span-2 flex h-full items-center justify-end">
				<ToggleDishComponent id={dish.id} activated={dish.activated} />
			</div>

			<div className="absolute right-0 top-0 z-10 p-[10px]">
				<Link
					type={'button'}
					onClick={() => {
						onOpen()
						console.log('dish', dish)
						setLastDishClicked(dish)
					}}
					className={
						'relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden'
					}
				>
					<Image
						src="/icons/change.svg"
						alt="icone crayon"
						width={40}
						height={40}
						className={
							'absolute left-[100px] top-1/2 h-[40px] w-[40px] -translate-x-1/2 ' +
							'-translate-y-1/2 transform transition-all hover:brightness-110 hover:saturate-150 group-hover:left-1/2'
						}
					/>
				</Link>
			</div>

			<div className="col-span-11 col-start-2 flex w-full justify-end">
				<div className={'flex w-full flex-col'}>
					<h3 className="pb-2">Ingrédients</h3>
					<ul className="decoration flex w-full list-disc flex-col gap-2">
						{dish.ingredients.map(ingredient => {
							return (
								<li
									key={ingredient.id}
									className="flex w-full flex-row items-center justify-between"
								>
									<span>
										{ingredient.name} - {ingredient.id}
									</span>
									<ToggleIngredientComponent
										id={ingredient.id}
										activated={ingredient.activated}
										menuId={menuId}
									/>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}
