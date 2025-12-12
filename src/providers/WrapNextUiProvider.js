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

	// Don't render NextUI components until client-side mount is complete
	// This prevents ResizeObserver errors from @react-aria
	if (!mounted) {
		return null
	}

	return (
		<>
			<NextUIProvider>{children}</NextUIProvider>
			<ToastContainer />
		</>
	)
}

export default WrapNextUiProvider
