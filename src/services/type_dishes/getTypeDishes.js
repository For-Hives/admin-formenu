export async function getTypeDishes(session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/type-dishes`,
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
