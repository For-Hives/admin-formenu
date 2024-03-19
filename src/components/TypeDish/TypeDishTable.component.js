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
import { columnsTypeDish } from '@/components/TypeDish/data'
import { deleteTypeDish } from '@/services/type_dishes/deleteTypeDish'
import ConfirmationModal from '@/components/ConfirmationModal.component'
import { TypeDishModal } from '@/components/TypeDish/TypeDishModal.component'
import Image from 'next/image'

const INITIAL_VISIBLE_COLUMNS = ['id', 'name', 'color', 'icon', 'actions']

export function TypeDishTableComponent({ typeDishesBase, session }) {
	const modalRef = useRef()

	const handleEditTypeDish = typeDish => {
		modalRef?.current?.openModalWithTypeDish(typeDish)
	}

	const [typeDishes, setTypeDishes] = useState(typeDishesBase)
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

	const [typeDishToEdit, setTypeDishToEdit] = useState(null)

	const headerColumns = useMemo(() => {
		if (visibleColumns === 'all') return columnsTypeDish

		return columnsTypeDish.filter(column =>
			Array.from(visibleColumns).includes(column.uid)
		)
	}, [visibleColumns])

	const filteredItems = useMemo(() => {
		let filteredTypeDishes = [...typeDishes]

		if (hasSearchFilter) {
			filteredTypeDishes = filteredTypeDishes.filter(typeDish =>
				typeDish.name.toLowerCase().includes(filterValue.toLowerCase())
			)
		}

		return filteredTypeDishes
	}, [typeDishes, filterValue])

	const pages = Math.ceil(filteredItems.length / rowsPerPage)

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage
		const end = start + rowsPerPage

		return filteredItems.slice(start, end)
	}, [page, filteredItems, rowsPerPage])

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			let first = a[sortDescriptor.column]
			let second = b[sortDescriptor.column]

			// Check if the data is nested inside the `attributes` property
			if (a.attributes && a.attributes[sortDescriptor.column]) {
				first = a.attributes[sortDescriptor.column]
			}
			if (b.attributes && b.attributes[sortDescriptor.column]) {
				second = b.attributes[sortDescriptor.column]
			}

			// Handle sorting for the `icon` column
			if (sortDescriptor.column === 'icon') {
				first = a.attributes.icon.data.attributes.url
				second = b.attributes.icon.data.attributes.url
			}

			const cmp = first < second ? -1 : first > second ? 1 : 0
			return sortDescriptor.direction === 'descending' ? -cmp : cmp
		})
	}, [sortDescriptor, items])

	const renderCell = useCallback(
		(typeDish, columnKey) => {
			const cellValue = typeDish[columnKey]

			switch (columnKey) {
				case 'id':
					return <div className="flex flex-col">{typeDish.id}</div>
				case 'name':
					return <div className="flex flex-col">{typeDish.attributes.name}</div>
				case 'color':
					return (
						<div className="flex flex-col">{typeDish.attributes.color}</div>
					)
				case 'icon':
					return (
						<div className="flex flex-col">
							{typeDish.attributes?.icon?.data?.attributes?.url ? (
								<Image
									src={typeDish.attributes?.icon?.data.attributes.url}
									alt={typeDish.attributes?.icon?.data.attributes.url}
									width={30}
									height={30}
								/>
							) : (
								<span className="text-default-400">Aucune icône</span>
							)}
						</div>
					)
				case 'actions':
					return (
						<div className="relative flex items-center justify-start gap-2">
							<Tooltip content="Modifier le type de plat">
								<span
									className="cursor-pointer text-lg text-default-400 active:opacity-50"
									onClick={() => handleEditTypeDish(typeDish)}
								>
									<EditIcon />
								</span>
							</Tooltip>
							<Tooltip color="danger" content="Supprimer le type de plat">
								<Tooltip color="danger" content="Supprimer le type de plat">
									<span
										className="cursor-pointer text-lg text-danger active:opacity-50"
										onClick={() => {
											handleDeleteClick(typeDish)
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
		[handleEditTypeDish]
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

	const onChangeTypeDishes = (newTypeDish, isEdit) => {
		if (isEdit) {
			// edit typeDish
			const newTypeDishList = typeDishes.map(typeDish => {
				if (typeDish.id === newTypeDish.id) {
					return newTypeDish
				}
				return typeDish
			})
			setTypeDishes(newTypeDishList)
		} else {
			// add new typeDishes to the list
			const formattedTypeDish = {
				id: newTypeDish.id,
				attributes: {
					name: newTypeDish.name,
					color: newTypeDish.color,
					icon: newTypeDish.icon,
				},
			}
			const newTypeDishList = [...typeDishes, formattedTypeDish]
			setTypeDishes(newTypeDishList)
		}
	}

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Rechercher un type de plat..."
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<TypeDishModal
							ref={modalRef}
							session={session}
							onChangeTypeDishes={onChangeTypeDishes}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-small text-default-400">
						Total {typeDishes.length} types de plat
					</span>
					<label className="flex items-center text-small text-default-400">
						Éléments par page:
						<select
							className="bg-transparent text-small text-default-400 outline-none"
							onChange={onRowsPerPageChange}
						>
							<option value="15">15</option>
							<option value="30">30</option>
							<option value={typeDishes.length}>{typeDishes.length}</option>
						</select>
					</label>
				</div>
			</div>
		)
	}, [
		filterValue,
		onRowsPerPageChange,
		typeDishes,
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

	const [typeDishToDelete, setTypeDishToDelete] = useState(null)

	const confirmationModalRef = useRef()

	const handleDeleteClick = typeDish => {
		setTypeDishToDelete(typeDish)
		confirmationModalRef?.current?.open()
	}

	const handleDeleteConfirmed = () => {
		if (typeDishToDelete) {
			deleteTypeDish(typeDishToDelete.id, session).then(() => {
				const newTypeDishList = typeDishes.filter(
					typeDish => typeDish.id !== typeDishToDelete.id
				)
				setTypeDishes(newTypeDishList)
			})
		}
	}

	return (
		<>
			<ConfirmationModal
				ref={confirmationModalRef}
				message={`Êtes-vous sûr de vouloir supprimer ce type de plat ?`}
				onConfirm={handleDeleteConfirmed}
			/>
			<Table
				aria-label="Table des types de plat"
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
				<TableBody
					emptyContent={'Aucun type de plat trouvé'}
					items={sortedItems}
				>
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
