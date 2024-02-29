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
import { useCallback, useMemo, useRef, useState } from 'react'
import { DeleteIcon } from '@/components/IconsJSX/DeleteIcon'
import { EditIcon } from '@/components/IconsJSX/EditIcon'
import { columnsDish } from '@/components/Dish/data'
import { deleteDish } from '@/services/Dish/deleteDish'
import ConfirmationModal from '@/components/Dish/DishsModal/ConfirmationModal.component'

const INITIAL_VISIBLE_COLUMNS = [
	'id',
	'name',
	'description',
	'ingredients',
	'price',
	'actions',
]

export function DishTableComponent({ DishBase, session }) {
	const modalRef = useRef()

	const handleEditDish = Dish => {
		modalRef?.current?.openModalWithDish(Dish)
	}

	const [Dish, setDish] = useState(DishBase)
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

	const [DishToEdit, setDishToEdit] = useState(null)

	const headerColumns = useMemo(() => {
		if (visibleColumns === 'all') return columnsDish

		return columnsDish.filter(column =>
			Array.from(visibleColumns).includes(column.uid)
		)
	}, [visibleColumns])

	const filteredItems = useMemo(() => {
		let filteredDish = [...Dish]

		if (hasSearchFilter) {
			filteredDish = filteredDish.filter(Dish =>
				Dish.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}

		return filteredDishs
	}, [Dishs, filterValue])

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
		(Dish, columnKey) => {
			const cellValue = Dish[columnKey]

			switch (columnKey) {
				case 'id':
					return <div className="flex flex-col">{Dish.id}</div>
				case 'name':
					return <div className="flex flex-col">{Dish.name}</div>
				case 'available_date_start':
					return (
						<div
							className={`flex flex-col ${Dish.available_date_start ? '' : 'italic opacity-75'}`}
						>
							{Dish.available_date_start
								? Dish.available_date_start
								: 'Non défini'}
						</div>
					)
				case 'available_date_end':
					return (
						<div
							className={`flex flex-col ${
								Dish.available_date_end ? '' : 'italic opacity-75'
							}`}
						>
							{Dish.available_date_end ? Dish.available_date_end : 'Non défini'}
						</div>
					)
				case 'activated':
					return (
						<div className="flex flex-col">
							{Dish.activated ? 'Oui' : 'Non'}
						</div>
					)
				case 'actions':
					return (
						<div className="relative flex items-center justify-start gap-2">
							<Tooltip content="Modifier l'Dish">
								<span
									className="cursor-pointer text-lg text-default-400 active:opacity-50"
									onClick={() => handleEditDish(Dish)}
								>
									<EditIcon />
								</span>
							</Tooltip>
							<Tooltip color="danger" content="Supprimer Dish">
								<Tooltip color="danger" content="Supprimer Dish">
									<span
										className="cursor-pointer text-lg text-danger active:opacity-50"
										onClick={() => {
											handleDeleteClick(Dish)
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
		[handleEditDish]
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

	const onChangeDishs = (newDish, isEdit) => {
		if (isEdit) {
			// edit Dish
			const newDishsList = Dishs.map(Dish => {
				if (Dish.id === newDish.id) {
					return newDish
				}
				return Dish
			})
			setDishs(newDishsList)
		} else {
			// add new Dishs to the list
			const newDishsList = [...Dishs, newDish]
			setDishs(newDishsList)
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
						<DishsModal
							ref={modalRef}
							session={session}
							onChangeDishs={onChangeDishs}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-small text-default-400">
						Total {Dishs.length} Dishs
					</span>
					<label className="flex items-center text-small text-default-400">
						Éléments par page:
						<select
							className="bg-transparent text-small text-default-400 outline-none"
							onChange={onRowsPerPageChange}
						>
							<option value="15">15</option>
							<option value="30">30</option>
							<option value={Dishs.length}>{Dishs.length}</option>
						</select>
					</label>
				</div>
			</div>
		)
	}, [filterValue, onRowsPerPageChange, Dishs, onSearchChange, hasSearchFilter])

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

	const [DishToDelete, setDishToDelete] = useState(null)

	const confirmationModalRef = useRef()

	const handleDeleteClick = Dish => {
		setDishToDelete(Dish)
		confirmationModalRef?.current?.open()
	}

	const handleDeleteConfirmed = () => {
		if (DishToDelete) {
			deleteDish(DishToDelete.id, session).then(() => {
				const newDishsList = Dishs.filter(Dish => Dish.id !== DishToDelete.id)
				setDishs(newDishsList)
			})
		}
	}

	return (
		<>
			<ConfirmationModal
				ref={confirmationModalRef}
				message={`Êtes-vous sûr de vouloir supprimer cet ingrédient ?`}
				onConfirm={handleDeleteConfirmed}
			/>
			<Table
				aria-label="Table des Dishs"
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
				<TableBody emptyContent={'Aucun Dishs trouvé'} items={sortedItems}>
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
