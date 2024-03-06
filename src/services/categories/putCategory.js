import { toast } from 'react-toastify'
import { getDataMe } from '@/services/data/getData'

export async function putCategory(id, category, session) {
	const resUser = await getDataMe(session)

	// add company
	console.log('PUT CATEGORY', category)
	// and add "menu" and "category" to the category object, if they are undefined or null, then just don't add them
	category = {
		...category,
		company: resUser.company,
		category: category.category ?? null,
		menu: category.menu ?? null,
	}
	if (!category.menu) {
		delete category.menu
	}
	if (!category.category) {
		delete category.category
	}

	console.log('PUT CATEGORY', category)

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: category,
			}),
		}
	)

	if (!res.ok) {
		toast('Une erreur est survenue, veuillez réessayer plus tard', {
			type: 'error',
			icon: '⛔',
			toastId: 'toast-alert',
		})
	} else {
		toast('Categorie modifié avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
