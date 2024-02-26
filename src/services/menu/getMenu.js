export async function getMenu(id, session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/menu-deep/${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
		}
	)
	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}
	return await response.json()
}
