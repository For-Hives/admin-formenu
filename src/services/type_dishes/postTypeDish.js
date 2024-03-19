import { toast } from 'react-toastify'

export async function postTypeDish(typeDish, session) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/type-dishes`,
		{
			method: 'POST',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: {
					...typeDish,
					icon: typeDish.icon ? typeDish.icon : null,
				},
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
		toast('Type de plat ajouté avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
