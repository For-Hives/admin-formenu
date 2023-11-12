import { toast } from 'react-toastify'

export function changePassword(session, data) {
	fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${session.data.jwt}`,
		},
		body: JSON.stringify({
			...data,
		}),
	})
		.then(response => {
			return response.json()
		})
		.catch(err =>
			toast('Une erreur est survenue, veuillez réessayer plus tard', {
				type: 'error',
				icon: '⛔',
				toastId: 'toast-alert',
			})
		)
}
