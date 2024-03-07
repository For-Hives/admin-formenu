'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import _ from 'lodash'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { LoaderComponent } from '@/components/Loaders/Loader.component'
import { Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

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

	const router = useRouter()

	const { data: session } = useSession()

	const onSubmit = async data => {
		const { error } = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		})
		if (error) {
			toast(`Ce n'est pas le bon email ou mot de passe ! Réessayez !`, {
				icon: '⚠️',
				type: 'error',
				toastId: 'toast-alert',
			})
		} else {
			toast(`Bienvenue !`, {
				icon: '👋',
				type: 'success',
				toastId: 'toast-success',
			})
			router.push('/')
		}
	}

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	return (
		<Suspense fallback={<LoaderComponent />}>
			<div className="relative flex h-[95vh] max-h-screen overflow-hidden md:h-screen">
				<div className="flex flex-1 flex-col justify-center px-4 sm:px-6 md:py-12 md:pt-12 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm xl:w-96">
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
							</Link>
							<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
								{session && session.user && !_.isEmpty(session.user)
									? 'Bonjour ' +
									  (session.user.name ? session.user.name : session.user.email)
									: 'Connexion'}
							</h2>
						</div>
						{!(session && session.user && !_.isEmpty(session.user)) && (
							<div className="mt-8">
								<div>
									<div>
										<p className="text-sm font-medium leading-6 text-gray-900">
											{`Connectez vous ici, vérifiez votre boite mail ou contactez un administrateur dans le cas où vous n'avez pas reçu vos identifiants.`}
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
												<Input
													data-cy="email-input"
													id="email"
													name="email"
													type="text"
													size={'sm'}
													label="Email"
													autoComplete="email"
													radius={'sm'}
													variant={'bordered'}
													color={'primary'}
													isInvalid={!!errors.email}
													errorMessage={errors.email?.message}
													required
													{...register('email', {
														required: true,
													})}
												/>
											</div>
										</div>

										<div className="space-y-1">
											<div className="mt-2">
												<Input
													data-cy="password-input"
													id="password"
													name="password"
													type="password"
													size={'sm'}
													label="password"
													radius={'sm'}
													variant={'bordered'}
													color={'primary'}
													isInvalid={!!errors.password}
													errorMessage={errors.password?.message}
													required
													autoComplete="current-password"
													{...register('password', {
														required: true,
													})}
												/>
											</div>
										</div>

										<div className="flex w-full justify-center">
											<button
												data-cy="email-signin"
												type="submit"
												className="h-[40px] w-full rounded-md bg-sky-900 text-sm text-white no-underline"
											>
												Se connecter
											</button>
										</div>
										<div className="flex items-center justify-start">
											<div className="text-sm">
												<Link
													href="#"
													className="font-medium text-slate-600 hover:text-blue-500"
												>
													{`J'ai oublié mon mot de passe`}
												</Link>
											</div>
										</div>
									</form>
								</div>
							</div>
						)}
						{!!(session && session.user && !_.isEmpty(session.user)) && (
							<div className={'mt-8'}>
								<h2 className={'my-8 text-2xl font-semibold text-gray-900'}>
									Vous êtes déjà connecté
								</h2>

								<div className={'flex gap-3'}>
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
							</div>
						)}
					</div>
				</div>

				<div className="relative hidden w-full flex-1 translate-x-[15%] transform xl:block">
					<div className="flex h-full items-center justify-end">
						<Image
							src={'/assets/signin-assets/illustration.webp'}
							alt={'background formenu'}
							width={1300}
							height={750}
							className={'object-contain'}
						/>
					</div>
				</div>
			</div>
		</Suspense>
	)
}

export default Signin
