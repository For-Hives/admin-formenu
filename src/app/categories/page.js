import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Nav from '@/components/Nav/Nav.component'
import { redirect } from 'next/navigation'
import { getMyCategories } from '@/services/categories/getMyCategories'
import { getDishes } from '@/services/dish/getDishes'
import { getMenus } from '@/services/menus/getMenus'
import CategoriesWrapper from '@/components/Categories/CategoriesWrapper'

export default async function Home() {
	console.log('🟢 Categories page: Starting server render')
	
	const session = await getServerSession(authOptions)
	console.log('🟢 Categories page: Session exists:', !!session)
	
	if (!session) {
		console.log('🔴 Categories page: No session, redirecting to signin')
		redirect('/auth/signin')
	}

	console.log('🟢 Categories page: Fetching data...')
	
	try {
		const categoriesBase = await getMyCategories(session)
		console.log('🟢 Categories page: categoriesBase fetched:', categoriesBase?.length)
		
		let categories = await getMyCategories(session)
		categories = categories.filter(category => category.depth === 0)
		console.log('🟢 Categories page: categories filtered:', categories?.length)
		
		const dishes = await getDishes(session)
		console.log('🟢 Categories page: dishes fetched:', dishes?.length)
		
		const menus = await getMenus(session)
		console.log('🟢 Categories page: menus fetched:', menus?.length)

		return (
			<>
				<Nav />
				{/* +4rem -> equivalent of pr-16 / pl-16, space to don't be under the nav bar  */}
				<main className="flex min-h-screen w-full items-center justify-center overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
					<CategoriesWrapper
						categoriesBase={categoriesBase}
						session={session}
						dishes={dishes}
						menus={menus}
						categoriesFromParent={categories}
					/>
				</main>
			</>
		)
	} catch (error) {
		console.error('🔴 Categories page: Error fetching data:', error)
		throw error
	}
}
