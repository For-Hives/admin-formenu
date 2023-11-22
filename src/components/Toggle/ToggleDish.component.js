'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import ToggleComponent from '@/components/Toggle/Toggle.component'
import { toggleDishState } from '@/services/switchElementsActivation'

export default function ToggleDishComponent({ id, activated }) {
	const { data: session } = useSession()
	const updateDish = async (id, checked) => {
		await toggleDishState(id, checked, session)
	}
	return <ToggleComponent id={id} activated={activated} onUpdate={updateDish} />
}
