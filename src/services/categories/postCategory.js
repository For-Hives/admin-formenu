import { toast } from 'react-toastify'
import { getDataMe } from '../data/getData'

export async function postCategory(category, session) {
	const resUser = await getDataMe(session)
	// add company from the actual user if not exist in the dish object
	category = {
		...category,
		company: resUser.company,
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=category,menu,dishes`,
		{
			method: 'POST',
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
		toast('Catégorie ajouté avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
