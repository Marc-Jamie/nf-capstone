import React, { useState } from "react";
import useShoppinglist from "../../ions/store/useShoppinglist";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import HeadBar from "../../molecules/headbar";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

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
	const deleteAllIngredients = useShoppinglist(state => state.deleteAllIngredients);

	return (
		<>
			<HeadBar />
			<Stack spacing={2} sx={{ m: 2 }}>
				<Stack
					sx={{ mx: 0.5 }}
					component="form"
					spacing={2}
					direction="row"
					onSubmit={event_ => {
						event_.preventDefault();

						if (value) {
							addIngredient(value);
							setValue("");
						}
					}}
				>
					<TextField
						variant="standard"
						label="What do I need?"
						value={value}
						sx={{ backgroundColor: "background.default", flexGrow: 1 }}
						onChange={event_ => {
							setValue(event_.target.value);
						}}
					/>
					<IconButton
						type="submit"
						aria-label="add"
						edge="end"
						sx={{ alignSelf: "center" }}
					>
						<AddIcon />
					</IconButton>
				</Stack>
				<List>
					{ingredients.map((ingredient, index) => {
						return (
							<ListItem key={ingredient.id}>
								<ListItemIcon>
									<Checkbox
										edge="start"
										checked={ingredient.isChecked ?? false}
										onChange={() => {
											checkIngredient(index);
										}}
									/>
								</ListItemIcon>

								{ingredient.edit ? (
									<Input
										sx={{ flexGrow: 1 }}
										type="text"
										value={ingredient.editValue}
										onChange={event_ => {
											setEditValue(event_.target.value, index);
										}}
									/>
								) : (
									<ListItemText
										primary={ingredient.name}
										sx={{
											textDecoration: ingredient.isChecked
												? "line-through"
												: "none",
										}}
									/>
								)}
								<IconButton
									onClick={() => {
										if (ingredient.edit) {
											saveEditedIngredient(index);
										} else {
											editIngredient(index);
										}
									}}
								>
									{ingredient.edit ? <SaveIcon /> : <EditIcon />}
								</IconButton>

								<IconButton
									aria-label="delete"
									edge="end"
									onClick={() => {
										deleteIngredient(index);
									}}
								>
									<DeleteIcon />
								</IconButton>
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
					<Button
						onClick={() => {
							deleteAllIngredients();
						}}
					>
						Delete All items
					</Button>
				</List>
			</Stack>
		</>
	);
};
export default ShoppingList;
