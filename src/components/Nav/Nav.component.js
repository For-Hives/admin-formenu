import Image from 'next/image'
import ProfilComponent from '@/components/Nav/Profil.component'
import LogoutButtonComponent from '@/components/Nav/LogoutButton.component'
import Link from 'next/link'

const menuItems = [
	{
		href: '/',
		flaticon: 'fi fi-rr-apps',
		text: 'Tableau de bord',
		enabled: true,
	},
	{
		href: '/cartes',
		flaticon: 'fi fi-rr-folder-open',
		text: 'Mes menus',
		enabled: false,
	},
	{
		href: '/categories',
		flaticon: 'fi fi-rr-folder-tree',
		text: 'Mes catégories',
		enabled: false,
	},
	{
		href: '/ingredients',
		flaticon: 'fi fi-rr-pan-frying',
		text: 'Mes ingrédients',
		enabled: true,
	},
	{
		href: '/plats',
		flaticon: 'fi fi-rr-room-service',
		text: 'Mes plats',
		enabled: false,
	},
	{
		href: '/mes-stats',
		flaticon: 'fi fi-rr-chart-pie-alt',
		text: 'Mes stats',
		enabled: false,
	},
	{
		href: '/exporter',
		flaticon: 'fi fi-rr-file-export',
		text: 'Exporter',
		enabled: false,
	},
	{
		href: '/mes-parametres',
		flaticon: 'fi fi-rr-settings-sliders',
		text: 'Mes paramètres',
		enabled: false,
	},
]

function NavComponent() {
	return (
		<nav className="fixed left-0 top-0 flex h-full min-h-screen w-[250px] flex-col justify-between bg-sky-950 p-6">
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
						{menuItems.map(({ href, flaticon, text, enabled }) => (
							<li key={href} className={'w-full'}>
								<Link
									disabled={!enabled}
									href={href}
									className={`group flex w-full flex-row items-center gap-3 no-underline ${
										!enabled ? 'pointer-events-none opacity-25' : 'opacity-100'
									}`}
								>
									<div className="flex w-full items-center justify-start gap-3 rounded-lg px-4 py-2 transition-all group-hover:bg-sky-900">
										<i
											className={`${flaticon} icon group-hover:text-sky-50`}
										></i>
										<p className="text-white transition-all group-hover:text-sky-50">
											{text}
										</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex w-full flex-col gap-6">
				<ProfilComponent />
				<LogoutButtonComponent />
			</div>
		</nav>
	)
}

export default NavComponent
