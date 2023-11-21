import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav/Nav.component'
import React from 'react'

import MenusDetails from '@/components/MenusDetails.component'
import { getMenu } from '@/services/getMenu'

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
			<main className="flex min-h-screen w-full flex-col gap-6 overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<div className={'flex flex-col gap-2'}>
					<h1>Modification de la carte</h1>
					<span>
						Vous pouvez modifier, activer et désactiver des cartes, ingrédients
						ou plat à la volée ici !
					</span>
				</div>
				<div className="flex w-full flex-col gap-8">
					<MenusDetails menu={menu} />
				</div>
			</main>
		</>
	)
}
