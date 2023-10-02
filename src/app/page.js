import {
	LoginButton,
	LogoutButton,
	ProfileButton,
	RegisterButton,
} from '@/components/buttons.component'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
	const session = await getServerSession(authOptions)
	console.log(session)

	return (
		<main
			className={'flex h-screen flex-col items-center justify-center gap-8'}
		>
			<>
				<LoginButton />
				<RegisterButton />
				<LogoutButton />
				<ProfileButton />
			</>

			<hr className={'w-1/3'} />
			<h1>Server session</h1>
			<pre>{JSON.stringify(session)}</pre>
		</main>
	)
}
