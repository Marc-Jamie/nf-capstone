import React, { useState } from "react";
import useStore from "../../ions/hooks/useStore";

const Fridge = () => {
	const [value, setValue] = useState("");
	const ingredients = useStore(state => state.ingredients);
	const addIngredient = useStore(state => state.addIngredient);
	const deleteIngredient = useStore(state => state.deleteIngredient);
	const editIngredient = useStore(state => state.editIngredient);
	const setEditValue = useStore(state => state.setEditValue);
	const saveEditedIngredient = useStore(state => state.saveEditedIngredient);

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
