'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
	return (
		<main className="relative isolate z-30 min-h-screen overflow-hidden">
			{/* darken */}
			<div
				className={'absolute left-0 top-0 -z-10 h-full w-full bg-black'}
			/>
			<Image
				src="/error_background.png"
				alt="error"
				fill={true}
				sizes={'75vw'}
				quality={75}
				className="absolute inset-0 -z-10 h-full w-full object-cover object-left opacity-50"
			/>
			<div className="z-30 mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
				<p className="text-base font-semibold italic leading-8 text-white">
					404 not found
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
					Vous êtes perdu ?
				</h1>
				<p className="mt-4 text-base text-white shadow-lg sm:mt-6">
					{`Désolé, la page que vous cherchez n'existe pas.`}
				</p>
				<div className="mt-10 flex justify-center">
					<Link
						className="text-sm font-semibold leading-7 text-white"
						href={'/'}
					>
						<span aria-hidden="true" className={'text-white'}>
							&larr;
						</span>{' '}
						{`Revenir à l'accueil`}
					</Link>
				</div>
			</div>
		</main>
	)
}
