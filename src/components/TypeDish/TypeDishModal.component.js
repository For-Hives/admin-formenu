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
import { postTypeDish } from '@/services/type_dishes/postTypeDish'
import { putTypeDish } from '@/services/type_dishes/putTypeDish'
import { useMenusStore } from '@/stores/menu.store'
import { InputNameTypeDishComponent } from '@/components/TypeDish/TypeDishModal/InputNameTypeDish.component'
import { InputColorTypeDishComponent } from '@/components/TypeDish/TypeDishModal/InputColorTypeDish.component'
import { InputIconTypeDishComponent } from '@/components/TypeDish/TypeDishModal/InputIconTypeDish.component'

const typeDishSchema = z.object({
	name: z.string().min(1, 'Le nom du type de plat est requis'),
	color: z.string().min(1, 'La couleur du type de plat est requise'),
	icon: z.any().optional(),
})

export const TypeDishModal = forwardRef(
	({ session, onChangeTypeDishes }, ref) => {
		const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

		const [typeDishToEdit, setTypeDishToEdit] = useState(null)
		const [isAddMode, setIsAddMode] = useState(!typeDishToEdit)

		useImperativeHandle(ref, () => ({
			openModalWithTypeDish(typeDish) {
				setTypeDishToEdit(typeDish)
				setValue('name', typeDish.name)
				setValue('color', typeDish.color)
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
			resolver: zodResolver(typeDishSchema),
			defaultValues: {
				name: '',
				color: '',
				icon: null,
			},
		})

		const sessionFromStore = useMenusStore(state => state.session)
		const setSession = useMenusStore(state => state.setSession)

		const onSubmit = data => {
			if (isAddMode) {
				const newTypeDish = {
					...data,
					icon: data.icon ? data.icon.id : null,
				}
				postTypeDish(newTypeDish, sessionFromStore).then(res => {
					// Refresh your typeDishes list or state here
					const formattedTypeDish = {
						id: res.data.id,
						attributes: {
							...res.data.attributes,
							icon: data.icon,
						},
					}
					onChangeTypeDishes(formattedTypeDish, false)
				})
			} else {
				putTypeDish(typeDishToEdit.id, data, sessionFromStore).then(res => {
					// Refresh your typeDishes list or state here
					const newTypeDish = { ...res.data.attributes, id: res.data.id }
					onChangeTypeDishes(newTypeDish, true)
				})
			}
			reset(
				{
					name: '',
					color: '',
					icon: null,
				},
				{ keepValues: false }
			)
			onClose()
		}
		const openAdd = () => {
			setTypeDishToEdit(null)
			onOpen()
		}

		useEffect(() => {
			setSession(session)
		}, [])

		useEffect(() => {
			if (typeDishToEdit) {
				setIsAddMode(false)
			} else {
				setIsAddMode(true)
				reset(
					{
						name: '',
						color: '',
						icon: null,
					},
					{ keepValues: false }
				)
			}
		}, [typeDishToEdit])

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
					{`Ajout d'un type de plat`}
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
							{isAddMode
								? 'Ajouter un nouveau type de plat'
								: 'Modifier le type de plat ' + typeDishToEdit?.id}
						</ModalHeader>
						<ModalBody>
							<div className={'grid h-full w-full grid-cols-12 gap-16 p-8'}>
								<div className={'col-span-7 flex flex-col gap-6'}>
									<InputNameTypeDishComponent
										control={control}
										errors={errors}
										name={'name'}
										value={typeDishToEdit?.name}
									/>
									<InputColorTypeDishComponent
										control={control}
										errors={errors}
										name={'color'}
										value={typeDishToEdit?.color}
									/>
								</div>
								<div className={'col-span-5 flex flex-col gap-6'}>
									<InputIconTypeDishComponent
										control={control}
										errors={errors}
										name={'icon'}
										value={typeDishToEdit?.icon}
										session={sessionFromStore}
									/>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button auto color="primary" onClick={handleSubmit(onSubmit)}>
								{isAddMode ? 'Ajouter' : 'Modifier'}
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</>
		)
	}
)

TypeDishModal.displayName = 'TypeDishModal'
