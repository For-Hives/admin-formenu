import { create } from 'zustand'

export const useMenusStore = create(set => ({
	menu: {},
	setMenu: menu => set({ menu: menu }),
}))
