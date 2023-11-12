import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getData } from '@/services/getData'

export default async function ProfilComponent() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	const user = await getData(session)

	return (
		<div className={'flex flex-col gap-4'}>
			<span className="italic text-white">Profil</span>
			<div className="flex w-full flex-row items-center justify-between">
				<Image
					alt="photo profil"
					src={'/assets/navbar/pp.png'}
					width={35}
					height={35}
				/>
				<div className="flex flex-col">
					<span className="text-sm text-slate-50">
						{user.lastname.toUpperCase()} {user.firstname}
					</span>
					<span className="text-xs text-slate-50/80">{user.company.name}</span>
				</div>
				<Link href="/profil" className={'no-underline'}>
					<i className="fi fi-rr-menu-dots-vertical icon text-lg"></i>
				</Link>
			</div>
		</div>
	)
}
