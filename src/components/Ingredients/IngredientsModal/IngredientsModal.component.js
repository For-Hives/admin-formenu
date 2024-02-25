'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Modal,
	Input,
	Button,
	useModal,
	ModalHeader,
	ModalContent,
	ModalFooter,
	ModalBody,
} from '@nextui-org/react'
// import { postIngredient, putIngredient, deleteIngredient } from '@/services/ingredientService' // Remplacez ceci par vos fonctions de service réelles

const ingredientSchema = z.object({
	name: z.string().min(1, 'Le nom de l’ingrédient est requis'),
	activated: z.boolean(),
	available_date_start: z.string().optional(),
	available_date_end: z.string().optional(),
})

export function IngredientsModal({ ingredientToEdit }) {
	const { isOpen, open, close } = useModal()
	const isAddMode = !ingredientToEdit

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ingredientSchema),
		defaultValues: {
			name: '',
			activated: true,
			available_date_start: '',
			available_date_end: '',
		},
	})

	// Set form default values when in edit mode
	useEffect(() => {
		if (!isAddMode) {
			Object.keys(ingredientToEdit).forEach(key => {
				setValue(key, ingredientToEdit[key])
			})
		}
	}, [ingredientToEdit, isAddMode, setValue])

	const onSubmit = data => {
		const submitFunction = isAddMode ? postIngredient : putIngredient
		submitFunction(data)
			.then(() => {
				reset()
				close()
				// Refresh your ingredients list or state here
			})
			.catch(error => {
				console.error('There was an error submitting the form', error)
			})
	}

	const handleDelete = () => {
		if (!isAddMode && ingredientToEdit?.id) {
			deleteIngredient(ingredientToEdit.id)
				.then(() => {
					reset()
					close()
					// Refresh your ingredients list or state here
				})
				.catch(error => {
					console.error('There was an error deleting the ingredient', error)
				})
		}
	}

	return (
		<>
			<Button auto flat color="primary" onClick={open}>
				{isAddMode ? 'Ajouter un ingrédient' : 'Modifier l’ingrédient'}
			</Button>

			<Modal open={isOpen} onClose={close} width="600px">
				<ModalHeader>
					{isAddMode ? 'Ajouter un nouvel ingrédient' : 'Modifier l’ingrédient'}
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							placeholder="Nom de l'ingrédient"
							{...register('name')}
							helperColor="error"
							helperText={errors.name?.message}
						/>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							type="date"
							placeholder="Date de disponibilité de début"
							{...register('available_date_start')}
						/>
						<Input
							clearable
							bordered
							fullWidth
							color="primary"
							size="lg"
							type="date"
							placeholder="Date de disponibilité de fin"
							{...register('available_date_end')}
						/>
						<Button auto type="submit" className="mt-4">
							{isAddMode ? 'Ajouter' : 'Modifier'}
						</Button>
						{!isAddMode && (
							<Button
								auto
								color="error"
								className="mt-4"
								onClick={handleDelete}
							>
								Supprimer
							</Button>
						)}
					</form>
				</ModalBody>
			</Modal>
		</>
	)
}
