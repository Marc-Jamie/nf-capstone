import React, { useState, useEffect } from "react";
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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import useFridge from "../../ions/store/useFridge";

const Fridge = () => {
	const [results, setResults] = useState([]);
	const [resultsRaw, setResultsRaw] = useState([]);
	const [valueA, setValueA] = useState(results[0]);
	const [inputValue, setInputValue] = useState("");
	const [debouncedInputValue] = useDebounce(inputValue, 1_000);
	const [recipeResults, setRecipeResults] = useState([]);
	const allIngredients = useFridge(state => state.ingredients);
	const addIngredient = useFridge(state => state.addIngredient);
	const deleteIngredient = useFridge(state => state.deleteIngredient);

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
			<Stack sx={{ m: 2 }} spacing={2}>
				<Stack sx={{ mx: 0.5 }} spacing={2} direction="row">
					<Autocomplete
						value={valueA}
						inputValue={inputValue}
						options={results}
						sx={{ width: 300 }}
						renderInput={params => (
							<TextField
								sx={{
									backgroundColor: "background.default",
									flexGrow: 1,
									m: 2,
								}}
								variant="standard"
								label="Whats in your fridge?"
								{...params}
							/>
						)}
						onChange={(event, newValue) => {
							setValueA(newValue);
						}}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
					/>
					<IconButton
						sx={{ alignSelf: "center" }}
						type="submit"
						aria-label="add"
						edge="end"
						onClick={() => {
							const newItem = resultsRaw.find(item => item.name === valueA);
							if (valueA) {
								addIngredient(newItem);
							}
						}}
					>
						<AddIcon />
					</IconButton>
				</Stack>

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
									<IconButton
										aria-label="delete"
										edge="end"
										onClick={() => {
											deleteIngredient(ingredient.id);
										}}
									>
										<DeleteIcon />
									</IconButton>
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
					Let´s get started!
				</Button>
				{recipeResults?.map(result => {
					return <RecipeCard key={result.id} recipe={result} />;
				})}
			</Stack>
		</>
	);
};
export default Fridge;
