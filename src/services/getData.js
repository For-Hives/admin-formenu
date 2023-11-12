export async function getData(session) {
	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/users/me?populate=company`,
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
		throw new Error('Failed to fetch data')
	}
	return await response.json()
}
