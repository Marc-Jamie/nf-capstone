import React from "react";
import RecipeCard from "./Card";
import useGet from "../ions/hooks/fetch/get";
import Stack from "@mui/material/Stack";

const RecipeReviewCard = () => {
	const { data } = useGet(`/api/spoonacular/recipes/complexSearch?number=5`);
	return (
		<Stack spacing={2} sx={{ m: 2, py: 1 }}>
			{data?.results.map(recipe => {
				return <RecipeCard key={recipe.id} recipe={recipe} />;
			})}
		</Stack>
	);
};

export default RecipeReviewCard;
