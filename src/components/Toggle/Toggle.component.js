'use client'
import React, { useState } from 'react'
import { cn, Switch } from '@nextui-org/react'

function ToggleComponent({ id, activated, onUpdate }) {
	const [isSelected, setIsSelected] = useState(activated)

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
	)
}

export default ToggleComponent
