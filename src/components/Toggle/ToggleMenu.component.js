'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import ToggleComponent from '@/components/Toggle/Toggle.component'
import { toggleMenuState } from '@/services/switchElementsActivation'

export default function ToggleMenuComponent({ id, activated }) {
	const { data: session } = useSession()
	const updateMenu = async (id, checked) => {
		await toggleMenuState(id, checked, session)
	}
	return <ToggleComponent id={id} activated={activated} onUpdate={updateMenu} />
}
