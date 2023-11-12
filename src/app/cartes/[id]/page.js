import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Global/Nav'
import React from 'react'

import MenusDetails from '@/components/MenusDetails.component'

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
					<MenusDetails menu={menu} />
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

// function setMenusToStore(menus) {
// 	useMenusStore(state => state.setMenus(menus))
// }
