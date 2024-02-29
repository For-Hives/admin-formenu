import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Nav from '@/components/Nav/Nav.component'
import React from 'react'

import MenusDetails from '@/components/Dish/Base/MenusDetails.component'
import { getMenu } from '@/services/menu/getMenu'
import { getIngredients } from '@/services/ingredients/getIngredients'
import { allergensList } from '@/services/allergens/getAllergens'
import { dietsList } from '@/services/diets/getDiets'
import { getCategoriesFilteredByDepth } from '@/services/categories/getCategoriesFilteredByDepth'
import { getTypeDishes } from '@/services/type_dishes/getTypeDishes'

export default async function Page({ params }) {
	const session = await getServerSession(authOptions)
	if (!session) {
		redirect('/auth/signin')
	}
	const idMenu = params.id
	const menu = await getMenu(idMenu, session)
	const ingredients = await getIngredients(session)
	const typeDishes = await getTypeDishes(session)
	const categories = await getCategoriesFilteredByDepth(session, 1)

	return (
		<>
			<Nav />
			{/* +4rem -> equivalent of pr-16 / pl-16, space to don't be under the nav bar  */}
			<main className="flex min-h-screen w-full flex-col gap-6 overflow-hidden py-8 pl-[calc(250px+4rem)] pr-16">
				<div className={'flex flex-col gap-2'}>
					<h1>Modification de la carte</h1>
					<span>
						Vous pouvez modifier, activer et désactiver des cartes, ingrédients
						ou plat à la volée ici !
					</span>
				</div>
				<div className="flex w-full flex-col gap-8">
					<MenusDetails
						menu={menu}
						ingredients={ingredients}
						allergens={allergensList}
						diets={dietsList}
						session={session}
						categories={categories?.data}
						categoryId={params.id}
						typeDishes={typeDishes?.data}
					/>
				</div>
			</main>
		</>
	)
}
