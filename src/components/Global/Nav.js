'use client'
import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { CustomSvg } from '@/components/CustomSvg'

function Nav() {
	return (
		<>
			<nav className="fixed left-0 top-0 flex h-full min-h-screen w-[250px] flex-col justify-between bg-cyan-950 p-6">
				<div className="w-full">
					<div className="mb-16 w-full">
						<a href="/" className="flex flex-row items-center no-underline">
							<Image
								alt="Logo ForMenu"
								width={50}
								height={50}
								src="/menu_final.svg"
							/>
							<span className="ml-2 text-2xl text-white">ForMenu</span>
						</a>
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
					<span className="italic text-white">Profil</span>
					<div className="flex w-full flex-row items-center justify-between">
						<Image
							alt="photo profil"
							src={'/assets/navbar/pp.png'}
							width={35}
							height={35}
						/>
						<div className="flex flex-col">
							<span className="text-slate-50">Nom - Prénom</span>
							<span className="text-sm text-slate-50">nom du resto'</span>
						</div>
						<a href="/profile">
							<Image
								alt="svg trois points"
								src={'/assets/navbar/more_icon.svg'}
								width={24}
								height={24}
							/>
						</a>
					</div>
					<button
						onClick={signOut}
						className="flew-row flex h-[40px] w-full items-center justify-start gap-2 rounded-md border-2 border-cyan-700 no-underline"
					>
						<CustomSvg
							url="/assets/navbar/logout_icon.svg"
							classNames="bg-white ml-2 w-[20px] h-[20px]"
						/>
						<span className="text-white">Déconnexion</span>
					</button>
				</div>
			</nav>
		</>
	)
}

export default Nav
