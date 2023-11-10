'use client'
import React, { useState } from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const schema = zod
	.object({
		currentPassword: zod.string({ required_error: 'Mot de passe est requis' }),
		password: zod
			.string({ required_error: 'Mot de passe est requis' })
			.regex(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
				'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
			),
		passwordConfirmation: zod
			.string({ required_error: 'Mot de passe est requis' })
			.regex(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
				'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
			),
	})
	.required({ oldPassword: true, newPassword: true, confirmNewPassword: true })

export function FormTabsComponent({ user }) {
	const [activeTab, setActiveTab] = useState('general-configuration')

	const session = useSession()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	})
	const onSubmit = data => {
		changePassword(session, data)
		reset()
	}

	return (
		<Tabs
			aria-label="Options"
			selectedKey={activeTab}
			onSelectionChange={setActiveTab}
			className={'flex w-full'}
		>
			<Tab
				key="general-configuration"
				title="Configuration générale"
				className={'text-base no-underline'}
			>
				<form className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<span>Comment vous appelez vous ?</span>
						<div className="flex w-full flex-row gap-4">
							<input
								type="text"
								name="lastname"
								placeholder="Nom"
								className="grow rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
								defaultValue={user.lastname}
							/>
							<input
								type="text"
								name="firstname"
								placeholder="Prénom"
								className="grow rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
								defaultValue={user.firstname}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<span>Quel est votre adresse email ?</span>
						<input
							type="email"
							name="email"
							placeholder="exemple@formenu.fr"
							className="rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
							defaultValue={user.email}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span>Quel est votre numéro de téléphone ?</span>
						<input
							type="tel"
							name="phone"
							placeholder="+33 6 00 00 00 00"
							className="rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
							defaultValue={user.phoneNumber}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<span>Image de profil</span>
						<div className="flex w-full items-center justify-center">
							<label
								htmlFor="dropzone-file"
								className="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
										<span className="font-semibold">Click to upload</span> or
										drag and drop
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										SVG, PNG or JPG
									</p>
								</div>
								<input id="dropzone-file" type="file" className="hidden" />
							</label>
						</div>
					</div>
					<div className="flex w-full justify-end">
						<button
							type="submit"
							className="w-[275px] rounded-md bg-indigo-900 p-2 text-white no-underline hover:bg-indigo-700"
						>
							Enregistrer les changements
						</button>
					</div>
				</form>
			</Tab>
			<Tab
				key="password"
				title="Mot de passe"
				className={'text-base no-underline'}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					method="POST"
					className="flex flex-col gap-6"
				>
					<div className="flex flex-col gap-2">
						<span>Quel est votre ancien mot de passe ?</span>
						<input
							type="password"
							name="currentPassword"
							{...register('currentPassword')}
							placeholder="************"
							className="rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
						/>
						{errors.currentPassword && (
							<p className={'mt-2 text-xs text-red-500/80'}>
								{errors.currentPassword.message}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<span>Nouveau mot de passe ?</span>
						<input
							type="password"
							name="password"
							{...register('password')}
							placeholder="************"
							className="rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
						/>
						{errors.password && (
							<p className={'mt-2 text-xs text-red-500/80'}>
								{errors.password.message}
							</p>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<span>Confirmation de votre nouveau mot de passe</span>
						<input
							type="password"
							name="passwordConfirmation"
							{...register('passwordConfirmation')}
							placeholder="************"
							className="rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
						/>
						{errors.passwordConfirmation && (
							<p className={'mt-2 text-xs text-red-500/80'}>
								{errors.passwordConfirmation.message}
							</p>
						)}
					</div>
					<div className="flex w-full justify-end">
						<button
							type="submit"
							className="w-[275px] rounded-md bg-indigo-900 p-2 text-white no-underline hover:bg-indigo-700"
						>
							Changer mon mot de passe
						</button>
					</div>
				</form>
			</Tab>
		</Tabs>
	)
}

export default FormTabsComponent

export function changePassword(session, data) {
	fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${session.data.jwt}`,
		},
		body: JSON.stringify({
			...data,
		}),
	})
		.then(response => {
			return response.json()
		})
		.catch(err =>
			toast('Une erreur est survenue, veuillez réessayer plus tard', {
				type: 'error',
				icon: '⛔',
				toastId: 'toast-alert',
			})
		)
}
