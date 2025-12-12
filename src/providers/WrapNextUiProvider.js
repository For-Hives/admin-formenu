'use client'
import React, { useEffect, useState } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const WrapNextUiProvider = ({ children }) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Prevent hydration mismatch by waiting for client-side mount
	if (!mounted) {
		return (
			<div style={{ visibility: 'hidden' }}>
				{children}
			</div>
		)
	}

	return (
		<>
			<NextUIProvider>{children}</NextUIProvider>
			<ToastContainer />
		</>
	)
}

export default WrapNextUiProvider
