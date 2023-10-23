import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Nav from '@/components/Global/Nav'
import FormTabs from '@/components/Profil/FormTabs'

export default async function Profile() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	const user = await getData(session)

	return (
		<>
			<Nav />
			{session && (
				<>
					<main className="min-h-screen w-full overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
						<div className="flex w-1/2 flex-col gap-8">
							<div className="flex w-full flex-col gap-8">
								<div className="flex flex-col">
									<h1 className="pb-2">Modification de votre profil</h1>
									<span>Configurez vos paramètres personnels</span>
								</div>
							</div>
							<FormTabs user={user} />
							{/*<div className="flex w-full flex-col gap-6">*/}
							{/*</div>*/}
						</div>
					</main>
				</>
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
