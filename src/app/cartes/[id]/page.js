import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Global/Nav'
import Image from 'next/image'
import ToggleMenu from '@/components/ToggleMenu'
import React from 'react'

export default async function Page({ params }) {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	const idMenu = params.id
	const menu = await getMenu(idMenu, session)
	console.log(menu)

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
					{/*{companie_menus.map(menu => {*/}
					{/*	return (*/}
					{/*		<div*/}
					{/*			key={menu.id}*/}
					{/*			className="relative grid w-full grid-cols-9 items-center gap-8 rounded-lg bg-white p-6 shadow-xl"*/}
					{/*		>*/}
					{/*			<Image*/}
					{/*				src="/icons/menu_icon_carte.svg"*/}
					{/*				alt={menu.title}*/}
					{/*				width={80}*/}
					{/*				height={80}*/}
					{/*				className="col-span-1"*/}
					{/*			/>*/}
					{/*			<div className="col-span-4 flex flex-col">*/}
					{/*				<h2>{menu.title}</h2>*/}
					{/*				<span>{menu.description}</span>*/}
					{/*			</div>*/}
					{/*			/!*	TODO ajout date d'activation de la carte*!/*/}
					{/*			<div className="col-span-2 flex flex-row gap-4">*/}
					{/*				<Image*/}
					{/*					src="/icons/calendar_menu.svg"*/}
					{/*					alt="icone calendrier"*/}
					{/*					width={25}*/}
					{/*					height={20}*/}
					{/*				/>*/}
					{/*				<span>01 Février - 24 Avril</span>*/}
					{/*			</div>*/}
					{/*			<div className="col-span-2">*/}
					{/*				<ToggleMenu id={menu.id} activated={menu.activated} />*/}
					{/*			</div>*/}

					{/*			<a*/}
					{/*				href={`/cartes/${menu.id}`}*/}
					{/*				className="absolute right-0 top-0 p-[10px]"*/}
					{/*			>*/}
					{/*				<Image*/}
					{/*					src="/icons/change.svg"*/}
					{/*					alt="icone crayon"*/}
					{/*					width={30}*/}
					{/*					height={30}*/}
					{/*				/>*/}
					{/*			</a>*/}
					{/*		</div>*/}
					{/*	)*/}
					{/*})}*/}
				</div>
			</main>
		</>
	)
}

async function getMenu(id, session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/menus/${id}`,
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
