import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Nav from '@/components/Global/Nav'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	// console.log(session)
	const user = await getData(session)
	// const [user, setUser] = useState(profileData)

	return (
		<>
			<Nav />
			{session && (
				<>
					<main className="min-h-screen w-full py-8 pl-[calc(250px+4rem)] pr-16">
						<div className="flex w-1/2 flex-col gap-16">
							<div className="flex flex-col">
								<h1 className="pb-2">Modification de votre profil</h1>
								<span>Configurez vos paramètres personnels</span>
							</div>
							<div className="flex w-full flex-row gap-8">
								<span>Configuration générale</span>
								<span>Mot de passe</span>
							</div>
							<form className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<span>Comment vous appelez vous ?</span>
									<div className="flex w-full flex-row gap-4">
										<input
											type="text"
											name="lastname"
											placeholder="Nom"
											className="grow rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
											value={user.lastname}
										/>
										<input
											type="text"
											name="firstname"
											placeholder="Prénom"
											className="grow rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
											value={user.firstname}
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
										value={user.email}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<span>Quel est votre numéro de téléphone ?</span>
									<input
										type="tel"
										name="phone"
										placeholder="+33 6 00 00 00 00"
										className="rounded-md border-cyan-900 shadow-sm shadow-cyan-300"
										value={user.phone}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<span>Image de profil</span>
									<div className="flex w-full items-center justify-center">
										<label
											htmlFor="dropzone-file"
											className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
													<span className="font-semibold">Click to upload</span>{' '}
													or drag and drop
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-400">
													SVG, PNG or JPG
												</p>
											</div>
											<input
												id="dropzone-file"
												type="file"
												className="hidden"
											/>
										</label>
									</div>
								</div>
								<div className="flex w-full justify-end">
									<button className="w-[275px] rounded-md bg-indigo-900 p-2 text-white no-underline hover:bg-indigo-700">
										Enregistrer les changements
									</button>
								</div>
							</form>
						</div>
					</main>
				</>
			)}
		</>
	)
}

export async function getData(session) {
	// const session = getSession()
	// console.log(session)
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
		}
	)
	if (!response.ok) {
		console.log(response.status)
	}

	return await response.json()
}
