'use client'

import {
	Button,
	Input,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
} from '@nextui-org/react'
import { SearchIcon } from '../IconsJSX/SearchIcon'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeleteIcon } from '@/components/IconsJSX/DeleteIcon'
import { EditIcon } from '@/components/IconsJSX/EditIcon'
import { columnsCategories } from '@/components/Categories/data'
import { CategoriesModal } from '@/components/Categories/CategoriesModal/CategoriesModal.component'
import { deleteCategory } from '@/services/categories/deleteCategory'
import ConfirmationModal from '@/components/ConfirmationModal.component'

const INITIAL_VISIBLE_COLUMNS = [
	'id',
	'name',
	'order',
	'depth',
	'dishes',
	'actions',
]

export function CategoriesTableComponent({
	categoriesBase,
	session,
	dishes,
	menus,
	categoriesFromParent,
}) {
	const modalRef = useRef()
	
	// Fix for NextUI ResizeObserver SSR hydration issue
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])

	const handleEditCategory = category => {
		modalRef?.current?.openModalWithCategory(category)
	}

	const [categories, setCategories] = useState(categoriesBase)
	const [filterValue, setFilterValue] = useState('')
	const [selectedKeys, setSelectedKeys] = useState(new Set([]))

	const [visibleColumns, setVisibleColumns] = useState(
		new Set(INITIAL_VISIBLE_COLUMNS)
	)
	const [rowsPerPage, setRowsPerPage] = useState(15)
	const [sortDescriptor, setSortDescriptor] = useState({
		column: 'depth',
		direction: 'ascending',
	})
	const [page, setPage] = useState(1)

	const hasSearchFilter = Boolean(filterValue)

	const [categoryToEdit, setCategoryToEdit] = useState(null)

	const headerColumns = useMemo(() => {
		if (visibleColumns === 'all') return columnsCategories

		return columnsCategories.filter(column =>
			Array.from(visibleColumns).includes(column.uid)
		)
	}, [visibleColumns])

	const filteredItems = useMemo(() => {
		let filteredCategories = [...categories]

		if (hasSearchFilter) {
			filteredCategories = filteredCategories.filter(category =>
				category.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}

		return filteredCategories
	}, [categories, filterValue])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column]
			const second = b[sortDescriptor.column]
			const cmp = first < second ? -1 : first > second ? 1 : 0

			return sortDescriptor.direction === 'descending' ? -cmp : cmp
		})
	}, [sortDescriptor, items])

	const renderCell = useCallback(
		(category, columnKey) => {
			const cellValue = category[columnKey]

			switch (columnKey) {
				case 'id':
					return <div className="flex flex-col">{category.id}</div>
				case 'name':
					return <div className="flex flex-col">{category.name}</div>
				case 'order':
					return <div className="flex flex-col">{category.order}</div>
				case 'depth':
					return <div className="flex flex-col">{category.depth}</div>
				case 'dishes':
					return (
						<div className="flex flex-col">{category.dishes?.length || 0}</div>
					)
				case 'actions':
					return (
						<div className="relative flex items-center justify-start gap-2">
							<Tooltip content="Modifier la categorie">
								<span
									className="cursor-pointer text-lg text-default-400 active:opacity-50"
									onClick={() => {
										handleEditCategory(category)
									}}
								>
									<EditIcon />
								</span>
							</Tooltip>
							<Tooltip color="danger" content="Supprimer la categorie">
								<Tooltip color="danger" content="Supprimer la categorie">
									<span
										className="cursor-pointer text-lg text-danger active:opacity-50"
										onClick={() => {
											handleDeleteClick(category)
										}}
									>
										<DeleteIcon />
									</span>
								</Tooltip>
							</Tooltip>
						</div>
					)
				default:
					return cellValue
			}
		},
		[handleEditCategory]
	)

	const onNextPage = useCallback(() => {
		if (page < pages) {
			setPage(page + 1)
		}
	}, [page, pages])

	const onPreviousPage = useCallback(() => {
		if (page > 1) {
			setPage(page - 1)
		}
	}, [page])

	const onRowsPerPageChange = useCallback(e => {
		setRowsPerPage(Number(e.target.value))
		setPage(1)
	}, [])

	const onSearchChange = useCallback(value => {
		if (value) {
			setFilterValue(value)
			setPage(1)
		} else {
			setFilterValue('')
		}
	}, [])

	const onClear = useCallback(() => {
		setFilterValue('')
		setPage(1)
	}, [])

	const onChangeCategories = (newCategory, isEdit) => {
		if (isEdit) {
			// edit category
			const newCategoriesList = categories.map(category => {
				if (category.id === newCategory.id) {
					return newCategory
				}
				return category
			})
			setCategories(newCategoriesList)
		} else {
			// add new categories to the list
			const newCategoriesList = [...categories, newCategory]
			setCategories(newCategoriesList)
		}
	}

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Rechercher un ingrédient..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<CategoriesModal
							ref={modalRef}
							session={session}
							onChangeCategories={onChangeCategories}
							dishes={dishes}
							menus={menus}
							categories={categoriesFromParent}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-small text-default-400">
						Total {categories.length} categories
					</span>
					<label className="flex items-center text-small text-default-400">
						Éléments par page:
						<select
							className="bg-transparent text-small text-default-400 outline-none"
							onChange={onRowsPerPageChange}
						>
							<option value="15">15</option>
							<option value="30">30</option>
							<option value={categories.length}>{categories.length}</option>
						</select>
					</label>
				</div>
			</div>
		)
	}, [
		filterValue,
		onRowsPerPageChange,
		categories,
		onSearchChange,
		hasSearchFilter,
	])

	const bottomContent = useMemo(() => {
		return (
			<div className="flex items-center justify-between px-2 py-2">
				<span className="w-[30%]">&nbsp;</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden w-[30%] justify-end gap-2 sm:flex">
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
					>
						Précédent
					</Button>
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onNextPage}
					>
						Suivant
					</Button>
				</div>
			</div>
		)
	}, [selectedKeys, items.length, page, pages, hasSearchFilter])

	const [categoryToDelete, setCategoryToDelete] = useState(null)

	const confirmationModalRef = useRef()

	const handleDeleteClick = category => {
		setCategoryToDelete(category)
		confirmationModalRef?.current?.open()
	}

	const handleDeleteConfirmed = () => {
		if (categoryToDelete) {
			deleteCategory(categoryToDelete.id, session).then(() => {
				const newCategoriesList = categories.filter(
					category => category.id !== categoryToDelete.id
				)
				setCategories(newCategoriesList)
			})
		}
	}

	// Prevent ResizeObserver errors during SSR/hydration
	if (!mounted) {
		return <div className="flex min-h-[400px] items-center justify-center">Chargement...</div>
	}

	return (
		<>
			<ConfirmationModal
				ref={confirmationModalRef}
				message={`Êtes-vous sûr de vouloir supprimer cette catégorie ?`}
				onConfirm={handleDeleteConfirmed}
			/>
			<Table
				aria-label="Table des categories"
				isHeaderSticky
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				classNames={{
					wrapper: 'max-h-[75vh]',
				}}
				sortDescriptor={sortDescriptor}
				topContent={topContent}
				topContentPlacement="outside"
				onSortChange={setSortDescriptor}
			>
				<TableHeader columns={headerColumns}>
					{column => (
						<TableColumn key={column.uid} allowsSorting={column.sortable}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody emptyContent={'Aucun categories trouvé'} items={sortedItems}>
					{item => (
						<TableRow key={item.id}>
							{columnKey => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}
