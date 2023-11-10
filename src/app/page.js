import {
	LoginButton,
	LogoutButton,
	ProfileButton,
	RegisterButton,
} from '@/components/Buttons/Buttons.component'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
	const session = await getServerSession(authOptions)
	console.log(session)

	return (
		<section
			className={
				'flex h-full min-h-screen w-full flex-col items-center justify-center gap-8'
			}
		>
			<LoginButton />
			<RegisterButton />
			<LogoutButton />
			<ProfileButton />
			<hr className={'w-1/3'} />
			<h1>Server session</h1>
			<pre>{JSON.stringify(session)}</pre>
		</section>
	)
}
