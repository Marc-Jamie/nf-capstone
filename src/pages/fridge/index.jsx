import React, { useState, useEffect } from "react";
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
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import RecipeCard from "../../molecules/Card";
import HeadBar from "../../molecules/headbar";
const Fridge = () => {
	// const [value, setValue] = useState("");
	// const ingredients = useFridge(state => state.ingredients);
	// const addIngredient = useFridge(state => state.addIngredient);
	// const deleteIngredient = useFridge(state => state.deleteIngredient);
	// const editIngredient = useFridge(state => state.editIngredient);
	// const setEditValue = useFridge(state => state.setEditValue);
	// const saveEditedIngredient = useFridge(state => state.saveEditedIngredient);

	const [results, setResults] = useState([]);
	const [resultsRaw, setResultsRaw] = useState([]);
	const [valueA, setValueA] = useState(results[0]);
	const [inputValue, setInputValue] = useState("");
	const [debouncedInputValue] = useDebounce(inputValue, 1_000);
	const [allIngredients, setAllIngredients] = useState([]);
	const [recipeResults, setRecipeResults] = useState([]);

	useEffect(() => {
		axios
			.get(
				`/api/spoonacular-cache/food/ingredients/autocomplete?metaInformation=true&query=${debouncedInputValue}`
			)
			.then(response => {
				setResultsRaw(response.data);
				setResults(response.data.map(({ name }) => name));
			});
	}, [debouncedInputValue]);

	return (
		<>
			<HeadBar />
			<Box
				sx={{
					display: "flex",
					alignItems: "flex-start",
					marginTop: 1,
				}}
			>
				<Autocomplete
					value={valueA}
					inputValue={inputValue}
					options={results}
					sx={{ width: 300 }}
					renderInput={params => (
						<TextField placeholder="Whats in your fridge?" {...params} />
					)}
					onChange={(event, newValue) => {
						setValueA(newValue);
					}}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
					}}
				/>
				<Button
					sx={{ height: 56 }}
					variant="contained"
					onClick={() => {
						const newItem = resultsRaw.filter(item => item.name === valueA);
						setAllIngredients([newItem[0], ...allIngredients]);
					}}
				>
					Add
				</Button>
			</Box>

			<List dense sx={{ width: "100%", maxWidth: 360 }}>
				{allIngredients?.map(ingredient => {
					const labelId = `checkbox-list-secondary-label-${ingredient.indexOf}`;
					return (
						<ListItem key={ingredient.id} disablePadding>
							<ListItemButton>
								<ListItemAvatar>
									<Avatar
										alt={ingredient.name}
										src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
									/>
								</ListItemAvatar>
								<ListItemText id={labelId} primary={ingredient.name} />
								<Button
									onClick={() => {
										const updatedList = allIngredients.filter(
											element => element.id !== ingredient.id
										);
										setAllIngredients(updatedList);
									}}
								>
									Remove
								</Button>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
			<Button
				sx={{ height: 56 }}
				variant="contained"
				onClick={() => {
					const ingredients = [allIngredients.map(ingredient => ingredient.name)];
					const joined = ingredients[0].join(",+");
					axios
						.get(
							`/api/spoonacular-cache/recipes/findByIngredients?ingredients=${joined}&ignorePantry=true`
						)
						.then(response => {
							setRecipeResults(response.data);
						});
				}}
			>
				Lets get cooking!
			</Button>
			{recipeResults?.map(result => {
				return <RecipeCard key={result.id} recipe={result} />;
			})}
		</>
	);
};
export default Fridge;
