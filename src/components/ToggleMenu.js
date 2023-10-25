'use client'
import React from 'react'

function ToggleMenu({ id, activated }) {
	return (
		<label className="relative inline-flex cursor-pointer items-center">
			<input
				name="activated"
				type="checkbox"
				id={id}
				defaultChecked={activated}
				onChange={e => handleToggle(e)}
				className="peer sr-only"
			/>
			<div
				className="peer h-[28px] w-[100px] rounded bg-gray-200 after:absolute after:left-[4px]
										after:top-[4px] after:h-[20px] after:w-[20px] after:rounded after:border after:border-gray-300
										after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-[72px]
										peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600
										dark:bg-gray-700 dark:peer-focus:ring-blue-800"
			></div>
		</label>
	)
}

async function handleToggle(e) {
	await toggleMenu({
		id: e.target.id,
		activated: e.target.checked,
	})
}

async function toggleMenu({ id, activated }) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/menus/${id}`,
		{
			method: 'PUT',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
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

export default ToggleMenu
