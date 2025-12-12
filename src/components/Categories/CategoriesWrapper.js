'use client'

import ErrorBoundary from '@/components/ErrorBoundary'
import { CategoriesTableComponent } from '@/components/Categories/CategoriesTable.component'

export default function CategoriesWrapper({ categoriesBase, session, dishes, menus, categoriesFromParent }) {
	console.log('🟡 CategoriesWrapper rendering with props:', {
		categoriesBaseLength: categoriesBase?.length,
		sessionExists: !!session,
		dishesLength: dishes?.length,
		menusLength: menus?.length,
		categoriesFromParentLength: categoriesFromParent?.length
	})

	return (
		<ErrorBoundary>
			<CategoriesTableComponent
				categoriesBase={categoriesBase}
				session={session}
				dishes={dishes}
				menus={menus}
				categoriesFromParent={categoriesFromParent}
			/>
		</ErrorBoundary>
	)
}
