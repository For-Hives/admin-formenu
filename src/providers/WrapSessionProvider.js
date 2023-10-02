'use client'
import { SessionProvider } from 'next-auth/react'

function WrapSessionProvider({ children }) {
	return <SessionProvider>{children}</SessionProvider>
}

export default WrapSessionProvider
