import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav/Nav.component'
import { getDishes } from '@/services/dish/getDishes'
import { DishTableComponent } from '@/components/Dish/Table/DishTable.component'
import { getIngredients } from '@/services/ingredients/getIngredients'
import { getTypeDishes } from '@/services/type_dishes/getTypeDishes'
import { getCategoriesFilteredByDepth } from '@/services/categories/getCategoriesFilteredByDepth'
import { allergensList } from '@/services/allergens/getAllergens'
import { dietsList } from '@/services/diets/getDiets'

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}

	const dishes = await getDishes(session)
	const ingredients = await getIngredients(session)
	const typeDishes = await getTypeDishes(session)
	const categories = await getCategoriesFilteredByDepth(session, 1)

	return (
		<>
			<Nav />
			<main className="flex min-h-screen w-full items-center justify-center overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<DishTableComponent
					dishBase={dishes}
					ingredients={ingredients}
					allergens={allergensList}
					diets={dietsList}
					session={session}
					categories={categories?.data}
					typeDishes={typeDishes?.data}
				/>
			</main>
		</>
	)
}
