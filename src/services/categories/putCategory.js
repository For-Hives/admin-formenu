import { toast } from 'react-toastify'
import { getDataMe } from '@/services/data/getData'

export async function putIngredient(id, ingredient, session) {
	const resUser = await getDataMe(session)

	ingredient = {
		...ingredient,
		company: resUser.company,
		available_date_start: ingredient.available_date_start ? ingredient : null,
		available_date_end: ingredient.available_date_end ? ingredient : null,
	}

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: ingredient,
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
		toast('Ingredient modifié avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
