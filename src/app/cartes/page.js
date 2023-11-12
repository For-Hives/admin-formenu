import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav/Nav.component'
import { get_data_menus } from '@/services/getData'
import Image from 'next/image'
import ToggleMenuComponent from '@/components/ToggleMenu.component'

export default async function Cartes() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	const companie = await getCompanie(session)
	const companie_data = await get_data_menus(companie.data.attributes.slug)
	const companie_menus = companie_data.filter(
		data => data.company.slug === companie.data.attributes.slug
	)

	return (
		<>
			<Nav />
			<main className="min-h-screen w-full overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<div>
					<h1 className="pb-2">Visualisation des cartes</h1>
					<span>
						Vous pouvez modifier, activer et désactiver des cartes, ingrédients
						ou plat à la volée ici !
					</span>
				</div>
				<div className="flex w-full flex-col gap-8 pt-8">
					{companie_menus.map(menu => {
						return (
							<div
								key={menu.id}
								className="relative grid w-full grid-cols-9 items-center gap-8 rounded-lg bg-white p-6 shadow-xl"
							>
								<Image
									src="/icons/menu_icon_carte.svg"
									alt={menu.title}
									width={80}
									height={80}
									className="col-span-1"
								/>
								<div className="col-span-4 flex flex-col">
									<h2>{menu.title}</h2>
									<span>{menu.description}</span>
								</div>
								{/*	TODO ajout date d'activation de la carte*/}
								<div className="col-span-2 flex flex-row gap-4">
									<Image
										src="/icons/calendar_menu.svg"
										alt="icone calendrier"
										width={25}
										height={20}
									/>
									<span>01 Février - 24 Avril</span>
								</div>
								<div className="col-span-2">
									<ToggleMenuComponent
										id={menu.id}
										activated={menu.activated}
									/>
								</div>

								<a
									href={`/cartes/${menu.id}`}
									className="absolute right-0 top-0 p-[10px]"
								>
									<Image
										src="/icons/change.svg"
										alt="icone crayon"
										width={30}
										height={30}
									/>
								</a>
							</div>
						)
					})}
				</div>
			</main>
		</>
	)
}

async function getCompanie(session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/companies/1`,
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
