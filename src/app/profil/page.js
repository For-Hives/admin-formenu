import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import NavComponent from '@/components/Nav/Nav.component'
import FormTabsComponent from '@/components/Profil/FormTabs.component'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	const user = await getData(session)

	return (
		<>
			<NavComponent />
			{session && (
				<main className="min-h-screen w-full overflow-hidden py-8 pl-[calc(250px+4rem)]">
					<div className="flex w-1/2 flex-col gap-8">
						<div className="flex w-full flex-col gap-8">
							<div className="flex flex-col">
								<h1 className="pb-2">Modification de votre profil</h1>
								<span>Configurez vos paramètres personnels</span>
							</div>
						</div>
						<FormTabsComponent user={user} />
					</div>
				</main>
			)}
		</>
	)
}

export async function getData(session) {
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
		throw new Error('Failed to fetch data')
	}

	return await response.json()
}
