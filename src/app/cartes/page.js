import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav/Nav.component'
import { get_data_menus } from '@/services/data/getData'
import Image from 'next/image'
import ToggleMenuComponent from '@/components/Toggle/ToggleMenu.component'
import Link from 'next/link'

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
			{/* +4rem -> equivalent of pr-16 / pl-16, space to don't be under the nav bar  */}
			<main className="flex min-h-screen w-full flex-col gap-6 overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<div className={'flex flex-col gap-2'}>
					<h1>Visualisation des cartes</h1>
					<span>
						Vous pouvez modifier, activer et désactiver des cartes, ingrédients
						ou plat à la volée ici !
					</span>
				</div>
				<div className="flex w-full flex-col gap-8">
					{companie_menus.map(menu => {
						return (
							<div
								key={menu.id}
								className="group relative grid w-full grid-cols-12 items-center gap-8 rounded-lg bg-white p-8 px-16 shadow-md transition-all hover:shadow-xl"
							>
								<Image
									src="/icons/menu_icon_carte.svg"
									alt={menu.title}
									width={80}
									height={80}
									className="col-span-1"
								/>
								<div className="col-span-7 flex h-full flex-col">
									<h2 className={'font-bold'}>{menu.title}</h2>
									<p className={'font-light'}>{menu.description}</p>
								</div>
								{/*	TODO ajout date d'activation de la carte*/}
								<div className="col-span-2 flex h-full flex-col items-center justify-center">
									<div className={'flex gap-3'}>
										<Image
											src="/icons/calendar_menu.svg"
											alt="icone calendrier"
											width={25}
											height={25}
										/>
										<span className={'text-sm'}>01 Février - 24 Avril</span>
									</div>
								</div>
								<div className="col-span-2 flex h-full items-center justify-end">
									<ToggleMenuComponent
										id={menu.id}
										activated={menu.activated}
									/>
								</div>

								<Link
									href={`/cartes/${menu.id}`}
									className="absolute right-0 top-0 p-[10px]"
								>
									<div
										className={
											'relative flex h-[60px] w-[60px] items-center justify-center overflow-hidden'
										}
									>
										<Image
											src="/icons/change.svg"
											alt="icone crayon"
											width={40}
											height={40}
											className={
												'absolute left-[100px] top-1/2 h-[40px] w-[40px] -translate-x-1/2 ' +
												'-translate-y-1/2 transform transition-all hover:brightness-110 hover:saturate-150 group-hover:left-1/2'
											}
										/>
									</div>
								</Link>
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
