import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function ProfilComponent() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	const user = await getData(session)

	return (
		<>
			<span className="italic text-white">Profil</span>
			<div className="flex w-full flex-row items-center justify-between">
				<Image
					alt="photo profil"
					src={'/assets/navbar/pp.png'}
					width={35}
					height={35}
				/>
				<div className="flex flex-col">
					<span className="text-slate-50">
						{user.lastname.toUpperCase()} - {user.firstname}
					</span>
					<span className="text-sm text-slate-50">{user.company.name}</span>
				</div>
				<a href="/src/components/Nav/Profil.component">
					<Image
						alt="svg trois points"
						src={'/assets/navbar/more_icon.svg'}
						width={24}
						height={24}
					/>
				</a>
			</div>
		</>
	)
}

export async function getData(session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=company`,
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
