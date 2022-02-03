import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

const useStore = create(
	persist(
		set => {
			return {
				ingredients: [],
				addIngredient: value => {
					set(
						produce(state => {
							state.ingredients.push({ name: value, id: uuid() });
						})
					);
				},
				deleteIngredient: index => {
					set(
						produce(state => {
							state.ingredients.splice(index, 1);
						})
					);
				},
				editIngredient: index => {
					set(
						produce(state => {
							state.ingredients[index].edit = true;
							state.ingredients[index].editValue = state.ingredients[index].name;
						})
					);
				},
				setEditValue: (value, index) => {
					set(
						produce(state => {
							state.ingredients[index].editValue = value;
						})
					);
				},
				saveEditedIngredient: index => {
					set(
						produce(state => {
							state.ingredients[index].name = state.ingredients[index].editValue;
							state.ingredients[index].edit = false;
						})
					);
				},
			};
		},
		{ name: "zustand" }
	)
);

export default useStore;

//persist(alles was in create ist, {name: "currywurst"}) "create(persist())"
