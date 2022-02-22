import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";

const useFridge = create(
	persist(
		set => {
			return {
				ingredients: [],
				addIngredient: ingredient => {
					set(
						produce(state => {
							state.ingredients.push(ingredient);
						})
					);
				},
				deleteIngredient: id => {
					set(
						produce(state => {
							state.ingredients.splice(
								state.ingredients.findIndex(item => item.id === id),
								1
							);
						})
					);
				},
			};
		},
		{ name: "fridge" }
	)
);

export default useFridge;
