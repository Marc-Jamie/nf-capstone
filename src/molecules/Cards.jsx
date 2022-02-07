import React from "react";
import RecipeCard from "./Card";
import useGet from "../ions/hooks/fetch/get";

const RecipeReviewCard = () => {
	const { data } = useGet(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
	);
	return (
		<div>
			{data?.results.map(recipe => {
				return <RecipeCard key={recipe.id} {...recipe} />;
			})}
		</div>
	);
};

export default RecipeReviewCard;
