import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav/Nav.component'
import { getDishes } from '@/services/dish/getDishes'
import { DishTableComponent } from '@/components/Dish/Table/DishTable.component'

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	const dishes = await getDishes(session)

	return (
		<>
			<Nav />
			<main className="flex min-h-screen w-full items-center justify-center overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<DishTableComponent dishBase={dishes} session={session} />
			</main>
		</>
	)
}
