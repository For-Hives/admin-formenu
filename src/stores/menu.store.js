import { create } from 'zustand'

export const useMenusStore = create(set => ({
	menu: {},
	setMenu: menu => set({ menu: menu }),

	// for the modal on the update section (cartes/[id]/page.js)
	lastDishClicked: {},
	setLastDishClicked: lastDishClicked =>
		set({ lastDishClicked: lastDishClicked }),
}))
