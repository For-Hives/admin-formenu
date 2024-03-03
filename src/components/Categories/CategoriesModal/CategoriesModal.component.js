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

const categorieschema = z.object({
	name: z.string().min(1, 'Le nom de la categorie est requise'),
	order: z.string().min(1, 'L’ordre de la categorie est requise'),
	depth: z.string().min(1, 'La profondeur de la categorie est requise'),
	menu: z.string().min(1, 'Le menu de la categorie est requise'),
	category: z.string().min(1, 'La categorie de la categorie est requise'),
})

export const CategoriesModal = forwardRef(
	({ session, onChangeCategories }, ref) => {
		const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

		const [categoryToEdit, setCategoryToEdit] = useState(null)
		const [isAddMode, setIsAddMode] = useState(!categoryToEdit)

		useImperativeHandle(ref, () => ({
			openModalWithCategory(category) {
				setCategoryToEdit(category)
				setValue('name', category.name)
				setValue('order', category.order)
				setValue('depth', category.depth)
				setValue('menu', category.menu)
				setValue('category', category.category)
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
			if (isAddMode) {
				postCategory(data, sessionFromStore).then(res => {
					// Refresh your categories list or state here
					const newCategory = { ...res.data.attributes, id: res.data.id }
					onChangeCategories(newCategory, false)
				})
			} else {
				putCategory(categoryToEdit.id, data, sessionFromStore).then(res => {
					// Refresh your categories list or state here
					const newCategory = { ...res.data.attributes, id: res.data.id }
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
							{isAddMode
								? 'Ajouter une nouvelle categorie'
								: 'Modifier la catégorie ' + categoryToEdit?.id}
						</ModalHeader>
						<ModalBody>
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
									<div>ah</div>
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

CategoriesModal.displayName = 'CategoriesModal'
