import { create } from 'zustand'

export const useMenusStore = create(set => ({
	menus: {},
	setMenus: menus => set({ menus: menus }),
}))
