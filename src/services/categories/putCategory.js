import { toast } from 'react-toastify'
import { getDataMe } from '@/services/data/getData'

export async function putCategory(id, category, session) {
	const resUser = await getDataMe(session)

	category = {
		...category,
		company: resUser.company,
		// to number
		menu: ~~category.menu,
		category: ~~category.category,
	}

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
