import React from 'react'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getDataMe } from '@/services/getData'

export default async function ProfilComponent() {
	const session = await getServerSession(authOptions)
	// fixme check up the validity of the session ( if it's not valid, redirect to /auth/signin )
	// fixme bug here, sometimes the session is set & not valid, and the user is not redirected to /auth/signin
	if (!session) {
		redirect('/auth/signin')
	}
	const user = await getDataMe(session)

	return (
		<div className={'group flex flex-col gap-2 no-underline'}>
			<span className="italic text-white">Profil</span>
			<Link
				href={'/profil'}
				className="flex w-full flex-row items-center justify-between rounded-lg p-2 no-underline transition hover:bg-sky-900"
			>
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
				<div href="/profil">
					<i className="fi fi-rr-menu-dots-vertical icon text-lg"></i>
				</div>
			</Link>
		</div>
	)
}
