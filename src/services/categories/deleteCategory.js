import { toast } from 'react-toastify'

export async function deleteCategory(id, session) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
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
		toast('Category supprimé avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	return res.json()
}
