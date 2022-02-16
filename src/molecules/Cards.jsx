import React from "react";
import RecipeCard from "./Card";
import useGet from "../ions/hooks/fetch/get";

const RecipeReviewCard = () => {
	const { data, loading, error } = useGet(
		"/api/dummy"
		// `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	);
	return (
		<div>
			{data?.results.map(recipe => {
				return <RecipeCard key={recipe.id} recipe={recipe} />;
			})}
		</div>
	);
};

export default RecipeReviewCard;
