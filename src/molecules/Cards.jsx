import React from "react";
import RecipeCard from "./Card";
import useGet from "../ions/hooks/fetch/get";

const RecipeReviewCard = () => {
	const { data } = useGet("/api/dummy.json");
	return (
		<div>
			{data?.results.map(recipe => {
				return <RecipeCard key={recipe.id} {...recipe} />;
			})}
		</div>
	);
};

export default RecipeReviewCard;
