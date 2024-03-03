import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Nav from '@/components/Nav/Nav.component'
import { redirect } from 'next/navigation'
import { getMyCategories } from '@/services/categories/getMyCategories'
import { CategoriesTableComponent } from '@/components/Categories/CategoriesTable.component'

export default async function Home() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	const categories = await getMyCategories(session)

	return (
		<>
			<Nav />
			{/* +4rem -> equivalent of pr-16 / pl-16, space to don't be under the nav bar  */}
			<main className="flex min-h-screen w-full items-center justify-center overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<CategoriesTableComponent
					categoriesBase={categories}
					session={session}
				/>
				{/*<IngredientsTableComponent*/}
				{/*	ingredientsBase={ingredients}*/}
				{/*	session={session}*/}
				{/*/>*/}
			</main>
		</>
	)
}
