import React, { useState } from "react";
import useShoppinglist from "../../ions/store/useShoppinglist";

const ShoppingList = () => {
	const [value, setValue] = useState("");
	const ingredients = useShoppinglist(state => state.ingredients);
	const addIngredient = useShoppinglist(state => state.addIngredient);
	const deleteIngredient = useShoppinglist(state => state.deleteIngredient);
	const editIngredient = useShoppinglist(state => state.editIngredient);
	const setEditValue = useShoppinglist(state => state.setEditValue);
	const saveEditedIngredient = useShoppinglist(state => state.saveEditedIngredient);
	const checkIngredient = useShoppinglist(state => state.checkIngredient);

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
					placeholder="item"
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
							<input
								type="checkbox"
								checked={ingredient.isChecked ? ingredient.isChecked : false}
								onChange={() => {
									checkIngredient(index);
								}}
							/>

							{ingredient.edit ? (
								<input
									type="text"
									value={ingredient.editValue}
									onChange={event_ => {
										setEditValue(event_.target.value, index);
									}}
								/>
							) : (
								<span
									style={
										ingredient.isChecked
											? { color: "green", textDecoration: "line-through" }
											: null
									}
								>
									{ingredient.name}
								</span>
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
export default ShoppingList;
