import { getMenu } from '@/services/getMenu'

export async function toggleDishState(id, activated, session) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/dishes/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: {
					activated: activated,
				},
			}),
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to PUT data')
	}
	return res.json()
}

export async function toggleIngredientState(
	id,
	activated,
	session,
	menuId,
	setStore
) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/ingredients/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: {
					activated: activated,
				},
			}),
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to PUT data')
	}
	const newMenu = await getMenu(menuId, session)
	setStore(newMenu)
}

export async function toggleMenuState(id, activated, session) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/menus/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${session.jwt}`,
			},
			body: JSON.stringify({
				data: {
					activated: activated,
				},
			}),
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to PUT data')
	}
	return res.json()
}
