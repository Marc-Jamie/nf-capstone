import React, { useState } from "react";
import useShoppinglist from "../../ions/store/useShoppinglist";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";

const ShoppingList = () => {
	const [value, setValue] = useState("");
	const ingredients = useShoppinglist(state => state.ingredients);
	const addIngredient = useShoppinglist(state => state.addIngredient);
	const deleteIngredient = useShoppinglist(state => state.deleteIngredient);
	const editIngredient = useShoppinglist(state => state.editIngredient);
	const setEditValue = useShoppinglist(state => state.setEditValue);
	const saveEditedIngredient = useShoppinglist(state => state.saveEditedIngredient);
	const checkIngredient = useShoppinglist(state => state.checkIngredient);
	const deleteCompletedIngredients = useShoppinglist(state => state.deleteCompletedIngredients);
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
				<InputLabel htmlFor="my-input">Shopping List</InputLabel>
				<OutlinedInput
					placeholder="What do I need?"
					value={value}
					onChange={event_ => {
						setValue(event_.target.value);
					}}
				/>
				<Button type="submit">Add</Button>
			</form>

			<List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
				{ingredients.map((ingredient, index) => {
					return (
						<ListItem key={ingredient.id}>
							<Checkbox
								checked={ingredient.isChecked ? ingredient.isChecked : false}
								onChange={() => {
									checkIngredient(index);
								}}
							/>

							{ingredient.edit ? (
								<Input
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
							<Button
								onClick={() => {
									if (ingredient.edit) {
										saveEditedIngredient(index);
									} else {
										editIngredient(index);
									}
								}}
							>
								{ingredient.edit ? "save" : "edit"}
							</Button>

							<Button
								onClick={() => {
									deleteIngredient(index);
								}}
							>
								delete
							</Button>
						</ListItem>
					);
				})}
				<Button
					onClick={() => {
						deleteCompletedIngredients();
					}}
				>
					Delete All Selected items
				</Button>
			</List>

			{/* <form
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
			</ul> */}
		</>
	);
};
export default ShoppingList;
