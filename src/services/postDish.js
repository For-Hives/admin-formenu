import { toast } from 'react-toastify'

export async function postDishes(dish, session) {
	console.log(session)
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dishes`, {
		method: 'POST',
		headers: {
			// 	token
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${session.jwt}`,
		},
		body: JSON.stringify({
			data: dish,
		}),
	})

	if (!res.ok) {
		toast('Une erreur est survenue, veuillez réessayer plus tard', {
			type: 'error',
			icon: '⛔',
			toastId: 'toast-alert',
		})
	} else {
		toast('Plat ajouté avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
