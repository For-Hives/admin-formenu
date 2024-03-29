import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Nav from '@/components/Nav/Nav.component'
import { redirect } from 'next/navigation'
import { getMyCategories } from '@/services/categories/getMyCategories'
import { CategoriesTableComponent } from '@/components/Categories/CategoriesTable.component'
import { getDishes } from '@/services/dish/getDishes'
import { getMenus } from '@/services/menus/getMenus'

export default async function Home() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	const categoriesBase = await getMyCategories(session)
	let categories = await getMyCategories(session)
	categories = categories.filter(category => category.depth === 0)
	const dishes = await getDishes(session)
	const menus = await getMenus(session)

	return (
		<>
			<Nav />
			{/* +4rem -> equivalent of pr-16 / pl-16, space to don't be under the nav bar  */}
			<main className="flex min-h-screen w-full items-center justify-center overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<CategoriesTableComponent
					categoriesBase={categoriesBase}
					session={session}
					dishes={dishes}
					menus={menus}
					categoriesFromParent={categories}
				/>
			</main>
		</>
	)
}
