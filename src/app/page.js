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
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '70vh',
			}}
		>
			<div>
				<LoginButton />
				<RegisterButton />
				<LogoutButton />
				<ProfileButton />
			</div>

			<h1>Server session</h1>
			<pre>{JSON.stringify(session)}</pre>
		</main>
	)
}
