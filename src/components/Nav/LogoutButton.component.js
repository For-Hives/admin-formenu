'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { CustomSvgComponent } from '@/components/CustomSvg.component'

function LogoutButtonComponent() {
	return (
		<button
			onClick={signOut}
			className="flex h-[40px] w-full items-center justify-start gap-2 rounded-lg border-2 border-cyan-700 no-underline transition hover:bg-cyan-700"
		>
			<CustomSvgComponent
				url="/assets/navbar/logout_icon.svg"
				classNames="bg-white ml-2 w-[20px] h-[20px]"
			/>
			<span className="text-white">Déconnexion</span>
		</button>
	)
}

export default LogoutButtonComponent
