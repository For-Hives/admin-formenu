import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Global/Nav'
import Image from 'next/image'
import React from 'react'
import ToggleDishComponent from '@/components/ToggleDish.component'
import ToggleIngredientComponent from '@/components/ToggleIngredient.component'

export default async function Page({ params }) {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	const idMenu = params.id
	const menu = await getMenu(idMenu, session)

	return (
		<>
			<Nav />
			<main className="min-h-screen w-full overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<div>
					<h1 className="pb-2">Modification de la carte</h1>
					<span>
						Vous pouvez modifier, activer et désactiver des cartes, ingrédients
						ou plat à la volée ici !
					</span>
				</div>
				<div className="flex w-full flex-col gap-8 pt-8">
					{menu.categories.map(category => {
						return category.dishes.map(dish => {
							return (
								<div
									key={dish.id}
									className="relative flex w-full flex-col items-center gap-2 rounded-lg bg-white p-6 shadow-xl"
								>
									<div className="grid w-full grid-cols-9 items-center gap-8">
										<Image
											src="/icons/menu_icon_carte.svg"
											alt={dish.name}
											width={80}
											height={80}
											className="col-span-1"
										/>
										<div className="col-span-4 flex flex-col">
											<h2>
												{dish.name} - {dish.id}
											</h2>
											<span>{dish.description}</span>
										</div>

										<div className="col-span-2">
											<ToggleDishComponent
												id={dish.id}
												activated={dish.activated}
											/>
										</div>
									</div>
									<div className="flex w-4/5 flex-col gap-2">
										<h3 className="pb-2">Ingrédients</h3>
										{dish.ingredients.map(ingredient => {
											return (
												<div
													key={ingredient.id}
													className="flex w-full flex-row items-center justify-between bg-amber-300"
												>
													<span>
														{ingredient.name} - {ingredient.id}
													</span>
													<ToggleIngredientComponent
														id={ingredient.id}
														activated={ingredient.activated}
													/>
												</div>
											)
										})}
									</div>
								</div>
							)
						})

						// return (
						//     <div
						//         key={category.id}
						//         className="relative grid w-full grid-cols-9 items-center gap-8 rounded-lg bg-white p-6 shadow-xl"
						//     >
						//         <Image
						//             src="/icons/menu_icon_carte.svg"
						//             alt={category.name}
						//             width={80}
						//             height={80}
						//             className="col-span-1"
						//         />
						//         <div className="col-span-4 flex flex-col">
						//             <h2>{category.name}</h2>
						//             {/*<span>{menu.description}</span>*/}
						//         </div>
						//
						//         <div className="col-span-2">
						//             <ToggleMenuComponent id={category.id} activated={category.activated}/>
						//         </div>
						//
						//         {/*<a*/}
						//         {/*	href={`/cartes/${category.id}`}*/}
						//         {/*	className="absolute right-0 top-0 p-[10px]"*/}
						//         {/*>*/}
						//         {/*	<Image*/}
						//         {/*		src="/icons/change.svg"*/}
						//         {/*		alt="icone crayon"*/}
						//         {/*		width={30}*/}
						//         {/*		height={30}*/}
						//         {/*	/>*/}
						//         {/*</a>*/}
						//     </div>
						// )
					})}
				</div>
			</main>
		</>
	)
}

async function getMenu(id, session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/menu-deep/${id}`,
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
		throw new Error('Failed to fetch Data')
	}

	return await response.json()
}
