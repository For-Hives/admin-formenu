import { create } from 'zustand'

export const useMenusStore = create(set => ({
	menu: {},
	setMenu: menu => set({ menu: menu }),

	// for the modal on the update section (cartes/[id]/page.js)
	lastDishClicked: {},
	setLastDishClicked: lastDishClicked =>
		set({ lastDishClicked: lastDishClicked }),

	// ingredients list
	ingredients: {},
	setIngredients: ingredients => set({ ingredients: ingredients }),

	// allergens list
	allergens: {},
	setAllergens: allergens => set({ allergens: allergens }),

	// diet list
	diets: {},
	setDiets: diets => set({ diets: diets }),
}))
