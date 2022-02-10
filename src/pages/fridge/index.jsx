import React, { useState } from "react";
import useFridge from "../../ions/store/useFridge";

const Fridge = () => {
	const [value, setValue] = useState("");
	const ingredients = useFridge(state => state.ingredients);
	const addIngredient = useFridge(state => state.addIngredient);
	const deleteIngredient = useFridge(state => state.deleteIngredient);
	const editIngredient = useFridge(state => state.editIngredient);
	const setEditValue = useFridge(state => state.setEditValue);
	const saveEditedIngredient = useFridge(state => state.saveEditedIngredient);

	return (
		<>
			<form
				onSubmit={event_ => {
					event_.preventDefault();

					if (value) {
						addIngredient(value);
						setValue("");
					}
				}}
			>
				<input
					type="text"
					placeholder="ingredient"
					value={value}
					onChange={event_ => {
						setValue(event_.target.value);
					}}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{ingredients.map((ingredient, index) => {
					return (
						<li key={ingredient.id}>
							{ingredient.edit ? (
								<input
									type="text"
									value={ingredient.editValue}
									onChange={event_ => {
										setEditValue(event_.target.value, index);
									}}
								/>
							) : (
								<span>{ingredient.name}</span>
							)}
							<button
								type="button"
								onClick={() => {
									if (ingredient.edit) {
										saveEditedIngredient(index);
									} else {
										editIngredient(index);
									}
								}}
							>
								{ingredient.edit ? "save" : "edit"}
							</button>

							<button
								type="button"
								onClick={() => {
									deleteIngredient(index);
								}}
							>
								delete
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};
export default Fridge;
