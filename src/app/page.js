import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Nav from '@/components/Global/Nav'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function Home() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	return (
		<>
			<Nav />
			<main className="flex min-h-screen w-full items-center justify-center overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<div className="flex w-full flex-row items-center justify-around">
					<a
						href="/cartes"
						className="flex flex-col items-center justify-center gap-6 no-underline"
					>
						<Image
							src="/icons/see_menu.svg"
							alt="Menu des cartes"
							width={250}
							height={250}
						/>
						<span className="text-xl font-bold">
							Voir les cartes existantes
						</span>
					</a>
					<a
						href=""
						className="flex flex-col items-center justify-center gap-6 no-underline"
					>
						<Image
							src="/icons/add_menu.svg"
							alt="Menu ajout de carte"
							width={250}
							height={250}
						/>
						<span className="text-xl font-bold">Créer une nouvelle carte</span>
					</a>
				</div>
			</main>
		</>
	)
}
