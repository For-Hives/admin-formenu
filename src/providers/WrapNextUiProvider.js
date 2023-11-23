'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const WrapNextUiProvider = ({ children }) => {
	return (
		<>
			<NextUIProvider>{children}</NextUIProvider>
			<ToastContainer />
		</>
	)
}

export default WrapNextUiProvider
