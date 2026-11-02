/**
 * The signed-in user, with their company. Uses the JWT of the user's session,
 * not the API token: this module can be imported by client components.
 * @param session next-auth session
 */
export async function getDataMe(session) {
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
