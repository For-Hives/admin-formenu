'use client'
import Image from 'next/image'
import ToggleDishComponent from '@/components/Toggle/ToggleDish.component'
import ToggleIngredientComponent from '@/components/Toggle/ToggleIngredient.component'
import React, { useEffect } from 'react'
import { useMenusStore } from '@/stores/menu.store'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link,
} from '@nextui-org/react'

export default function MenusDetails({ menu }) {
	const menuFromStore = useMenusStore(state => state.menu)
	const setStore = useMenusStore(state => state.setMenu)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
						isOpen={!isOpen}
						onOpenChange={onOpenChange}
						placement="center"
						classNames={{
							base: '!w-[90vw] max-w-[90vw] h-[90vh]',
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
											className={
												'grid h-full w-full grid-cols-12 gap-8 bg-red-100 p-8'
											}
										>
											{/* column 1 */}
											<div>
												<h2>Quel est le nom de votre plat ?</h2>
												<p>
													Ce sera cet élément qui sera vu de prime abord et qui
													sera afficher en premier, mettez ce que vous voulez !
												</p>
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
												/>
												{/*{...register('password', {*/}
												{/*	required: true,*/}
												{/*})}*/}
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

export function DishDetails({ dish, menuId, onOpen }) {
	return (
		<div
			key={dish.id}
			className="group relative grid w-full grid-cols-12 items-center gap-8 rounded-lg bg-white p-8 px-16 shadow-md transition-all hover:shadow-xl"
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

			{/*// href={`/cartes/${menu.id}`}*/}
			{/*fixme change this to get the update element */}
			<div className="absolute right-0 top-0 p-[10px]" href={'#'}>
				<Link
					onPress={onOpen}
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
