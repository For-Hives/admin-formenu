'use client'
import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
	const [user, setUser] = useState({
		firstname: null,
		lastname: null,
	})
	const [company, setCompany] = useState()

	return (
		<StoreContext.Provider
			value={{
				user,
				setUser,
			}}
		>
			{children}
		</StoreContext.Provider>
	)
}

export function useStore() {
	return useContext(StoreContext)
}
