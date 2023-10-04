'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import _ from 'lodash'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const schema = zod
	.object({
		email: zod
			.string({ required_error: 'Email est requis' })
			.email('Email invalide'),
		password: zod
			.string({ required_error: 'Mot de passe est requis' })
			.regex(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
				'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
			),
	})
	.required({ email: true, password: true })

function Signin() {
	const [isLoaded, setIsLoaded] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
	})

	const { data: session } = useSession()

	const onSubmit = data => {
		const result = signIn('credentials', {
			email: data.email,
			password: data.password,
			callbackUrl: '/profil',
		})
	}

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	return (
		<>
			{isLoaded ? (
				<div className="relative flex h-[95vh] max-h-screen overflow-hidden md:h-screen md:overflow-auto md:bg-white">
					<div className="flex flex-1 flex-col justify-center bg-white px-4 sm:px-6 md:py-12 md:pt-12 lg:flex-none lg:px-20 xl:px-24">
						<div className="mx-auto w-full max-w-sm lg:w-96">
							<div>
								<Link
									className="flex flex-row items-center no-underline"
									href={'/'}
								>
									<Image
										alt="Logo ForMenu"
										width={50}
										height={50}
										src="/menu_final.svg"
									/>
									<span className="font-[fraunces]">
										For<span className="font-bold">Me</span>nu
									</span>
								</Link>
								<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
									{session && session.user && !_.isEmpty(session.user)
										? 'Bonjour ' +
										  (session.user.name
												? session.user.name
												: session.user.email)
										: 'Connexion'}
								</h2>
								<p></p>
							</div>
							{!(session && session.user && !_.isEmpty(session.user)) && (
								<div className="mt-8">
									<div>
										<div>
											<p className="text-sm font-medium leading-6 text-gray-900">
												Connectez vous ici, vérifiez votre boite mail ou
												contactez un administrateur dans le cas où vous n'avez
												pas reçu vos identifiants.
											</p>
										</div>
									</div>

									<div className="mt-6">
										<form
											onSubmit={handleSubmit(onSubmit)}
											method="POST"
											className="space-y-6"
										>
											<div>
												<div className="mt-2">
													<input
														data-cy="email-input"
														id="email"
														name="email"
														type="text"
														placeholder="Email"
														autoComplete="email"
														{...register('email', {
															required: true,
														})}
														required
														className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
													/>
													{errors.email && (
														<p className={'mt-2 text-xs text-red-500/80'}>
															{errors.email.message}
														</p>
													)}
												</div>
											</div>

											<div className="space-y-1">
												<div className="mt-2">
													<input
														data-cy="password-input"
														id="password"
														name="password"
														type="password"
														placeholder="Mot de passe"
														autoComplete="current-password"
														{...register('password', {
															required: true,
														})}
														required
														className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
													/>
													{errors.password && (
														<p className={'mt-2 text-xs text-red-500/80'}>
															{errors.password.message}
														</p>
													)}
												</div>
											</div>

											<div className="flex w-full justify-center">
												<button
													data-cy="email-signin"
													type="submit"
													className="h-[40px] w-full rounded-md bg-cyan-900 text-sm text-white no-underline"
												>
													Se connecter
												</button>
											</div>
											<div className="relative mt-6">
												<div
													className="absolute inset-0 flex items-center"
													aria-hidden="true"
												>
													<div className="w-full border-t border-gray-300" />
												</div>
												<div className="relative flex justify-center text-sm">
													<span className="bg-white px-2 text-gray-500">
														Ou
													</span>
												</div>
											</div>
											<div className={'flex w-full justify-center'}>
												<button
													data-cy="google-signin"
													onClick={() => {
														signIn('google', {
															callbackUrl: '/auth/profil',
														})
													}}
													className="flex h-[40px] w-full flex-nowrap items-center justify-center gap-[24px] rounded-md bg-white px-3 text-gray-500 no-underline shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
												>
													<span className="sr-only">
														Se connecter via Google
													</span>
													<Image
														src={'/assets/signin-assets/google_logo.svg'}
														alt={'google logo'}
														width={18}
														height={18}
														className={'h-[18px] w-[18px]'}
													/>
													<p
														className={
															'flex flex-nowrap text-[14px] font-medium text-black/[54%]'
														}
													>
														Se connecter avec Google
													</p>
												</button>
											</div>
											<div className={'flex w-full justify-center'}>
												<button
													data-cy="facebook-signin"
													onClick={() => {
														signIn('facebook', {
															callbackUrl: '/auth/profil',
														})
													}}
													className="flex h-[40px] w-full flex-nowrap items-center justify-center gap-[24px] rounded-md bg-white px-3 text-gray-500 no-underline shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
												>
													<span className="sr-only">
														Se connecter via Facebook
													</span>
													<Image
														src={'/assets/signin-assets/facebook_logo.svg'}
														alt={'facebook logo'}
														width={18}
														height={18}
														className={'h-[18px] w-[18px]'}
													/>
													<p
														className={
															'flex flex-nowrap text-[14px] font-medium text-black/[54%]'
														}
													>
														Se connecter avec Facebook
													</p>
												</button>
											</div>

											<div className="flex items-center justify-start">
												<div className="text-sm">
													{/* todo */}
													<a
														href="#"
														className="font-medium text-slate-600 hover:text-blue-500"
													>
														J'ai oublié mon mot de passe
													</a>
												</div>
											</div>
											<div className="relative mt-6">
												<div
													className="absolute inset-0 flex items-center"
													aria-hidden="true"
												>
													<div className="w-full border-t border-gray-300" />
												</div>
											</div>
											<div></div>
											{/*<div className={'flex items-center justify-center '}>*/}
											{/*    Pas de compte ?&nbsp;*/}
											{/*    <Link*/}
											{/*        className={*/}
											{/*            'font-semibold text-blue-700 hover:text-blue-700 hover:underline'*/}
											{/*        }*/}
											{/*        href={'/auth/signup'}*/}
											{/*    >*/}
											{/*        Inscris-toi*/}
											{/*    </Link>*/}
											{/*</div>*/}
										</form>
									</div>
								</div>
							)}
							{!!(session && session.user && !_.isEmpty(session.user)) && (
								<div className={'mt-8'}>
									<h2 className={'my-8 text-2xl font-semibold text-gray-900'}>
										Vous êtes déjà connecté
									</h2>

									<Link
										type="submit"
										className="btn-alt-primary mt-8"
										href={'/auth/profil'}
									>
										Retourner sur mon profil
									</Link>

									<button
										type="submit"
										className="btn-primary-large mt-8"
										onClick={() => {
											signOut()
										}}
									>
										Se déconnecter
									</button>
								</div>
							)}
						</div>
					</div>

					<div className="relative hidden w-full flex-1 lg:block lg:object-contain">
						<div className="flex h-full items-center justify-end">
							<Image
								src={'/assets/signin-assets/illustration.webp'}
								alt={'background formenu'}
								width={1179}
								height={725}
								className={'h-[725px] w-[1179px]'}
							/>
						</div>
						{/*<Image*/}
						{/*    alt={'background formenu'}*/}
						{/*    fill*/}
						{/*    src=""*/}
						{/*    className={'z-10 object-cover'}*/}
						{/*></Image>*/}
					</div>
				</div>
			) : (
				<div className={'flex h-screen items-center justify-center'}>
					<p className={'text-2xl font-semibold text-gray-900'}>
						Chargement...
					</p>
				</div>
			)}
		</>
	)
}

export default Signin
