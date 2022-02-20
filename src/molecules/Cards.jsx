import React from "react";
import RecipeCard from "./Card";
import useGet from "../ions/hooks/fetch/get";
import Stack from "@mui/material/Stack";

const RecipeReviewCard = () => {
	const { data } = useGet(
		"/api/dummy"
		// `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	);
	return (
		<Stack spacing={2} sx={{ m: 2 }}>
			{data?.results.map(recipe => {
				return <RecipeCard key={recipe.id} recipe={recipe} />;
			})}
		</Stack>
	);
};

export default RecipeReviewCard;
