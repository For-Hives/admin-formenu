'use client'
import React, { useEffect, useState } from 'react'
import { cn, Switch } from '@nextui-org/react'
import { useMenusStore } from '@/stores/menu.store'

function ToggleComponent({ id, activated, onUpdate }) {
	const [isSelected, setIsSelected] = useState(activated ?? true)
	const menuFromStore = useMenusStore(state => state.menu)

	useEffect(() => {
		setIsSelected(activated)
	}, [menuFromStore])

	const handleChange = async checked => {
		setIsSelected(!isSelected)
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
			startContent={<span>&nbsp;&nbsp;&nbsp;activé</span>}
			endContent={<span>désactivé&nbsp;</span>}
		/>
	)
}

export default ToggleComponent
