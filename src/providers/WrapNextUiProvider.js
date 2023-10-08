'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

const WrapNextUiProvider = ({ children }) => {
	return (
		<>
			<NextUIProvider>{children}</NextUIProvider>
		</>
	)
}

export default WrapNextUiProvider
