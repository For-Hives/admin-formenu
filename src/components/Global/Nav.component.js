import React from 'react'
import Image from 'next/image'
import ProfilComponent from '@/components/Nav/Profil.component'
import LogoutButtonComponent from '@/components/Nav/LogoutButton.component'
import Link from 'next/link'

function NavComponent() {
	return (
		<nav className="fixed left-0 top-0 flex h-full min-h-screen w-[250px] flex-col justify-between bg-cyan-950 p-6">
			<div className="w-full">
				<div className="mb-16 w-full">
					<Link href="/" className="flex flex-row items-center">
						<Image
							alt="Logo ForMenu"
							width={50}
							height={50}
							src="/menu_final.svg"
						/>
					</Link>
				</div>
				<div className="flex w-full flex-col gap-4">
					<span className="uppercase italic text-white">Menu</span>
					<ul className="flex w-full flex-col items-start justify-center gap-8">
						<li>
							<a href="/" className="flex flex-row items-center no-underline">
								<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border">
									<Image
										src={'/assets/navbar/tableau_de_bord.svg'}
										width={16}
										height={16}
										alt="svg"
									/>
								</div>
								<span className="ml-2 text-white">Tableau de bord</span>
							</a>
						</li>
						<li>
							<a
								href="/mes-menus"
								className="flex flex-row items-center no-underline"
							>
								<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border">
									<Image
										src={'/assets/navbar/mes_menus.svg'}
										width={16}
										height={16}
										alt="svg"
									/>
								</div>
								<span className="ml-2 text-white">Mes menus</span>
							</a>
						</li>
						<li>
							<a
								href="/mes-stats"
								className="flex flex-row items-center no-underline"
							>
								<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border">
									<Image
										src={'/assets/navbar/mes_stats.svg'}
										width={16}
										height={16}
										alt="svg"
									/>
								</div>
								<span className="ml-2 text-white">Mes stats</span>
							</a>
						</li>
						<li>
							<a
								href="/exporter"
								className="flex flex-row items-center no-underline"
							>
								<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border">
									<Image
										src={'/assets/navbar/exporter.svg'}
										width={16}
										height={16}
										alt="svg"
									/>
								</div>
								<span className="ml-2 text-white">Exporter</span>
							</a>
						</li>
						<li>
							<a
								href="/mes-parametres"
								className="flex flex-row items-center no-underline"
							>
								<div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border">
									<Image
										src={'/assets/navbar/mes_parametres.svg'}
										width={16}
										height={16}
										alt="svg"
									/>
								</div>
								<span className="ml-2 text-white">Mes paramètres</span>
							</a>
						</li>
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
