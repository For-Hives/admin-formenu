'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { CustomSvgComponent } from '@/components/CustomSvg.component'

function LogoutButton() {
	return (
		<>
			<button
				onClick={signOut}
				className="flew-row flex h-[40px] w-full items-center justify-start gap-2 rounded-md border-2 border-cyan-700 no-underline"
			>
				<CustomSvgComponent
					url="/assets/navbar/logout_icon.svg"
					classNames="bg-white ml-2 w-[20px] h-[20px]"
				/>
				<span className="text-white">Déconnexion</span>
			</button>
		</>
	)
}

export default LogoutButton
