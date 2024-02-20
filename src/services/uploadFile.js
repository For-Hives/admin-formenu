import { toast } from 'react-toastify'

export async function uploadFile(session, file) {
	const formData = new FormData()
	formData.append('files', file)

	let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${session.jwt}`,
		},
		body: formData,
	})
	if (!res.ok) {
		toast('Une erreur est survenue, veuillez réessayer plus tard', {
			type: 'error',
			icon: '⛔',
			toastId: 'toast-alert',
		})
	} else {
		toast('Image envoyée avec succès', {
			type: 'success',
			icon: '👌',
			toastId: 'toast-alert',
		})
	}
	const data = await res.json()
	return { data, res }
}
