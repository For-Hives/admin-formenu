'use client'

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	Pagination,
	Tooltip,
} from '@nextui-org/react'
import { SearchIcon } from '../IconsJSX/SearchIcon'
import { useCallback, useMemo, useState } from 'react'
import { DeleteIcon } from '@/components/IconsJSX/DeleteIcon'
import { EditIcon } from '@/components/IconsJSX/EditIcon'
import { columnsIngredients } from '@/components/Ingredients/data'
import { IngredientsModal } from '@/components/Ingredients/IngredientsModal/IngredientsModal.component'

const INITIAL_VISIBLE_COLUMNS = [
	'id',
	'name',
	'activated',
	'available_date_start',
	'available_date_end',
	'actions',
]

export function IngredientsTableComponent({ ingredientsBase, session }) {
	const [ingredients, setIngredients] = useState(ingredientsBase)
	const [filterValue, setFilterValue] = useState('')
	const [selectedKeys, setSelectedKeys] = useState(new Set([]))

	const [visibleColumns, setVisibleColumns] = useState(
		new Set(INITIAL_VISIBLE_COLUMNS)
	)
	const [rowsPerPage, setRowsPerPage] = useState(15)
	const [sortDescriptor, setSortDescriptor] = useState({
		column: 'name',
		direction: 'ascending',
	})
	const [page, setPage] = useState(1)

	const hasSearchFilter = Boolean(filterValue)

	const [ingredientToEdit, setIngredientToEdit] = useState(null)

	const headerColumns = useMemo(() => {
		if (visibleColumns === 'all') return columnsIngredients

		return columnsIngredients.filter(column =>
			Array.from(visibleColumns).includes(column.uid)
		)
	}, [visibleColumns])

	const filteredItems = useMemo(() => {
		let filteredIngredients = [...ingredients]

		if (hasSearchFilter) {
			filteredIngredients = filteredIngredients.filter(ingredient =>
				ingredient.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}

		return filteredIngredients
	}, [ingredients, filterValue])

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

	const renderCell = useCallback((ingredient, columnKey) => {
		const cellValue = ingredient[columnKey]

		switch (columnKey) {
			case 'id':
				return <div className="flex flex-col">{ingredient.id}</div>
			case 'name':
				return <div className="flex flex-col">{ingredient.name}</div>
			case 'available_date_start':
				return (
					<div
						className={`flex flex-col ${ingredient.available_date_start ? '' : 'italic opacity-75'}`}
					>
						{ingredient.available_date_start
							? ingredient.available_date_start
							: 'Non défini'}
					</div>
				)
			case 'available_date_end':
				return (
					<div
						className={`flex flex-col ${
							ingredient.available_date_end ? '' : 'italic opacity-75'
						}`}
					>
						{ingredient.available_date_end
							? ingredient.available_date_end
							: 'Non défini'}
					</div>
				)
			case 'activated':
				return (
					<div className="flex flex-col">
						{ingredient.activated ? 'Oui' : 'Non'}
					</div>
				)
			case 'actions':
				return (
					<div className="relative flex items-center justify-start gap-2">
						<Tooltip content="Modifier l'ingredient">
							<span className="cursor-pointer text-lg text-default-400 active:opacity-50">
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Supprimer ingredient">
							<span className="cursor-pointer text-lg text-danger active:opacity-50">
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

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

	const onChangeIngredients = (newIngredient, isEdit) => {
		if (isEdit) {
			// edit ingredient
			const newIngredientsList = ingredients.map(ingredient => {
				if (ingredient.id === newIngredient.id) {
					return newIngredient
				}
				return ingredient
			})
			setIngredients(newIngredientsList)
		} else {
			// add new ingredients to the list
			const newIngredientsList = [...ingredients, newIngredient]
			setIngredients(newIngredientsList)
		}
		// add new ingredients to the list
		// console.log('newIngredient', newIngredient)
		// const newIngredientsList = [...ingredients, newIngredient]
		// console.log('newIngredientsList', newIngredientsList)
		// setIngredients(newIngredientsList)
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
						<IngredientsModal
							ingredientToEdit={null}
							session={session}
							onChangeIngredients={onChangeIngredients}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-small text-default-400">
						Total {ingredients.length} ingredients
					</span>
					<label className="flex items-center text-small text-default-400">
						Éléments par page:
						<select
							className="bg-transparent text-small text-default-400 outline-none"
							onChange={onRowsPerPageChange}
						>
							<option value="15">15</option>
							<option value="30">30</option>
							<option value={ingredients.length}>{ingredients.length}</option>
						</select>
					</label>
				</div>
			</div>
		)
	}, [
		filterValue,
		onRowsPerPageChange,
		ingredients,
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

	return (
		<Table
			aria-label="Table des ingredients"
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
			<TableBody emptyContent={'Aucun ingredients trouvé'} items={sortedItems}>
				{item => (
					<TableRow key={item.id}>
						{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
