import { toast } from 'react-toastify'

export async function deleteDish(id, session) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/dishes/${id}`,
		{
			method: 'DELETE',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
		}
	)

	if (!res.ok) {
		toast('Une erreur est survenue, veuillez réessayer plus tard', {
			type: 'error',
			icon: '⛔',
			toastId: 'toast-alert',
		})
	} else {
		toast('Plat supprimé avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
