'use client'
import React, { useEffect, useState } from 'react'
import { cn, Switch } from '@nextui-org/react'

function ToggleComponent({ id, activated, onUpdate }) {
	const [isSelected, setIsSelected] = useState(activated ?? true)

	useEffect(() => {
		setIsSelected(activated)
	}, [activated])

	const handleChange = async checked => {
		setIsSelected(checked)
		if (onUpdate) {
			await onUpdate(id, checked)
		}
	}
	return (
		<Switch
			onChange={e => handleChange(e.target.checked)}
			isSelected={isSelected}
			checked={isSelected}
			size="sm"
			color="primary"
			classNames={{
				wrapper: cn(
					'w-[95px] relative inline-flex cursor-pointer items-center p-2 h-[30px] rounded'
				),
				thumb: cn(
					'rounded h-[20px] w-[20px] bg-white',
					'group-data-[selected=true]:ml-[59px]'
				),
			}}
			startContent={<p>&nbsp;&nbsp;&nbsp;activé</p>}
			endContent={<p>désactivé&nbsp;</p>}
		/>
		// <label className="relative inline-flex cursor-pointer items-center">
		// 	<input
		// 		name="activated"
		// 		type="checkbox"
		// 		id={id}
		// 		checked={activated}
		// 		onChange={e => handleChange(e.target.checked)}
		// 		className="peer sr-only"
		// 	/>
		// 	<div
		// 		className="peer h-[28px] w-[100px] rounded bg-gray-200 after:absolute after:left-[4px]
		// 								after:top-[4px] after:h-[20px] after:w-[20px] after:rounded after:border after:border-gray-300
		// 								after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-[72px]
		// 								peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600
		// 								dark:bg-gray-700 dark:peer-focus:ring-blue-800"
		// 	></div>
		// </label>
	)
}

export default ToggleComponent
