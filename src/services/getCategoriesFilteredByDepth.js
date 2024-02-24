import { getDataMe } from '@/services/getData'

export async function getCategoriesFilteredByDepth(session, depth = 1) {
	const resUser = await getDataMe(session)
	const company = resUser.company.name

	let response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?filters[depth][$eq]=${depth}&filters[company][name][$eq]=${company}`,
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
