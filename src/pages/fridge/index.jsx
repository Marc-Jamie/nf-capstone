import React, { useState, useEffect } from "react";
import useFridge from "../../ions/store/useFridge";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDebounce } from "use-debounce";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Fridge = () => {
	const [value, setValue] = useState("");
	const ingredients = useFridge(state => state.ingredients);
	const addIngredient = useFridge(state => state.addIngredient);
	const deleteIngredient = useFridge(state => state.deleteIngredient);
	const editIngredient = useFridge(state => state.editIngredient);
	const setEditValue = useFridge(state => state.setEditValue);
	const saveEditedIngredient = useFridge(state => state.saveEditedIngredient);

	const [results, setResults] = useState([]);
	const [valueA, setValueA] = useState(results[0]);
	const [inputValue, setInputValue] = useState("");
	const [debouncedInputValue] = useDebounce(inputValue, 1_000);

	useEffect(() => {
		axios
			.get(
				`/api/spoonacular-cache/food/ingredients/autocomplete?metaInformation=true&query=${debouncedInputValue}`
			)
			.then(response => {
				setResults(response.data.map(({ name }) => name));
			});
	}, [debouncedInputValue]);

	//This is for the list
	const [checked, setChecked] = useState([1]);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<>
			<Box>
				<Autocomplete
					value={valueA}
					inputValue={inputValue}
					options={results}
					sx={{ width: 300 }}
					renderInput={params => <TextField {...params} label="Controllable" />}
					onChange={(event, newValue) => {
						setValueA(newValue);
					}}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
					}}
				/>
			</Box>
			<Button
				variant="contained"
				onClick={() => {
					return (
						<List
							dense
							sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
						>
							{results.map(result => {
								const labelId = `checkbox-list-secondary-label-${value}`;
								return (
									<ListItem
										key={result.id}
										secondaryAction={
											<Checkbox
												edge="end"
												onChange={() => {
													checkIngredient(result.id);
												}}
												checked={
													result.isChecked ? result.isChecked : false
												}
												inputProps={{ "aria-labelledby": labelId }}
											/>
										}
										disablePadding
									>
										<ListItemButton>
											<ListItemAvatar>
												<Avatar alt={result.name} src={result.image} />
											</ListItemAvatar>
											<ListItemText
												id={labelId}
												primary={` ${result.name}`}
											/>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					);
				}}
			>
				Send
			</Button>
			{/* begin of the list */}

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
			</ul> */}
		</>
	);
};
export default Fridge;
