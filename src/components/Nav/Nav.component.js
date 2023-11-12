import React from 'react'
import Image from 'next/image'
import ProfilComponent from '@/components/Nav/Profil.component'
import LogoutButtonComponent from '@/components/Nav/LogoutButton.component'
import Link from 'next/link'
import { CustomSvgComponent } from '@/components/CustomSvg.component'

const menuItems = [
	{
		href: '/',
		src: '/assets/navbar/tableau_de_bord.svg',
		text: 'Tableau de bord',
	},
	{
		href: '/mes-menus',
		src: '/assets/navbar/mes_menus.svg',
		text: 'Mes menus',
	},
	{
		href: '/mes-stats',
		src: '/assets/navbar/mes_stats.svg',
		text: 'Mes stats',
	},
	{ href: '/exporter', src: '/assets/navbar/exporter.svg', text: 'Exporter' },
	{
		href: '/mes-parametres',
		src: '/assets/navbar/mes_parametres.svg',
		text: 'Mes paramètres',
	},
]

function NavComponent() {
	return (
		<nav className="fixed left-0 top-0 flex h-full min-h-screen w-[250px] flex-col justify-between bg-cyan-950 p-6">
			<div className="h-full w-full flex-col">
				<div className="flex w-full flex-col gap-16">
					<Link href="/" className="flex flex-row items-center">
						<Image
							alt="Logo ForMenu"
							width={50}
							height={50}
							src="/menu_final.svg"
						/>
					</Link>
					<ul className="flex w-full flex-col items-start justify-center gap-8">
						{menuItems.map(({ href, src, text }) => (
							<li key={href}>
								<Link
									href={href}
									className="flex flex-row items-center gap-3 no-underline"
								>
									<div className="flex items-center justify-center">
										<CustomSvgComponent
											url={src}
											classNames={'!w-[20px] !h-[20px] bg-white'}
											alt={text}
										/>
									</div>
									<span className="text-white">{text}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="flex w-full flex-col gap-4">
				<ProfilComponent />
				<LogoutButtonComponent />
			</div>
		</nav>
	)
}

export default NavComponent
